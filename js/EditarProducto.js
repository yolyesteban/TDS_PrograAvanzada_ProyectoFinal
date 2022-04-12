let codigo_producto = document.getElementById('codigo-producto')
let nombre_producto = document.getElementById('nombre')
let descripcion_producto = document.getElementById('descripcion')
let categoria_producto = document.getElementById('categoria')
let stock_producto = document.getElementById('stock')

document.addEventListener('DOMContentLoaded', function (event) {

    const qs = window.location.search.split('codigo_producto=')[1]

    if (qs != undefined && qs != '') {
        window.comunicacion.generarProducto([qs])

        window.comunicacion.obtenerProducto(function (event, results){
            results.map((row) => {
                codigo_producto.value = row.codigo_producto
                nombre_producto.value = row.nombre
                descripcion_producto.value = row.descripcion 
                categoria_producto.value = row.categoria
                stock_producto.value = row.stock
            })
        })
    } else {
        window.comunicacion.ventanaMostrarProductos();
    }
    
})

var formulario = document.getElementById('formulario')

formulario.addEventListener('submit', event => {
    event.preventDefault()
    window.comunicacion.guardarCambiosProducto([nombre_producto.value, descripcion_producto.value, categoria_producto.value, stock_producto.value, codigo_producto.value])    
    window.comunicacion.ventanaMostrarProductos();
})

var mostrarProductos = document.getElementById('mostrar-productos')
mostrarProductos.addEventListener('click', function () {
    window.comunicacion.ventanaMostrarProductos();
})