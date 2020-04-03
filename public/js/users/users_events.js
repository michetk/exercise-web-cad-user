$(() => {
    let $inputs = $('.form')
    let $inputEmail = $('input[name="email"]')
    let $inputPassword = $('input[name="password"]')
    let $inputConfirmPassword = $('input[name="confirmpassword"]')

    $inputEmail.on('blur', (e) => {
        if ($inputEmail.val() == '') {
            insertInvalidFeedback($inputEmail, 'Insira um e-mail!')
        } else {
            removeInvalidFeedback($inputEmail)
            insertValidFeedback($inputEmail)
        }
    })

    $inputPassword.on('blur', (e) => {
        if ($inputPassword.val() == '') {
            insertInvalidFeedback($inputPassword, 'Insira uma senha!')
        } else {
            removeInvalidFeedback($inputPassword)
            insertValidFeedback($inputPassword)
        }
    })

    $inputConfirmPassword.on('blur', (e) => {
        if ($inputConfirmPassword.val() == '') {
            insertInvalidFeedback($inputConfirmPassword, 'Confirme a senha!')
        } else {
            removeInvalidFeedback($inputConfirmPassword)
            insertValidFeedback($inputConfirmPassword)
        }
    })

})


// funções
function insertInvalidFeedback($objJq, msg) {
    $objJq.addClass('is-invalid')
    $objJq.next('.invalid-feedback').text(msg)
}

function removeInvalidFeedback($objJq) {
    $objJq.removeClass('is-invalid')
    $objJq.next('.invalid-feedback').text('')
}

function insertValidFeedback($objJq) {
    $objJq.addClass('is-valid')
}