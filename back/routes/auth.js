const express = require('express');
const passport = require('passport');

const router = express.Router();

// 카카오 로그인하기
// GET /auth/kakao/
// 최초 카카오 Strategy가 실행되면, 카카오 로그인부터 시작을 해야하고, 카카오 로그인 페이지에서 로그인하면 콜백URI로 이동을 한다.
router.get('/kakao', passport.authenticate('kakao', {
    failureRedirect: '/',
}));

// 구글 로그인하기
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email']}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('http://localhost:3000/');
});


module.exports = router;