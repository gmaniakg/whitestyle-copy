# 화타톡 (HwataTalk) 독립 모바일 메신저 확장 로드맵

현재 `whitestyle.com` 웹 메신저(`/messenger`)와 홈페이지 상시 플로팅 화타펫 독은 이미 **모바일 네이티브 앱으로 그대로 이전할 수 있는 버전 분리 REST/Bearer API (`/api/messenger/v1/*`)** 기반으로 구축되어 있습니다.

---

## 1. Phase 1 (현재 구축 완료 — 웹 & PWA & P2P)
- **통합 인증 API (`/api/messenger/v1/auth/token`, `hwata-auth.*` Bearer JWT):** 웹 NextAuth 세션과 동일한 `requireHwataMember(req)` 계층을 공유하여 모바일 앱 로그인 시 즉시 30일 Bearer 토큰 발급.
- **비보험 진료 인증 등급 (`User.isVerifiedNonInsured` + `HwataVerificationCode`):** 원내 발급 코드 또는 원장님 단독 승인 시 프라이빗 지인 방 개설, 1:1 DM, 500MB 클라우드 파일 권한 즉시 해금.
- **대용량 파일 하이브리드 전송:**
  - 오프라인 지인도 수신 가능한 **Vercel Blob 500MB 클라우드 업로드** (`/api/messenger/v1/upload`)
  - 동시 접속 지인 간 **WebRTC `RTCDataChannel` 용량 무제한 P2P 직통 전송** (`/api/messenger/v1/p2p/signal`)
- **PWA 설치 지원 (`/manifest.webmanifest`):** 별도 앱스토어 심사 없이도 모바일 브라우저에서 "홈 화면에 추가"로 앱처럼 실행 가능.

---

## 2. Phase 2 (독립 스마트폰 앱: iOS / Android 출시 아키텍처)
1. **모바일 앱 스택 (Expo React Native + TypeScript):**
   - `expo-secure-store`에 `/api/messenger/v1/auth/token`으로 발급받은 `hwata-auth` 토큰 보관.
   - 기존 `/api/messenger/v1/bootstrap`, `/rooms`, `/rooms/[roomId]/messages`, `/upload`, `/p2p/signal` 엔드포인트 수정 없이 100% 재사용.
2. **실시간 푸시 알림 & 백그라운드 수신:**
   - `UserDeviceToken` 모델 추가 → Apple APNs / Firebase FCM 푸시 연동.
   - 새 메시지·파일·P2P 직통 요청 수신 시 백그라운드 푸시 발송.
3. **전용 WebSocket / SSE 실시간 게이트웨이:**
   - 3초 폴링을 Upstash Realtime 또는 전용 Node WebSocket 서버(또는 Pusher/Ably)로 전환하여 <100ms 즉시 수신 및 입력 중(`typing...`) 표시 지원.
4. **모바일 대용량 백그라운드 업로드 & P2P:**
   - `expo-file-system` 백그라운드 멀티파트 업로드(`Blob` 직접 PUT) + `react-native-webrtc`로 웹-모바일 크로스 플랫폼 P2P 무제한 파일 전송.
5. **화타펫 모바일 위젯 & 3D 인터랙션:**
   - iOS WidgetKit / Android Glance 위젯에 내 화타펫 아바타와 안읽은 지인 톡, 정기 스케일링/검진 D-Day 표시.
6. **보안 & 종단간 암호화(E2EE) 옵션:**
   - 지인 1:1 비밀 대화방에 X25519 + AES-GCM 클라이언트 단 암호화 키 교환 레이어 추가.
