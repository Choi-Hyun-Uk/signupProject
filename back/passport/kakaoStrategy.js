const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

// 카카옥 로그인 전략
module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: 'http://localhost:3051/ouath',
    }, async (accessToken, refreshToken, profile, done) => {
        // accessToken, refreshToken - OAUTH2 를 공부해야한다.
        console.log('kakao profile', profile);
        try {
            const exUser = await User.findOne({ // 카카오 가입자 찾기.
                where: { snsId: profile.id, provider: 'kakao'},
            });
            if (exUser) { // 가입자 있으면? 로그인 성공
                done(null, exUser);
            } else { // 없으면? 생성 후 로그인 시키기
                const newUser = await User.create({
                    // id - Number이며, 사용자의 kakao id
                    // _json - 사용자 정보 조회로 얻은 json 원본 데이터
                    email: profile._json && profile._json.kakao_account.email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        } catch(error) {
            console.error(error);
            done(error);
        }
    }));
}