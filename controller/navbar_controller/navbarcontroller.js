function navBarMiddle(req) {
    if (req.session.user == undefined) {
        return true
    } else {
        return false
    }
}

module.exports = navBarMiddle