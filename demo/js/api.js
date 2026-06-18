var API = (function () {
    var _usuario = null;

    function setUsuario(u) { _usuario = u; }
    function getUsuario() { return _usuario; }

    function cerrarSesion() {
        _usuario = null;
        localStorage.removeItem('demo_usuario');
    }

    function guardarSesion(usuario) {
        localStorage.setItem('demo_usuario', JSON.stringify(usuario));
        _usuario = usuario;
        var recientes = obtenerUsuariosRecientes();
        var filtrado = recientes.filter(function (r) { return r.id !== usuario.id; });
        filtrado.unshift({ id: usuario.id, nombre: usuario.nombre, rol: usuario.rol });
        if (filtrado.length > 5) filtrado = filtrado.slice(0, 5);
        localStorage.setItem('demo_usuariosRecientes', JSON.stringify(filtrado));
    }

    function cargarSesion() {
        var data = localStorage.getItem('demo_usuario');
        if (data) {
            _usuario = JSON.parse(data);
            var recientes = obtenerUsuariosRecientes();
            var filtrado = recientes.filter(function (r) { return r.id !== _usuario.id; });
            filtrado.unshift({ id: _usuario.id, nombre: _usuario.nombre, rol: _usuario.rol });
            if (filtrado.length > 5) filtrado = filtrado.slice(0, 5);
            localStorage.setItem('demo_usuariosRecientes', JSON.stringify(filtrado));
        }
        return _usuario;
    }

    function obtenerUsuariosRecientes() {
        try { return JSON.parse(localStorage.getItem('demo_usuariosRecientes') || '[]'); }
        catch (e) { return []; }
    }

    // ========== LOCAL STORAGE BACKEND ==========

    function _db(key) {
        try { return JSON.parse(localStorage.getItem('demo_' + key) || 'null'); }
        catch (e) { return null; }
    }

    function _save(key, data) {
        localStorage.setItem('demo_' + key, JSON.stringify(data));
    }

    function _ok(data) { return Promise.resolve(data); }

    function _err(msg) { return Promise.reject(new Error(msg)); }

    // ========== ROUTER ==========

    function get(url) {
        url = url.replace('/api/', '');

        if (url === 'health') return _ok({ ok: true, timestamp: new Date() });

        if (url === 'config/estado') {
            var c = _db('config');
            var u = _db('usuarios');
            return _ok({ configurado: !!c, hayUsuarios: !!(u && u.length > 0) });
        }

        if (url === 'config') {
            var cfg = _db('config');
            return _ok(cfg || { nombre: '', rubro: '' });
        }

        if (url === 'permisos') {
            var perms = [
                { clave: 'ver_productos', nombre: 'Ver productos' },
                { clave: 'crear_producto', nombre: 'Crear producto' },
                { clave: 'editar_producto', nombre: 'Editar producto' },
                { clave: 'eliminar_producto', nombre: 'Eliminar producto' },
                { clave: 'registrar_venta', nombre: 'Registrar venta' },
                { clave: 'ver_ventas', nombre: 'Ver historial de ventas' },
                { clave: 'gestionar_usuarios', nombre: 'Gestionar usuarios' },
                { clave: 'ver_resumen', nombre: 'Ver resumen del dia' },
                { clave: 'ver_cajas', nombre: 'Ver cajas' },
                { clave: 'administrar_negocio', nombre: 'Administrar negocio' }
            ];
            return _ok(perms);
        }

        if (url === 'productos') {
            if (!_auth()) return _err('No autenticado');
            return _ok(_db('productos') || []);
        }

        if (url === 'ventas/hoy') {
            if (!_auth()) return _err('No autenticado');
            return _ok(_db('ventas') || []);
        }

        if (url === 'cajas') {
            if (!_auth()) return _err('No autenticado');
            var cajas = _db('cajas') || { efectivo: 0, mercadoPago: 0 };
            return _ok(cajas);
        }

        if (url === 'resumen/hoy') {
            if (!_auth()) return _err('No autenticado');
            var ventas = _db('ventas') || [];
            var totalEfectivo = 0, totalMP = 0, ventaMayor = 0;
            ventas.forEach(function (v) {
                if (v.metodoPago === 'Combinado') {
                    totalEfectivo += v.montoEfectivo || 0;
                    totalMP += v.montoMercadoPago || 0;
                } else if (v.metodoPago === 'efectivo') {
                    totalEfectivo += v.montoTotal;
                } else {
                    totalMP += v.montoTotal;
                }
                if (v.montoTotal > ventaMayor) ventaMayor = v.montoTotal;
            });
            var prods = _db('productos') || [];
            var disponibles = prods.filter(function (p) { return p.cantidadKg > 0; });
            var sinStock = prods.filter(function (p) { return p.cantidadKg <= 0; });
            var bajos = disponibles.filter(function (p) { return p.cantidadKg <= 5; }).map(function (p) { return p.nombre; });
            return _ok({
                totalVentas: ventas.length,
                montoTotal: totalEfectivo + totalMP,
                totalEfectivo: totalEfectivo,
                totalMercadoPago: totalMP,
                productosEnStock: disponibles.length,
                productosSinStock: sinStock.length,
                ventaMayor: ventaMayor,
                productosStockBajo: bajos
            });
        }

        if (url === 'usuarios') {
            if (!_auth()) return _err('No autenticado');
            var users = _db('usuarios') || [];
            return _ok(users.map(function (u) { return { id: u.id, nombre: u.nombre, rol: u.rol }; }));
        }

        // /api/usuarios/{id}/permisos
        var m = url.match(/^usuarios\/(\d+)\/permisos$/);
        if (m) {
            var uid = parseInt(m[1]);
            var us = _db('usuarios') || [];
            var user = us.find(function (u) { return u.id === uid; });
            if (!user) return _err('Usuario no encontrado');
            var perms = [
                { clave: 'ver_productos', nombre: 'Ver productos' },
                { clave: 'crear_producto', nombre: 'Crear producto' },
                { clave: 'editar_producto', nombre: 'Editar producto' },
                { clave: 'eliminar_producto', nombre: 'Eliminar producto' },
                { clave: 'registrar_venta', nombre: 'Registrar venta' },
                { clave: 'ver_ventas', nombre: 'Ver historial de ventas' },
                { clave: 'gestionar_usuarios', nombre: 'Gestionar usuarios' },
                { clave: 'ver_resumen', nombre: 'Ver resumen del dia' },
                { clave: 'ver_cajas', nombre: 'Ver cajas' },
                { clave: 'administrar_negocio', nombre: 'Administrar negocio' }
            ];
            return _ok({ rol: user.rol, permisos: user.permisos || [], todos: perms });
        }

        return _err('Endpoint no encontrado: ' + url);
    }

    function post(url, body) {
        url = url.replace('/api/', '');

        if (url === 'config/setup') {
            var emp = { nombre: body.NombreEmprendimiento, rubro: body.Rubro };
            _save('config', emp);
            var admin = { id: 1, nombre: body.AdminUsuario, passwordHash: _hash(body.AdminPassword), rol: 'Admin', permisos: [] };
            _save('usuarios', [admin]);
            _save('productos', []);
            _save('ventas', []);
            _save('cajas', { efectivo: 0, mercadoPago: 0 });
            return _ok({ mensaje: 'Configuracion completada.', usuario: { id: 1, nombre: admin.nombre, rol: 'Admin' } });
        }

        if (url === 'auth/login') {
            var users = _db('usuarios') || [];
            var user = users.find(function (u) { return u.nombre.toLowerCase() === (body.Usuario || '').toLowerCase(); });
            if (!user || user.passwordHash !== _hash(body.Password || '')) {
                return Promise.reject(new Error('Usuario o contrasenia incorrectos.'));
            }
            return _ok({ id: user.id, nombre: user.nombre, rol: user.rol, permisos: user.permisos || [] });
        }

        if (url === 'productos') {
            if (!_auth()) return _err('No autenticado');
            var prods = _db('productos') || [];
            if (prods.find(function (p) { return p.nombre.toLowerCase() === (body.Nombre || '').toLowerCase(); })) {
                return _err('Ya existe un producto con ese nombre.');
            }
            var nuevo = {
                id: prods.length === 0 ? 1 : Math.max.apply(null, prods.map(function (p) { return p.id; })) + 1,
                nombre: body.Nombre,
                cantidadKg: body.Cantidad,
                vidaUtil: body.VidaUtil,
                precioXKg: body.Precio,
                esPorUnidad: !!body.EsPorUnidad
            };
            prods.push(nuevo);
            _save('productos', prods);
            return _ok({ mensaje: 'Producto agregado.' });
        }

        if (url === 'ventas') {
            if (!_auth()) return _err('No autenticado');
            var prods = _db('productos') || [];
            var items = body.Items || [];
            var carrito = [];

            for (var i = 0; i < items.length; i++) {
                var prod = prods.find(function (p) { return p.nombre.toLowerCase() === (items[i].Nombre || '').toLowerCase(); });
                if (!prod) return _err('Producto no encontrado: ' + items[i].Nombre);
                if (prod.cantidadKg < items[i].Cantidad) return _err('Stock insuficiente de ' + items[i].Nombre);
                prod.cantidadKg -= items[i].Cantidad;
                carrito.push({
                    prod_Nombre: prod.nombre,
                    prod_ID: prod.id,
                    cantVendida: items[i].Cantidad,
                    precioUnit: prod.precioXKg,
                    subtotal: items[i].Cantidad * prod.precioXKg
                });
            }
            _save('productos', prods);

            var montoTotal = 0;
            carrito.forEach(function (c) { montoTotal += c.subtotal; });

            var idVenta = Date.now();
            var venta = {
                idVenta: idVenta,
                carrito: carrito,
                montoTotal: montoTotal,
                fechaHora: new Date().toISOString(),
                metodoPago: body.MetodoPago || 'efectivo',
                montoEfectivo: body.MontoEfectivo || (body.MetodoPago === 'Combinado' ? 0 : body.MetodoPago === 'efectivo' ? montoTotal : 0),
                montoMercadoPago: body.MontoMercadoPago || (body.MetodoPago === 'Combinado' ? 0 : body.MetodoPago === 'mp' ? montoTotal : 0)
            };

            var ventas = _db('ventas') || [];
            ventas.push(venta);
            _save('ventas', ventas);

            var cajas = _db('cajas') || { efectivo: 0, mercadoPago: 0 };
            if (venta.metodoPago === 'Combinado') {
                cajas.efectivo += venta.montoEfectivo || 0;
                cajas.mercadoPago += venta.montoMercadoPago || 0;
            } else if (venta.metodoPago === 'efectivo') {
                cajas.efectivo += montoTotal;
            } else {
                cajas.mercadoPago += montoTotal;
            }
            _save('cajas', cajas);

            return _ok({ mensaje: 'Venta registrada.', venta: venta });
        }

        if (url === 'usuarios') {
            if (!_auth()) return _err('No autenticado');
            var users = _db('usuarios') || [];
            if (users.find(function (u) { return u.nombre.toLowerCase() === (body.Nombre || '').toLowerCase(); })) {
                return _err('Ya existe un usuario con ese nombre.');
            }
            var nuevo = {
                id: users.length === 0 ? 1 : Math.max.apply(null, users.map(function (u) { return u.id; })) + 1,
                nombre: body.Nombre,
                passwordHash: _hash(body.Password || ''),
                rol: body.Rol || 'Cajero',
                permisos: body.Rol === 'Empleado' ? ['ver_productos','crear_producto','editar_producto','eliminar_producto','registrar_venta','ver_ventas','ver_resumen','ver_cajas','administrar_negocio'] : ['ver_productos','registrar_venta','ver_resumen']
            };
            users.push(nuevo);
            _save('usuarios', users);
            return _ok({ id: nuevo.id, nombre: nuevo.nombre, rol: nuevo.rol, mensaje: 'Usuario creado.' });
        }

        return _err('Endpoint no encontrado: ' + url);
    }

    function put(url, body) {
        url = url.replace('/api/', '');

        var m = url.match(/^productos\/(\d+)$/);
        if (m) {
            if (!_auth()) return _err('No autenticado');
            var id = parseInt(m[1]);
            var prods = _db('productos') || [];
            var prod = prods.find(function (p) { return p.id === id; });
            if (!prod) return _err('Producto no encontrado.');
            if (body.Nombre) prod.nombre = body.Nombre;
            if (body.Cantidad !== undefined) prod.cantidadKg = body.Cantidad;
            if (body.VidaUtil) prod.vidaUtil = body.VidaUtil;
            if (body.Precio) prod.precioXKg = body.Precio;
            if (body.EsPorUnidad !== undefined) prod.esPorUnidad = body.EsPorUnidad;
            _save('productos', prods);
            return _ok({ mensaje: 'Producto actualizado.' });
        }

        var m2 = url.match(/^usuarios\/(\d+)\/permisos$/);
        if (m2) {
            if (!_auth()) return _err('No autenticado');
            var uid = parseInt(m2[1]);
            var users = _db('usuarios') || [];
            var user = users.find(function (u) { return u.id === uid; });
            if (!user) return _err('Usuario no encontrado.');
            user.permisos = body.Permisos || [];
            if (body.Rol) user.rol = body.Rol;
            _save('usuarios', users);
            return _ok({ mensaje: 'Permisos actualizados.' });
        }

        if (url === 'config') {
            if (!_auth()) return _err('No autenticado');
            var cfg = { nombre: body.Nombre, rubro: body.Rubro };
            _save('config', cfg);
            return _ok({ mensaje: 'Configuracion actualizada.', nombre: cfg.nombre, rubro: cfg.rubro });
        }

        return _err('Endpoint no encontrado: ' + url);
    }

    function del(url) {
        url = url.replace('/api/', '');

        var m = url.match(/^productos\/(\d+)$/);
        if (m) {
            if (!_auth()) return _err('No autenticado');
            var id = parseInt(m[1]);
            var prods = _db('productos') || [];
            var idx = prods.findIndex(function (p) { return p.id === id; });
            if (idx === -1) return _err('Producto no encontrado.');
            prods.splice(idx, 1);
            _save('productos', prods);
            return _ok({ mensaje: 'Producto eliminado.' });
        }

        var m2 = url.match(/^usuarios\/(\d+)$/);
        if (m2) {
            if (!_auth()) return _err('No autenticado');
            var uid = parseInt(m2[1]);
            var users = _db('usuarios') || [];
            var idx = users.findIndex(function (u) { return u.id === uid && u.rol !== 'Admin'; });
            if (idx === -1) return _err('No se puede eliminar.');
            users.splice(idx, 1);
            _save('usuarios', users);
            return _ok({ mensaje: 'Usuario eliminado.' });
        }

        return _err('Endpoint no encontrado: ' + url);
    }

    function _auth() {
        return !!_usuario;
    }

    function _hash(input) {
        var hash = 0;
        for (var i = 0; i < input.length; i++) {
            var chr = input.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return 'demo_' + Math.abs(hash).toString(16);
    }

    return {
        setUsuario: setUsuario, getUsuario: getUsuario,
        cerrarSesion: cerrarSesion, guardarSesion: guardarSesion,
        cargarSesion: cargarSesion, obtenerUsuariosRecientes: obtenerUsuariosRecientes,
        get: get, post: post, put: put, del: del
    };
})();
