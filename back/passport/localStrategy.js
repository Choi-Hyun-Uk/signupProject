const passport = require('passport');
const bcrypt = require('bcrypt');
// Strategy -> LocalStrategy로 이름 변경
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models');

// local 로그인 전략
// done : 첫번째인자 - 서버 에러 / 두번째인자 - 응답 실패,성공 유무 / 세번째인자 - 실패 시 나타낼 문구(reason: XXXX);
module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email', // req.body.email 라고 명시적으로 알려줌 (정확한 명을 넣어야한다.)
        passwordField: 'password'
    }, async (email, password, done) => { // 함수가 추가된다.
        try {
            const user = await User.findOne({ // 로그인 시도에서 이메일 있는 조건으로 찾아보기.
                where: { email }
            });
            if (!user) {
                // passport에서는 res로 응답이 아닌, 우선 done으로 처리를 한다.
                return done(null, false, { reason: '이메일이 일치하지 않습니다.'});
            }
            // 비밀번호 비교 체크
            // 첫번째 인자 password : 사용자가 입력한 비밀번호
            // 두번째 인자 user.password : 실제 DB에 있는 비밀번호
            const result = await bcrypt.compare(password, user.password);
            if (result) { // 비밀번호 일치할 경우
                return done(null, user); // 두번째 user는 성공의 의미
            }
            // 비밀번호 일치하지 않을 경우
            return done(null, false, { reason: '비밀번호가 일치하지 않습니다.' });
        } catch (err) {
            console.error(err);
            return done(err); // done의 첫번째 인자는 서버 에러시 넣는다.
        }
    }));

};