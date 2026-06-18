var App = (function () {
    async function iniciar() {
        try {
            var estado = await API.get('/api/config/estado');

            if (!estado.configurado || !estado.hayUsuarios) {
                SetupScreen.mostrar(function () {
                    LoginScreen.mostrar({ nombre: '', rubro: '' }, function () {
                        cargarHome();
                    });
                });
                return;
            }

            var sesion = API.cargarSesion();
            if (sesion) {
                API.setUsuario(sesion);
                cargarHome();
                return;
            }

            var config = await API.get('/api/config');
            LoginScreen.mostrar(config, function () {
                cargarHome();
            });

        } catch (ex) {
            document.getElementById('app').innerHTML =
                '<div style="display:flex;align-items:center;justify-content:center;height:100vh;flex-direction:column;gap:16px">' +
                '<div style="font-size:48px">&#x1f6a7;</div>' +
                '<h2 style="color:#475569">Error al cargar</h2>' +
                '<p style="color:#94a3b8">' + ex.message + '</p>' +
                '<button class="btn btn-primario" style="width:auto" onclick="App.iniciar()">Reintentar</button>' +
                '</div>';
        }
    }

    async function cargarHome() {
        try {
            var config = await API.get('/api/config');
            HomeScreen.mostrar(config);
        } catch (ex) {
            HomeScreen.mostrar({ nombre: 'Demo', rubro: '' });
        }
    }

    return { iniciar: iniciar };
})();

document.addEventListener('DOMContentLoaded', function () {
    App.iniciar();
});
