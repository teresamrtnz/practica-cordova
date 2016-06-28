// Utlizaremos una función anónima autoejecutable de modo que nuestras variables no sean globales. Más info: http://www.formandome.es/javascript/objetos-variables-funciones-javascript/

(function() {
    /* ---------------------------------- Variables locales ---------------------------------- */
    //var adapter = new WebSqlAdapter();
    //var adapter = new MemoryAdapter();
    //var adapter = new JSONPAdapter();
    var adapter = new LocalStorageAdapter();
    adapter.inicializar().done(function() {
        console.log("Inicializado: Adaptador de datos");

        // Añado render
        //renderHomeView();
        // Ahora lo invoco desde HomeView
        //$('body').html(new HomeView(adapter).render());
        // Nueva forma de enrutar
        route();
    });

    var futbolistaURL = /^#futbolistas\/(\d{1,})/;
  

    /* --------------------------------- Registro de eventos 
    -------------------------------- */



    $(window).on('hashchange', route);
    
    function route() {
        var hash = window.location.hash;
        if (!hash) {
            $('body').html(new HomeView(adapter).render());
            return;
        }
        var match = hash.match(futbolistaURL);
        if (match) {
            adapter.encontrarPorId(Number(match[1])).done(function(futbolista) {
                $('body').html(new JugadorView(adapter, futbolista).render());
            });
        }
    }



    /* Lo comento para que los eventos esten dentro de la vista
    $('#btnBuscar').on('keyup', encontrarPorNombre);
    

    $('#btnAyuda').on('click', function() {
        alert("Una ayuda nunca viene mal :-)")
    });
    


    document.addEventListener('deviceready', function() {
        if (navigator.notification) {
            // Si disponemos de notificaciones nativas, sobreescribimos el alert del navegador:
            window.alert = function(message) {
                navigator.notification.alert(
                    message, // mensaje
                    null, // función de callback
                    "Workshop", // título
                    'OK' // Nombre botón
                );
            };
        }
    }, false);
    
    */


    /* ---------------------------------- Funciones locales ---------------------------------- */

    /*
    function encontrarPorNombre() {
        adapter.encontrarPorNombre($('#btnBuscar').val()).done(function(futbolistas) {
            var l = futbolistas.length;
            var e;
            $('#lstFutbolistas').empty();
            for (var i = 0; i < l; i++) {
                e = futbolistas[i];
                $('#lstFutbolistas').append('<li><a href="#futbolistas/' + e.id + '">' + e.nombre + ' ' + e.apellido + '</a></li>');
            }
        });
    }

    function renderHomeView() {
        var html = "<header>" +
            "<h1>Futbolistas</h1>" +
            "</header>" +
            "<input id='btnBuscar' type='search' placeholder='Introduce futbolista'/>" +
            "<ul id='lstFutbolistas'></ul>"
        $('body').html(html);
        $('#btnBuscar').on('keyup', encontrarPorNombre);
    }
    */

    /*

    Lo llevamos a la vista HomeView

    function renderHomeView() {
        $('body').html(Handlebars.templates.home());
        $('#btnBuscar').on('keyup', encontrarPorNombre);
    }

    function encontrarPorNombre() {
        adapter.encontrarPorNombre($('#btnBuscar').val()).done(function(futbolistas) {
            $("#lstFutbolistas").html(Handlebars.templates.listaJugadores(futbolistas));
        });
    }

    */

}());
