var SetupScreen = (function () {
    var _pasoActual = 1;
    var _onCompletado = null;
    var _avatarEmpresa = '';

    var EMOJIS = ['🏪','🥬','🍎','🥩','👕','🍞','🔧','🍬','💊','📚','☕','🍕','🏠','⭐','🔥','💎','🎯','🚀','💡','🛒','📦','💰','🧾','📊','🍽️','🥗','🧁','🍺','👗','🪛'];

    function mostrar(onCompletado) {
        _onCompletado = onCompletado;
        _pasoActual = 1;
        _avatarEmpresa = '';

        document.getElementById('app').innerHTML =
            '<div class="setup-pantalla">' +
            '  <div class="setup-card" style="width:500px;max-width:95vw">' +
            '    <h1>Bienvenido</h1>' +
            '    <p class="subtitulo">Configuremos tu negocio en unos segundos.</p>' +
            '    <div class="pasos-indicador" id="pasosDots">' +
            '      <div class="step-dot activo"></div>' +
            '      <div class="step-dot"></div>' +
            '      <div class="step-dot"></div>' +
            '    </div>' +
            '    <div id="mensajeErrorSetup" class="mensaje-error"></div>' +
            '    <!-- PASO 1: Emprendimiento -->' +
            '    <div class="setup-paso activo" data-paso="1">' +
            '      <h3>Datos del negocio</h3>' +
            '      <div class="grupo-campo">' +
            '        <label for="setupNombre">Nombre del emprendimiento</label>' +
            '        <input type="text" id="setupNombre" placeholder="Ej: Verduleria Don Carlos" autofocus>' +
            '      </div>' +
            '      <div class="grupo-campo">' +
            '        <label for="setupRubro">Rubro</label>' +
            '        <select id="setupRubro">' +
            '          <option value="">Seleccionar rubro...</option>' +
            '          <option value="Verduleria">Verduleria</option>' +
            '          <option value="Restaurante">Restaurante</option>' +
            '          <option value="Comercio">Comercio / Almacen</option>' +
            '          <option value="Ropa">Ropa / Indumentaria</option>' +
            '          <option value="Panaderia">Panaderia</option>' +
            '          <option value="Carniceria">Carniceria</option>' +
            '          <option value="Ferreteria">Ferreteria</option>' +
            '          <option value="Kiosco">Kiosco</option>' +
            '          <option value="Farmacia">Farmacia</option>' +
            '          <option value="Libreria">Libreria</option>' +
            '          <option value="Otro">Otro</option>' +
            '        </select>' +
            '      </div>' +
            '      <label style="font-size:12px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;display:block">Icono del negocio (opcional)</label>' +
            '      <div class="emoji-grid" id="emojiGrid1"></div>' +
            '      <button class="btn btn-primario" id="btnPaso1" style="margin-top:12px">Siguiente</button>' +
            '    </div>' +
            '    <!-- PASO 2: Usuario Admin -->' +
            '    <div class="setup-paso" data-paso="2">' +
            '      <h3>Crear usuario administrador</h3>' +
            '      <div class="grupo-campo">' +
            '        <label for="setupAdminUser">Nombre de usuario</label>' +
            '        <input type="text" id="setupAdminUser" placeholder="admin">' +
            '      </div>' +
            '      <div class="fila-campos col-2">' +
            '        <div class="grupo-campo">' +
            '          <label for="setupAdminPass">Contrasenia</label>' +
            '          <input type="password" id="setupAdminPass" placeholder="Minimo 4 caracteres">' +
            '        </div>' +
            '        <div class="grupo-campo">' +
            '          <label for="setupAdminPass2">Repetir contrasenia</label>' +
            '          <input type="password" id="setupAdminPass2" placeholder="Repeti la contrasenia">' +
            '        </div>' +
            '      </div>' +
            '      <label style="font-size:12px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;display:block">Tu icono (opcional)</label>' +
            '      <div class="emoji-grid" id="emojiGrid2"></div>' +
            '      <button class="btn btn-primario" id="btnPaso2" style="margin-top:12px">Crear y comenzar</button>' +
            '    </div>' +
            '    <!-- PASO 3: Listo -->' +
            '    <div class="setup-paso" data-paso="3" style="text-align:center">' +
            '      <div style="font-size:48px;margin-bottom:16px">&#9989;</div>' +
            '      <h3>Todo listo</h3>' +
            '      <p style="color:var(--text-primary);font-size:14px;margin-bottom:24px">Tu negocio esta configurado. Ahora inicia sesion.</p>' +
            '      <button class="btn btn-primario" id="btnPaso3">Ir al login</button>' +
            '    </div>' +
            '  </div>' +
            '</div>';

        _renderEmojiGrid('emojiGrid1', 'empresa');
        _renderEmojiGrid('emojiGrid2', '');

        document.getElementById('btnPaso1').addEventListener('click', paso1);
        document.getElementById('btnPaso2').addEventListener('click', paso2);
        document.getElementById('btnPaso3').addEventListener('click', function () {
            if (_onCompletado) _onCompletado();
        });

        document.getElementById('setupNombre').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') paso1();
        });
        document.getElementById('setupAdminPass2').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') paso2();
        });
    }

    function _renderEmojiGrid(containerId, storageKey) {
        var grid = document.getElementById(containerId);
        if (!grid) return;
        var actual = storageKey ? (localStorage.getItem('avatar_' + storageKey) || '') : '';
        var html = '';
        EMOJIS.forEach(function (e) {
            html += '<span class="emoji-item' + (e === actual ? ' seleccionado' : '') + '" data-emoji="' + e + '" data-key="' + (storageKey || '') + '">' + e + '</span>';
        });
        grid.innerHTML = html;
        grid.querySelectorAll('.emoji-item').forEach(function (el) {
            el.addEventListener('click', function () {
                grid.querySelectorAll('.emoji-item').forEach(function (s) { s.classList.remove('seleccionado'); });
                el.classList.add('seleccionado');
            });
        });
    }

    function _guardarEmoji(storageKey) {
        var sel = document.querySelector('#emojiGrid2 .emoji-item.seleccionado');
        if (sel) {
            var emoji = sel.getAttribute('data-emoji');
            var adminUser = document.getElementById('setupAdminUser').value.trim();
            if (adminUser && emoji) {
                localStorage.setItem('avatar_' + adminUser, emoji);
            }
        }
    }

    function mostrarError(msg) {
        var el = document.getElementById('mensajeErrorSetup');
        el.textContent = msg;
        el.classList.add('visible');
    }

    function ocultarError() {
        document.getElementById('mensajeErrorSetup').classList.remove('visible');
    }

    function cambiarPaso(nuevo) {
        ocultarError();
        document.querySelector('.setup-paso.activo').classList.remove('activo');
        document.querySelector('.setup-paso[data-paso="' + nuevo + '"]').classList.add('activo');
        var dots = document.querySelectorAll('#pasosDots .step-dot');
        dots.forEach(function (d, i) {
            d.className = 'step-dot';
            if (i + 1 < nuevo) d.classList.add('hecho');
            if (i + 1 === nuevo) d.classList.add('activo');
        });
        _pasoActual = nuevo;
    }

    async function paso1() {
        ocultarError();
        var nombre = document.getElementById('setupNombre').value.trim();
        var rubro = document.getElementById('setupRubro').value;
        if (!nombre) { mostrarError('Ingresa el nombre del emprendimiento.'); return; }
        if (!rubro) { mostrarError('Selecciona un rubro.'); return; }
        var selEmpresa = document.querySelector('#emojiGrid1 .emoji-item.seleccionado');
        if (selEmpresa) localStorage.setItem('avatar_empresa', selEmpresa.getAttribute('data-emoji'));
        cambiarPaso(2);
        setTimeout(function () { document.getElementById('setupAdminUser').focus(); }, 100);
    }

    async function paso2() {
        ocultarError();
        var user = document.getElementById('setupAdminUser').value.trim();
        var pass = document.getElementById('setupAdminPass').value;
        var pass2 = document.getElementById('setupAdminPass2').value;
        if (!user) { mostrarError('Ingresa un nombre de usuario.'); return; }
        if (pass.length < 4) { mostrarError('La contrasenia debe tener al menos 4 caracteres.'); return; }
        if (pass !== pass2) { mostrarError('Las contrasenias no coinciden.'); return; }

        _guardarEmoji('');

        var nombreEmp = document.getElementById('setupNombre').value.trim();
        var rubroEmp = document.getElementById('setupRubro').value;

        var btn = document.getElementById('btnPaso2');
        btn.disabled = true; btn.textContent = 'Guardando...';
        try {
            await API.post('/api/config/setup', {
                NombreEmprendimiento: nombreEmp, Rubro: rubroEmp,
                AdminUsuario: user, AdminPassword: pass
            });
            cambiarPaso(3);
        } catch (ex) {
            mostrarError(ex.message);
        } finally {
            btn.disabled = false; btn.textContent = 'Crear y comenzar';
        }
    }

    return { mostrar: mostrar };
})();
