$(() => {
    // mensagens de erro no formulário
    let $inputEmail = $('input#email')
    let $inputPassword = $('input#password')
    let $inputConfirmPassword = $('input#confirmpassword')
    let $inputNewPassword = $('input#newpassword')

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

    $inputNewPassword.on('blur', (e) => {
        if ($inputNewPassword.val() == '') {
            insertInvalidFeedback($inputNewPassword, 'Insira uma senha!')
        } else {
            removeInvalidFeedback($inputNewPassword)
            insertValidFeedback($inputNewPassword)
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

    // mensagem de alerta no botão deletar
    let $btndelete = $('form button#btndelete')
    $btndelete.on('click', (e) => {
        let cfm = confirm('Deseja deletar esse usuário?')
        if (cfm) {

        } else {
            e.preventDefault()
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