# database_project3

### 2021-2 광운대학교 데이터베이스및데이터시각화 Team 15

- 송현우 (조장)
- 오형근
- 양성진

### 개발환경
- react
- nodejs
- mysql

### 실행 방법
- 각 폴더에서 npm install 실행

  - `cd ammonite`, `npm install`
  - `cd server`, `npm install`

- server 폴더에 `.env` file 생성하기
  ```env
  // 예시
  SECRET_KEY = "asjdklSDFJKEArasdf-0fsakjdfSDFJ"
  DB_HOST = '127.0.0.1'
  DB_USER = 'admin'
  DB_PASSWORD = 'admin'
  DB_NAME = 'test_database'

- 각 폴더에서 프로젝트 시작
  - `cd ammonite`, `npm start`
  - `cd server`, `nodemon server.js`
