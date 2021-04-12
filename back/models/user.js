const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            nick: {
                type: Sequelize.STRING(50),
                allowNull: false, // 필수 아님
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: true,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: { // 어디서 가입했는지에 대한 출처
                type: Sequelize.STRING(50),
                allowNull: false,
                defaultValue: 'local', // 기본은 local, 공식사이트에서 가입
            },
            snsId: { // sns 가입 시 ID 저장
                type: Sequelize.STRING(50),
                allowNull: true,
            },
        },{
            sequelize,
            timestamps: true, // createAt, updateAt 자동 생성
            underscored: false, // sequelize에서 _ 사용할지 말지 ex) createAt -> create_at
            paranoid: true, // deleteAt을 생성 (삭제한 날짜)
            modelName: 'User', // modelName - javascript에서 쓰인다.
            tableName: 'users', // tableName - SQL에서 쓰이며, modelName의 소문자로 하고, 복수형으로 짓는다.
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};