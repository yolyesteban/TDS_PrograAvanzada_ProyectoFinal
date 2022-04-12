const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'yoly',
    password: 'galileo',
    database: 'supermarket'
})

var ventana
function createWindow() {
    ventana = new BrowserWindow({
        width: 700,
        height: 650,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })

    ventana.loadFile('principal.html')
}

app.whenReady().then(createWindow)


ipcMain.on('ventanaPrincipal', (event, args) => {
    ventana.loadFile('principal.html')
})

ipcMain.on('verificarUsuario', (event, args) => {

    connection.promise().execute('select codigo_login, password, codigo_empleado from login where codigo_login = ? AND password = md5(?) ', args)
        .then(([results, fields]) => {
            ventana.webContents.send('retornarUsuario', results)            
        })

})

ipcMain.on('ventanaMostrarProductos', (event, args) => {
    ventana.loadFile('pages/Productos.html')
})

ipcMain.on('generarProductos', (event, args) => {

    let query = `select pro.codigo_producto,
    pro.nombre,
    pro.descripcion,
    pro.categoria,
    case when pe.cantped is not null then concat(pro.stock,'(', pe.cantped, ')') else pro.stock end as stock
    from producto pro
    left join (
        select codigo_producto, sum(cantidad) as cantped from pedido 
    ) pe on pro.codigo_producto = pe.codigo_producto`

    connection.promise().execute(query)
        .then(([results, fields]) => {
            ventana.webContents.send('obtenerProductos', results);
        })

})

ipcMain.on('ventanaEditarProducto', (event, args) => {
    ventana.loadFile('pages/EditarProducto.html', {query: {"codigo_producto" : args[0]}})
})

ipcMain.on('generarProducto', (event, args) => {

    connection.promise().execute('SELECT * FROM producto WHERE codigo_producto = ?', args)
        .then(([results, fields]) => {
            ventana.webContents.send('obtenerProducto', results);
        })

})

ipcMain.on('generarNombreProducto', (event, args) => {

    connection.promise().execute('SELECT nombre FROM producto WHERE codigo_producto = ?', args)
        .then(([results, fields]) => {
            ventana.webContents.send('obtenerNombreProducto', results);
        })

})

ipcMain.on('guardarCambiosProducto', (event, args) => {
    connection.query(
        "UPDATE producto SET nombre = ?, descripcion = ?, categoria = ?, stock = ? WHERE codigo_producto = ?",
        args,
    )    
})

ipcMain.on('ventanaMostrarPedidos', (event, args) => {
    ventana.loadFile('pages/Pedidos.html')
})

ipcMain.on('ventanaCrearPedido', (event, args) => {
    ventana.loadFile('pages/RealizarPedido.html',   {query: {"codigo_producto" : args[0]}})
})

ipcMain.on('existePedido', (event, args) => {
    
    connection.promise().execute('select count(*) pedido from pedido where codigo_producto = ? and codigo_proveedor = ?', args)
        .then(([results, fields]) => {
            ventana.webContents.send('obtenerExistePedido', results);
        })

})

ipcMain.on('generarPedidos', (event, args) => {

    let query = `select pe.codigo_pedido, 
        prod.nombre as producto, 
        prov.nombre as proveedor,
        concat(emp.nombres , ' ' , emp.apellidos) as usuario,
        pe.cantidad,
        pe.fecha_pedido
    from pedido pe
    inner join producto prod
        on pe.codigo_producto = prod.codigo_producto
    inner join proveedor prov 
        on pe.codigo_proveedor = prov.codigo_proveedor
    inner join empleado emp
        on pe.codigo_empleado = emp.codigo_empleado`

    connection.promise().execute(query)
        .then(([results, fields]) => {
            ventana.webContents.send('obtenerPedidos', results);
        })

})

ipcMain.on('generarProveedor', (event, args) => {

    connection.promise().execute('select codigo_proveedor, nombre from proveedor order by nombre ASC')
        .then(([results, fields]) => {
            ventana.webContents.send('obtenerProveedor', results);
        })

})

ipcMain.on('crearPedido', (event, args) => {
    connection.query(
        'INSERT INTO pedido(cantidad, fecha_pedido, codigo_producto, codigo_proveedor, codigo_empleado) VALUES(?, NOW(), ?,?,1)',
        args,
    )
    ventana.loadFile('productos.html')
})