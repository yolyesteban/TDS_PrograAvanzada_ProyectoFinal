
document.addEventListener('DOMContentLoaded', function (event) {

    window.comunicacion.generarProductos()
    window.comunicacion.obtenerProductos(function (event, results) {

        var body = ''
        results.map((row) => {
            body += '<tr>'
            body += '<td>'
            body += row.codigo_producto
            body += '</td>'
            body += '<td>'
            body += row.nombre
            body += '</td>'
            body += '<td>'
            body += row.descripcion
            body += '</td>'
            body += '<td>'
            body += row.categoria
            body += '</td>'
            body += '<td>'
            body += row.stock
            body += '</td>'
            body += '<td>'
            body += `<button class='btn btn-primary ' onclick='EditarProducto(${row.codigo_producto})' >Editar</button>`
            body += '<br />'
            body += `<button class='btn btn-primary' onclick='RealizarPedido(${row.codigo_producto})' >Pedido</button>`
            body += '</td>'
            body += '</tr>'
        })


        document.querySelector('#table > tbody').innerHTML = body
    })
})

function EditarProducto(codigoProducto) {
    console.log('producto cod ', codigoProducto)
    //window.location.href = 'EditarProducto.html'
    window.comunicacion.ventanaEditarProducto([codigoProducto])
}

function RealizarPedido(codigoProducto) {
    console.log('pedido cod ', codigoProducto)
    //window.location.href = 'RealizarPedido.html'
    window.comunicacion.ventanaCrearPedido([codigoProducto])
}

let pedidos = document.getElementById('pedidos')
pedidos.addEventListener('click', function () {
    window.comunicacion.ventanaMostrarPedidos();
})

let logOut = document.getElementById('logout')
logOut.addEventListener('click', function () {
    window.comunicacion.ventanaPrincipal();
})