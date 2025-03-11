# Wavedeck Backend API

- Node.js 18.17 + Express.js 4.15.2
- MySQL 8.0 + Sequelize

## 웹서버 실행

1. 환경변수 설정: ./env/.production.env

```
  # 앱 설정
  PORT=
  NODE_ENV=

  # 데이터베이스 설정
  DB_HOST=
  DB_PORT=
  DB_USERNAME=
  DB_PASSWORD=
  DB_DATABASE=
  DB_SYNC=true

  # MySQL 설정
  MYSQL_ROOT_PASSWORD=
  MYSQL_DATABASE=
```

2. 컨테이너 실행

```
NODE_ENV=production docker-compose up
```
