var formulario = document.getElementById('formulario')

formulario.addEventListener('submit', event => {
    event.preventDefault()

    var username = document.getElementById('user')
    var password = document.getElementById('pass')
    var notificar = document.getElementById('notificar')

    window.comunicacion.verificarUsuario([username.value, password.value]);

    window.comunicacion.retornarUsuario(function (event, results) {
        if (results.length > 0) {                        
            if (results[0].codigo_login == username.value) {
                window.comunicacion.ventanaMostrarProductos();
            } else {
                notificar.innerText = 'Usuario y/o contraseña no válidos.'
            }
        } else {
            notificar.innerText = 'Usuario y/o contraseña no válidos.'
        }
    })
})