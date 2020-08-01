var $$ = Dom7;

//MuestraMensaje();

var app = {
    /* Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }*/
};



function showSplashScreen(){

  setTimeout(function(){  InitApp(); }, 2000);
}

function InitApp(){
  
  if(localStorage.getItem("team-login", "autenticado")=="autenticado"){
    mainView.router.navigate('/home/',{animate:true});
  }else{
    mainView.router.navigate('/login/',{animate:true});
  }
}

function CerrarSesion(){
  localStorage.setItem("team-login", "false");
  mainView.router.navigate('/login/',{animate:true});
}


var app7 = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/home/',
        url: 'views/home.html',
      },
      {
        path: '/login/',
        url: 'views/login.html',
      },
      {
        path: '/registro/',
        url: 'views/registro.html',
      },
      {
        path: '/perfil/',
        url: 'views/perfil.html',
      },
      {
        path: '/calenda/',
        url: 'views/calenda.html',
      },
      {
        path: '/noti/',
        url: 'views/noti.html',
      },
      {
        path: '/planta/',
        url: 'views/planta.html',
      },
      {
        path: '/home2/',
        url: 'views/home2.html',
      },
      {
        path: '/bitacora/',
        url: 'views/bitacora.html',
      },
      {
        path: '/inspeccion/',
        url: 'views/inspeccion.html',
      },
      {
        path: '/scrap/',
        url: 'views/scrap.html',
      },
    ],
    // ... other parameters
  });
  
  var mainView = app7.views.create('.view-main');

  // Crear codigo que carga 
//app7.preloader.show('blue');

// Crear notificaciones 
var notificationFull = app7.notification.create({
    icon: '<i class="f7-icons">alarm</i>',
    title: 'Framework7',
    titleRightText: 'now',
    subtitle: 'This is a subtitle',
    text: 'This is a simple notification message',
    
  });

  function Ingresar(){
      var usuario = $$('#usuario').val();
      var password = $$('#password').val();

      app7.preloader.show('blue');

      app7.request({
        url: 'http://rysdepuebla.com/app/api/login.php',
        data:{username:usuario,password:password},
        method: 'POST', 
        crossDomain: true,
        success:function(data){

            app7.preloader.hide();

            var objson = JSON.parse(data);
            if(objson.data == "AUTENTICADO"){

              localStorage.setItem("team-login", "autenticado");
       
            mainView.router.navigate('/home/',{animate:true});
            }else{
              console.log("respuesta appi:"+objson.data);
              alert("Usuario no encotrado");
            }

        },
        error:function(error){

          app7.preloader.hide();
        }
      });
  }


  function Registrarse(){

    var nombre = $$('#nombre').val();
    var apellidos = $$('#apellidos').val();
    var telefono = $$('#telefono').val();
    var correo = $$('#correo').val();
    var usuario = $$('#usuarior').val();
    var password = $$('#passwordr').val();
  
    app7.preloader.show('blue');
  
    app7.request({
      url: 'http://localhost/team/api/users.php',
      data:{usuario:usuario,password:password,nombre:nombre,apellidos:apellidos,telefono:telefono,correo:correo},
      method: 'POST', 
      crossDomain: true,
      success:function(data){
  
          app7.preloader.hide();
  
          var objson = JSON.parse(data);
          if(objson.status_message == "CORRECTO"){
     
          alert("Muchas gracias por registarte ya puedes acceder");
          mainView.router.navigate('/login/',{animate:true});

          }else{
  
            alert("Hubo un error intentalo nuevamente");
          }
  
      },
      error:function(error){
  
        app7.preloader.hide();
      }
    });
  
  }

  function AbrirNotificacion(){
    notificationFull.open();
  }

  function MuestraMensaje(){
    alert("ehh funciona");
    console.log("ehh funciona");
  }

  $$(document).on('page:init', '.page[data-name="login"]', function (e) {
     
  
          
  
  });