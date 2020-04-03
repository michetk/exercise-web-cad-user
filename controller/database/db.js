let Sequelize = require('sequelize')
let connection = new Sequelize('userslog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection

