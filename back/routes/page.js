const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

// GET /
router.get('/', (req, res) => {
    res.send('hello~ express');
});

// 회원가입 
// POST /signup
router.post('/signup', isNotLoggedIn, async (req, res, next) => { // POST /signup/
    try {
        const exEmail = await User.findOne({ // 이메일 검사
            where: {
                email: req.body.email,
            }
        });
        const exNickname = await User.findOne({ // 이메일 검사
            where: {
                nick: req.body.nickname,
            }
        });
        if (exEmail) { // 이메일 검사 후 이메일이 기존에 있다면?
            // return으로 res(응답)을 한번만 보내도록 한다. 응답 후 router 종료된다.
            return res.status(403).send('이미 사용중인 이메일입니다.');
        }
        if (exNickname) { // 이메일 검사 후 닉네임이 기존에 있다면?
            return res.status(403).send('이미 사용중인 닉네임입니다.');
        }
        // 비밀번호 해쉬화하기
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        // User 테이블에 생성하기
        await User.create({
            nick: req.body.nickname,
            email : req.body.email,
            password: hashedPassword,
        });
        // 요청에 대한 성공으로 status(201) : 생성이 됐다는 의미 (기재하는게 좋다.)
        res.status(201).send('create User!');
    } catch(err) {
        console.error(err);
        next(err); // status(500) - 서버에러
    }
});

// 로그인
// 미들웨어 확장법 (req, res, next를 사용하기 위해서)
// passport index.js에서 전달되는 done의 세가지 인자를 받는다.
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { // 서버 에러
            console.error(err);
            return next(err);
        }
        if (info) { // 클라이언트 에러 (비밀번호가 틀렸거나, 계정이 없거나), info.reason에 에러 내용이 있음.
            res.status(403).send(info.reason);
        }
        // req.login하면 serializeUser 실행
        // 아래는 passport에서 serializeUser 통과 후  if문부터 실행
        return req.login(user, async (loginErr) => {
            if (loginErr) {
                console.error(loginErr);
                return next(loginErr);
            }
            // 비밀번호를 제외한 모든 정보 가져오기
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ['password'], // exclude: 제외한 나머지 정보 가져오기
                },
            });
            // 세션쿠키와 json 데이터를 브라우저로 보내준다.
            return res.status(200).json(fullUserWithoutPassword);
        });
    })(req, res, next);
});

// 로그아웃
// POST /logout/
router.post('/logout', isLoggedIn, (req, res) => {
    req.logOut();
    req.session.destroy();
    res.send('로그아웃');
});

// 카카오 개발 앱 설정 중 Redirect URI에 적는 주소
// GET /ouath
// 카카오 로그인 페이지에서 로그인 후 아래에서 카카오 Strategy가 실행되며, kakao.js 모듈 실행
router.get('/ouath', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('http://localhost:3000');
});

module.exports = router;