var HomeScreen = (function () {
    var _config = null;
    var _seccionActual = 'home';

    function mostrar(config) {
        _config = config;
        var usuario = API.getUsuario();
        var rol = usuario ? usuario.rol : '';
        var permisos = usuario ? (usuario.permisos || []) : [];
        var userName = usuario ? usuario.nombre : '';

        function puede(p) { return rol === 'Admin' || permisos.indexOf(p) !== -1; }

        var iconoProd = iconoConFallback('producto', '&#9741;');
        var iconoVenta = iconoConFallback('venta', '&#9730;');
        var iconoUser = iconoConFallback('usuario', '&#9732;');
        var iconoCarrito = iconoConFallback('carrito', '&#128722;', 28, 28);
        var iconoInicio = iconoConFallback('inicio', '+');
        var iconoConfig = iconoConFallback('config', '&#9881;', 18, 18);

        var avatarEmpresa = _renderAvatar('empresa', (config.nombre || 'N')[0], 'avatar-empresa');
        var avatarUsuario = _renderAvatar(userName, userName ? userName[0] : '?', 'avatar-chico');

        var html =
            '<div class="sidebar">' +
            '  <div class="sidebar-header">' +
            '    <div class="sidebar-header-top">' + avatarEmpresa +
            '      <div style="flex:1">' +
            '        <div style="display:flex;align-items:center;gap:8px">' +
            '          <h2 id="sidebarNombre">' + htmlEscape(config.nombre || 'Mi Negocio') + '</h2>' +
            (rol === 'Admin' ? '<a href="#" data-nav="config" id="linkConfigHeader" style="color:var(--text-muted);text-decoration:none;transition:color var(--transition);margin-left:2px" onmouseover="this.style.color=\'var(--text-primary)\'" onmouseout="this.style.color=\'var(--text-muted)\'" title="Configuracion">' + iconoConfig + '</a>' : '') +
            '        </div>' +
            '        <div class="rubro">' + htmlEscape(config.rubro || '') + '</div>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '  <nav class="sidebar-nav">' +
            '    <a href="#" class="activo" data-nav="home"><span class="icono">' + iconoInicio + '</span> Inicio</a>';

        if (puede('ver_productos') || puede('crear_producto')) {
            html += '<a href="#" data-nav="productos"><span class="icono">' + iconoProd + '</span> Productos</a>';
        }
        if (puede('registrar_venta') || puede('ver_ventas')) {
            html += '<a href="#" data-nav="ventas"><span class="icono">' + iconoVenta + '</span> Ventas</a>';
        }
        if (puede('gestionar_usuarios')) {
            html += '<a href="#" data-nav="usuarios"><span class="icono">' + iconoUser + '</span> Usuarios</a>';
        }
        // Ayuda para todos
        html += '<a href="#" data-nav="ayuda"><span class="icono">?</span> Ayuda</a>';

        html +=
            '  </nav>' +
            '  <div class="toggle-wrapper" style="padding:10px 20px">' +
            '    <button class="toggle" id="btnToggleTema" aria-pressed="false" title="Cambiar modo">' +
            '      <span class="toggle__content">' +
            '        <svg aria-hidden="true" class="toggle__backdrop" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 290 228"><g class="clouds"><path fill="#D9D9D9" d="M335 147.5c0 27.89-22.61 50.5-50.5 50.5a50.78 50.78 0 0 1-9.29-.853c-2.478 12.606-10.595 23.188-21.615 29.011C245.699 243.749 228.03 256 207.5 256a50.433 50.433 0 0 1-16.034-2.599A41.811 41.811 0 0 1 166 262a41.798 41.798 0 0 1-22.893-6.782A42.21 42.21 0 0 1 135 256a41.82 41.82 0 0 1-19.115-4.592A41.84 41.84 0 0 1 88 262c-1.827 0-3.626-.117-5.391-.343C74.911 270.448 63.604 276 51 276c-23.196 0-42-18.804-42-42s18.804-42 42-42c1.827 0 3.626.117 5.391.343C64.089 183.552 75.396 178 88 178a41.819 41.819 0 0 1 19.115 4.592C114.532 176.002 124.298 172 135 172a41.798 41.798 0 0 1 22.893 6.782 42.066 42.066 0 0 1 7.239-.773C174.137 164.159 189.749 155 207.5 155c.601 0 1.199.01 1.794.031A41.813 41.813 0 0 1 234 147h.002c.269-27.66 22.774-50 50.498-50 27.89 0 50.5 22.61 50.5 50.5Z"/></g></svg>' +
            '        <span class="toggle__indicator-wrapper"><span class="toggle__indicator"><span class="toggle__star"><span class="sun"><span class="moon"><span class="moon__crater"></span><span class="moon__crater"></span><span class="moon__crater"></span></span></span></span></span></span>' +
            '        <svg aria-hidden="true" class="toggle__backdrop" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 290 228"><g><g class="stars">' +
            '          <g><path fill="#fff" fill-rule="evenodd" d="M61 11.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.749 3.749 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.749 3.749 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813a3.749 3.749 0 0 0 2.576-2.576l.813-2.846A.75.75 0 0 1 61 11.5Z" clip-rule="evenodd"/></g>' +
            '          <g><path fill="#fff" fill-rule="evenodd" d="M62.5 45.219a.329.329 0 0 1 .315.238l.356 1.245a1.641 1.641 0 0 0 1.127 1.127l1.245.356a.328.328 0 0 1 0 .63l-1.245.356a1.641 1.641 0 0 0-1.127 1.127l-.356 1.245a.328.328 0 0 1-.63 0l-.356-1.245a1.641 1.641 0 0 0-1.127-1.127l-1.245-.356a.328.328 0 0 1 0-.63l1.245-.356a1.641 1.641 0 0 0 1.127-1.127l.356-1.245a.328.328 0 0 1 .315-.238Z" clip-rule="evenodd"/></g>' +
            '          <g><path fill="#fff" fill-rule="evenodd" d="M32 31.188a.28.28 0 0 1 .27.204l.305 1.067a1.405 1.405 0 0 0 .966.966l1.068.305a.28.28 0 0 1 0 .54l-1.068.305a1.405 1.405 0 0 0-.966.966l-.305 1.068a.28.28 0 0 1-.54 0l-.305-1.068a1.406 1.406 0 0 0-.966-.966l-1.067-.305a.28.28 0 0 1 0-.54l1.067-.305a1.406 1.406 0 0 0 .966-.966l.305-1.068a.281.281 0 0 1 .27-.203Z" clip-rule="evenodd"/></g>' +
            '          <g><path fill="#fff" fill-rule="evenodd" d="M41.5 74.219a.329.329 0 0 1 .315.238l.356 1.245a1.641 1.641 0 0 0 1.127 1.127l1.245.356a.328.328 0 0 1 0 .63l-1.245.356a1.641 1.641 0 0 0-1.127 1.127l-.356 1.245a.328.328 0 0 1-.63 0l-.356-1.245a1.641 1.641 0 0 0-1.127-1.127l-1.245-.356a.328.328 0 0 1 0-.63l1.245-.356a1.641 1.641 0 0 0 1.127-1.127l.356-1.245a.328.328 0 0 1 .315-.238Z" clip-rule="evenodd"/></g>' +
            '          <g><path fill="#fff" fill-rule="evenodd" d="M34 83.188a.28.28 0 0 1 .27.203l.305 1.068a1.405 1.405 0 0 0 .966.966l1.068.305a.28.28 0 0 1 0 .54l-1.068.305a1.405 1.405 0 0 0-.966.966l-.305 1.068a.28.28 0 0 1-.54 0l-.305-1.068a1.406 1.406 0 0 0-.966-.966l-1.068-.305a.28.28 0 0 1 0-.54l1.068-.305a1.406 1.406 0 0 0 .966-.966l.305-1.068a.281.281 0 0 1 .27-.204Z" clip-rule="evenodd"/></g>' +
            '          <g><path fill="#fff" fill-rule="evenodd" d="M63 89.25a.375.375 0 0 1 .36.272l.407 1.423a1.874 1.874 0 0 0 1.288 1.288l1.423.406a.374.374 0 0 1 0 .722l-1.423.406a1.874 1.874 0 0 0-1.288 1.288l-.407 1.423a.374.374 0 0 1-.72 0l-.407-1.423a1.874 1.874 0 0 0-1.288-1.288l-1.423-.406a.374.374 0 0 1 0-.722l1.423-.406a1.874 1.874 0 0 0 1.288-1.288l.407-1.423a.376.376 0 0 1 .36-.272Z" clip-rule="evenodd"/></g>' +
            '          <g><path fill="#fff" fill-rule="evenodd" d="M110.5 53.156a.236.236 0 0 1 .225.17l.254.89a1.174 1.174 0 0 0 .805.805l.89.254a.23.23 0 0 1 .122.084.233.233 0 0 1-.122.366l-.89.254a1.167 1.167 0 0 0-.805.805l-.254.89a.232.232 0 0 1-.225.17.235.235 0 0 1-.225-.17l-.254-.89a1.174 1.174 0 0 0-.805-.805l-.89-.254a.23.23 0 0 1-.122-.084.233.233 0 0 1 .122-.366l.89-.254a1.167 1.167 0 0 0 .805-.805l.254-.89a.232.232 0 0 1 .225-.17Z" clip-rule="evenodd"/></g>' +
            '          <g><path fill="#fff" fill-rule="evenodd" d="M120 27.188a.279.279 0 0 1 .27.204l.305 1.067a1.41 1.41 0 0 0 .966.966l1.067.305a.283.283 0 0 1 .148.1.286.286 0 0 1 0 .34.283.283 0 0 1-.148.1l-1.067.305a1.403 1.403 0 0 0-.966.966l-.305 1.067a.279.279 0 0 1-.439.147.275.275 0 0 1-.101-.147l-.305-1.067a1.41 1.41 0 0 0-.966-.966l-1.068-.305a.284.284 0 0 1-.147-.1.286.286 0 0 1 0-.34.284.284 0 0 1 .147-.1l1.068-.305a1.405 1.405 0 0 0 .966-.966l.305-1.067a.279.279 0 0 1 .27-.204Z" clip-rule="evenodd"/></g>' +
            '          <g><path fill="#fff" fill-rule="evenodd" d="M155 28.5a.753.753 0 0 1 .721.544l.813 2.846a3.746 3.746 0 0 0 2.576 2.576l2.846.813a.747.747 0 0 1 .543.721.75.75 0 0 1-.543.721l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.747.747 0 0 1-.721.543.749.749 0 0 1-.721-.543l-.813-2.846a3.746 3.746 0 0 0-2.576-2.576l-2.846-.813a.747.747 0 0 1-.543-.721.75.75 0 0 1 .543-.721l2.846-.813a3.75 3.75 0 0 0 2.576-2.576l.813-2.846A.751.751 0 0 1 155 28.5Z" clip-rule="evenodd"/></g>' +
            '          <g><path fill="#fff" fill-rule="evenodd" d="M147 60.25a.377.377 0 0 1 .36.272l.407 1.423a1.883 1.883 0 0 0 1.288 1.288l1.423.407a.375.375 0 0 1 0 .72l-1.423.407a1.875 1.875 0 0 0-1.288 1.288l-.407 1.423a.371.371 0 0 1-.36.272.377.377 0 0 1-.36-.272l-.407-1.423a1.883 1.883 0 0 0-1.288-1.288l-1.423-.406a.375.375 0 0 1 0-.722l1.423-.406a1.875 1.875 0 0 0 1.288-1.288l.407-1.423a.372.372 0 0 1 .36-.272Z" clip-rule="evenodd"/></g>' +
            '          <g><path fill="#fff" fill-rule="evenodd" d="M125.5 76.344a.513.513 0 0 1 .496.374l.559 1.956a2.574 2.574 0 0 0 1.771 1.771l1.956.56a.514.514 0 0 1 .27.805.514.514 0 0 1-.27.186l-1.956.559a2.57 2.57 0 0 0-1.771 1.77l-.559 1.957a.514.514 0 0 1-.806.27.514.514 0 0 1-.186-.27l-.559-1.956a2.574 2.574 0 0 0-1.771-1.771l-1.956-.56a.514.514 0 0 1-.27-.805.514.514 0 0 1 .27-.186l1.956-.559a2.57 2.57 0 0 0 1.771-1.77l.559-1.957a.515.515 0 0 1 .496-.374Z" clip-rule="evenodd"/></g>' +
            '        </g></svg>' +
            '        <svg aria-hidden="true" class="toggle__backdrop" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 290 228"><g class="clouds"><path fill="#fff" d="M335 167.5c0 15.214-7.994 28.56-20.01 36.068.007.31.01.621.01.932 0 23.472-19.028 42.5-42.5 42.5-3.789 0-7.461-.496-10.957-1.426C249.671 263.676 233.141 277 213.5 277a42.77 42.77 0 0 1-7.702-.696C198.089 284.141 187.362 289 175.5 289a42.338 42.338 0 0 1-27.864-10.408A42.411 42.411 0 0 1 133.5 281c-4.36 0-8.566-.656-12.526-1.876C113.252 287.066 102.452 292 90.5 292a42.388 42.388 0 0 1-15.8-3.034A42.316 42.316 0 0 1 48.5 298C25.028 298 6 278.972 6 255.5S25.028 213 48.5 213a42.388 42.388 0 0 1 15.8 3.034A42.316 42.316 0 0 1 90.5 207c4.36 0 8.566.656 12.526 1.876C110.748 200.934 121.548 196 133.5 196a42.338 42.338 0 0 1 27.864 10.408A42.411 42.411 0 0 1 175.5 204c2.63 0 5.204.239 7.702.696C190.911 196.859 201.638 192 213.5 192c3.789 0 7.461.496 10.957 1.426 2.824-10.491 9.562-19.377 18.553-24.994-.007-.31-.01-.621-.01-.932 0-23.472 19.028-42.5 42.5-42.5s42.5 19.028 42.5 42.5Z"/></g></svg>' +
            '      </span>' +
            '    </button>' +
            '  </div>' +
            '  <div class="sidebar-footer">' +
            '    <div class="usuario-dropdown" id="usuarioDropdown">' +
            '      <div class="usuario-dropdown-trigger" id="dropdownTrigger">' +
            '        ' + avatarUsuario +
            '        <span class="usuario-actual" style="margin:0">' + htmlEscape(userName) +
            '          <span class="rol-badge">' + rol + '</span>' +
            '        </span>' +
            '        <span style="font-size:10px;color:var(--text-muted)">&#9662;</span>' +
            '      </div>' +
            '      <div class="usuario-dropdown-menu" id="dropdownMenu"></div>' +
            '    </div>' +
            '  </div>' +
            '</div>' +
            '<div class="contenido" id="paginaContenido">' +
            '  <div id="cargando" style="text-align:center;padding:60px;color:var(--text-muted)">Cargando...</div>' +
            '</div>';

        document.getElementById('app').innerHTML = html;

        // Dropdown usuario con recientes
        _armarDropdownUsuario(userName);
        var dropdownAbierto = false;
        document.getElementById('dropdownTrigger').addEventListener('click', function (e) {
            e.stopPropagation();
            dropdownAbierto = !dropdownAbierto;
            _armarDropdownUsuario(userName);
            document.getElementById('dropdownMenu').classList.toggle('visible', dropdownAbierto);
        });
        document.addEventListener('click', function () {
            dropdownAbierto = false;
            var menu = document.getElementById('dropdownMenu');
            if (menu) menu.classList.remove('visible');
        }, { once: false });

        // Tema toggle fancy
        var temaActual = localStorage.getItem('tema') || 'dark';
        aplicarTema(temaActual);
        document.getElementById('btnToggleTema').addEventListener('click', function () {
            var isDark = this.getAttribute('aria-pressed') === 'true';
            var nuevo = isDark ? 'light' : 'dark';
            aplicarTema(nuevo);
        });

        document.querySelectorAll('.sidebar-nav a').forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                _quitarCarritoFlotante();
                document.querySelector('.sidebar-nav a.activo').classList.remove('activo');
                link.classList.add('activo');
                _seccionActual = link.getAttribute('data-nav');
                navegar(_seccionActual);
            });
        });

        // Config icon en el header -> modal
        var linkConfig = document.getElementById('linkConfigHeader');
        if (linkConfig) {
            linkConfig.addEventListener('click', function (e) {
                e.preventDefault();
                modalConfig();
            });
        }

        navegar('home');
    }

    function navegar(destino) {
        switch (destino) {
            case 'home': mostrarResumen(); break;
            case 'productos': mostrarProductos(); break;
            case 'ventas': mostrarVentas(); break;
            case 'usuarios': mostrarUsuarios(); break;
            case 'ayuda': mostrarAyuda(); break;
            default: mostrarResumen();
        }
    }

    function refrescar() { navegar(_seccionActual); }

    // ============ MODAL SYSTEM ============
    function abrirModal(contenidoHTML, onClose) {
        var overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = '<div class="modal">' + contenidoHTML + '</div>';
        overlay._onClose = onClose || null;
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) _cerrarModal(overlay);
        });
        document.body.appendChild(overlay);
        overlay.querySelectorAll('.modal-cerrar').forEach(function (btn) {
            btn.addEventListener('click', function () { _cerrarModal(overlay); });
        });
        return overlay;
    }

    function _cerrarModal(overlay) {
        if (!overlay || overlay._cerrando) return;
        overlay._cerrando = true;
        overlay.style.opacity = '0';
        var modalEl = overlay.querySelector('.modal');
        if (modalEl) {
            modalEl.style.transform = 'translateY(10px) scale(0.97)';
            modalEl.style.opacity = '0';
        }
        var cb = overlay._onClose;
        setTimeout(function () {
            try { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); } catch (e) {}
            if (cb) cb();
        }, 100);
    }

    function abrirModalConfirmar(mensaje, onConfirmar) {
        var contenido =
            '<div class="modal-header"><h2>Confirmar</h2><button class="modal-cerrar">&times;</button></div>' +
            '<p style="color:var(--text-secondary);margin-bottom:24px">' + mensaje + '</p>' +
            '<div class="modal-footer">' +
            '  <button class="btn btn-secundario" id="btnCancelarConfirm">Cancelar</button>' +
            '  <button class="btn btn-peligro" id="btnConfirmarModal">Confirmar</button>' +
            '</div>';
        var overlay = abrirModal(contenido);
        overlay.querySelector('#btnConfirmarModal').addEventListener('click', function () {
            _cerrarModal(overlay);
            if (onConfirmar) onConfirmar();
        });
        overlay.querySelector('#btnCancelarConfirm').addEventListener('click', function () { _cerrarModal(overlay); });
    }

    // ============ RESUMEN ============
    async function mostrarResumen() {
        _seccionActual = 'home';
        var cont = document.getElementById('paginaContenido');
        cont.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)">Cargando...</div>';
        try {
            var res = await API.get('/api/resumen/hoy');
            var html = '<h1 class="titulo-pagina">Resumen del dia</h1>';
            if (res.productosStockBajo && res.productosStockBajo.length > 0) {
                html += '<div class="alerta-stock"><span style="font-size:18px">&#9888;</span> Stock bajo: <strong>' + res.productosStockBajo.join(', ') + '</strong></div>';
            }
            html +=
                '<div class="cards-resumen">' +
                '  <div class="card-resumen card-destacado verde"><div class="label">Ventas de hoy</div><div class="valor">' + res.totalVentas + '</div><div class="sub">Operaciones realizadas</div></div>' +
                '  <div class="card-resumen card-destacado azul"><div class="label">Total facturado</div><div class="valor">$' + formatearPesos(res.montoTotal) + '</div><div class="sub">Suma de todas las ventas</div></div>' +
                '  <div class="card-resumen"><div class="label">Efectivo</div><div class="valor">$' + formatearPesos(res.totalEfectivo) + '</div></div>' +
                '  <div class="card-resumen"><div class="label">Mercado Pago</div><div class="valor">$' + formatearPesos(res.totalMercadoPago) + '</div></div>' +
                '  <div class="card-resumen card-destacado naranja"><div class="label">Venta mas alta</div><div class="valor">$' + formatearPesos(res.ventaMayor) + '</div></div>' +
                '  <div class="card-resumen"><div class="label">Productos en stock</div><div class="valor">' + res.productosEnStock + '</div><div class="sub">' + res.productosSinStock + ' agotados</div></div>' +
                '</div>';
            try {
                var ventas = await API.get('/api/ventas/hoy');
                if (ventas && ventas.length > 0) {
                    var ultimas = ventas.slice(-5).reverse();
                    html +=
                        '<div class="tabla-contenedor"><div class="tabla-header">Ultimas 5 ventas</div>' +
                        '<table class="tabla"><thead><tr><th>Hora</th><th>Metodo</th><th>Items</th><th>Total</th></tr></thead><tbody>' +
                        ultimas.map(function (v) {
                            return '<tr class="fila-clickeable" data-venta-id="' + v.idVenta + '">' +
                                '<td class="fila-clickeable">' + horaVenta(v.fechaHora) + '</td>' +
                                '<td class="fila-clickeable">' + badgePago(v) + '</td>' +
                                '<td class="fila-clickeable">' + v.carrito.length + '</td>' +
                                '<td class="fila-clickeable" style="font-weight:600">$' + formatearPesos(v.montoTotal) + '</td>' +
                                '</tr>';
                        }).join('') +
                        '</tbody></table></div>';
                    setTimeout(function () {
                        document.querySelectorAll('.fila-clickeable').forEach(function (row) {
                            row.addEventListener('click', function () {
                                var idVenta = this.getAttribute('data-venta-id');
                                var venta = ventas.find(function (v) { return v.idVenta == idVenta; });
                                if (venta) modalDetalleVenta(venta);
                            });
                        });
                    }, 100);
                }
            } catch (_) { }
            cont.innerHTML = html;
        } catch (ex) { cont.innerHTML = '<p style="color:var(--red)">Error: ' + ex.message + '</p>'; }
    }

    // ============ PRODUCTOS ============
    async function mostrarProductos() {
        _seccionActual = 'productos';
        var cont = document.getElementById('paginaContenido');
        cont.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)">Cargando inventario...</div>';
        var usuario = API.getUsuario();
        var puedeGestionar = usuario && (usuario.rol === 'Admin' || usuario.rol === 'Empleado');

        try {
            var productos = await API.get('/api/productos');

            function renderProductos(lista) {
                return lista.map(function (p) {
                    var unidad = p.esPorUnidad ? 'unid.' : 'kg';
                    var stockClass = p.cantidadKg <= 5 && p.cantidadKg > 0 ? 'stock-bajo' : '';
                    return '<tr>' +
                        '<td style="color:var(--text-muted);font-size:12px">#' + p.id + '</td>' +
                        '<td style="font-weight:600;color:var(--text-primary)">' + htmlEscape(p.nombre) + '<span style="color:var(--text-muted);font-size:10px;margin-left:6px">' + (p.esPorUnidad ? 'x unidad' : 'x kg') + '</span></td>' +
                        '<td class="' + stockClass + '">' + formatearNumero(p.cantidadKg) + ' ' + unidad + '</td>' +
                        '<td>' + p.vidaUtil + ' dias</td>' +
                        '<td>$' + formatearPesos(p.precioXKg) + '/' + unidad + '</td>' +
                        (puedeGestionar
                            ? '<td style="text-align:right"><button class="btn btn-secundario btn-chico btn-editar-prod" data-id="' + p.id + '" style="margin-right:6px">Editar</button><button class="btn btn-peligro btn-chico btn-eliminar-prod" data-nombre="' + htmlEscape(p.nombre) + '" data-id="' + p.id + '">Eliminar</button></td>'
                            : ''
                        ) +
                        '</tr>';
                }).join('');
            }

            var html =
                '<div class="seccion-header">' +
                '  <h1 class="titulo-pagina" style="margin-bottom:0">Inventario</h1>' +
                '  <div style="display:flex;gap:12px;align-items:center">' +
                '    <div class="busqueda-seccion"><input type="text" id="busquedaProd" placeholder="Buscar producto..."></div>' +
                (puedeGestionar ? '<button class="btn btn-primario" id="btnNuevoProducto">+ Nuevo producto</button>' : '') +
                '  </div>' +
                '</div>' +
                '<div class="tabla-contenedor">' +
                '  <div class="tabla-header"><span id="contadorProds">' + productos.length + '</span> productos</div>' +
                '  <table class="tabla"><thead><tr><th>ID</th><th>Producto</th><th>Stock</th><th>Vida util</th><th>Precio</th>' + (puedeGestionar ? '<th style="text-align:right">Acciones</th>' : '') + '</tr></thead>' +
                '    <tbody id="tablaProdsBody">' + renderProductos(productos) + '</tbody></table></div>';

            cont.innerHTML = html;

            document.getElementById('busquedaProd').addEventListener('input', function () {
                var texto = this.value.toLowerCase();
                var filtrados = productos.filter(function (p) {
                    return p.nombre.toLowerCase().includes(texto) || String(p.id).includes(texto);
                });
                document.getElementById('tablaProdsBody').innerHTML = renderProductos(filtrados);
                document.getElementById('contadorProds').textContent = filtrados.length;
                _vincularBotonesProd(productos);
            });

            _vincularBotonesProd(productos);
            if (puedeGestionar) {
                document.getElementById('btnNuevoProducto').addEventListener('click', function () { modalProducto(null); });
            }
        } catch (ex) { cont.innerHTML = '<p style="color:var(--red)">Error: ' + ex.message + '</p>'; }
    }

    function _vincularBotonesProd(productos) {
        document.querySelectorAll('.btn-editar-prod').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var id = parseInt(this.getAttribute('data-id'));
                var prod = productos.find(function (p) { return p.id === id; });
                if (prod) modalProducto(prod);
            });
        });
        document.querySelectorAll('.btn-eliminar-prod').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var nombre = this.getAttribute('data-nombre');
                var id = parseInt(this.getAttribute('data-id'));
                abrirModalConfirmar('Eliminar <strong>' + htmlEscape(nombre) + '</strong>?<br><small style="color:var(--text-muted)">Esta accion no se puede deshacer.</small>', async function () {
                    try { await API.del('/api/productos/' + id); refrescar(); } catch (ex) { alert('Error: ' + ex.message); }
                });
            });
        });
    }

    function modalProducto(producto) {
        var esEdicion = !!producto;
        var titulo = esEdicion ? 'Editar producto' : 'Nuevo producto';
        var esPorUnidadCheck = producto && producto.esPorUnidad ? 'checked' : '';
        var unidadLabel = esEdicion && producto.esPorUnidad ? 'unid.' : 'kg';

        var contenido =
            '<div class="modal-header"><h2>' + titulo + '</h2><button class="modal-cerrar">&times;</button></div>' +
            '<div id="modalProdError" class="mensaje-error"></div>' +
            '<div class="grupo-campo">' +
            '  <label>Nombre del producto</label>' +
            '  <input type="text" id="mpNombre" value="' + (esEdicion ? htmlEscape(producto.nombre) : '') + '" placeholder="Ej: Manzana Roja" autofocus>' +
            '</div>' +
            '<div class="fila-campos col-3">' +
            '  <div class="grupo-campo">' +
            '    <label>Cantidad</label>' +
            '    <input type="number" id="mpCantidad" value="' + (esEdicion ? producto.cantidadKg : '') + '" step="0.01" min="0">' +
            '  </div>' +
            '  <div class="grupo-campo">' +
            '    <label>Vida util (dias)</label>' +
            '    <input type="number" id="mpVidaUtil" value="' + (esEdicion ? producto.vidaUtil : '7') + '" min="1">' +
            '  </div>' +
            '  <div class="grupo-campo">' +
            '    <label>Precio</label>' +
            '    <input type="number" id="mpPrecio" value="' + (esEdicion ? producto.precioXKg : '') + '" step="0.01" min="0">' +
            '  </div>' +
            '</div>' +
            '<label class="pago-dividido-toggle" style="margin-bottom:8px">' +
            '  <input type="checkbox" id="mpEsPorUnidad" ' + esPorUnidadCheck + '> Vender por unidad (no por peso)' +
            '</label>' +
            '<div class="modal-footer">' +
            '  <button class="btn btn-secundario" id="btnCancelarProd">Cancelar</button>' +
            '  <button class="btn btn-primario" id="btnGuardarProd">' + (esEdicion ? 'Guardar cambios' : 'Agregar producto') + '</button>' +
            '</div>';

        var overlay = abrirModal(contenido, refrescar);

        overlay.querySelector('#btnCancelarProd').addEventListener('click', function () { _cerrarModal(overlay); });

        overlay.querySelector('#btnGuardarProd').addEventListener('click', async function () {
            var errEl = overlay.querySelector('#modalProdError');
            errEl.classList.remove('visible');
            var nombre = overlay.querySelector('#mpNombre').value.trim();
            var cantidad = parseFloat(overlay.querySelector('#mpCantidad').value);
            var vidaUtil = parseInt(overlay.querySelector('#mpVidaUtil').value);
            var precio = parseFloat(overlay.querySelector('#mpPrecio').value);
            var esPorUnidad = overlay.querySelector('#mpEsPorUnidad').checked;

            if (!nombre || isNaN(cantidad) || isNaN(vidaUtil) || isNaN(precio) || cantidad < 0 || precio <= 0) {
                errEl.textContent = 'Revisa los campos. Todos son obligatorios.';
                errEl.classList.add('visible'); return;
            }
            var btn = overlay.querySelector('#btnGuardarProd');
            btn.disabled = true; btn.textContent = 'Guardando...';
            try {
                if (esEdicion) {
                    await API.put('/api/productos/' + producto.id, {
                        Nombre: nombre, Cantidad: cantidad, VidaUtil: vidaUtil, Precio: precio,
                        EsPorUnidad: esPorUnidad
                    });
                } else {
                    await API.post('/api/productos', {
                        Nombre: nombre, Cantidad: cantidad, VidaUtil: vidaUtil, Precio: precio,
                        EsPorUnidad: esPorUnidad
                    });
                }
                _cerrarModal(overlay);
            } catch (ex) {
                errEl.textContent = ex.message; errEl.classList.add('visible');
            } finally {
                btn.disabled = false; btn.textContent = esEdicion ? 'Guardar cambios' : 'Agregar producto';
            }
        });

        overlay.querySelector('#mpNombre').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') overlay.querySelector('#btnGuardarProd').click();
        });
    }

    // ============ VENTAS ============
    async function mostrarVentas() {
        _seccionActual = 'ventas';
        var cont = document.getElementById('paginaContenido');
        cont.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)">Cargando ventas...</div>';
        var usuario = API.getUsuario();
        var puedeVender = usuario && (usuario.rol === 'Admin' || usuario.rol === 'Empleado' || usuario.rol === 'Cajero');

        try {
            var ventas = await API.get('/api/ventas/hoy');

            function renderVentas(lista) {
                if (lista.length === 0) return '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:40px">No hay ventas que coincidan con los filtros.</td></tr>';
                return lista.map(function (v) {
                    return '<tr class="fila-clickeable" data-venta-id="' + v.idVenta + '">' +
                        '<td class="fila-clickeable" style="color:var(--text-muted);font-size:12px">#' + v.idVenta + '</td>' +
                        '<td class="fila-clickeable">' + horaVenta(v.fechaHora) + ' - ' + fechaCorta(v.fechaHora) + '</td>' +
                        '<td class="fila-clickeable">' + badgePago(v) + '</td>' +
                        '<td class="fila-clickeable">' + v.carrito.length + '</td>' +
                        '<td class="fila-clickeable" style="font-weight:600">$' + formatearPesos(v.montoTotal) + '</td>' +
                        '</tr>';
                }).join('');
            }

            var html =
                '<div class="seccion-header">' +
                '  <h1 class="titulo-pagina" style="margin-bottom:0">Ventas</h1>' +
                '  <div style="display:flex;gap:12px;align-items:center">' +
                '    <div class="busqueda-seccion"><input type="text" id="busquedaVentas" placeholder="Buscar por ID de venta..."></div>' +
                '    <button class="btn btn-secundario" id="btnToggleFiltros" style="gap:6px">' + iconoConFallback('filtros', '&#9725;') + ' Filtros</button>' +
                (puedeVender ? '<button class="btn btn-primario" id="btnNuevaVenta">+ Nueva venta</button>' : '') +
                '  </div>' +
                '</div>' +
                '<div class="filtros-bar" id="filtrosPanel" style="display:none">' +
                '  <div class="grupo-campo"><label>Desde</label><input type="date" id="filtroDesde"></div>' +
                '  <div class="grupo-campo"><label>Hasta</label><input type="date" id="filtroHasta"></div>' +
                '  <div class="grupo-campo"><label>Metodo pago</label>' +
                '    <select id="filtroMetodo"><option value="">Todos</option><option value="efectivo">Efectivo</option><option value="mp">Mercado Pago</option><option value="Combinado">Combinado</option></select></div>' +
                '  <div class="grupo-campo"><label>Ordenar por monto</label>' +
                '    <select id="filtroOrden"><option value="">Sin orden</option><option value="asc">Menor a mayor</option><option value="desc">Mayor a menor</option></select></div>' +
                '  <button class="btn btn-secundario" id="btnLimpiarFiltros" style="height:40px;margin-top:auto">Limpiar</button>' +
                '</div>' +
                '<div class="tabla-contenedor">' +
                '  <div class="tabla-header"><span id="contadorVentas">' + ventas.length + '</span> ventas</div>' +
                '  <table class="tabla"><thead><tr><th>ID</th><th>Fecha y hora</th><th>Metodo</th><th>Items</th><th>Total</th></tr></thead>' +
                '    <tbody id="tablaVentasBody">' + renderVentas(ventas) + '</tbody></table></div>';

            cont.innerHTML = html;
            _vincularClickVentas(ventas);

            var filtrosVisible = false;
            document.getElementById('btnToggleFiltros').addEventListener('click', function () {
                filtrosVisible = !filtrosVisible;
                document.getElementById('filtrosPanel').style.display = filtrosVisible ? 'flex' : 'none';
            });

            function aplicarFiltros() {
                var texto = (document.getElementById('busquedaVentas').value || '').toLowerCase();
                var desde = document.getElementById('filtroDesde').value;
                var hasta = document.getElementById('filtroHasta').value;
                var metodo = document.getElementById('filtroMetodo').value;
                var orden = document.getElementById('filtroOrden').value;
                var filtradas = ventas.slice();
                if (texto) { filtradas = filtradas.filter(function (v) { return String(v.idVenta).includes(texto); }); }
                if (desde) { var dDesde = new Date(desde + 'T00:00:00'); filtradas = filtradas.filter(function (v) { return new Date(v.fechaHora) >= dDesde; }); }
                if (hasta) { var dHasta = new Date(hasta + 'T23:59:59'); filtradas = filtradas.filter(function (v) { return new Date(v.fechaHora) <= dHasta; }); }
                if (metodo) {
                    if (metodo === 'Combinado') {
                        filtradas = filtradas.filter(function (v) { return v.metodoPago === 'Combinado'; });
                    } else {
                        filtradas = filtradas.filter(function (v) { return v.metodoPago && v.metodoPago.toLowerCase() === metodo; });
                    }
                }
                if (orden === 'asc') { filtradas.sort(function (a, b) { return a.montoTotal - b.montoTotal; }); }
                else if (orden === 'desc') { filtradas.sort(function (a, b) { return b.montoTotal - a.montoTotal; }); }
                document.getElementById('tablaVentasBody').innerHTML = renderVentas(filtradas);
                document.getElementById('contadorVentas').textContent = filtradas.length;
                _vincularClickVentas(filtradas);
            }

            document.getElementById('busquedaVentas').addEventListener('input', aplicarFiltros);
            document.getElementById('filtroDesde').addEventListener('change', aplicarFiltros);
            document.getElementById('filtroHasta').addEventListener('change', aplicarFiltros);
            document.getElementById('filtroMetodo').addEventListener('change', aplicarFiltros);
            document.getElementById('filtroOrden').addEventListener('change', aplicarFiltros);
            document.getElementById('btnLimpiarFiltros').addEventListener('click', function () {
                document.getElementById('busquedaVentas').value = '';
                document.getElementById('filtroDesde').value = '';
                document.getElementById('filtroHasta').value = '';
                document.getElementById('filtroMetodo').value = '';
                document.getElementById('filtroOrden').value = '';
                aplicarFiltros();
            });

            if (puedeVender) {
                document.getElementById('btnNuevaVenta').addEventListener('click', function () { mostrarNuevaVenta(); });
            }
        } catch (ex) { cont.innerHTML = '<p style="color:var(--red)">Error: ' + ex.message + '</p>'; }
    }

    function _vincularClickVentas(ventas) {
        document.querySelectorAll('.fila-clickeable').forEach(function (row) {
            row.addEventListener('click', function () {
                var idVenta = this.getAttribute('data-venta-id');
                var venta = ventas.find(function (v) { return v.idVenta == idVenta; });
                if (venta) modalDetalleVenta(venta);
            });
        });
    }

    // ============ NUEVA VENTA (GRILLA + CARRITO FLOTANTE) ============
    function mostrarNuevaVenta() {
        var cont = document.getElementById('paginaContenido');
        cont.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)">Cargando productos...</div>';

        API.get('/api/productos').then(function (productos) {
            var colores = ['#5b8def', '#34d399', '#f87171', '#fb923c', '#a78bfa', '#facc15', '#f472b6', '#2dd4bf', '#818cf8', '#e879f9'];

            function cardColor(nombre) {
                var idx = 0;
                for (var i = 0; i < nombre.length; i++) idx += nombre.charCodeAt(i);
                return colores[idx % colores.length];
            }

            var disponibles = productos.filter(function (p) { return p.cantidadKg > 0; });
            var sinStock = productos.filter(function (p) { return p.cantidadKg <= 0; });
            var todos = disponibles.concat(sinStock);

            var html =
                '<div class="seccion-header">' +
                '  <h1 class="titulo-pagina" style="margin-bottom:0">Nueva venta</h1>' +
                '  <div style="display:flex;gap:12px;align-items:center">' +
                '    <div class="busqueda-seccion"><input type="text" id="busquedaProdVenta" placeholder="Buscar producto..."></div>' +
                '    <button class="btn btn-secundario" id="btnVolverVentas">Volver a ventas</button>' +
                '  </div>' +
                '</div>' +
                '<div class="grilla-productos" id="grillaProdsVenta"></div>';

            cont.innerHTML = html;

            function renderGrilla(lista) {
                return lista.map(function (p) {
                    var sin = p.cantidadKg <= 0;
                    var unidad = p.esPorUnidad ? 'unid.' : 'kg';
                    var stockBajo = p.cantidadKg <= 5 && p.cantidadKg > 0;
                    return '<div class="producto-card' + (sin ? ' sin-stock' : '') + '" data-nombre="' + htmlEscape(p.nombre) + '"' + (sin ? '' : ' style="cursor:pointer"') + '>' +
                        '<div class="prod-img" style="background:' + cardColor(p.nombre) + '">' + (p.nombre.charAt(0).toUpperCase()) + '</div>' +
                        '<div class="prod-nombre">' + htmlEscape(p.nombre) + '</div>' +
                        '<div class="prod-stock' + (stockBajo ? ' bajo' : '') + '">' + (sin ? 'Sin stock' : formatearNumero(p.cantidadKg) + ' ' + unidad) + '</div>' +
                        '<div class="prod-precio">$' + formatearPesos(p.precioXKg) + '/' + unidad + '</div>' +
                        '</div>';
                }).join('');
            }

            document.getElementById('grillaProdsVenta').innerHTML = renderGrilla(todos);

            // Busqueda en grilla
            document.getElementById('busquedaProdVenta').addEventListener('input', function () {
                var texto = this.value.toLowerCase();
                var filtrados = todos.filter(function (p) { return p.nombre.toLowerCase().includes(texto); });
                document.getElementById('grillaProdsVenta').innerHTML = renderGrilla(filtrados);
            });

            document.getElementById('btnVolverVentas').addEventListener('click', function () {
                _carritoVenta = [];
                _quitarCarritoFlotante();
                mostrarVentas();
            });

            // Click en producto
            document.getElementById('grillaProdsVenta').addEventListener('click', function (e) {
                var card = e.target.closest('.producto-card');
                if (!card) return;
                var nombre = card.getAttribute('data-nombre');
                var prod = todos.find(function (p) { return p.nombre === nombre; });
                if (!prod || prod.cantidadKg <= 0) return;
                popupCantidad(prod, card);
            });

            _crearCarritoFlotante();
        }).catch(function (ex) {
            cont.innerHTML = '<p style="color:var(--red)">Error: ' + ex.message + '</p>';
        });
    }

    var _carritoVenta = [];

    function _crearCarritoFlotante() {
        _quitarCarritoFlotante();
        var flotante = document.createElement('div');
        flotante.className = 'carrito-flotante';
        flotante.id = 'carritoFlotanteEl';
        var count = _carritoVenta.length;
        var icono = iconoConFallback('carrito', '&#128722;', 28, 28);
        flotante.innerHTML =
            '<button class="carrito-btn" id="btnCarritoFlotante">' + icono +
            '  <span class="carrito-badge' + (count > 0 ? '' : '" style="display:none') + '" id="carritoBadge">' + count + '</span>' +
            '</button>';
        document.body.appendChild(flotante);
        document.getElementById('btnCarritoFlotante').addEventListener('click', modalCarrito);
    }

    function _actualizarBadge() {
        var badge = document.getElementById('carritoBadge');
        if (!badge) return;
        var count = _carritoVenta.length;
        if (count === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'flex';
            badge.textContent = count;
            badge.classList.add('pop');
            setTimeout(function () { badge.classList.remove('pop'); }, 250);
        }
    }

    function _quitarCarritoFlotante() {
        var el = document.getElementById('carritoFlotanteEl');
        if (el) el.parentNode.removeChild(el);
    }

    // ============ POPUP CANTIDAD ============
    function popupCantidad(producto, cardEl) {
        var rect = cardEl.getBoundingClientRect();
        var popup = document.createElement('div');
        popup.className = 'popup-cantidad';
        var unidad = producto.esPorUnidad ? 'unid.' : 'kg';
        popup.innerHTML =
            '<div class="popup-titulo">' + htmlEscape(producto.nombre) + '</div>' +
            '<div class="popup-stock">Stock: ' + formatearNumero(producto.cantidadKg) + ' ' + unidad + ' | $' + formatearPesos(producto.precioXKg) + '/' + unidad + '</div>' +
            '<div class="fila-campos col-2">' +
            '  <div class="grupo-campo">' +
            '    <label>Cantidad (' + unidad + ')</label>' +
            '    <input type="number" id="popupCantidad" value="1" step="0.01" min="0.01" style="width:100%">' +
            '  </div>' +
            '  <button class="btn btn-primario" id="btnPopupAgregar" style="height:43px;align-self:end">Agregar</button>' +
            '</div>' +
            '<div id="popupError" class="mensaje-error" style="margin-top:10px"></div>';

        // Posicion
        popup.style.left = Math.min(rect.left, window.innerWidth - 370) + 'px';
        popup.style.top = Math.min(rect.bottom + 8, window.innerHeight - 200) + 'px';
        document.body.appendChild(popup);

        var fondo = document.createElement('div');
        fondo.className = 'popup-fondo';
        fondo.addEventListener('click', function () {
            document.body.removeChild(popup);
            document.body.removeChild(fondo);
        });
        document.body.appendChild(fondo);

        setTimeout(function () { popup.querySelector('#popupCantidad').focus(); }, 100);

        popup.querySelector('#btnPopupAgregar').addEventListener('click', function () {
            var cantidad = parseFloat(popup.querySelector('#popupCantidad').value);
            if (isNaN(cantidad) || cantidad <= 0) {
                popup.querySelector('#popupError').textContent = 'Ingresa una cantidad valida.';
                popup.querySelector('#popupError').classList.add('visible');
                return;
            }
            if (cantidad > producto.cantidadKg) {
                popup.querySelector('#popupError').textContent = 'Stock insuficiente. Max: ' + formatearNumero(producto.cantidadKg) + ' ' + unidad;
                popup.querySelector('#popupError').classList.add('visible');
                return;
            }

            var existente = _carritoVenta.find(function (i) { return i.nombre === producto.nombre; });
            if (existente) {
                existente.cantidad += cantidad;
                existente.subtotal = existente.cantidad * existente.precio;
            } else {
                _carritoVenta.push({
                    nombre: producto.nombre, precio: producto.precioXKg, cantidad: cantidad,
                    subtotal: cantidad * producto.precioXKg, unidad: unidad
                });
            }

            // Animacion vuelo
            _animarVuelo(cardEl);

            document.body.removeChild(popup);
            document.body.removeChild(fondo);
            _actualizarBadge();
        });

        popup.querySelector('#popupCantidad').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') popup.querySelector('#btnPopupAgregar').click();
            if (e.key === 'Escape') {
                document.body.removeChild(popup);
                document.body.removeChild(fondo);
            }
        });
    }

    function _animarVuelo(cardEl) {
        var img = cardEl.querySelector('.prod-img');
        if (!img) return;
        var imgRect = img.getBoundingClientRect();
        var cartBtn = document.getElementById('btnCarritoFlotante');
        if (!cartBtn) return;
        var cartRect = cartBtn.getBoundingClientRect();

        var clon = document.createElement('div');
        clon.className = 'vuelo-item';
        clon.style.width = imgRect.width + 'px';
        clon.style.height = imgRect.height + 'px';
        clon.style.left = imgRect.left + 'px';
        clon.style.top = imgRect.top + 'px';
        clon.style.background = img.style.background || 'var(--accent)';
        clon.textContent = img.textContent;
        document.body.appendChild(clon);

        requestAnimationFrame(function () {
            clon.style.left = (cartRect.left + cartRect.width / 2 - imgRect.width / 2) + 'px';
            clon.style.top = (cartRect.top + cartRect.height / 2 - imgRect.height / 2) + 'px';
            clon.style.width = '32px';
            clon.style.height = '32px';
            clon.style.borderRadius = '50%';
            clon.style.opacity = '0.6';
        });

        setTimeout(function () {
            if (clon.parentNode) clon.parentNode.removeChild(clon);
        }, 520);
    }

    // ============ MODAL CARRITO ============
    function modalCarrito() {
        if (_carritoVenta.length === 0) return;

        var total = 0;
        _carritoVenta.forEach(function (i) { total += i.subtotal; });

        var contenido =
            '<div class="modal-header"><h2>Carrito (' + _carritoVenta.length + ' items)</h2><button class="modal-cerrar">&times;</button></div>' +
            '<div id="carritoItems" class="carrito-lista">' +
            _carritoVenta.map(function (item, idx) {
                return '<div class="carrito-item">' +
                    '<div class="item-info">' +
                    '  <div class="item-nombre">' + htmlEscape(item.nombre) + '</div>' +
                    '  <div class="item-detalle">' +
                    '    <input type="number" class="input-editar-cantidad" data-idx="' + idx + '" value="' + item.cantidad + '" step="0.01" min="0.01" style="width:80px;padding:4px 8px;background:rgba(255,255,255,0.04);border:1px solid var(--border-card);border-radius:4px;color:var(--text-primary);font-size:12px;margin-right:8px">' +
                    '    ' + (item.unidad || 'kg') + ' x $' + formatearPesos(item.precio) +
                    '  </div>' +
                    '</div>' +
                    '<span class="item-subtotal">$' + formatearPesos(item.subtotal) + '</span>' +
                    '<button class="btn btn-peligro btn-chico btn-quitar-carrito" data-idx="' + idx + '">Quitar</button>' +
                    '</div>';
            }).join('') +
            '</div>' +
            '<div class="carrito-total"><span class="total-label">Total</span><span class="total-valor" id="carritoTotalValor">$' + formatearPesos(total) + '</span></div>' +
            '<div class="modal-footer">' +
            '  <button class="btn btn-secundario" id="btnCerrarCarrito">Seguir comprando</button>' +
            '  <button class="btn btn-primario" id="btnIrAPagar">Ir a pagar</button>' +
            '</div>';

        var overlay = abrirModal(contenido, null);

        overlay.querySelector('#btnCerrarCarrito').addEventListener('click', function () { _cerrarModal(overlay); });

        overlay.querySelector('#btnIrAPagar').addEventListener('click', function () {
            _cerrarModal(overlay);
            modalMetodoPago();
        });

        // Editar cantidad
        overlay.querySelector('#carritoItems').addEventListener('input', function (e) {
            var input = e.target.closest('.input-editar-cantidad');
            if (input) {
                var idx = parseInt(input.getAttribute('data-idx'));
                var val = parseFloat(input.value);
                if (!isNaN(val) && val > 0 && idx >= 0 && idx < _carritoVenta.length) {
                    _carritoVenta[idx].cantidad = val;
                    _carritoVenta[idx].subtotal = val * _carritoVenta[idx].precio;
                    _cerrarModal(overlay);
                    setTimeout(function () { modalCarrito(); }, 50);
                }
            }
        });

        // Quitar
        overlay.querySelector('#carritoItems').addEventListener('click', function (e) {
            var btn = e.target.closest('.btn-quitar-carrito');
            if (btn) {
                _carritoVenta.splice(parseInt(btn.getAttribute('data-idx')), 1);
                _actualizarBadge();
                _cerrarModal(overlay);
                if (_carritoVenta.length > 0) { setTimeout(function () { modalCarrito(); }, 50); }
            }
        });
    }

    // ============ MODAL METODO DE PAGO ============
    function modalMetodoPago() {
        var total = 0;
        _carritoVenta.forEach(function (i) { total += i.subtotal; });

        var contenido =
            '<div class="modal-header"><h2>Metodo de pago</h2><button class="modal-cerrar">&times;</button></div>' +
            '<div id="modalPagoError" class="mensaje-error"></div>' +
            '<div style="margin-bottom:18px;padding:14px;background:rgba(91,141,239,0.06);border:1px solid rgba(91,141,239,0.15);border-radius:var(--radius-xs)">' +
            '  <span style="font-size:12px;color:var(--text-muted)">Total a cobrar</span>' +
            '  <div style="font-size:28px;font-weight:700;color:var(--accent)">$' + formatearPesos(total) + '</div>' +
            '</div>' +
            '<div class="grupo-campo" id="wrapperMetodoPago">' +
            '  <label>Metodo de pago</label>' +
            '  <select id="mvMetodoPago"><option value="efectivo">Efectivo</option><option value="mp">Mercado Pago</option></select>' +
            '</div>' +
            '<label class="pago-dividido-toggle">' +
            '  <input type="checkbox" id="checkPagoDividido"> Pago combinado (efectivo + Mercado Pago)' +
            '</label>' +
            '<div id="pagoDivididoCampos" class="pago-dividido-campos" style="display:none">' +
            '  <div class="grupo-campo">' +
            '    <label>Efectivo ($)</label>' +
            '    <input type="number" id="mvPagoEfectivo" value="0" step="0.01" min="0">' +
            '    <div class="pago-restante" id="pagoRestanteEfvo"></div>' +
            '  </div>' +
            '  <div class="grupo-campo">' +
            '    <label>Mercado Pago ($)</label>' +
            '    <input type="number" id="mvPagoMP" value="0" step="0.01" min="0">' +
            '    <div class="pago-restante" id="pagoRestanteMP"></div>' +
            '  </div>' +
            '</div>' +
            '<div class="modal-footer">' +
            '  <button class="btn btn-secundario" id="btnCancelarPago">Volver</button>' +
            '  <button class="btn btn-primario" id="btnConfirmarPago">Confirmar venta</button>' +
            '</div>';

        var overlay = abrirModal(contenido, null);

        overlay.querySelector('#btnCancelarPago').addEventListener('click', function () { _cerrarModal(overlay); });

        function actualizarDividido() {
            var check = overlay.querySelector('#checkPagoDividido');
            if (!check) return;
            var campos = overlay.querySelector('#pagoDivididoCampos');
            var selectPago = overlay.querySelector('#mvMetodoPago');
            if (check.checked) {
                campos.style.display = 'grid';
                selectPago.parentElement.style.display = 'none';
                var efvo = parseFloat(overlay.querySelector('#mvPagoEfectivo').value) || 0;
                var mp = parseFloat(overlay.querySelector('#mvPagoMP').value) || 0;
                overlay.querySelector('#pagoRestanteEfvo').textContent = 'Restante: $' + formatearPesos(total - efvo);
                overlay.querySelector('#pagoRestanteMP').textContent = 'Restante: $' + formatearPesos(total - mp);
            } else {
                campos.style.display = 'none';
                selectPago.parentElement.style.display = '';
            }
        }

        overlay.querySelector('#checkPagoDividido').addEventListener('change', function () {
            if (this.checked) {
                overlay.querySelector('#mvPagoEfectivo').value = total;
                overlay.querySelector('#mvPagoMP').value = 0;
            }
            actualizarDividido();
        });

        overlay.querySelector('#mvPagoEfectivo').addEventListener('input', function () {
            var efvo = parseFloat(this.value) || 0;
            overlay.querySelector('#mvPagoMP').value = Math.max(0, total - efvo);
            actualizarDividido();
        });

        overlay.querySelector('#mvPagoMP').addEventListener('input', function () {
            var mp = parseFloat(this.value) || 0;
            overlay.querySelector('#mvPagoEfectivo').value = Math.max(0, total - mp);
            actualizarDividido();
        });

        overlay.querySelector('#btnConfirmarPago').addEventListener('click', async function () {
            var dividido = overlay.querySelector('#checkPagoDividido').checked;
            var metodo = 'efectivo';
            var montoEfvo = null;
            var montoMP = null;

            if (dividido) {
                var efvo = parseFloat(overlay.querySelector('#mvPagoEfectivo').value) || 0;
                var mp = parseFloat(overlay.querySelector('#mvPagoMP').value) || 0;
                if (Math.abs(efvo + mp - total) > 0.01) {
                    var errEl = overlay.querySelector('#modalPagoError');
                    errEl.textContent = 'La suma debe ser igual al total ($' + formatearPesos(total) + ').';
                    errEl.classList.add('visible'); return;
                }
                metodo = 'Combinado';
                montoEfvo = efvo;
                montoMP = mp;
            } else {
                metodo = overlay.querySelector('#mvMetodoPago').value;
            }

            var btn = overlay.querySelector('#btnConfirmarPago');
            btn.disabled = true; btn.textContent = 'Procesando...';

            var body = {
                Items: _carritoVenta.map(function (i) { return { Nombre: i.nombre, Cantidad: i.cantidad }; }),
                MetodoPago: metodo
            };
            if (metodo === 'Combinado') {
                body.MontoEfectivo = montoEfvo;
                body.MontoMercadoPago = montoMP;
            }

            try {
                await API.post('/api/ventas', body);
                _carritoVenta = [];
                _quitarCarritoFlotante();
                _cerrarModal(overlay);
                mostrarVentas();
            } catch (ex) {
                var errEl = overlay.querySelector('#modalPagoError');
                errEl.textContent = ex.message; errEl.classList.add('visible');
            } finally {
                btn.disabled = false; btn.textContent = 'Confirmar venta';
            }
        });
    }

    // ============ MODAL DETALLE VENTA ============
    function modalDetalleVenta(venta) {
        var fecha = new Date(venta.fechaHora);
        var fechaStr = fecha.toLocaleDateString('es-AR') + ' ' + fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

        var metodoHTML;
        if (venta.metodoPago === 'Combinado') {
            metodoHTML = '<div class="dv-item"><div class="dv-label">Metodo de pago</div><div class="dv-valor">Combinado</div></div>' +
                '<div class="dv-item"><div class="dv-label">Efectivo</div><div class="dv-valor">$' + formatearPesos(venta.montoEfectivo || 0) + '</div></div>' +
                '<div class="dv-item"><div class="dv-label">Mercado Pago</div><div class="dv-valor">$' + formatearPesos(venta.montoMercadoPago || 0) + '</div></div>';
        } else {
            var nombreMetodo = venta.metodoPago === 'mp' ? 'Mercado Pago' : 'Efectivo';
            metodoHTML = '<div class="dv-item"><div class="dv-label">Metodo de pago</div><div class="dv-valor">' + nombreMetodo + '</div></div>';
        }

        var ticketPagoHTML;
        if (venta.metodoPago === 'Combinado') {
            ticketPagoHTML =
                '<div class="ticket-item"><span><strong>Metodo de pago:</strong></span><span></span></div>' +
                '<ul class="ticket-pago-lista">' +
                '  <li><span>Efectivo:</span><span>$' + formatearPesos(venta.montoEfectivo || 0) + '</span></li>' +
                '  <li><span>Mercado Pago:</span><span>$' + formatearPesos(venta.montoMercadoPago || 0) + '</span></li>' +
                '</ul>';
        } else {
            ticketPagoHTML = '<div class="ticket-item"><span><strong>Metodo de pago:</strong></span><span>' + (venta.metodoPago === 'mp' ? 'Mercado Pago' : 'Efectivo') + '</span></div>';
        }

        var itemsHtml = venta.carrito.map(function (item, i) {
            return '<div class="ticket-item"><span>' + (i + 1) + '. ' + htmlEscape(item.prod_Nombre || '') + '</span><span>$' + formatearPesos(item.subtotal) + '</span></div>' +
                   '<div style="font-size:10px;color:#888;padding-left:14px">' + formatearNumero(item.cantVendida) + ' kg x $' + formatearPesos(item.precioUnit) + '</div>';
        }).join('');

        var ticketHTML =
            '<div class="ticket" id="ticketImprimible">' +
            '  <div class="ticket-header">' + htmlEscape(_config.nombre || 'Mi Negocio') + '</div>' +
            '  <div class="ticket-sub">' + htmlEscape(_config.rubro || '') + ' | ' + fechaStr + '</div>' +
            '  <hr>' +
            '  <div class="ticket-item"><span>Venta #' + venta.idVenta + '</span><span></span></div>' +
            ticketPagoHTML +
            '  <hr>' +
            itemsHtml +
            '  <hr>' +
            '  <div class="ticket-total">TOTAL: $' + formatearPesos(venta.montoTotal) + '</div>' +
            '  <hr>' +
            '  <div class="ticket-footer">Gracias por su compra!</div>' +
            '</div>';

        var contenido =
            '<div class="modal-header"><h2>Detalle de venta #' + venta.idVenta + '</h2><button class="modal-cerrar">&times;</button></div>' +
            '<div class="detalle-venta-info">' +
            '  <div class="dv-item"><div class="dv-label">Fecha y hora</div><div class="dv-valor">' + fechaStr + '</div></div>' +
            metodoHTML +
            '  <div class="dv-item"><div class="dv-label">Items</div><div class="dv-valor">' + venta.carrito.length + '</div></div>' +
            '  <div class="dv-item"><div class="dv-label">Total</div><div class="dv-valor" style="color:var(--accent)">$' + formatearPesos(venta.montoTotal) + '</div></div>' +
            '</div>' +
            '<div class="tabla-contenedor" style="margin-bottom:20px">' +
            '  <table class="tabla"><thead><tr><th>Producto</th><th>Cantidad</th><th>Precio unit.</th><th>Subtotal</th></tr></thead>' +
            '    <tbody>' +
            venta.carrito.map(function (item) {
                return '<tr>' +
                    '<td style="font-weight:600;color:var(--text-primary)">' + htmlEscape(item.prod_Nombre || '') + '</td>' +
                    '<td>' + formatearNumero(item.cantVendida) + ' kg</td>' +
                    '<td>$' + formatearPesos(item.precioUnit) + '</td>' +
                    '<td style="font-weight:600">$' + formatearPesos(item.subtotal) + '</td>' +
                    '</tr>';
            }).join('') +
            '    </tbody></table>' +
            '</div>' +
            ticketHTML +
            '<div class="modal-footer">' +
            '  <button class="btn btn-secundario" id="btnCerrarDetalle">Cerrar</button>' +
            '  <button class="btn btn-primario" id="btnImprimirTicket">&#9113; Imprimir ticket</button>' +
            '</div>';

        var overlay = abrirModal(contenido, null);
        overlay.querySelector('.modal').classList.add('modal-grande');

        overlay.querySelector('#btnCerrarDetalle').addEventListener('click', function () { _cerrarModal(overlay); });

        overlay.querySelector('#btnImprimirTicket').addEventListener('click', function () {
            var ticketEl = document.getElementById('ticketImprimible');
            var win = window.open('', '_blank', 'width=320,height=600');
            win.document.write('<!DOCTYPE html><html><head><title>Ticket #' + venta.idVenta + '</title>');
            win.document.write('<style>body{margin:0;display:flex;justify-content:center;padding:20px;font-family:monospace} ul{list-style:none;padding:0;margin:4px 0} li{display:flex;justify-content:space-between;padding:1px 0;font-size:12px}</style>');
            win.document.write('</head><body>');
            win.document.write(ticketEl.outerHTML);
            win.document.write('</body></html>');
            win.document.close();
            setTimeout(function () { win.print(); }, 300);
        });
    }

    // ============ CONFIGURACION EMPRENDIMIENTO ============
    function modalConfig() {
        API.get('/api/config').then(function (config) {
            var emojis = ['🏪','🥬','🍎','🥩','👕','🍞','🔧','🍬','💊','📚','☕','🍕','🏠','⭐','🔥','💎','🎯','🚀','💡','🛒','📦','💰','🧾','📊','🍽️','🥗','🧁','🍺','👗','🪛'];
            var avatarActual = localStorage.getItem('avatar_empresa') || '';

            var contenido =
                '<div class="modal-header"><h2>Configuracion</h2><button class="modal-cerrar">&times;</button></div>' +
                '<div id="cfgError" class="mensaje-error"></div>' +
                '<div class="grupo-campo">' +
                '  <label>Nombre del emprendimiento</label>' +
                '  <input type="text" id="cfgNombre" value="' + htmlEscape(config.nombre || '') + '">' +
                '</div>' +
                '<div class="grupo-campo">' +
                '  <label>Rubro</label>' +
                '  <select id="cfgRubro">' +
                '    <option value="Verduleria"' + (config.rubro === 'Verduleria' ? ' selected' : '') + '>Verduleria</option>' +
                '    <option value="Restaurante"' + (config.rubro === 'Restaurante' ? ' selected' : '') + '>Restaurante</option>' +
                '    <option value="Comercio"' + (config.rubro === 'Comercio' ? ' selected' : '') + '>Comercio / Almacen</option>' +
                '    <option value="Ropa"' + (config.rubro === 'Ropa' ? ' selected' : '') + '>Ropa / Indumentaria</option>' +
                '    <option value="Panaderia"' + (config.rubro === 'Panaderia' ? ' selected' : '') + '>Panaderia</option>' +
                '    <option value="Carniceria"' + (config.rubro === 'Carniceria' ? ' selected' : '') + '>Carniceria</option>' +
                '    <option value="Ferreteria"' + (config.rubro === 'Ferreteria' ? ' selected' : '') + '>Ferreteria</option>' +
                '    <option value="Kiosco"' + (config.rubro === 'Kiosco' ? ' selected' : '') + '>Kiosco</option>' +
                '    <option value="Farmacia"' + (config.rubro === 'Farmacia' ? ' selected' : '') + '>Farmacia</option>' +
                '    <option value="Libreria"' + (config.rubro === 'Libreria' ? ' selected' : '') + '>Libreria</option>' +
                '    <option value="Otro"' + (config.rubro === 'Otro' ? ' selected' : '') + '>Otro</option>' +
                '  </select>' +
                '</div>' +
                '<label style="font-size:12px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;display:block">Icono del negocio</label>' +
                '<div class="emoji-grid" id="cfgEmojiModal">' +
                emojis.map(function (e) {
                    return '<span class="emoji-item' + (e === avatarActual ? ' seleccionado' : '') + '" data-emoji="' + e + '">' + e + '</span>';
                }).join('') +
                '</div>' +
                '<div style="display:flex;align-items:center;gap:8px;margin-top:8px">' +
                '  <input type="file" id="cfgFileInputM" accept="image/png,image/jpeg,image/webp" style="display:none">' +
                '  <button class="btn btn-secundario btn-chico" id="btnCfgSubirImgM" type="button">Subir imagen</button>' +
                '  <span style="font-size:11px;color:var(--text-muted)" id="cfgImgLabelM"></span>' +
                '  <button class="btn btn-secundario btn-chico" id="btnCfgLimpiarImgM" type="button" style="display:none">Quitar</button>' +
                '</div>' +
                '<div id="cfgPreviewM" style="margin-top:8px"></div>' +
                '<div class="modal-footer">' +
                '  <button class="btn btn-secundario" id="btnCerrarCfg">Cerrar</button>' +
                '  <button class="btn btn-primario" id="btnGuardarCfg">Guardar cambios</button>' +
                '</div>';

            var overlay = abrirModal(contenido, null);
            var imgDataURL = '';
            overlay.querySelector('#btnCfgSubirImgM').addEventListener('click', function () { overlay.querySelector('#cfgFileInputM').click(); });
            overlay.querySelector('#cfgFileInputM').addEventListener('change', function () {
                var file = this.files[0];
                if (!file) return;
                var reader = new FileReader();
                reader.onload = function () {
                    imgDataURL = reader.result;
                    overlay.querySelector('#cfgImgLabelM').textContent = file.name;
                    overlay.querySelector('#btnCfgLimpiarImgM').style.display = '';
                    overlay.querySelectorAll('#cfgEmojiModal .emoji-item').forEach(function (e) { e.classList.remove('seleccionado'); });
                    overlay.querySelector('#cfgPreviewM').innerHTML = '<img src="' + reader.result + '" style="width:80px;height:80px;object-fit:cover;border-radius:50%;border:2px solid var(--accent)">';
                };
                reader.readAsDataURL(file);
            });
            overlay.querySelector('#btnCfgLimpiarImgM').addEventListener('click', function () {
                imgDataURL = '';
                overlay.querySelector('#cfgImgLabelM').textContent = '';
                this.style.display = 'none';
                overlay.querySelector('#cfgFileInputM').value = '';
                overlay.querySelector('#cfgPreviewM').innerHTML = '';
            });
            overlay.querySelector('#cfgEmojiModal').addEventListener('click', function (e) {
                var item = e.target.closest('.emoji-item');
                if (!item) return;
                overlay.querySelectorAll('#cfgEmojiModal .emoji-item').forEach(function (s) { s.classList.remove('seleccionado'); });
                item.classList.add('seleccionado');
                imgDataURL = '';
                overlay.querySelector('#cfgImgLabelM').textContent = '';
                overlay.querySelector('#btnCfgLimpiarImgM').style.display = 'none';
            });

            overlay.querySelector('#btnCerrarCfg').addEventListener('click', function () { _cerrarModal(overlay); });
            overlay.querySelector('#btnGuardarCfg').addEventListener('click', async function () {
                var errEl = overlay.querySelector('#cfgError');
                errEl.classList.remove('visible');
                var nombre = overlay.querySelector('#cfgNombre').value.trim();
                var rubro = overlay.querySelector('#cfgRubro').value;
                if (!nombre) { errEl.textContent = 'El nombre no puede estar vacio.'; errEl.classList.add('visible'); return; }
                var btn = overlay.querySelector('#btnGuardarCfg');
                btn.disabled = true; btn.textContent = 'Guardando...';
                try {
                    await API.put('/api/config', { Nombre: nombre, Rubro: rubro });
                    var selEmoji = overlay.querySelector('#cfgEmojiModal .emoji-item.seleccionado');
                    if (imgDataURL) {
                        localStorage.setItem('avatar_empresa', imgDataURL);
                    } else if (selEmoji) {
                        localStorage.setItem('avatar_empresa', selEmoji.getAttribute('data-emoji'));
                    } else {
                        localStorage.removeItem('avatar_empresa');
                    }
                    _config.nombre = nombre;
                    _config.rubro = rubro;
                    var sn = document.getElementById('sidebarNombre');
                    if (sn) sn.textContent = nombre;
                    // Refrescar avatar del sidebar
                    var avatarEl = document.querySelector('.sidebar-header-top .avatar');
                    if (avatarEl) {
                        var nuevoAvatar = _renderAvatar('empresa', (nombre || 'N')[0], 'avatar-empresa');
                        var temp = document.createElement('div');
                        temp.innerHTML = nuevoAvatar;
                        avatarEl.parentNode.replaceChild(temp.firstChild, avatarEl);
                    }
                    _cerrarModal(overlay);
                } catch (ex) {
                    errEl.textContent = ex.message; errEl.classList.add('visible');
                } finally {
                    btn.disabled = false; btn.textContent = 'Guardar cambios';
                }
            });
        }).catch(function (ex) { alert('Error: ' + ex.message); });
    }

    // ============ AYUDA ============
    var _articulosAyuda = [
        { id: 'admin', titulo: 'Guia de administracion', permiso: 'administrar_negocio' },
        { id: 'inicio', titulo: 'Primeros pasos', permiso: null }
    ];

    async function mostrarAyuda() {
        _seccionActual = 'ayuda';
        var cont = document.getElementById('paginaContenido');
        var usuario = API.getUsuario();
        var rol = usuario ? usuario.rol : '';
        var permisos = usuario ? (usuario.permisos || []) : [];

        var articulosFiltrados = _articulosAyuda.filter(function (a) {
            if (!a.permiso && !a.id) return true;
            var clave = 'ayuda_' + a.id;
            return rol === 'Admin' || permisos.indexOf(clave) !== -1;
        });

        cont.innerHTML =
            '<h1 class="titulo-pagina">Ayuda</h1>' +
            '<div class="ayuda-layout">' +
            '  <div class="ayuda-sidebar" id="ayudaSidebar">' +
            '    <h3>Articulos</h3>' +
            articulosFiltrados.map(function (a) {
                return '<a href="#" data-articulo="' + a.id + '" class="ayuda-link">' + a.titulo + '</a>';
            }).join('') +
            '  </div>' +
            '  <div class="ayuda-contenido" id="ayudaContenido">' +
            '    <div style="text-align:center;padding:60px;color:var(--text-muted)">Selecciona un articulo</div>' +
            '  </div>' +
            '</div>';

        document.querySelectorAll('.ayuda-link').forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelectorAll('.ayuda-link').forEach(function (l) { l.classList.remove('activo'); });
                link.classList.add('activo');
                cargarArticulo(this.getAttribute('data-articulo'));
            });
        });
    }

    function cargarArticulo(id) {
        var cont = document.getElementById('ayudaContenido');
        cont.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">Cargando...</div>';
        fetch('ayuda/' + id + '.md')
            .then(function (r) { if (!r.ok) throw new Error('No encontrado'); return r.text(); })
            .then(function (md) { cont.innerHTML = _renderMarkdown(md); })
            .catch(function () { cont.innerHTML = '<p style="color:var(--red)">Articulo no encontrado.</p>'; });
    }

    function _renderMarkdown(md) {
        var html = md;
        // Headers
        html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
        // Bold
        html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        // Code
        html = html.replace(/`(.+?)`/g, '<code>$1</code>');
        // Horizontal rule
        html = html.replace(/^---$/gm, '<hr>');
        // Unordered lists
        html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
        html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
        // Tables (basic: | col1 | col2 |)
        html = html.replace(/^\|(.+)\|$/gm, function (match) {
            var cells = match.split('|').filter(function (c) { return c.trim(); });
            if (cells.length === 0) return match;
            var isHeader = match.indexOf('---') !== -1;
            if (isHeader) return '';
            var tag = 'td';
            return '<tr>' + cells.map(function (c) { return '<' + tag + '>' + c.trim() + '</' + tag + '>'; }).join('') + '</tr>';
        });
        // Wrap consecutive <tr>s in <table>
        html = html.replace(/((?:<tr>.*<\/tr>\n?)+)/g, function (match) {
            var rows = match;
            var firstRow = rows.match(/<tr>(.*?)<\/tr>/);
            if (firstRow && firstRow[1]) {
                var thRow = '<tr>' + firstRow[1].split(/<\/td>\s*<td>/).map(function (c) {
                    return '<th>' + c.replace(/<\/?td>/g, '').trim() + '</th>';
                }).join('') + '</tr>';
                rows = rows.replace(firstRow[0], thRow);
            }
            return '<table>' + rows + '</table>';
        });
        // Paragraphs (lines not starting with <)
        html = html.replace(/^(?!<[a-z])(.+)$/gm, '<p>$1</p>');
        // Clean empty <p>
        html = html.replace(/<p>\s*<\/p>/g, '');
        // Break tags
        html = html.replace(/\n\n/g, '<br>');
        return html;
    }

    // ============ USUARIOS ============
    async function mostrarUsuarios() {
        _seccionActual = 'usuarios';
        var cont = document.getElementById('paginaContenido');
        cont.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)">Cargando usuarios...</div>';
        try {
            var usuarios = await API.get('/api/usuarios');
            function renderUsuarios(lista) {
                return lista.map(function (u) {
                    var esAdmin = u.rol === 'Admin';
                    var colorRol = u.rol === 'Admin' ? 'var(--accent)' : u.rol === 'Empleado' ? 'var(--green)' : u.rol === 'Cajero' ? 'var(--orange)' : '#a78bfa';
                    return '<tr>' +
                        '<td style="font-weight:600;color:var(--text-primary)">' + htmlEscape(u.nombre) + '</td>' +
                        '<td><span class="badge-rol" style="background:' + colorRol + '">' + u.rol + '</span></td>' +
                        '<td style="text-align:right">' +
                        (esAdmin ? '<span style="color:var(--text-muted);font-size:12px">Admin</span>'
                            : '<button class="btn btn-secundario btn-chico btn-permisos-user" data-id="' + u.id + '" data-nombre="' + htmlEscape(u.nombre) + '" style="margin-right:6px">Permisos</button>' +
                              '<button class="btn btn-peligro btn-chico btn-eliminar-user" data-id="' + u.id + '" data-nombre="' + htmlEscape(u.nombre) + '">Eliminar</button>') +
                        '</td></tr>';
                }).join('');
            }
            var html =
                '<div class="seccion-header"><h1 class="titulo-pagina" style="margin-bottom:0">Usuarios</h1><button class="btn btn-primario" id="btnNuevoUsuario">+ Nuevo usuario</button></div>' +
                '<div class="tabla-contenedor"><div class="tabla-header">' + usuarios.length + ' usuarios</div>' +
                '<table class="tabla"><thead><tr><th>Usuario</th><th>Rol</th><th style="text-align:right">Acciones</th></tr></thead>' +
                '<tbody>' + renderUsuarios(usuarios) + '</tbody></table></div>';
            cont.innerHTML = html;

            document.getElementById('btnNuevoUsuario').addEventListener('click', function () { modalNuevoUsuario(); });
            document.querySelectorAll('.btn-eliminar-user').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var id = this.getAttribute('data-id');
                    var nombre = this.getAttribute('data-nombre');
                    abrirModalConfirmar('Eliminar usuario <strong>' + htmlEscape(nombre) + '</strong>?', async function () {
                        try { await API.del('/api/usuarios/' + id); refrescar(); } catch (ex) { alert('Error: ' + ex.message); }
                    });
                });
            });
            document.querySelectorAll('.btn-permisos-user').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var id = parseInt(this.getAttribute('data-id'));
                    var nombre = this.getAttribute('data-nombre');
                    modalPermisos(id, nombre);
                });
            });
        } catch (ex) { cont.innerHTML = '<p style="color:var(--red)">Error: ' + ex.message + '</p>'; }
    }

    function modalPermisos(userId, userName) {
        var overlay = abrirModal(
            '<div class="modal-header"><h2>Permisos de ' + htmlEscape(userName) + '</h2><button class="modal-cerrar">&times;</button></div>' +
            '<div id="permisosError" class="mensaje-error"></div>' +
            '<div id="permisosCargando" style="text-align:center;padding:30px;color:var(--text-muted)">Cargando...</div>' +
            '<div id="permisosContenido" style="display:none"></div>' +
            '<div class="modal-footer" id="permisosFooter" style="display:none">' +
            '  <button class="btn btn-secundario" id="btnCerrarPermisos">Cerrar</button>' +
            '  <button class="btn btn-primario" id="btnGuardarPermisos">Guardar permisos</button>' +
            '</div>',
            refrescar
        );
        overlay.querySelector('.modal').classList.add('modal-grande');
        overlay.querySelector('#btnCerrarPermisos').addEventListener('click', function () { _cerrarModal(overlay); });

        // Cargar permisos
        API.get('/api/permisos').then(function (todosPermisos) {
            return API.get('/api/usuarios/' + userId + '/permisos').then(function (data) {
                var permisosActuales = data.permisos || [];
                var rolActual = data.rol || '';

                var contenidoHTML =
                    '<div style="margin-bottom:18px">' +
                    '  <div class="grupo-campo"><label>Preset / Rol</label>' +
                    '    <select id="presetRol">' +
                    '      <option value="Empleado"' + (rolActual === 'Empleado' ? ' selected' : '') + '>Empleado (preset)</option>' +
                    '      <option value="Cajero"' + (rolActual === 'Cajero' ? ' selected' : '') + '>Cajero (preset)</option>' +
                    '      <option value="Personalizado"' + (rolActual === 'Personalizado' ? ' selected' : '') + '>Personalizado</option>' +
                    '    </select></div>' +
                    '</div>' +
                    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';

                todosPermisos.forEach(function (p) {
                    var activo = permisosActuales.indexOf(p.clave) !== -1;
                    contenidoHTML +=
                        '<label class="pago-dividido-toggle" style="margin-top:0;padding:8px 10px;background:rgba(255,255,255,0.02);border:1px solid var(--border-card);border-radius:var(--radius-xs)">' +
                        '  <input type="checkbox" class="check-permiso" data-permiso="' + p.clave + '"' + (activo ? ' checked' : '') + '>' +
                        '  ' + p.nombre +
                        '</label>';
                });

                contenidoHTML += '</div>';

                // Seccion articulos de ayuda
                contenidoHTML += '<hr style="border-color:var(--border-card);margin:16px 0 12px">' +
                    '<div style="font-size:12px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px">Articulos de ayuda</div>' +
                    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px" id="checksAyudaWrapper">';

                _articulosAyuda.forEach(function (art) {
                    var clave = 'ayuda_' + art.id;
                    var activo = permisosActuales.indexOf(clave) !== -1;
                    contenidoHTML +=
                        '<label class="pago-dividido-toggle" style="margin-top:0;padding:8px 10px;background:rgba(255,255,255,0.02);border:1px solid var(--border-card);border-radius:var(--radius-xs)">' +
                        '  <input type="checkbox" class="check-permiso-ayuda" data-permiso="' + clave + '"' + (activo ? ' checked' : '') + '>' +
                        '  ' + art.titulo +
                        '</label>';
                });

                contenidoHTML += '</div>';

                overlay.querySelector('#permisosCargando').style.display = 'none';
                overlay.querySelector('#permisosContenido').innerHTML = contenidoHTML;
                overlay.querySelector('#permisosContenido').style.display = 'block';
                overlay.querySelector('#permisosFooter').style.display = 'flex';

                // Presets
                var presets = {
                    'Empleado': ['ver_productos', 'crear_producto', 'editar_producto', 'eliminar_producto', 'registrar_venta', 'ver_ventas', 'ver_resumen', 'ver_cajas', 'administrar_negocio'],
                    'Cajero': ['ver_productos', 'registrar_venta', 'ver_resumen'],
                    'Personalizado': []
                };

                overlay.querySelector('#presetRol').addEventListener('change', function () {
                    var preset = presets[this.value] || [];
                    overlay.querySelectorAll('.check-permiso').forEach(function (cb) {
                        cb.checked = preset.indexOf(cb.getAttribute('data-permiso')) !== -1;
                    });
                });

                // Guardar
                overlay.querySelector('#btnGuardarPermisos').addEventListener('click', async function () {
                    var checks = overlay.querySelectorAll('.check-permiso');
                    var seleccionados = [];
                    checks.forEach(function (cb) { if (cb.checked) seleccionados.push(cb.getAttribute('data-permiso')); });
                    // Agregar checks de ayuda
                    var checksAyuda = overlay.querySelectorAll('.check-permiso-ayuda');
                    checksAyuda.forEach(function (cb) { if (cb.checked) seleccionados.push(cb.getAttribute('data-permiso')); });
                    var nuevoRol = overlay.querySelector('#presetRol').value;

                    var btn = overlay.querySelector('#btnGuardarPermisos');
                    btn.disabled = true; btn.textContent = 'Guardando...';
                    try {
                        await API.put('/api/usuarios/' + userId + '/permisos', {
                            Permisos: seleccionados,
                            Rol: nuevoRol
                        });
                        _cerrarModal(overlay);
                    } catch (ex) {
                        overlay.querySelector('#permisosError').textContent = ex.message;
                        overlay.querySelector('#permisosError').classList.add('visible');
                    } finally {
                        btn.disabled = false; btn.textContent = 'Guardar permisos';
                    }
                });
            });
        }).catch(function (ex) {
            overlay.querySelector('#permisosCargando').innerHTML = '<p style="color:var(--red)">Error: ' + ex.message + '</p>';
        });
    }

    function modalNuevoUsuario() {
        var emojis = ['👤','👨‍💼','👩‍💼','🧑‍🍳','👨‍🍳','🧑‍🔧','👩‍💻','🧑‍💻','💪','🎯','⭐','🛡️','🔑','📋','💼','📊','🛒','💰','🧾','🎓','👔','🧢','🤝','✅','📦','🍀','🔥','💎'];

        var contenido =
            '<div class="modal-header"><h2>Nuevo usuario</h2><button class="modal-cerrar">&times;</button></div>' +
            '<div id="modalUserError" class="mensaje-error"></div>' +
            '<div class="grupo-campo"><label>Nombre de usuario</label><input type="text" id="muNombre" placeholder="Ej: pepe" autofocus></div>' +
            '<div class="fila-campos col-2">' +
            '  <div class="grupo-campo"><label>Contrasenia</label><input type="password" id="muPass" placeholder="Minimo 4 caracteres"></div>' +
            '  <div class="grupo-campo"><label>Rol</label><select id="muRol"><option value="Empleado">Empleado</option><option value="Cajero">Cajero</option></select></div>' +
            '</div>' +
            '<label style="font-size:12px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;display:block">Icono del usuario</label>' +
            '<div class="emoji-grid" id="muEmojiGrid">' +
            emojis.map(function (e) { return '<span class="emoji-item" data-emoji="' + e + '">' + e + '</span>'; }).join('') +
            '</div>' +
            '<div style="display:flex;align-items:center;gap:8px;margin-top:8px">' +
            '  <input type="file" id="muFileInput" accept="image/png,image/jpeg,image/webp" style="display:none">' +
            '  <button class="btn btn-secundario btn-chico" id="btnMuSubirImg" type="button">Subir imagen</button>' +
            '  <span style="font-size:11px;color:var(--text-muted)" id="muImgLabel"></span>' +
            '  <button class="btn btn-secundario btn-chico" id="btnMuLimpiarImg" type="button" style="display:none">Quitar</button>' +
            '</div>' +
            '<div id="muPreview" style="margin-top:8px"></div>' +
            '<div class="modal-footer">' +
            '  <button class="btn btn-secundario" id="btnCancelarUser">Cancelar</button>' +
            '  <button class="btn btn-primario" id="btnCrearUser">Crear usuario</button>' +
            '</div>';

        var overlay = abrirModal(contenido, refrescar);
        var imgDataURL = '';

        overlay.querySelector('#btnMuSubirImg').addEventListener('click', function () { overlay.querySelector('#muFileInput').click(); });
        overlay.querySelector('#muFileInput').addEventListener('change', function () {
            var file = this.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function () {
                imgDataURL = reader.result;
                overlay.querySelector('#muImgLabel').textContent = file.name;
                overlay.querySelector('#btnMuLimpiarImg').style.display = '';
                overlay.querySelector('#muEmojiGrid').querySelectorAll('.emoji-item').forEach(function (e) { e.classList.remove('seleccionado'); });
                overlay.querySelector('#muPreview').innerHTML = '<img src="' + reader.result + '" style="width:64px;height:64px;object-fit:cover;border-radius:50%;border:2px solid var(--accent)">';
            };
            reader.readAsDataURL(file);
        });
        overlay.querySelector('#btnMuLimpiarImg').addEventListener('click', function () {
            imgDataURL = '';
            overlay.querySelector('#muImgLabel').textContent = '';
            overlay.querySelector('#btnMuLimpiarImg').style.display = 'none';
            overlay.querySelector('#muFileInput').value = '';
            overlay.querySelector('#muPreview').innerHTML = '';
        });

        overlay.querySelector('#muEmojiGrid').addEventListener('click', function (e) {
            var item = e.target.closest('.emoji-item');
            if (!item) return;
            overlay.querySelector('#muEmojiGrid').querySelectorAll('.emoji-item').forEach(function (s) { s.classList.remove('seleccionado'); });
            item.classList.add('seleccionado');
            imgDataURL = '';
            overlay.querySelector('#muImgLabel').textContent = '';
            overlay.querySelector('#btnMuLimpiarImg').style.display = 'none';
        });

        overlay.querySelector('#btnCancelarUser').addEventListener('click', function () { _cerrarModal(overlay); });
        overlay.querySelector('#btnCrearUser').addEventListener('click', async function () {
            var errEl = overlay.querySelector('#modalUserError');
            errEl.classList.remove('visible');
            var nombre = overlay.querySelector('#muNombre').value.trim();
            var pass = overlay.querySelector('#muPass').value;
            var rol = overlay.querySelector('#muRol').value;
            if (!nombre || pass.length < 4) {
                errEl.textContent = 'Completa todos los campos (contrasenia minimo 4 caracteres).';
                errEl.classList.add('visible'); return;
            }
            // Guardar avatar
            var selEmoji = overlay.querySelector('#muEmojiGrid .emoji-item.seleccionado');
            if (imgDataURL) {
                localStorage.setItem('avatar_' + nombre, imgDataURL);
            } else if (selEmoji) {
                localStorage.setItem('avatar_' + nombre, selEmoji.getAttribute('data-emoji'));
            }
            var btn = overlay.querySelector('#btnCrearUser');
            btn.disabled = true; btn.textContent = 'Creando...';
            try { await API.post('/api/usuarios', { Nombre: nombre, Password: pass, Rol: rol }); _cerrarModal(overlay); }
            catch (ex) { errEl.textContent = ex.message; errEl.classList.add('visible'); }
            finally { btn.disabled = false; btn.textContent = 'Crear usuario'; }
        });
        overlay.querySelector('#muPass').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') overlay.querySelector('#btnCrearUser').click();
        });
    }

    // ============ UTILS ============
    function formatearPesos(valor) { return Number(valor || 0).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
    function formatearNumero(valor) { return Number(valor || 0).toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }); }

    function badgePago(v) {
        if (!v || !v.metodoPago) return '';
        if (v.metodoPago === 'Combinado') return '<span style="display:inline-block;background:linear-gradient(90deg,rgba(52,211,153,0.2),rgba(91,141,239,0.2));color:#fff;font-size:11px;font-weight:600;padding:3px 10px;border-radius:20px">Combinado</span>';
        if (v.metodoPago.toLowerCase() === 'efectivo') return '<span class="badge-efectivo">Efectivo</span>';
        if (v.metodoPago.toLowerCase() === 'mp') return '<span class="badge-mp">Mercado Pago</span>';
        return '<span>' + v.metodoPago + '</span>';
    }

    function horaVenta(fs) { try { return new Date(fs).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }); } catch (e) { return fs; } }
    function fechaCorta(fs) { try { return new Date(fs).toLocaleDateString('es-AR'); } catch (e) { return ''; } }

    function htmlEscape(texto) {
        if (!texto) return '';
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(texto));
        return div.innerHTML;
    }

    function _tieneIcono(nombre) {
        return true; // el usuario pone los PNGs en /iconos/
    }

    function iconoConFallback(nombre, emoji, width, height) {
        var w = width || 20;
        var h = height || 20;
        return '<img src="iconos/' + nombre + '.png" width="' + w + '" height="' + h + '" class="icono-tema-img" style="vertical-align:middle"' +
            ' onerror="var f=this.nextElementSibling||document.createElement(\'span\');f.innerHTML=\'' + emoji + '\';f.style.fontSize=\'' + (w+2) + 'px\';f.style.verticalAlign=\'middle\';this.parentNode.replaceChild(f,this)">';
    }

    function aplicarTema(tema) {
        var toggle = document.getElementById('btnToggleTema');
        if (tema === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('tema', 'light');
            if (toggle) toggle.setAttribute('aria-pressed', 'false');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('tema', 'dark');
            if (toggle) toggle.setAttribute('aria-pressed', 'true');
        }
    }

    function _renderAvatar(nombreArchivo, inicial, extraClass) {
        var cls = extraClass || '';
        var guardado = localStorage.getItem('avatar_' + nombreArchivo);
        var contenido = guardado || htmlEscape(inicial || '?');
        var esDataUrl = guardado && guardado.indexOf('data:') === 0;
        var esEmoji = guardado && guardado.length <= 4;
        var esArchivo = guardado && !esDataUrl && !esEmoji;
        return '<div class="avatar ' + cls + '" style="position:relative">' +
            (esDataUrl
                ? '<img src="' + guardado + '" width="100%" height="100%" style="position:absolute;inset:0;object-fit:cover;border-radius:50%">'
                : '<img src="iconos/' + nombreArchivo + '.png" width="100%" height="100%" style="position:absolute;inset:0;object-fit:cover;border-radius:50%' + (esEmoji ? ';display:none' : '') + '" onerror="this.style.display=\'none\'">') +
            contenido +
            '</div>';
    }

    function _armarDropdownUsuario(userActual) {
        var menu = document.getElementById('dropdownMenu');
        if (!menu) return;
        var recientes = API.obtenerUsuariosRecientes();
        var html = '';
        recientes.forEach(function (r) {
            var esActual = r.nombre === userActual;
            html += '<button class="btn-cambiar-usuario' + (esActual ? ' usuario-actual-btn' : '') + '" data-nombre="' + htmlEscape(r.nombre) + '">' +
                _renderAvatar(r.nombre, r.nombre[0], 'avatar-chico') + ' ' + htmlEscape(r.nombre) +
                (esActual ? ' <span style="color:var(--accent);font-size:10px;margin-left:auto">actual</span>' : '') +
                '</button>';
        });
        html += '<hr style="border-color:var(--border-card);margin:4px 0">';
        html += '<button class="peligro" id="btnCerrarSesion">&#10153; Cerrar sesion</button>';
        menu.innerHTML = html;

        document.getElementById('btnCerrarSesion').addEventListener('click', function () {
            _quitarCarritoFlotante();
            API.cerrarSesion();
            App.iniciar();
        });

        menu.querySelectorAll('.btn-cambiar-usuario').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var nombre = this.getAttribute('data-nombre');
                if (nombre === userActual) return;
                _pedirPassword(nombre).then(function (pass) {
                    return API.post('/api/auth/login', { Usuario: nombre, Password: pass });
                }).then(function (u) {
                    API.guardarSesion(u);
                    _quitarCarritoFlotante();
                    mostrar(_config);
                }).catch(function (err) {
                    if (err) alert('Contrasenia incorrecta.');
                });
            });
        });
    }

    function _pedirPassword(nombreUsuario) {
        return new Promise(function (resolve, reject) {
            var overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            overlay.style.zIndex = '1100';
            overlay.innerHTML =
                '<div class="modal" style="width:360px;padding:28px">' +
                '  <div class="modal-header"><h2>Ingresar como ' + htmlEscape(nombreUsuario) + '</h2></div>' +
                '  <div id="passError" class="mensaje-error"></div>' +
                '  <div class="grupo-campo">' +
                '    <label>Contrasenia</label>' +
                '    <input type="password" id="inputPassModal" placeholder="Contrasenia..." autofocus>' +
                '  </div>' +
                '  <div class="modal-footer">' +
                '    <button class="btn btn-secundario" id="btnCancelarPass">Cancelar</button>' +
                '    <button class="btn btn-primario" id="btnConfirmarPass">Ingresar</button>' +
                '  </div>' +
                '</div>';
            document.body.appendChild(overlay);

            var limpiar = function () {
                if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            };

            overlay.addEventListener('click', function (e) {
                if (e.target === overlay) { limpiar(); reject(null); }
            });

            overlay.querySelector('#btnCancelarPass').addEventListener('click', function () {
                limpiar(); reject(null);
            });

            overlay.querySelector('#btnConfirmarPass').addEventListener('click', function () {
                var pass = overlay.querySelector('#inputPassModal').value;
                if (!pass) {
                    overlay.querySelector('#passError').textContent = 'Ingresa la contrasenia.';
                    overlay.querySelector('#passError').classList.add('visible');
                    return;
                }
                limpiar();
                resolve(pass);
            });

            overlay.querySelector('#inputPassModal').addEventListener('keydown', function (e) {
                if (e.key === 'Enter') overlay.querySelector('#btnConfirmarPass').click();
                if (e.key === 'Escape') { limpiar(); reject(null); }
            });
        });
    }

    return { mostrar: mostrar };
})();
