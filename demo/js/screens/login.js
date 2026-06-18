var LoginScreen = (function () {
    var _onLogin = null;

    function mostrar(configuracion, onLogin) {
        _onLogin = onLogin;

        document.getElementById('app').innerHTML =
            '<div class="login-pantalla">' +
            '  <div class="login-card">' +
            '    <div class="emprendimiento-nombre" id="loginEmpresa">...</div>' +
            '    <div class="rubro-tag" id="loginRubro">...</div>' +
            '    <h2>Iniciar sesion</h2>' +
            '    <div id="mensajeErrorLogin" class="mensaje-error"></div>' +
            '    <div class="grupo-campo">' +
            '      <label for="loginUser">Usuario</label>' +
            '      <input type="text" id="loginUser" placeholder="Tu nombre de usuario" autofocus>' +
            '    </div>' +
            '    <div class="grupo-campo">' +
            '      <label for="loginPass">Contraseña</label>' +
            '      <input type="password" id="loginPass" placeholder="Tu contrasenia">' +
            '    </div>' +
            '    <button class="btn btn-primario" id="btnLogin">Ingresar</button>' +
            '  </div>' +
            '</div>';

        document.getElementById('loginEmpresa').textContent = configuracion.Nombre || 'Mi Negocio';
        document.getElementById('loginRubro').textContent = configuracion.Rubro || '';

        document.getElementById('btnLogin').addEventListener('click', hacerLogin);
        document.getElementById('loginPass').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') hacerLogin();
        });
    }

    function mostrarError(msg) {
        var el = document.getElementById('mensajeErrorLogin');
        el.textContent = msg;
        el.classList.add('visible');
    }

    function ocultarError() {
        var el = document.getElementById('mensajeErrorLogin');
        el.classList.remove('visible');
    }

    async function hacerLogin() {
        ocultarError();
        var user = document.getElementById('loginUser').value.trim();
        var pass = document.getElementById('loginPass').value;

        if (!user || !pass) { mostrarError('Completa todos los campos.'); return; }

        var btn = document.getElementById('btnLogin');
        btn.disabled = true;
        btn.textContent = 'Ingresando...';

        try {
            var usuario = await API.post('/api/auth/login', {
                Usuario: user,
                Password: pass
            });
            API.guardarSesion(usuario);
            if (_onLogin) _onLogin(usuario);
        } catch (ex) {
            mostrarError('Usuario o contrasenia incorrectos.');
        } finally {
            btn.disabled = false;
            btn.textContent = 'Ingresar';
        }
    }

    return { mostrar: mostrar };
})();
