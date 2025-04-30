# P&G Peakathon 2023 Metaverse Quest

## 🧠 Starter

이 프로젝트는 MERN 스택(MongoDB, Express.js, React, Node.js) 기반으로 제작된 팀 퀴즈 대회 응시 페이지 및 결과 조회를 위한 관리자 페이지 입니다.
관리자는 퀴즈를 운영하고, 참여자는 팀 단위로 로그인하여 퀴즈를 응시할 수 있습니다.

관리자 페이지: https://pg-webpage-frontend.onrender.com/admin
퀴즈 페이지: https://pg-webpage-frontend.onrender.com/landing/1
(url에서 /landing/n, n을 교체함으로써 해당 퀴즈로 이동)

---

## 📌 주요 기능

### 👨‍💼 관리자(Admin)

- 관리자 회원가입 / 로그인 (JWT 인증)
- 팀 응답 결과 확인 및 통계 열람
- 사이드바 토글 및 대시보드 레이아웃 제공

### 👥 참여자(Player)

- 팀 이름 + 비밀번호 로그인
- 객관식/주관식 퀴즈 응답
- 정답 자동 채점 기능 포함 (클라이언트에서 처리)
- 중복 응답 방지 및 제출 확인

### 📊 통계/관리

- 퀴즈별 팀 응답 현황 집계
- 팀 리스트 필터링, 검색, 페이지네이션

---

## ⚙️ 기술 스택

| 구성 영역      | 기술                                          |
| -------------- | --------------------------------------------- |
| **프론트엔드** | React, Redux Toolkit, Axios, React Router DOM |
| **백엔드**     | Express.js, Node.js, MongoDB (Mongoose)       |
| **인증**       | JWT + bcrypt                                  |
| **보안**       | CORS, xss-clean                               |
| **상태관리**   | Redux Slice (admin, player, team, modal 등)   |
| **에러 처리**  | 커스텀 에러 클래스 + Express 미들웨어 기반    |

---

## 🗂️ 프로젝트 구조

```
pg_final-main/
├── client/                      # 프론트엔드 (React)
│   ├── src/
│   │   ├── pages/               # 화면 구성 (Landing, Quiz, Dashboard 등)
│   │   ├── features/            # Redux slices (admin, player 등)
│   │   ├── components/          # 재사용 UI 컴포넌트
│   │   ├── assets/              # 이미지, 정답 데이터, 스타일
│   │   ├── utils/               # axios, localStorage 등 유틸
│   │   └── App.js / index.js    # 진입점 및 라우팅
│   └── public/
├── controllers/                 # API 핸들러 (auth, teams)
├── routes/                      # 라우팅 설정
├── models/                      # Mongoose 모델 (Admin, Team, Player)
├── middleware/                  # 인증 / 에러 처리 미들웨어
├── errors/                      # 커스텀 에러 클래스
├── db/connect.js                # MongoDB 연결 함수
└── app.js                       # Express 앱 진입점

```

---

## 🔐 인증 및 사용자 관리

- 관리자와 플레이어를 구분하여 각각 별도의 로그인/회원가입 API 제공
- JWT 기반 인증 토큰 발급 및 검증
- 플레이어는 팀 이름 기반 인증, 관리자만 대시보드 접근 가능

---

## ✅ 정답 채점 로직

- 객관식: 선택값과 정답(`Answers.js`)을 비교하여 정답 여부 판단
- 주관식: 배열 형태로 모든 항목 정답과 비교
- 채점 결과에 따라 `"correct"` / `"wrong"` 상태 저장
- 팀은 퀴즈당 1회만 제출 가능 (중복 제출 차단)

---

## 📋 주요 파일 설명

### 📌 `client/src/features/admin/adminSlice.js`

- 관리자 로그인/등록/로그아웃 관리
- `createAsyncThunk`로 API 연동
- `localStorage`를 통한 상태 유지

### 📌 `client/src/pages/quiz/Quiz.js`

- 퀴즈 풀이 및 제출 페이지
- `quizNum`을 기준으로 객관식/주관식 분기 처리
- 제출 전 확인 모달 표시 (`modalSlice` 활용)

### 📌 `controllers/auth.js`

- 관리자와 플레이어 각각의 로그인/회원가입 처리
- 비밀번호 암호화 및 비교, JWT 생성 포함

### 📌 `controllers/teams.js`

- 팀 응답 등록, 수정, 단일 조회, 전체 조회 API 제공
- `getAllTeams`에 검색/필터/정렬/페이지네이션 포함

---

## 🔍 개선 여지 및 추후 기능 (미정)

| 항목        | 제안                                    |
| ----------- | --------------------------------------- |
| 정답 검증   | 클라이언트 → 서버 이전 필요 (보안 향상) |
| 관리자 기능 | 수동 점수 조정, 팀 등록/삭제 UI 확장    |
| 대시보드    | Chart.js 기반 통계 시각화               |
