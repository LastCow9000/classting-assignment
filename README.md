# 클래스팅 백엔드 과제

## 실행 방법

1. github repositoy를 clone 합니다.

```bash
$ git clone https://github.com/LastCow9000/classting-assignment.git
```

2. 루트 디렉토리에서 .env파일을 생성하고 아래와 같이 작성합니다.

```bash
# .env
PORT=3000
DB_USERNAME=classting
DB_PASSWORD=112233
DB_DATABASE=classting
JWT_SECRET=kimchi
```

3. docker로 mysql을 설치 및 실행합니다.

```bash
$ docker-compose up -d
```

4. 패키지 설치 후 빌드 및 프로젝트를 실행합니다.

```bash
$ npm install

$ npm run build

$ npm run start:prod
# 또는
$ npm run start:dev
```

5. Api 문서 확인을 위해 아래 주소에 접속합니다.

```
http://localhost:3000/api
```

6. Postman으로 api를 확인합니다.

- 관리자 or 학생 권한이 필요한 api는 user 생성 및 로그인 후 발급되는 토큰을 `Authorization` haeder에 `Bearer {{Token}}`형식으로 넣고 api 요청을 해야 합니다.
- 인가 문제로 swagger에서는 test가 불가능합니다.
