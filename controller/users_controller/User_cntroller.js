const express = require('express')
const router = express.Router()
const User = require('../users_controller/User')
const bcrypt = require('bcryptjs')
const adminAuth = require('../../middlewares/adminauth')
const navBar = require('../../controller/navbar_controller/navbarcontroller')

router.get('/users/cad', (req, res) => {
    res.render('users/users_cad', {logout: navBar(req)})
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
                User.findOne({
                    where: {
                        email: email
                    }
                }).then(user => {
                    if (!user) {
                        User.create({
                            email: email,
                            password: hash
                        })
                        req.flash('success_msg', 'Usuário cadastrado com sucesso!')
                        res.redirect('/')
                    } else {
                        req.flash('error_msg', 'Usuário já está cadastrado!')
                        res.redirect('/users/cad')
                    }
                })
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
    res.render('users/users_login', {logout: navBar(req)})
})

router.post('/admin/login/into', (req, res) => {
    let email = req.body.email
    let password = req.body.password

    cont = false
    if (!email || email == typeof undefined || email == null) {
        func.msgInvalid.msgFeedback(req, 'feedbackEmail', 'attrClassEmail', 'Houve um erro, verifique os campos em vermelho!', 'Campo e-mail ficou fazio!')
    }
    if (!password || password == typeof undefined || password == null) {
        func.msgInvalid.msgFeedback(req, 'feedbackPassword', 'attrClassPassword', 'Houve um erro, verifique os campos em vermelho!', 'Campo senha ficou fazio!')
    }
    if (cont) {
        res.redirect('/admin/login')
    } else {
        User.findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            if (user) {
                let compare = bcrypt.compareSync(password, user.password)
                if(compare) {
                    req.session.user = {
                        id: user.id,
                        email: user.email
                    }
                    res.redirect('/admin/users')
                } else {
                    req.flash('error_msg', 'Senha inválida!')
                    res.redirect('/admin/login')
                }
            } else {
                req.flash('error_msg', 'Usuário não encontrado!')
                res.redirect('/admin/login')
            }
        })
        .catch(err => {
            req.flash('error_msg', 'Usuário não encontrado!')
            res.redirect('/admin/login')
        })
    }


})

router.get('/logout', (req, res) => {
    req.session.user = undefined
    res.redirect('/')
})

router.get('/admin/edit/:id', adminAuth, (req, res) => {
    let id = req.params.id
    User.findByPk(id)
        .then(user => {
            if (user && !isNaN(id)) {
                res.render('users/users_edit', {
                    user: user,
                    logout: navBar(req)
                })
            } else {
                req.flash('error_msg', 'Usuário não encontrado')
                res.redirect('/admin/users')
            }
        })
        .catch(err => {
            req.flash('error_msg', 'Erro intetno!')
            res.redirect('/admin/users')
        })
})

router.post('/admin/edited', adminAuth, (req, res) => {
    let id = req.body.id
    let password = req.body.password
    let newpassword = req.body.newpassword
    let confirmpassword = req.body.confirmpassword

    if (newpassword == confirmpassword) {
        cont = false
        if (!password || password == typeof undefined || password == null) {
            func.msgInvalid.msgFeedback(req, 'feedbackPassword', 'attrClassPassword', 'Houve um erro, verifique os campos em vermelho!', 'Campo senha ficou fazio!')
        }
        if (!newpassword || newpassword == typeof undefined || newpassword == null) {
            func.msgInvalid.msgFeedback(req, 'feedbackConfirmPassword', 'attrClassPassword', 'Houve um erro, verifique os campos em vermelho!', 'Campo nova senha ficou fazio!')
        }
        if (!confirmpassword || confirmpassword == typeof undefined || confirmpassword == null) {
            func.msgInvalid.msgFeedback(req, 'feedbackConfirmPassword', 'attrClassPassword', 'Houve um erro, verifique os campos em vermelho!', 'Campo confirma senha ficou fazio!')
        }
        if (cont) {
            res.redirect('/admin/edit/' + id)
        } else {
            User.findByPk(id)
                .then(user => {
                    if (user && !isNaN(id)) {
                        let compare = bcrypt.compareSync(password, user.password)
                        if (compare) {
                            let salt = bcrypt.genSaltSync(10)
                            let hash = bcrypt.hashSync(newpassword, salt)
                            User.update({
                                    password: hash
                                }, {
                                    where: {
                                        id: id
                                    }
                                })
                                .then(() => {
                                    req.flash('success_msg', 'Senha alterada com sucess!')
                                    res.redirect('/')
                                })
                                .catch(err => {
                                    req.flash('error_msg', 'Erro interno!')
                                    res.redirect('/admin/edit/' + id)
                                })
                        } else {
                            req.flash('error_msg', 'Senha não confere!')
                            res.redirect('/admin/edit/' + id)
                        }
                    } else {
                        req.flash('error_msg', 'Usuário não encontrado!')
                        res.redirect('/admin/edit/' + id)
                    }
                })
                .catch(err => {
                    req.flash('error_msg', 'Erro interno!')
                    res.redirect('/admin/edit/' + id)
                })
        }
    } else {
        func.msgInvalid.msgFeedback(req, 'feedbackPassword', 'attrClassPassword', 'Senhas não são iguais!', '')
        res.redirect('/admin/edit/' + id)
    }


})

router.post('/admin/delete', adminAuth, (req, res) => {
    let id = req.body.id
    if (id && !isNaN(id)) {
        User.destroy({
                where: {
                    id: id
                }
            })
            .then(() => {
                req.flash('success_msg', 'Usuário deletado!')
                res.redirect('/admin/users')
            })
            .catch(err => {
                req.flash('error_msg', 'Erro interno!')
                res.redirect('/admin/users')
            })
    } else {
        req.flash('error_msg', 'Usuário não encontrado!')
        res.redirect('/admin/users')
    }
})

router.get('/admin/users', adminAuth, (req, res) => {
    User.findAll()
        .then(users => {
            if (users) {
                res.render('users/users', {
                    users: users,
                    msg: 'Não existe usuário cadastrado',
                    logout: navBar(req)
                })
            } else {
                req.flash('error_msg', 'Erro interno!')
                res.redirect('/')
            }
        })
        .catch(err => {
            req.flash('error_msg', 'Erro interno!')
            res.redirect('/')
        })
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