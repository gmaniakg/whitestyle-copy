'use client';

export interface P2PIncomingOffer {
  id: string;
  roomId: string;
  fromUserId: string;
  toUserId: string;
  transferId: string;
  signalType: string;
  payload: string;
  createdAt: string;
}

export interface P2PProgressInfo {
  transferId: string;
  fileName: string;
  loaded: number;
  total: number;
  percentage: number;
  direction: 'send' | 'receive';
}

const RTC_CONFIG: RTCConfiguration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
};

const CHUNK_SIZE = 64 * 1024;
const HIGH_WATER_MARK = 4 * 1024 * 1024;
const LOW_WATER_MARK = 512 * 1024;

async function postSignal(data: {
  roomId: string;
  toUserId: string;
  transferId: string;
  signalType: 'offer' | 'answer' | 'ice';
  payload: unknown;
}) {
  await fetch('/api/messenger/v1/p2p/signal', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      payload: typeof data.payload === 'string' ? data.payload : JSON.stringify(data.payload),
    }),
  });
}

async function pollPeerSignals(
  roomId: string,
  transferId: string,
  expectedTypes: string[],
  timeoutMs = 45000
): Promise<Array<{ signalType: string; payload: string }>> {
  const res = await fetch(
    `/api/messenger/v1/p2p/signal?roomId=${encodeURIComponent(roomId)}&transferId=${encodeURIComponent(transferId)}&types=${encodeURIComponent(expectedTypes.join(','))}`,
    { credentials: 'same-origin', cache: 'no-store' }
  );
  if (!res.ok) return [];
  const json = await res.json().catch(() => null);
  if (!json?.ok || !Array.isArray(json.signals)) return [];
  return json.signals;
}

/**
 * 동시 접속 중인 로그인 지인에게 WebRTC RTCDataChannel로 용량 제한 없는 파일 직통 전송
 */
export async function sendFileViaWebRtcP2P(params: {
  roomId: string;
  toUserId: string;
  file: File;
  onProgress?: (info: P2PProgressInfo) => void;
}): Promise<{ transferId: string; bytesSent: number }> {
  if (typeof RTCPeerConnection === 'undefined') {
    throw new Error('이 브라우저는 P2P 직통 파일 전송(WebRTC)을 지원하지 않습니다.');
  }

  const transferId = `p2p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  const pc = new RTCPeerConnection(RTC_CONFIG);
  const channel = pc.createDataChannel('hwata-file', { ordered: true });
  channel.binaryType = 'arraybuffer';
  channel.bufferedAmountLowThreshold = LOW_WATER_MARK;

  let active = true;
  const candidateQueue: RTCIceCandidateInit[] = [];
  let remoteSet = false;

  pc.onicecandidate = (evt) => {
    if (evt.candidate) {
      postSignal({
        roomId: params.roomId,
        toUserId: params.toUserId,
        transferId,
        signalType: 'ice',
        payload: evt.candidate.toJSON(),
      }).catch(() => {});
    }
  };

  const waitOpen = new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('상대방이 45초 안에 P2P 수신을 수락하지 않았습니다.'));
    }, 45000);

    channel.onopen = () => {
      clearTimeout(timer);
      resolve();
    };
    channel.onerror = () => {
      clearTimeout(timer);
      reject(new Error('P2P 직통 채널 연결 중 오류가 발생했습니다.'));
    };
  });

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  await postSignal({
    roomId: params.roomId,
    toUserId: params.toUserId,
    transferId,
    signalType: 'offer',
    payload: {
      sdp: offer,
      fileName: params.file.name,
      fileSize: params.file.size,
      mimeType: params.file.type || 'application/octet-stream',
    },
  });

  const pollLoop = (async () => {
    const start = Date.now();
    while (active && Date.now() - start < 45000) {
      const sigs = await pollPeerSignals(params.roomId, transferId, ['answer', 'ice']);
      for (const s of sigs) {
        try {
          const parsed = JSON.parse(s.payload);
          if (s.signalType === 'answer' && !remoteSet) {
            await pc.setRemoteDescription(new RTCSessionDescription(parsed));
            remoteSet = true;
            for (const cand of candidateQueue) {
              await pc.addIceCandidate(new RTCIceCandidate(cand)).catch(() => {});
            }
            candidateQueue.length = 0;
          } else if (s.signalType === 'ice') {
            if (remoteSet) {
              await pc.addIceCandidate(new RTCIceCandidate(parsed)).catch(() => {});
            } else {
              candidateQueue.push(parsed);
            }
          }
        } catch {
          // ignore bad signal
        }
      }
      if (channel.readyState === 'open') break;
      await new Promise((r) => setTimeout(r, 900));
    }
  })();

  try {
    await Promise.race([waitOpen, pollLoop.then(() => waitOpen)]);

    // 1. Metadata header
    channel.send(
      JSON.stringify({
        kind: 'META',
        transferId,
        fileName: params.file.name,
        fileSize: params.file.size,
        mimeType: params.file.type || 'application/octet-stream',
      })
    );

    // 2. 64KB chunk streaming with backpressure
    let offset = 0;
    while (offset < params.file.size) {
      if (channel.bufferedAmount > HIGH_WATER_MARK) {
        await new Promise<void>((resolve) => {
          const onLow = () => {
            channel.removeEventListener('bufferedamountlow', onLow);
            resolve();
          };
          channel.addEventListener('bufferedamountlow', onLow);
        });
      }
      const slice = params.file.slice(offset, offset + CHUNK_SIZE);
      const buf = await slice.arrayBuffer();
      channel.send(buf);
      offset += buf.byteLength;
      params.onProgress?.({
        transferId,
        fileName: params.file.name,
        loaded: offset,
        total: params.file.size,
        percentage: params.file.size > 0 ? Math.min(100, Math.round((offset / params.file.size) * 100)) : 100,
        direction: 'send',
      });
    }

    // 3. EOF marker
    channel.send(JSON.stringify({ kind: 'EOF', transferId }));
    await new Promise((r) => setTimeout(r, 400));
    return { transferId, bytesSent: offset };
  } finally {
    active = false;
    setTimeout(() => {
      try {
        channel.close();
        pc.close();
      } catch {
        // ignore
      }
    }, 1500);
  }
}

/**
 * 수신자가 P2P 파일 전송 오퍼를 수락하고 브라우저로 직접 다운로드 저장
 */
export async function acceptWebRtcP2POffer(params: {
  offerSignal: P2PIncomingOffer;
  onProgress?: (info: P2PProgressInfo) => void;
}): Promise<{ fileName: string; size: number }> {
  const offerData = JSON.parse(params.offerSignal.payload) as {
    sdp: RTCSessionDescriptionInit;
    fileName: string;
    fileSize: number;
    mimeType: string;
  };

  const pc = new RTCPeerConnection(RTC_CONFIG);
  let active = true;

  pc.onicecandidate = (evt) => {
    if (evt.candidate) {
      postSignal({
        roomId: params.offerSignal.roomId,
        toUserId: params.offerSignal.fromUserId,
        transferId: params.offerSignal.transferId,
        signalType: 'ice',
        payload: evt.candidate.toJSON(),
      }).catch(() => {});
    }
  };

  const completed = new Promise<{ fileName: string; size: number }>((resolve, reject) => {
    const chunks: BlobPart[] = [];
    let receivedBytes = 0;
    let fileName = offerData.fileName || 'hwatatalk_file';
    let fileSize = Number(offerData.fileSize || 0);
    let mimeType = offerData.mimeType || 'application/octet-stream';

    const timeout = setTimeout(() => {
      reject(new Error('P2P 파일 수신 시간이 초과되었습니다.'));
    }, 300000);

    pc.ondatachannel = (event) => {
      const ch = event.channel;
      ch.binaryType = 'arraybuffer';
      ch.onmessage = (msgEvt) => {
        if (typeof msgEvt.data === 'string') {
          try {
            const ctrl = JSON.parse(msgEvt.data);
            if (ctrl.kind === 'META') {
              fileName = ctrl.fileName || fileName;
              fileSize = Number(ctrl.fileSize || fileSize);
              mimeType = ctrl.mimeType || mimeType;
            } else if (ctrl.kind === 'EOF') {
              clearTimeout(timeout);
              const blob = new Blob(chunks, { type: mimeType });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = fileName;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              setTimeout(() => URL.revokeObjectURL(url), 10000);
              resolve({ fileName, size: receivedBytes });
            }
          } catch {
            // ignore
          }
          return;
        }

        if (msgEvt.data instanceof ArrayBuffer) {
          chunks.push(msgEvt.data);
          receivedBytes += msgEvt.data.byteLength;
          params.onProgress?.({
            transferId: params.offerSignal.transferId,
            fileName,
            loaded: receivedBytes,
            total: fileSize,
            percentage: fileSize > 0 ? Math.min(100, Math.round((receivedBytes / fileSize) * 100)) : 100,
            direction: 'receive',
          });
        }
      };
      ch.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('P2P 파일 수신 중 연결이 끊어졌습니다.'));
      };
    };
  });

  await pc.setRemoteDescription(new RTCSessionDescription(offerData.sdp));
  const answer = await pc.createAnswer();
  await pc.setLocalDescription(answer);

  await postSignal({
    roomId: params.offerSignal.roomId,
    toUserId: params.offerSignal.fromUserId,
    transferId: params.offerSignal.transferId,
    signalType: 'answer',
    payload: answer,
  });

  const iceLoop = (async () => {
    const start = Date.now();
    while (active && Date.now() - start < 30000) {
      const sigs = await pollPeerSignals(params.offerSignal.roomId, params.offerSignal.transferId, ['ice']);
      for (const s of sigs) {
        try {
          const parsed = JSON.parse(s.payload);
          await pc.addIceCandidate(new RTCIceCandidate(parsed)).catch(() => {});
        } catch {
          // ignore
        }
      }
      await new Promise((r) => setTimeout(r, 900));
    }
  })();

  try {
    void iceLoop;
    return await completed;
  } finally {
    active = false;
    setTimeout(() => {
      try {
        pc.close();
      } catch {
        // ignore
      }
    }, 1500);
  }
}
