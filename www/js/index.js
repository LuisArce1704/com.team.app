var $$ = Dom7;

//MuestraMensaje();

var token="";
var platform="";
var resta="";

var app = {
  // Application Constructor
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


    platform = device.platform;

    if(device.platform !="browser"){
     
        var push = PushNotification.init({
              android:{

              },ios:{
                  alert:"true",
                  badge:true,
                  sound:'false'
              }
        });


        push.on('registration', function (data) {
         
          

          getToken(data.registrationId,device.platform);
          
          token = data.registrationId;
          console.log(data.registrationId);
          console.log(data.registrationType);
      
          });


          push.on('notification', function (data) {

              console.log(data.message);
              console.log(data.title);
              console.log(data.count);
              console.log(data.sound);
              console.log(data.image);
              console.log(data.additionalData);

          });

        }

  }
};

function entrada(){
  mainView.router.navigate('/planta/',{animate:true});
  localStorage.setItem("Entrada", "autenticado");
}
function salida(){
  localStorage.setItem("Entrada", "false");
  var usuario = localStorage.getItem("usuario");
  var turno = localStorage.getItem("turno");
  var planta = localStorage.getItem("Planta");
  mainView.router.navigate('/bitacora/',{animate:true});
/*
  app7.preloader.show('blue');
  app7.request({
    url: 'salida.php',
    data:{  planta:planta,usuario:usuario,turno:turno},
    method: 'POST', 
    crossDomain: true,
    success:function(data){
      alert(data);
      app7.preloader.hide();
      var objson = JSON.parse(data);
      if(objson.status_message == "CORRECTO"){
     
        alert("Inicia tu jornada de trabajo ¡EXCELENTE DIA!");
        mainView.router.navigate('/bitacora/',{animate:true});

        }else{

          alert("Hubo un error intentalo nuevamente");
        }
      },
      error:function(error){
  
        app7.preloader.hide();
      }
    });*/

}




function showSplashScreen(){

  setTimeout(function(){  InitApp(); }, 2000);
}

function InitApp(){
  if(localStorage.getItem("Entrada", "autenticado")=="autenticado"){
    mainView.router.navigate('/home2/',{animate:true});
  }else{
  if(localStorage.getItem("team-login", "autenticado")=="autenticado"){
    mainView.router.navigate('/home/',{animate:true});
  }else{
    mainView.router.navigate('/login/',{animate:true});
  }
}}

function CerrarSesion(){
  localStorage.setItem("team-login", "false");
  localStorage.setItem("usuario", "");
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
      {
        path: '/scrap2/',
        url: 'views/scrap2.html',
      },
      {
        path: '/retrabajo/',
        url: 'views/retrabajo.html',
      },
      {
        path: '/nueva/',
        url: 'views/nueva.html',
      },
      {
        path: '/defecto/',
        url: 'views/defecto.html',
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

  function getToken(token,platform){

    var token = token;
    var platform = platform;


    app7.request({
      url: 'https://rysdepuebla.com/app/api/settoken.php',
      data:{token:token,platform:platform},
      method:'POST',
      crossDomain: true,
      success:function(data){
     
      
      },
      error:function(error){

      }
      
      });
    
  }

  function Ingresar(){
      var usuario = $$('#usuario').val();
      var password = $$('#password').val();
      
      if(usuario <= 0){
        alert("Ingresa un usuario");
      }else{
      app7.preloader.show('blue');
      app7.request({
        url: 'https://rysdepuebla.com/app/api/login.php',
        data:{username:usuario,password:password},
        method: 'POST', 
        crossDomain: true,
        success:function(data){
            
            app7.preloader.hide();

            var objson = JSON.parse(data);
            if(objson.data == "AUTENTICADO"){

              localStorage.setItem("team-login", "autenticado");
              localStorage.setItem("usuario", usuario);
       
            mainView.router.navigate('/home/',{animate:true});
            }else{
              console.log("respuesta appi:"+objson.data);
              alert("Usuario no encotrado");
            }

        },
        error:function(error){

          app7.preloader.hide();
        }
      });}
  }

function NuevaPieza(){
  var numpieza = $$('#numpieza').val();
  var nompieza = $$('#nompieza').val();
  var idplanta=localStorage.getItem("idplanta");

  if(nompieza != ""){
  if(numpieza != ""){
  app7.preloader.show('blue');
  app7.request({
    url: 'https://rysdepuebla.com/app/api/nueva.php',
    data:{numpieza:numpieza,nompieza:nompieza,idplanta:idplanta},
    method: 'POST', 
    crossDomain: true,
    success:function(data){

      app7.preloader.hide();
      var objson = JSON.parse(data);
      if(objson.status_message == "CORRECTO"){
     
        alert("La pieza se registro correctamente");
        mainView.router.navigate('/home2/',{animate:true});

        }else{
          
          alert("La pieza o numero ya existe");
        }
      },
      error:function(error){
  
        app7.preloader.hide();
      }
    });
  }else{
      alert("¡No has ingresado un NUMERO de Parte!");
    }}else{
      alert("¡No has ingresado un NOMBRE de Parte!");
    }
}

function NuevaDefecto(){
  var defecto = localStorage.getItem("suma");
  var numdefecto = $$('#numdefecto').val();
  var idplanta=localStorage.getItem("idplanta");

  if(numdefecto != ""){
  app7.preloader.show('blue');
  app7.request({
    url: 'https://rysdepuebla.com/app/api/nuevodefecto.php',
    data:{defecto:defecto,numdefecto:numdefecto,idplanta:idplanta},
    method: 'POST', 
    crossDomain: true,
    success:function(data){

      app7.preloader.hide();
      var objson = JSON.parse(data);
      if(objson.status_message == "CORRECTO"){
     
        alert("El defecto se registro correctamente");
        mainView.router.navigate('/home2/',{animate:true});

        }else{

          alert("¡El defecto ya existe!");
        }
      },
      error:function(error){
  
        app7.preloader.hide();
      }
    });
  }else{
      alert("¡No has ingresado un NUMERO de Parte!");
    }
}


  function Registrarse(){

    var nombre = $$('#nombre').val();
    var apellidos = $$('#apellidos').val();
    var telefono = $$('#telefono').val();
    var idempre = $$('#idempre').val();
    var usuario = $$('#usuarior').val();
    var password = $$('#passwordr').val();
   
  
    //app7.preloader.show('blue');
    if(nombre<=0){
      alert("¡Ingresa un NOMBRE!")
    }else{
      if(apellidos<=0){
        alert("¡Ingresa un Apellido!")
      }else{
        if(telefono<=0){
          alert("¡Ingresa un telefono!")
        }else{
          if(idempre<=0){
            alert("¡Ingresa un ID!")
          }else{
            if(usuario<=0){
              alert("¡Ingresa un usuario!")
            }else{
              if(password<=0){
                alert("¡Ingresa un Pasword!")
              }else{
                
              app7.request({
                url: 'https://rysdepuebla.com/app/api/users.php',
                data:{usuario:usuario,password:password,nombre:nombre,apellidos:apellidos,telefono:telefono,idempre:idempre},
                method: 'POST', 
                crossDomain: true,
                success:function(data){
            
                    app7.preloader.hide();
            
                    var objson = JSON.parse(data);
                    if(objson.status_message == "CORRECTO"){
              
                    alert("Muchas gracias por registarte ya puedes acceder");
                    mainView.router.navigate('/login/',{animate:true});

                    }else{
                      if(objson.status_message == "INCORRECTO"){
              
                        alert("INGRESA OTRO USUARIO");
                        mainView.router.navigate('/registro/',{animate:true});
    
                        }}
            
                },
                error:function(error){
            
                  app7.preloader.hide();
                }
              });
                        }
            }
          }
        }
      }
    }
    
  
  }

  function AbrirNotificacion(){
    notificationFull.open();
  }

  function MuestraMensaje(){
    alert("ehh funciona");
    console.log("ehh funciona");
  }

  $$(document).on('page:init', '.page[data-name="inspeccion"]', function (e) {
    
    
    var embarque = localStorage.getItem("embarque");
    $$('#embarque').val(embarque);
    
    app7.preloader.show('blue');
    app7.request({
      url: 'https://rysdepuebla.com/app/api/piezas.php',
      data:{},
      method: 'POST', 
      crossDomain: true,
      success:function(data){
  
        app7.preloader.hide();
        var objson = JSON.parse(data);
        var pieza="";
        var idplanta=localStorage.getItem("idplanta");
        for(x in objson.data){
          
          console.log(objson.data[x].idplanta);
          
          pieza = '<option value="'+objson.data[x].nompieza+'-'+objson.data[x].numpieza+'"> '+objson.data[x].numpieza+'  </option>';
    
          if(idplanta == objson.data[x].idplanta){
          $$('#piezas-1').append(pieza);
        }
        }
     },
     error:function(error){
    
      app7.preloader.hide();
    }
    });



     
    
    

    
  });
 
  

  $$(document).on('page:init', '.page[data-name="scrap"]', function (e) {
 
     $$('#piezas-scrap').html(resta);
     app7.preloader.show('blue');
     app7.request({
      url: 'https://rysdepuebla.com/app/api/codigo.php',
      data:{},
      method: 'POST', 
      crossDomain: true,
      success:function(data){
        
        app7.preloader.hide(); 
        var objson = JSON.parse(data);
        var plan="";
        var idplanta = localStorage.getItem("idplanta");
        for(x in objson.data){
  
          console.log(objson.data[x].idplanta);
  
          plan = '<option value="'+objson.data[x].codigo+'-'+objson.data[x].defecto+'"> '+objson.data[x].codigo+' </option>';
          if(idplanta == objson.data[x].idplanta){
          $$('#codigo').append(plan);
          }
        } 
     },
     error:function(error){
    
      app7.preloader.hide();
    }
    });
    
  });
  
  $$(document).on('page:init', '.page[data-name="scrap2"]', function (e) {  
    var resta = (parseInt(localStorage.getItem("resta")));
    $$('#piezas-scrap1').html(resta);

    app7.preloader.show('blue');
    app7.request({
      url: 'https://rysdepuebla.com/app/api/codigo.php',
      data:{},
      method: 'POST', 
      crossDomain: true,
      success:function(data){
        
        app7.preloader.hide(); 
        var objson = JSON.parse(data);
        var plan="";
        var idplanta = localStorage.getItem("idplanta");
        for(x in objson.data){
  
          console.log(objson.data[x].idplanta);
  
          plan = '<option value="'+objson.data[x].codigo+'-'+objson.data[x].defecto+'"> '+objson.data[x].codigo+' </option>';
          if(idplanta == objson.data[x].idplanta){
          $$('#codigo-1').append(plan);
          }
        } 
     },
     error:function(error){
    
      app7.preloader.hide();
    }
    });
  });
  
  $$(document).on('page:init', '.page[data-name="defecto"]', function (e) {  
    var suma=1;
    $$('#defecto').html(suma);
    localStorage.setItem("suma",suma);
    app7.preloader.show('blue');
    app7.request({
      url: 'https://rysdepuebla.com/app/api/codigo.php',
      data:{},
      method: 'POST', 
      crossDomain: true,
      success:function(data){
        
        app7.preloader.hide(); 
        var objson = JSON.parse(data);
        ;
        var suma=1;
        var idplanta = localStorage.getItem("idplanta");
        for(x in objson.data){
  
          console.log(objson.data[x].idplanta);
  
          if(idplanta == objson.data[x].idplanta){

            suma=suma+1;
            $$('#defecto').html(suma);
            localStorage.setItem("suma",suma);
          }
        } 
        
        
     },
     error:function(error){
    
      app7.preloader.hide();
    }
    });
    

  });




  

  $$(document).on('page:init', '.page[data-name="planta"]', function (e) {
    app7.preloader.show('blue');
    app7.request({
      url: 'https://rysdepuebla.com/app/api/planta.php',
      data:{},
      method: 'POST', 
      crossDomain: true,
      success:function(data){
  
        app7.preloader.hide();
        var objson = JSON.parse(data);
        var turno="";
  
        for(x in objson.data){
  
          console.log(objson.data[x].turno);
  
          turno = '<option value="'+objson.data[x].turno+'"> '+objson.data[x].turno+' </option>';
  
         
          $$('#turno-1').append(turno);
         
        
        } 
     },
     error:function(error){
    
      app7.preloader.hide();
    }
    });

    app7.request({
      url: 'https://rysdepuebla.com/app/api/planta1.php',
      data:{},
      method: 'POST', 
      crossDomain: true,
      success:function(data){
  
        app7.preloader.hide();
        var objson = JSON.parse(data);
        var plan="";
  
        for(x in objson.data){
  
          console.log(objson.data[x].planta);
  
          plan = '<option value="'+objson.data[x].planta+'-'+objson.data[x].idplanta+'"> '+objson.data[x].planta+' </option>';
  
         
          $$('#planta').append(plan);
         
        
        } 
     },
     error:function(error){
    
      app7.preloader.hide();
    }
    });

  });
  
  
  function Turno(){
    var turno = $$('#turno-1').val();
    var plan = $$('#planta').val();
    var semana = $$('#semana').val();
    var mes = $$('#mes').val();
     var usuario = localStorage.getItem("usuario");
     parts = plan.split("-");
     part1 = parts[0]; // 123
     part2 = parts[1]; // 654321
     localStorage.setItem("turno", turno);
     localStorage.setItem("Planta", part1); 
     localStorage.setItem("idplanta", part2);
     localStorage.setItem("semana", semana);
     localStorage.setItem("mes", mes);
     localStorage.setItem("embarque", "");

     if(mes != "--Selecciona MES--" ){
     if(semana != "--Selecciona Semana--" ){
    if(plan != "--Escoge una planta automotirz--"){
     if(turno != "--Selecciona turno--"){
     alert("Inicia tu jornada de trabajo ¡EXCELENTE DIA!");
     mainView.router.navigate('/home2/',{animate:true});
    }else{
      alert("¡Escoge un TURNO!")
    }}else{
      alert("¡Escoge una PLANTA!")
    }}else{
      alert("¡Escoge una SEMANA!")
    }}else{
      alert("¡Escoge un MES!")
    }
     
     /*
  app7.preloader.show('blue');
  app7.request({
    url: 'https://rysdepuebla.com/app/api/entrada.php',
    data:{  planta:plan,usuario:usuario,turno:turno},
    method: 'POST', 
    crossDomain: true,
    success:function(data){

      app7.preloader.hide();
      var objson = JSON.parse(data);
      if(objson.status_message == "CORRECTO"){
     
        alert("Inicia tu jornada de trabajo ¡EXCELENTE DIA!");
        mainView.router.navigate('/home2/',{animate:true});

        }else{

          alert("Hubo un error intentalo nuevamente");
        }
      },
      error:function(error){
  
        app7.preloader.hide();
      }
    });*/
  }

  $$(document).on('page:init', '.page[data-name="retrabajo"]', function (e) {
    app7.preloader.show('blue');
    app7.request({
      url: 'https://rysdepuebla.com/app/api/piezas.php',
      data:{},
      method: 'POST', 
      crossDomain: true,
      success:function(data){
        app7.preloader.hide();
        var objson = JSON.parse(data);
        var piezas="";
        var pieza="";
        var num="";
        var idplanta=localStorage.getItem("idplanta");
        for(x in objson.data){
          console.log(objson.data[x].idplanta);
          pieza = '<option value="'+objson.data[x].nompieza+'-'+objson.data[x].numpieza+'"> '+objson.data[x].numpieza+'  </option>';
          if(idplanta == objson.data[x].idplanta){
            
            
          $$('#piezas-2').append(pieza);
          
        }
        }
     },
     error:function(error){
      app7.preloader.hide();
    }
    });
            

    
    


  });

 function Scrap(){
  var pieza = $$('#piezas-1').val();
  var inspec = parseInt($$('#piezas-inspeccionadas').val());
  var ok = parseInt($$('#piezas-ok').val());

  localStorage.setItem("pieza",pieza);
  if(pieza != "--Selecciona una pieza--"){
  if(inspec>0){
  if(ok == inspec){
    alert ("No es necesario ingresar SCRAP, OPRIME FINALIZAR");
  }else{
    if(ok <= inspec){
        resta = inspec-ok;
        var df=confirm ("Deberas ingresar el scrap de : "  +resta);
        if(df == true){
          mainView.router.navigate('/scrap/',{animate:true});
          localStorage.setItem("resta",resta);
         
        }else{
          mainView.router.navigate('/inspeccion/',{animate:true});
        }
        
  }else{
    alert("Las piezas OK son mayor que las inspeccionadas");
  }}
  }else{
    alert("¡No has ingresado piezas para inspeccionar!");
  }}else{
    alert("¡Selecciona una pieza!")
  }

}

function Bitacora(){
  var bitacora = $$('#bitacora').val();
  var usuario = localStorage.getItem("usuario");
  var turno = localStorage.getItem("turno");
  var planta = localStorage.getItem("Planta");
 
  app7.preloader.show('blue');
  app7.request({
    url: 'https://rysdepuebla.com/app/api/bitacora.php',
    data:{  planta:planta,usuario:usuario,turno:turno,bitacora:bitacora},
    method: 'POST', 
    crossDomain: true,
    success:function(data){

      app7.preloader.hide();
      var objson = JSON.parse(data);
      if(objson.status_message == "CORRECTO"){
     
        alert("Finalizaste tu dia de tabajo ¡EXCELENTE DIA!");
        mainView.router.navigate('/home/',{animate:true});

        }else{

          alert("Hubo un error intentalo nuevamente");
        }
      },
      error:function(error){
  
        app7.preloader.hide();
      }
    });
  }





  function Retrabajo(){
    var usuario = localStorage.getItem("usuario");
    var turno = localStorage.getItem("turno");
    var planta = localStorage.getItem("Planta");
    var mes = localStorage.getItem("mes");
    var semana = localStorage.getItem("semana");
    var comentario = $$('#comentario').val();
    var pieza =$$('#piezas-2').val();
    var retrab = parseInt($$('#retrab').val());
    
    if(pieza != "--Selecciona una pieza--"){
    if(retrab>0){
    app7.preloader.show('blue');
    app7.request({
      url: 'https://rysdepuebla.com/app/api/guardarRetrabajo.php',
      data:{mes:mes, semana:semana, comentario:comentario,planta:planta,usuario:usuario,turno:turno,pieza:pieza,retrab:retrab},
      method: 'POST', 
      crossDomain: true,
      success:function(data){
      
        app7.preloader.hide();
        var objson = JSON.parse(data);
        if(objson.status_message == "CORRECTO"){
       
          alert("Se registro el retabajo");
          mainView.router.navigate('/home2/',{animate:true});
  
          }else{
  
            alert("Hubo un error intentalo nuevamente");
          }
        },
        error:function(error){
    
          app7.preloader.hide();
        }
      });}else{
        alert("¡No has ingresado piezas Retrabajadas!")
      }}else{
        alert("¡Selecciona una pieza!")
      }
    }
  
    

    function FinalizarIns(){
      
      var embarque = $$('#embarque').val();
      var horas = $$('#horas').val();
      localStorage.setItem("embarque",embarque);
      var pieza = $$('#piezas-1').val();
      var inspec = $$('#piezas-inspeccionadas').val();
      var ok = $$('#piezas-ok').val();
      var planta = localStorage.getItem("Planta");
     var usuario = localStorage.getItem("usuario");
     var turno = localStorage.getItem("turno");
     var mes = localStorage.getItem("mes");
     var semana = localStorage.getItem("semana");
     if(inspec>0){
       if(ok>0){
      if(ok == inspec){
       app7.preloader.show('blue');
       app7.request({
         url: 'https://rysdepuebla.com/app/api/guardar1.php',
         data:{mes:mes, semana:semana, horas:horas,embarque:embarque,planta:planta,usuario:usuario,turno:turno,pieza:pieza,inspec:inspec,ok:ok},
         method: 'POST', 
         crossDomain: true,
         success:function(data){
          
           app7.preloader.hide();
           var objson = JSON.parse(data);
           if(objson.status_message == "CORRECTO"){
          
             alert("Se registro la inspeccion");
             mainView.router.navigate('/home2/',{animate:true});
     
             }else{
     
               alert("Hubo un error intentalo nuevamente");
             }
           },
           error:function(error){
       
             app7.preloader.hide();
           }
         });          
        }else{
          alert("Tienes piezas de scrap sin seleccionar el error OPRIME INGRESAR SCRAP");
        }}else{
          alert("¡No has ingresado piezas OK!");
        }}
        else{
          alert("¡No has ingresado piezas para inspeccionar!");
        }
      }

  

      
      function GuardarScrap(){
       
        localStorage.setItem("scrap","");
        var embarque = localStorage.getItem("embarque");
        var pieza = localStorage.getItem("pieza");
        var scrap = parseInt($$('#scrap-1').val());
        var codigo = $$('#codigo-1').val();
        var usuario = localStorage.getItem("usuario");
        var turno = localStorage.getItem("turno");
        var planta = localStorage.getItem("Planta");
        var mes = localStorage.getItem("mes");
        var semana = localStorage.getItem("semana");
        localStorage.setItem("scrap",scrap);
        localStorage.setItem("codigo",codigo);
        var scrap= (parseInt(localStorage.getItem("scrap")));
        var codigo= localStorage.getItem("codigo");
        var resta = (parseInt(localStorage.getItem("resta")));
        
        if(scrap>0){
          if(codigo != "----"){
        
        if(scrap <= resta){
          app7.preloader.show('blue');
          app7.request({
            url: 'https://rysdepuebla.com/app/api/guardar3.php',
            data:{ mes:mes, semana,semana, embarque:embarque,planta:planta,usuario:usuario,turno:turno,pieza:pieza,scrap:scrap,codigo:codigo},
            method: 'POST', 
            crossDomain: true,
            success:function(data){
        
              app7.preloader.hide();
              var objson = JSON.parse(data);
              if(objson.status_message == "CORRECTO"){
                  if(resta == scrap){
                alert("Se registro la inspeccion");
                mainView.router.navigate('/home2/',{animate:true});
                localStorage.setItem("resta",resta);
              }else{
                resta=resta-scrap; 
                
                alert("Registra las piezas restantes que son " +resta );
                mainView.router.navigate('/scrap2/',{reloadCurrent:true});
                localStorage.setItem("resta",resta);
              }
        
                }else{
        
                  alert("Hubo un error intentalo nuevamente");
                }
              },
              error:function(error){
          
                app7.preloader.hide();
              }
            });
          }else{
            alert("Seleciona menos de o mayor que -> "+resta);
        
          }}else{
            alert("Seleciona un codigo de defecto");
          }}else{
            alert("Ingresa piezas con SCRAP");
          }
          
          }


       function Guardar(){
            var pieza = $$('#piezas-1').val();
            var embarque = $$('#embarque').val();
            localStorage.setItem("embarque",embarque);
            var inspec = parseInt($$('#piezas-inspeccionadas').val());
            var horas = $$('#horas').val();
            var ok = parseInt($$('#piezas-ok').val());
             var scrap = parseInt($$('#scrap').val());
            var codigo = $$('#codigo').val();
            var planta = localStorage.getItem("Planta");
            var usuario = localStorage.getItem("usuario");
            var turno = localStorage.getItem("turno");
            var mes = localStorage.getItem("mes");
           var semana = localStorage.getItem("semana");
          
            resta = inspec-ok;
            if(codigo != "----"){
              if(scrap>0){
            if(resta>scrap){
            app7.preloader.show('blue');
            app7.request({
              url: 'https://rysdepuebla.com/app/api/guardar.php',
              data:{ mes:mes, semana:semana, horas:horas,embarque:embarque,planta:planta,usuario:usuario,turno:turno,pieza:pieza,inspec:inspec,ok:ok,scrap:scrap,codigo:codigo},
              method: 'POST', 
              crossDomain: true,
              success:function(data){
          
                app7.preloader.hide();
                var objson = JSON.parse(data);
                if(objson.status_message == "CORRECTO"){
                  resta = resta-scrap;
                  localStorage.setItem("resta",resta);
                  alert("Registra las piezas restantes que son " +resta);
                  mainView.router.navigate('/scrap2/',{animate:true});
                
                  }else{
          
                    alert("Hubo un error intentalo nuevamente");
                  }
                },
                error:function(error){
            
                  app7.preloader.hide();
                }
              });
            }else{
              alert("Para ingresar mas scrap debes selecionar menos de "+resta);
            }}else{
              alert("Ingresa piezas con SCRAP");
            }}else{
              alert("Seleciona un codigo de defecto");
            }
         
          
            }

      function Guardar1(){
              var pieza = $$('#piezas-1').val();
              var embarque = $$('#embarque').val();
              localStorage.setItem("embarque",embarque);
              var inspec = parseInt($$('#piezas-inspeccionadas').val());
              var ok = parseInt($$('#piezas-ok').val());
              var horas = $$('#horas').val();
               var scrap = parseInt($$('#scrap').val());
               var codigo = $$('#codigo').val();
              var planta = localStorage.getItem("Planta");
              var usuario = localStorage.getItem("usuario");
              var turno = localStorage.getItem("turno");
              var mes = localStorage.getItem("mes");
              var semana = localStorage.getItem("semana");
              var resta="";
              resta = inspec-ok;
              
              
              if(scrap>0){
              if(codigo == "----"){
                alert("Seleciona un codigo de defecto");
              }else{
                if(resta==scrap){
                  app7.preloader.show('blue');
                  app7.request({
                    url: 'https://rysdepuebla.com/app/api/guardar.php',
                    data:{mes:mes, semana:semana, horas:horas,embarque:embarque, planta:planta,usuario:usuario,turno:turno,pieza:pieza,inspec:inspec,ok:ok,scrap:scrap,codigo:codigo},
                    method: 'POST', 
                    crossDomain: true,
                    success:function(data){
                
                      app7.preloader.hide();
                      var objson = JSON.parse(data);
                      if(objson.status_message == "CORRECTO"){
                     
                        alert("Se registro la inspeccion");
                        mainView.router.navigate('/home2/',{animate:true});
                        resta = resta-scrap;
                        localStorage.setItem("resta",resta);
                
                        }else{
                
                          alert("Hubo un error intentalo nuevamente");
                        }
                      },
                      error:function(error){
                  
                        app7.preloader.hide();
                      }
                    });
                  }else{
                    alert("Para terminar debes de ingresar la misma cantidad de scrap que es: " +resta);
                
                  }
              }}else{
                alert("Ingresa piezas con SCRAP");
            
              }
            
              }