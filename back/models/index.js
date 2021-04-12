const Sequelize = require('sequelize');
const User = require('./user');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

// new Sequelize(..options)로 DB와 연결
// config 파일에 만든 내용
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;

User.init(sequelize);

module.exports = db;