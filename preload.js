const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
    'comunicacion',
    {
        ventanaPrincipal: (datos) => ipcRenderer.send('ventanaPrincipal', datos),
        verificarUsuario: (datos) => ipcRenderer.send('verificarUsuario', datos),
        retornarUsuario: (callback) => ipcRenderer.on('retornarUsuario', callback),

        ventanaMostrarProductos: (datos) => ipcRenderer.send('ventanaMostrarProductos', datos),
        ventanaMostrarPedidos: (datos) => ipcRenderer.send('ventanaMostrarPedidos', datos),
        ventanaEditarProducto: (datos) => ipcRenderer.send('ventanaEditarProducto', datos),
        
        generarProductos: (datos) => ipcRenderer.send('generarProductos', datos),
        obtenerProductos: (callback) => ipcRenderer.on('obtenerProductos', callback),

        generarProducto: (datos) => ipcRenderer.send('generarProducto', datos),
        obtenerProducto: (callback) => ipcRenderer.on('obtenerProducto', callback),
        generarNombreProducto: (datos) => ipcRenderer.send('generarNombreProducto', datos),
        obtenerNombreProducto: (callback) => ipcRenderer.on('obtenerNombreProducto', callback),
        guardarCambiosProducto: (datos) => ipcRenderer.send('guardarCambiosProducto', datos),

        generarProveedor: (datos) => ipcRenderer.send('generarProveedor', datos),
        obtenerProveedor: (callback) => ipcRenderer.on('obtenerProveedor', callback),

        ventanaCrearPedido: (datos) => ipcRenderer.send('ventanaCrearPedido', datos),
        crearPedido: (datos) => ipcRenderer.send('crearPedido', datos),
        generarPedidos: (datos) => ipcRenderer.send('generarPedidos', datos),
        obtenerPedidos: (callback) => ipcRenderer.on('obtenerPedidos', callback),
        existePedido: (datos) => ipcRenderer.send('existePedido', datos),
        obtenerExistePedido: (callback) => ipcRenderer.on('obtenerExistePedido', callback),

    }
)