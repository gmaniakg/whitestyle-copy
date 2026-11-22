# whitestyle.com 홈페이지 통합 인수인계 및 운영 기준서 (Handover SSOT)

> **대상 시스템:** 화이트스타일치과의원 공식 홈페이지 (`https://whitestyle.com`) 및 연동 권위 허브 (`https://whinish.com`, `https://whitestyle-xi.vercel.app`)  
> **최종 업데이트:** 2026-11-22 (커밋 `d49c92c` 이후 운영 기준)  
> **목적:** 에이전트·개발자 세션이 바뀌더라도 **공식 ID·URL·의료진/진료시간 팩트·배포/롤백 절차·자주 터지는 함정**을 혼동하지 않도록 단일 진실 공급원(SSOT)을 유지합니다.

---

## 1. 프로젝트 기본 정보 및 3대 사이트 연동 구조

| 구분 | 로컬 저장소 경로 | GitHub 저장소 (브랜치) | Vercel 프로젝트 (ID) | 실서버 운영 도메인 |
|---|---|---|---|---|
| **공식 본원 (Primary)** | `E:\antigravity\whitestyle-copy` | `gmaniakg/whitestyle-copy` (**`master`**) | `whitestyle-copy` (`prj_bC3jpyThzIfATtf1OZHPYZR19Ac9`) | **https://whitestyle.com** (`www` → apex 301) |
| **원장 백서 허브** | `D:\antigravity\whitebook` | `gmaniakg/whitebook` (**`master`**) | `whitebook` | **https://whinish.com** |
| **서브 진료 허브** | `E:\antigravity\claudecode\whitestyle` | `gmaniakg/whitestyle-next` (**`master`**) | `whitestyle` | **https://whitestyle-xi.vercel.app** |
| **홈피 관리 워크스페이스** | `E:\antigravity\hp-manager` | — | — | `handover.md` 미러 보관 |

- **Primary 기술 스택 (`whitestyle-copy`):**
  - **Framework:** Next.js `16.2.9` (`npm run build` → `next build --webpack`), React `19.2.4`, TypeScript `5`, Tailwind CSS `4` (`@tailwindcss/typography`)
  - **Auth / DB:** Prisma `5.22.0`, NextAuth `4.24.14`
  - **빌드 결과:** 109개 정적/SSG 경로 + 동적 라우트(`/board/notice/[id]`, `/article/[id]`, `/treatments/[id]`, `/qa/[slug]`, `/video/[slug]`, `/ai-pet/lounge`)

---

## 2. 절대 혼동 금지 — 외부 플랫폼 공식 ID · URL 표

과거에 비공개 ID(`34892`)나 오기 ID(`11566039`), 구 카카오 채널(`_xaxlNxb`), 퇴역 뉴스 URL(`read.naver`)이 혼입되어 링크 404가 발생했던 이력이 있으므로 **반드시 아래 검증된 공개 ID만 사용**합니다.

| 플랫폼 / 채널 | 올바른 공개 URL / ID | 절대 사용 금지 (오류 이력) |
|---|---|---|
| **네이버 영수증·방문자 후기** | `https://m.place.naver.com/hospital/11533882/review/visitor` (Place ID: **`11533882`**) | `.../hospital/34892/...`, `.../hospital/11566039/...` (공개 페이지 없음) |
| **네이버 지도 · 플레이스 홈** | `https://map.naver.com/p/entry/place/11533882` / `https://m.place.naver.com/hospital/11533882/home` | `new.smartplace.naver.com/bizes/place/34892` (관리자 로그인 벽 — 공개 링크 금지), `place/11566039` |
| **네이버 빠른 예약** | `https://booking.naver.com/booking/13/bizes/265482` (예약 ID `265482`) | — |
| **카카오톡 채널** | `https://pf.kakao.com/_Vtxdwl` (ID: `whitestyle2`) | `https://pf.kakao.com/_xaxlNxb` (구/깨진 채널) |
| **LINE 일본어 직통 상담** | `https://line.me/ti/p/~whitestyle1` (ID: `whitestyle1`) | — |
| **굿닥 / 모두닥 / 나만의닥터** | 굿닥 `https://www.goodoc.co.kr/hospitals/43229` · 모두닥 `modoodoc.com/hospital/3940/...` · 나만의닥터 `hospital_id=55822` | — |
| **코네스트(KONEST)** | `https://www.konest.com/contents/clinic_mise_detail.html?id=4403` (원내 미러: `/ja/konest`, `/konest-archive/index.html`) | *(참고: `konest.com`은 Node bare `fetch`에 TLS 406을 반환하나 실제 브라우저에서는 정상 200 동작하므로 제거 금지)* |
| **네이버 뉴스 기사** | `https://n.news.naver.com/mnews/article/{oid}/{aid}` | `https://news.naver.com/main/read.naver?...` (구 엔드포인트 중단) |
| **공식 SNS · 블로그** | 블로그 `whitestyle3` / `whitestyle94`, 인스타 `@whitestylejp` · `@whitestyledentalclinic` · `@whitestyle_dental`, 유튜브 `@whitestyle`, 스레드 `@whitestyle_dental`, 틱톡 `@whitestyle_dental`, X `@chigwagang89847` | — |

---

## 3. 화이트스타일치과의원 공식 팩트 SSOT (전 페이지 통일 기준)

1. **연혁 · 사업자:** **1994년 8월 9일 개원, 33년 전통** (`創業33年` / `33 years`), 사업자등록번호 **`212-94-71989`** *(과거 `26년`·`29년`·`30년` 표기 금지)*
2. **의료진 (3인 원장단 협진):** **김준헌 병원장**(서울대졸, 단국대 외래교수, 교정학 박사) · **이봉진 대표원장** · **박선혜 원장**(보건복지부 인증 치주과 전문의)
3. **현행 주소 · 좌표:** **`서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층`**, 우편번호 **`06134`** (강남역 11·12번 출구 도보 1분 / 위경도 `37.4988802, 127.0286304`)  
   *(구 주소 `테헤란로 107`, 구 번지 `819-3`, 구 우편번호 `135-080` 사용 금지)*
4. **연락처 · 일본어 통역:** 대표상담 **`1577-7287` / `02-569-7528`** (구 번호 `02-555-7287`, `02-569-7287` 금지) · **일본어 전담 통역 스태프 3명 상주** · **일본어 통역 직통 `+82-10-3046-5010` (`010-3046-5010`)**
5. **진료 시간:** 월·화·수·금 `10:00~19:00` (점심 `13:00~14:00`) / 토요일 `10:00~14:00` (점심시간 없이 연속 진료, 신환 접수 `13:30` 마감) / **목요일·일요일·공휴일 휴진**
6. **마취·안전 정책:** 의식 소실·호흡 억제 위험이 있는 **수면마취(수면진정)는 일절 시행하지 않으며**, 가글 마취 → 도포 마취 → 디지털 정압 무통 마취기의 **3단계 통증 완화 국소마취**만 시행
7. **한·일 문장 병기 금지:** 단일 페이지 내에서는 국문 본문 전체를 끝까지 완결한 뒤 하단에 일문 본문 전체를 완결하며, 한 문장·문단 안에 한·일어를 괄호/슬래시로 섞지 않음
8. **고객 노출 문구 원칙:** 예비환자가 보는 모든 HTML·TSX·PDF·CSS(`public/` 포함)·메타데이터에는 **내부 제작 도구·파이프라인 명칭(`Hallmark`, `Impeccable`, `Laya`, `PhotoCraft`, `FilmCraft`, `Remotion`, `Topaz`, `AEO`, `GEO`, `rx 01` 등)을 절대 노출하지 않음** (`src/app/article/[id]/page.tsx`도 `핵심 요약 안내`로 정비 완료)

---

## 4. 배포 · 버전 관리 · 롤백 및 `exFAT` 운영 표준

### 4-1. 표준 수정 및 배포 절차 (`git push` 자동 반영 원칙 — 2026-11-22 확정)
1. **사전 백업(필수):** 코드·콘텐츠·에셋 수정 전 반드시 `E:\antigravity\sns-management\backups\<YYYYMMDD>_<작업명>\`에 수정 대상 원본 백업.
2. **로컬 빌드 검증:** `npm --prefix "E:\antigravity\whitestyle-copy" run build`로 에러 0건 확인.
3. **클러스터 중복 배포 락:** `python "E:\antigravity\namju-notebook\cluster_dedup_guard.py" deploy_lock vercel "E:\antigravity\whitestyle-copy"` 실행 후 커밋.
4. **GitHub 단일 푸시 배포:** 세 저장소 모두 브랜치가 **`master`** 이며 GitHub 웹훅이 Vercel 프로덕션 빌드를 자동 트리거합니다. **`git push origin master`만 실행**하고 `vercel --prod`를 중복 실행하지 않습니다(웹훅 장애 시 비상 복구에만 예외 허용).
   - **주의 (`E:\antigravity\claudecode\whitestyle`):** 루트에 untracked `.env.production` 및 미커밋 폴더(`app/api/*`)가 있으므로 절대 `git add -A`를 쓰지 말고 수정 파일만 지정해 `git add <파일>` 실행.

### 4-2. 문제 발생 시 1단계씩 되돌리기 (롤백 방법)
- **방법 A — Vercel Instant Rollback (1~2초 즉시 복구):**  
  Vercel 대시보드(`whitestyle-copy` 프로젝트) 또는 `vercel ls --cwd "E:\antigravity\whitestyle-copy"`로 과거 배포 미리보기 URL(`https://whitestyle-copy-xxxx.vercel.app`)을 먼저 비교한 뒤, 원하는 버전으로 Instant Rollback 수행.
- **방법 B — GitHub 이력 기준 1단계씩 안전 되돌리기:**  
  `git revert <되돌릴_커밋ID>` → `npm run build` 확인 → `git push origin master` (커밋 이력을 지우지 않고 직전 상태로 복구되어 Vercel 자동 재배포).

### 4-3. Windows `exFAT` (`E:` 드라이브) 환경 안전 규칙
- `E:` 드라이브(`Crucial X9`)는 `exFAT` 파일 시스템이므로 아래 설정을 로컬에 유지해야 합니다 (`2026-11-22` `whitestyle-copy` 및 `claudecode/whitestyle` 적용 완료, 팩파일 164개/76.02 GB → 2개/1.67 GB 정리 및 `multi-pack-index` 제거):
  - **Git 로컬 설정:** `core.multiPackIndex=false`, `gc.writeMultiPackIndex=false`, `maintenance.strategy=gc`, `repack.writeBitmaps=false`, `pack.writeReverseIndex=false`
  - **ReadOnly 속성 주의:** `exFAT`에서 팩파일에 `ReadOnly` 속성이 남아 `Permission denied`가 나면 `cmd /c 'attrib -R "E:\antigravity\whitestyle-copy\.git\objects\pack\*"'` 후 `git repack -a -d --no-write-bitmap-index` 실행.
  - **Next.js `readlink` EISDIR 대응:** [next.config.ts](file:///E:/antigravity/whitestyle-copy/next.config.ts#L4-L45)에 Win32 `EISDIR`→`EINVAL` 정규화 패치 및 Webpack 빌드(`next build --webpack`) 유지.
  - **PowerShell `[id]` 경로 주의:** `src/app/article/[id]`, `src/app/board/notice/[id]` 등 대괄호 포함 경로를 PowerShell로 다룰 때는 반드시 `-LiteralPath` 사용.

---

## 5. 사이트 구조 · 핵심 파일 맵 · 404/디자인 점검 포인트

### 5-1. 핵심 코드 및 데이터 연동 맵
| 영역 | 주요 파일 | 점검 포인트 / 흔한 함정 |
|---|---|---|
| **전역 스키마 · 메타** | [src/app/layout.tsx](file:///E:/antigravity/whitestyle-copy/src/app/layout.tsx) | JSON-LD `hasMap`·`sameAs`에 `11533882` 및 현행 주소·3인 원장단·일본어 직통번호 일치 유지 |
| **진료 안내 16개 페이지** | [src/components/treatmentConditionData.ts](file:///E:/antigravity/whitestyle-copy/src/components/treatmentConditionData.ts) · [ClinicalSummarySection.tsx](file:///E:/antigravity/whitestyle-copy/src/components/ClinicalSummarySection.tsx) · `public/legacy/*.html` | `NAVER_PLACE_ID = '11533882'` 단일 상수 관리. 각 진료 페이지 하단에 `public/legacy/<번호>.html`을 `<iframe>`으로 임베드하며, 구 `/legacy_assets/*`·`/bbs/*` 링크는 [next.config.ts](file:///E:/antigravity/whitestyle-copy/next.config.ts#L144-L206) 리다이렉트로 처리 |
| **비급여 · 팩트 · Q&A · 용어** | [src/app/price/page.tsx](file:///E:/antigravity/whitestyle-copy/src/app/price/page.tsx) · [clinic-facts/page.tsx](file:///E:/antigravity/whitestyle-copy/src/app/clinic-facts/page.tsx) · `src/data/evidenceQa.ts` · `/qa/[slug]`(35) · `/glossary`(50) | HIRA 기준 수가·영수증 후기(`11533882`)·굿닥(`43229`) 수치 일치 |
| **임상 칼럼 · 공지 게시판** | [src/app/board/notice/page.tsx](file:///E:/antigravity/whitestyle-copy/src/app/board/notice/page.tsx) · [notice/[id]/page.tsx](file:///E:/antigravity/whitestyle-copy/src/app/board/notice/[id]/page.tsx) · [MarkdownRenderer.tsx](file:///E:/antigravity/whitestyle-copy/src/components/MarkdownRenderer.tsx) · [board-editorial.css](file:///E:/antigravity/whitestyle-copy/src/app/board/board-editorial.css) · [src/lib/api.ts](file:///E:/antigravity/whitestyle-copy/src/lib/api.ts) · [extracted_data/metadata.json](file:///E:/antigravity/whitestyle-copy/extracted_data/metadata.json) | **함정 1:** `metadata.json`의 `local_path` 450건(특히 `board_notice` 135건)이 실제 디스크 `.md` 파일명과 1글자라도 다르면 `/board/notice/[id]`가 **404**가 됨.<br>**함정 2:** 어두운 네이비 배너(`#0F172A`) 위 `h2`·`strong` 색상을 `.prose`나 `MarkdownRenderer`가 `#111827`로 덮어쓰지 않도록 `board-editorial.css`의 `.ws-notice-prose` 고대비 규칙 유지 필수 |
| **언론보도 · 수상/인증 아카이브** | [src/app/data.ts](file:///E:/antigravity/whitestyle-copy/src/app/data.ts) · [src/app/contentData.json](file:///E:/antigravity/whitestyle-copy/src/app/contentData.json) · [pressData.json](file:///E:/antigravity/whitestyle-copy/src/app/pressData.json) · [article/[id]/page.tsx](file:///E:/antigravity/whitestyle-copy/src/app/article/[id]/page.tsx) | `data.ts`의 모든 `file`(200건)은 확장자 제거 ID가 `contentData.json` 키로 존재해야 하며 `public/press/`·`public/awards/` 디스크 파일도 일치해야 `/article/[id]` 404가 발생하지 않음 |
| **코네스트(KONEST) 아카이브** | `/ja/konest` · `KonestArchiveSection.tsx` · [public/konest-archive/index.html](file:///E:/antigravity/whitestyle-copy/public/konest-archive/index.html) | 증빙 PDF·캡처는 `proof/*`, 리뷰 데이터는 `reviews_all.csv`/`reviews_summary.md`, 갤러리 사진은 `photos/${p.localFilename}` 경로 유지 (`01_clinic_profile/...` 등 구 추출 경로 사용 금지) |
| **인터랙티브 플래너 · 화타펫 · 화타톡** | [public/interactive_treatment_planner.html](file:///E:/antigravity/whitestyle-copy/public/interactive_treatment_planner.html) · `public/planner-styles/*` · `public/ai-pet/**` · `/messenger` · `/api/messenger/v1/*` · `HwataMessengerDock.tsx` | 플래너 스타일은 `./planner-styles/style.css` 참조(내부 도구명 주석 제거 상태 유지). `ai-pet` 내 이미지는 `/ai-pet/assets3d/hwata_3d_costume_crown.png` 등 하위 경로 depth별 깨짐 주의. 화타톡(`/messenger` + 플로팅 독)은 Vercel Blob(500MB) + WebRTC P2P 무제한 전송 연동 |
| **회원관리 · 시즌 이메일 · 소셜 로그인** | `/admin/members` · `/api/admin/members/*` · `/api/admin/campaigns` · `/api/admin/verification-codes` · `src/lib/mailer.ts` · `src/lib/seasonal-email.ts` | `/admin/members`는 `OWNER_ADMIN_EMAILS`(`gmmaniakgm@gmail.com,ymaniak3@gmail.com`) 단독 접근 잠금. 이메일은 `RESEND_API_KEY` 또는 `SMTP_USER/SMTP_PASS` 설정 시 즉시 자동 발송. 카카오·네이버는 키 등록 전 비활성(`연동 준비중`) 표시 |
| **AI 색인 · 피드 · 사이트맵** | [public/llms.txt](file:///E:/antigravity/whitestyle-copy/public/llms.txt) · [public/llms-full.txt](file:///E:/antigravity/whitestyle-copy/public/llms-full.txt) · [public/rss.xml](file:///E:/antigravity/whitestyle-copy/public/rss.xml) · [public/robots.txt](file:///E:/antigravity/whitestyle-copy/public/robots.txt) · `src/app/sitemap.ts` (226개 URL) | 새 칼럼·진료 페이지 추가 시 `llms.txt`, `llms-full.txt`, `rss.xml`, `sitemap.ts` 동시 동기화 |
| **검색엔진 소유권 인증** | `public/googlef08430f0957ccb19.html`, `public/naver95864a209b24b06ef19f501b22ddf548.html`, `public/naverbecb9941770656cd22fc255e74631164.html` | 절대 삭제 금지 |
| **의료광고 컴플라이언스 차단** | `src/lib/api.ts` (`BLOCKED_TYPES`), `src/app/bbs/board.php/route.ts` | `board_review`, `board_report`, `board_withstar` 및 경험담·연예인 후기 URL은 의료법 제56조 검토에 따라 로더 차단 및 `/board/notice` 리다이렉트 유지 |

---

## 6. 최근 주요 커밋 마일스톤 (롤백 기준점)

| 커밋 ID | 날짜 | 주요 변경 요약 |
|---|---|---|
| `(이번 배포)` | 2026-11-23 | 로그인/회원가입/소셜 상태 전수 정비, 원장님 단독 `/admin/members` 센터, 신규가입 웰컴·2026 연말 스케일링 시즌 이메일 자동화(`Resend`/`SMTP`), 비보험 진료 '인증된 화타펫' 지인 메신저 화타톡(`/messenger` PWA + 전 페이지 플로팅 독 + Vercel Blob 500MB + WebRTC P2P 무제한 전송 + 모바일 v1 API) 구축 |
| `d49c92c` | 2026-11-22 | `extracted_data/metadata.json` 내 `/board/notice/1902`·`1904` 파일명 불일치 복구 (사이트맵 226/226 전량 200 OK) |
| `61726a4` | 2026-11-22 | 네이버 영수증 후기·플레이스 `11533882` 전환, 누락 `/article/*` 10건 및 PDF 1건 복구, 네이버 뉴스 `n.news.naver.com` 121건 전환, 코네스트 `proof/*`·`photos/*` 및 `planner-styles`·`ai-pet`·레거시 리다이렉트 일괄 복구 |
| `5b22e27` | 2026-11-22 | 공지·임상칼럼(`/board/notice/1909` 등) 다크 배너 글자 실종 해소 및 에디토리얼 레이아웃 개편 |
| `69f169e` | 2026-11-22 | 공지 `1918`~`1920` 추가 및 `/treatments`·`/ja`·`llms`/`rss`/`sitemap` 동기화 |
| `e2d21ff` | 2026-11-22 | 대학저널 보도 `32603` 및 스마트플레이스 후기 아카이브 추가 |
| `e796253` | 2026-11-22 | 공지 `1915`~`1917` 추가, 신평원 비급여 수가 동기화 |
| `e156c50` | 2026-11-21 | `/clinic-facts` 1994년 개원 연혁 및 행정 인허가 사실관계 명시 |
| `e39a358` / `f1c568c` | 2026-11-21 | 진료시간·휴진(목 휴진, 토 10~14, 신환 13:30 마감) 및 점심시간 스키마 분리 반영 |
| `f65a4df` | 2026-11-21 | 화타펫(`ai-pet/lounge`) 로그인 게이트·회원가입 동의 및 2027 수능 미백 이벤트 반영 |
| `527c30c` | 2026-11-21 | 임플란트 재수술·성인 재교정 경로 및 공지 `1910`~`1911`, `/ja` 2026 가격표 확장 |
| `18d5656` / `ecdcf02` | 2026-11-20 | `/clinic-facts`, `/qa`(35), `/glossary`(50), `/warranty`, `/video`, 심미보철 5대 경로, HIRA `/price` 및 SSR/Canonical/Robots 정비 |

---

## 7. 작업 완료 후 기본 검증 체크리스트
1. 수정 전 `E:\antigravity\sns-management\backups\` 백업 확인
2. 고객 노출 영역 내 내부 도구명·구 ID(`34892`, `11566039`, `_xaxlNxb`, `read.naver`, `테헤란로 107`) 혼입 0건 확인
3. `npm --prefix "E:\antigravity\whitestyle-copy" run build` 통과 및 `git push origin master`로 Vercel 자동 반영
4. 반영 완료 후 핵심 페이지 및 `https://whitestyle.com/sitemap.xml` HTTP `200 OK` 확인 (필요 시 `whinish.com`, `whitestyle-xi.vercel.app` 동시 동기화)
