
let codigo_producto = document.getElementById('codigo-producto')
let nombre_producto = document.getElementById('nombre')
let proveedor_pedido = document.getElementById('proveedor')
let categoria_pedido = document.getElementById('categoria')
let cantidad_pedido = document.getElementById('cantidad')
let notify = document.getElementById('notify')

document.addEventListener('DOMContentLoaded', function (event) {

    window.comunicacion.generarProveedor()
    window.comunicacion.obtenerProveedor(function (event, results) {
        var option = ''
        results.map((row) => {
            option += `<option value="${row.codigo_proveedor}" >${row.nombre}</option>`
        })
        document.querySelector('#proveedor').innerHTML = option
    })


    const qs = window.location.search.split('codigo_producto=')[1]

    if (qs != undefined && qs != '') {
        codigo_producto.value = qs

        window.comunicacion.generarNombreProducto([qs])
        window.comunicacion.obtenerNombreProducto(function (event, results) {
            results.map((row) => {
                nombre_producto.value = row.nombre
            })
        })
    } else {
        window.comunicacion.ventanaMostrarProductos();
    }
})

var formulario = document.getElementById('formulario')

formulario.addEventListener('submit', event => {
    event.preventDefault()
    notify.innerText = ''


    window.comunicacion.crearPedido([cantidad_pedido.value, codigo_producto.value, proveedor_pedido.value])
    window.comunicacion.ventanaMostrarProductos()

    // window.comunicacion.existePedido([codigo_producto.value, proveedor_pedido.value])
    // window.comunicacion.obtenerExistePedido(function (event, results) {
    //     console.log('result existe p ', results[0].pedido)

    //     bool = (results[0].pedido == 0)
    //     if(results[0].pedido == 0){
    //         console.log('entroo ifff')

    //     }else{
    //         //error
    //         notify.innerText = 'El producto ya tiene un pedido con el mismo proveedor, escoja otro'

    //     }
    // })



})

var mostrarProductos = document.getElementById('mostrar-productos')
mostrarProductos.addEventListener('click', function () {
    window.comunicacion.ventanaMostrarProductos();
})