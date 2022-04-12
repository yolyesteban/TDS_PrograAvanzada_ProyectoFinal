document.addEventListener('DOMContentLoaded', function (event) {

    window.comunicacion.generarPedidos()
    window.comunicacion.obtenerPedidos(function (event, results) {

        var body = ''
        results.map((row) => {
            body += '<tr>'
            body += '<td>'
            body += row.codigo_pedido
            body += '</td>'
            body += '<td>'
            body += row.producto
            body += '</td>'
            body += '<td>'
            body += row.proveedor
            body += '</td>'
            body += '<td>'
            body += row.usuario
            body += '</td>'
            body += '<td>'
            body += row.cantidad
            body += '</td>'
            body += '<td>'
            body += row.fecha_pedido
            body += '</td>'
            body += '</tr>'
        })


        document.querySelector('#table > tbody').innerHTML = body
    })
})

var mostrarProductos = document.getElementById('mostrar-productos')
mostrarProductos.addEventListener('click', function () {
    window.comunicacion.ventanaMostrarProductos();
})