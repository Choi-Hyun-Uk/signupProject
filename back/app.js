const express = require('express');
const session = require('express-session');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const passportConfig = require('./passport');
const passport = require('passport');

// 제작한 모델 불러오기
const { sequelize } = require('./models/index');
// 라우터 불러오기
const pageRouter = require('./routes/page');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

// process.env 의 secret 연결
dotenv.config();
const app = express();
sequelize.sync({ force: false })
.then(() => {
    console.log('데이터베이스 연결 성공');
})
.catch((err) => {
    console.error(err);
})

passportConfig(); // passport 내부 js 모듈 실행
app.set('port', process.env.PORT || 3051);

app.use(morgan('dev'));


// req.body에서 바로 꺼내서 데이터를 확인할 수 있다. (필수 장착)
// json - 클라이언트에서 받은 데이터를 json으로 보내줄 경우 json으로 파싱해서 req.body로 데이터를 넣어준다.
app.use(express.json());
// urlencoded - 클라이언트에서 form submit으로 보낼 때 form parsing을 받을 때 쓰인다.
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000', // '*' 모든 URL에서 접근 가능 / 단 아래 속성 true일 경우는 주소로 적어야한다.(보안강화)
    credentials: true, // front, back 간 쿠키 공유
}));

// 로그인 시 아래 4개의 미들웨어 필요
app.use(cookieParser(process.env.COOKIE_SECRET));
// session 불러오기 : 요청 시 개인의 저장공간을 만들어준다.
app.use(session({
    resave: false, // false 고정
    saveUninitialized: false, // false 고정
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true, // 항상 true(자바스크립트로 진입 불가)
    },
    name: "chu_login",// name의 기본값 - connect_sid
}));
app.use(passport.initialize());
app.use(passport.session());

// req.cookies;
// res.cookie('name', encodeURIComponent('name'), {
//     expires: new Date(),
//     httpOnly: true,
//     path: '/',
// });
// res.clearCookie('name', encodeURIComponent('name'), {
//     httpOnly: true,
//     path: '/',
// });
// req.session.id = 'hello';

app.use('/', pageRouter); // /
app.use('/user', userRouter); // /user
app.use('/auth', authRouter); // /auth

// 404 처리 미들웨어
app.use((req, res, next) => {
    console.log('404 에러');
    res.status(404).send('Not Found');
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.message);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트애서 대기중');
});