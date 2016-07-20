// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397705
// Para depurar código al cargar la página en dispositivos/emuladores Ripple o Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
var cordova6puro;
(function (cordova6puro) {
    "use strict";
    var Application;
    (function (Application) {
        function initialize() {
            document.addEventListener('deviceready', onDeviceReady, false);
        }
        Application.initialize = initialize;
        function onDeviceReady() {
            // Controlar la pausa de Cordova y reanudar eventos
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);
            // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.
            var element = document.getElementById("deviceready");
            element.innerHTML = 'Device Ready';
            element.className += ' ready';
        }
        function onPause() {
            // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
        }
        function onResume() {
            // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
        }
    })(Application = cordova6puro.Application || (cordova6puro.Application = {}));
    window.onload = function () {
        Application.initialize();
    };
})(cordova6puro || (cordova6puro = {}));
//# sourceMappingURL=appBundle.js.map