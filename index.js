const express = require('express')
const app = express()
const ejs = require('ejs')
const connection = require('./controller/database/db')
const User = require('./controller/users_controller/User')
const UsersController = require('./controller/users_controller/User_cntroller')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')

// session
app.use(session({
    secret: Math.sqrt(9 * 5 + 4 * 3) + 'mmddfdDDOI',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 80000000
    }
}))
app.use(flash())

// middleware
app.use((req, res, next) => {
    res.locals.cont
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.feedbackEmail = req.flash('feedbackEmail')
    res.locals.feedbackPassword = req.flash('feedbackPassword')
    res.locals.feedbackConfirmPassword = req.flash('feedbackConfirmPassword')
    res.locals.attrClassEmail = req.flash('attrClassEmail')
    res.locals.attrClassPassword = req.flash('attrClassPassword')
    //res.locals.attrClassConfirmPassword = req.flash('attrClassConfirmPassword')
    next()
})

// body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ejs engine
app.set('view engine', 'ejs')

// path public
app.use(express.static('public'))

// rotas
app.use('/', UsersController)

app.get('/', (req, res) => {
    res.render('index')
})


// database
connection.authenticate().then(() => {
    console.log('DATABASE CONECTADO COM SUCESSO!')
}).catch((err) => {
    console.log('FALHA AO CONECTAR DATABASE!: ' + err)
})

// servidor
app.listen(8081, (err) => {
    if (!err) {
        console.log('SERVIDOR CONECTADO COM SUCESSO!')
    } else {
        console.log('FALHA AO CONECTAR SERVIDOR!')
    }
})