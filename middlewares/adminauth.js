function adminAuth(req, res, next) {
    if (req.session.user != undefined) {
        next()
    } else {
        req.flash('error_msg', 'Você precisa estar autenticado!')
        res.redirect('/')
    }
}

module.exports = adminAuth