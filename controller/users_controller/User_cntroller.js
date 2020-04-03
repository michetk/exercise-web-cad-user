const express = require('express')
const router = express.Router()
const User = require('../users_controller/User')
const bcrypt = require('bcryptjs')

router.get('/users/cad', (req, res) => {
    res.render('users/users_cad')
})

router.post('/users/cadsave', (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let confirmpassword = req.body.confirmpassword

    if (password == confirmpassword) {
        cont = false
        if (!email || email == typeof undefined || email == null) {
            func.msgInvalid.msgFeedback(req, 'feedbackEmail', 'attrClassEmail', 'Houve um erro, verifique os campos em vermelho!', 'Campo e-mail ficou fazio!')
        }
        if (!password || password == typeof undefined || password == null) {
            func.msgInvalid.msgFeedback(req, 'feedbackPassword', 'attrClassPassword', 'Houve um erro, verifique os campos em vermelho!', 'Campo senha ficou fazio!')
        }
        if (!confirmpassword || confirmpassword == typeof undefined || confirmpassword == null) {
            func.msgInvalid.msgFeedback(req, 'feedbackConfirmPassword', 'attrClassPassword', 'Houve um erro, verifique os campos em vermelho!', 'Campo confirma senha ficou fazio!')
        }
        if (cont) {
            res.redirect('/users/cad')
        } else {
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(password, salt)
            if (hash) {
                User.create({
                    email: email,
                    password: hash
                })
                req.flash('success_msg', 'Usuário cadastrado com sucesso!')
                res.redirect('/')
            } else {
                req.flash('error_msg', 'Houve um erro ao gerar senha!')
                res.redirect('/users/cad')
            }
        }
    } else {
        func.msgInvalid.msgFeedback(req, 'feedbackPassword', 'attrClassPassword', 'Senhas não são iguais!', '')
        res.redirect('/users/cad')
    }
})

router.get('/admin/login', (req, res) => {
    res.render('users/users_login')
})

router.get('/admin/edit', (req, res) => {
    res.render('users/users_edit')
})

router.get('/admin/users', (req, res) => {
    res.render('users/users')
})



// funções
let func = {

    msgSuccess: {

        msgFeedback: (req, namevar, attrClass, errorMsg, msg) => {
            req.flash('success_msg', '')
            req.flash('success_msg', errorMsg)
            req.flash(attrClass, '')
            req.flash(attrClass, 'is-valid')
            req.flash(namevar, msg)
        }

    },

    msgInvalid: {

        msgFeedback: (req, namevar, attrClass, errorMsg, msg) => {
            cont = true
            req.flash('error_msg', '')
            req.flash('error_msg', errorMsg)
            req.flash(attrClass, '')
            req.flash(attrClass, 'is-invalid')
            req.flash(namevar, msg)
        }

    }

}


module.exports = router