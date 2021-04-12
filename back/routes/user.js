const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

// 로그인 사용자 정보 가져오기 (계속 로그인 상태를 만들기 위한)
// GET /user
router.get('/', isLoggedIn, async (req, res, next) => {
    try {
        if (req.user) { // req.user에는 로그인한 user 정보가 있다.
            const user = await User.findOne({
                where: { id: req.user.id } 
            });
            // 비밀번호를 제외한 모든 정보 가져오기
            const fullUserWithoutPassword = await User.findOne({
                where: { id: user.id },
                attributes: {
                    exclude: ['password'], // exclude: 제외한 나머지 정보 가져오기
                },
            });
            res.status(200).json(fullUserWithoutPassword);
        } else {
            res.status(200).json(null);
        }
    } catch(error) {
        console.error(error);
        next(error);
    }
});

/*
#1 매개변수 라우터 진행 시
router.get('/:id', (req, res) => {
    // params에서 매개변수를 확인 가능하다.
    console.log(req.params.id)
});

#2 쿼리스트링 라우터 진행 시
router.get('/:id?limit=5&skip=10', (req, res) => {
    // query에서 확인 가능하다.
    console.log(req.query.limit) - 5
    console.log(req.query.skip) - 10
});
*/

module.exports = router;