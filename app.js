import express from "express";
import dotenv from "dotenv";
import path from "path";
import nunjucks from "nunjucks";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { sessionMiddleware } from "./middlewares/sessionMiddleware.js";
import { routerMiddleware } from "./middlewares/routerMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { db } from "./models/index.js";
import { BookRouter } from "./src/routers/book.router.js";
import { usersRouter } from "./src/routers/user.router.js";

// 환경변수 세팅
dotenv.config();

// express
const app = express();

// ES6 모듈 __dirname 에러 방지
const __dirname = path.resolve();

// 서버 포트 세팉
app.set("port", process.env.PORT || 3000);

// 템플릿 세팅 미들웨어
app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "views"), {
	express: app,
	watch: true,
});

// DB
db.sequelize.sync()
.then(() => {
	console.log("데이터베이스 연결 성공");
})
.catch((e) => {
	console.log("데이터베이스 연결 실패");
	console.log(e);
});

// middleware
// middleware

app.use(morgan("dev"));

// 정적 파일들을 public이라는 폴더로 접근할수 있게 해주는 미들웨어
app.use(express.static(path.join(__dirname, "public")));

// 요청을 처리할 수 있게 변환해주는 미들웨어
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// 쿠키 처리 미들웨어
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

// api 라우터
app.use("/api", [BookRouter, usersRouter]);

// 라우터 404 에러 방지 미들웨어
app.use(routerMiddleware);

// 에러 핸들링 미들웨어
app.use(errorMiddleware);

const server = app.listen(app.get("port"), () => {
	console.log(app.get("port") + "번 포트에서 서버 실행");
});