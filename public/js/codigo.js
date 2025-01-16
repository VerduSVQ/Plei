var oEmpresa = new Empresa();
document.addEventListener("DOMContentLoaded", function () {

  //  Configuración inicial de vistas

  document.querySelector("#navAdmin").style.display = "none" ;
  document.querySelector("#navUser").style.display = "none";
  document.querySelector("#crearEventoSec").style.display = "none";
  document.querySelector("#editarEventoSec").style.display = "none";
  document.querySelector("#editarUsuarioSec").style.display = "none";
  document.querySelector("#editarCuentaSec").style.display = "none";
  
  // Opciones Basicas

  document.querySelector("#inicio").addEventListener("click", menu);
  document.querySelector("#explorar").addEventListener("click", menu);
  document.querySelector("#acceder").addEventListener("click", menu);
  
  // OpcionesAdmin

  document.querySelector("#adminEventos").addEventListener("click", menu);
  document.querySelector("#adminUsuarios").addEventListener("click", menu);
  
  // Opciones Usuario

  document.querySelector("#explorarUser").addEventListener("click", menu);
  document.querySelector("#eventoUser").addEventListener("click", menu);
  document.querySelector("#crearEvento").addEventListener("click", menu);
  document.querySelector("#editarCuenta").addEventListener("click", menu);
  document.getElementById("cerrarSesion").addEventListener('click', function() {
    
    sessionStorage.clear();
    inicio.click(); 
    controladorVistaPorRol();
    
  });
  

  frmIniSes.btnIniSes.addEventListener("click", procesarIniSes);
  frmReg.btnReg.addEventListener("click", procesarReg);
  frmCrearEvento.btnCrearEvento.addEventListener("click", procesarCrearEvento);
  frmEditarUsuario.btnEditarUsuario.addEventListener("click", procesarEditarUsuario);
  frmEditarCuenta.btnEditarCuenta.addEventListener("click", procesarEditarCuenta);
  frmEditarEvento.btnEditarEvento.addEventListener("click", procesarEditarEvento);



//   
  //  borrarEvento.btnBorrar.addEventListener("click", borrarEvento);
});

function menu(evento) {-
  // Ocultamos todas las secciones
  ocultarTodo();

  // Mostramos la sección correspondiente al elemento clicado
  switch (evento.target.id) {
    case "acceder":
      document.querySelector("#accederSec").style.display = "block";
      break;
    case "inicioAd":
      document.querySelector("#landSection").style.display = "block";
      break;
    case "inicioUs":
      document.querySelector("#landSection").style.display = "block";
      break;
    case "explorar":
      document.querySelector("#explorarSec").style.display = "block";
      loadEventos();
      break;
    case "explorarUser":
      document.querySelector("#explorarSec").style.display = "block";
      loadEventos();
      break;
    case "adminEventos":
      document.querySelector("#adminEventosSec").style.display = "block";
      loadEventosAdmin();
      break;
    case "adminUsuarios":
      document.querySelector("#adminUsuariosSec").style.display = "block";
      loadUsuarios();
      break;
    case "eventoUser":
      document.querySelector("#userEventosSec").style.display = "block";
      loadEventosUser();
      break;
    case "crearEvento":
      document.querySelector("#crearEventoSec").style.display = "block";
      break;
    case "editarCuenta":
      document.querySelector("#editarCuentaSec").style.display = "block";

      editarCuenta()
      break;
    default:
      document.querySelector("#landSection").style.display = "block";
      break;
  }
}

function ocultarTodo() {
  // Ocultamos todas las secciones
  document.querySelector("#landSection").style.display = "none";
  document.querySelector("#explorarSec").style.display = "none";
  document.querySelector("#accederSec").style.display = "none";
  document.querySelector("#adminEventosSec").style.display = "none";
  document.querySelector("#userEventosSec").style.display = "none";
  document.querySelector("#adminUsuariosSec").style.display = "none";
  document.querySelector("#crearEventoSec").style.display = "none";
  document.querySelector("#editarCuentaSec").style.display = "none";
  document.querySelector("#editarEventoSec").style.display = "none";
  document.querySelector("#editarUsuarioSec").style.display = "none";

}
async function loadEventos() {
  let listado = "";

  let explorarBas = document.querySelector("#explorarSec");

  let respuesta = await oEmpresa.listadoEventos();
  listado += "<div class='container'>";
  listado += "<div class='row row-cols-1 row-cols-md-6 g-4'>"; // corregido 'g-4'

  for (let evento of respuesta.datos) {
    listado += "<div class='col'>";
    listado += "    <div class='card'>";
    listado += "        <div class='first-content'>";
    listado +=
      "            <img src='" + evento.foto + "' class='card-img-top' />";
    listado += "        </div>";
    listado += "        <div class='second-content'>";
    listado += "            <div class='card-body'>";
    listado +=
      "                <h3 class='card-title'><strong>" +
      evento.nombre +
      "</strong></h3>";
    listado +=
      "                <p class='card-subtitle mb-2 text-muted'>" +
      evento.ciudad +
      "</p>";
    listado += "                <p class='card-text'>" + evento.genero + "</p>";
    listado +=
      "                <button type='button' class='btn btn-secondary primary' data-bs-toggle='popover' title='Necesitas estar registrado para poder apuntarte'>Apuntarme</button>";
    listado += "                <br />";
    listado += "            </div>";
    listado += "        </div>";
    listado += "    </div>";
    listado += "</div>";
  }
  listado += "</div>";
  listado += "</div>";

  // Asignar el contenido generado a innerHTML
  explorarBas.innerHTML = listado;
}

async function loadEventosAdmin() {
  let listado = "";

  let explorarAdmin = document.querySelector("#adminEventosSec");

  let respuesta = await oEmpresa.listadoEventos();
  listado += "<div class='container'>";
  listado += "<div class='row row-cols-1 row-cols-md-6 g-4'>"; // corregido 'g-4'

  
    for (let evento of respuesta.datos) {
      listado += "<div class='col'>";
      listado += "    <div class='card'>";
      listado += "        <div class='first-content'>";
      listado +=
        "            <img src='" + evento.foto + "' class='card-img-top' />";
      listado += "        </div>";
      listado += "        <div class='second-content'>";
      listado += "            <div class='card-body'>";
      listado +=
        "                <h3 class='card-title'><strong>" +
        evento.nombre +
        "</strong></h3>";
      listado +=
        "                <p class='card-subtitle mb-2 text-muted'>" +
        evento.ciudad +
        "</p>";
      listado +="<p class='card-text'>" + evento.genero + "</p>";
      listado +="<input type='button' name='Editar' value='Editar'  class='btn' data-evento='"+JSON.stringify(evento)+"' data-boton-editar-evento-admin></input>";
      listado +="<input type='button' name='Borrar' value='Borrar' class='btn' data-idevento='"+evento.id+"' data-boton-borrar-evento-admin></input>";
      listado += "                <br />";
      listado += "            </div>";
      listado += "        </div>";
      listado += "    </div>";
      listado += "</div>";
    }
  
  listado += "</div>";
  listado += "</div>";
  explorarAdmin.innerHTML = listado;
  let botonesEditar = document.querySelectorAll("[data-boton-editar-evento-admin]");
  let botonesBorrar = document.querySelectorAll("[data-boton-borrar-evento-admin]");


  for (let botonEditarAdmin of botonesEditar) {
    botonEditarAdmin.addEventListener("click",editarEvento);
  }
  for (let botonBorrarAdmin of botonesBorrar) {
    botonBorrarAdmin.addEventListener("click",borrarEvento);
  }

  // Asignar el contenido generado a innerHTML
}

async function loadEventosUser() {
  let listado = "";
  let usuario = JSON.parse(sessionStorage["usuario"]);

  let explorarUser = document.querySelector("#userEventosSec");

  let respuesta = await oEmpresa.listadoEventosUser(usuario.id);
  listado += "<div class='container'>";
  listado += "<div class='row row-cols-1 row-cols-md-6 g-4'>"; // corregido 'g-4'

  for (let evento of respuesta.datos) {
    listado += "<div class='col'>";
    listado += "    <div class='card'>";
    listado += "        <div class='first-content'>";
    listado +=
      "            <img src='" + evento.foto + "' class='card-img-top' />";
    listado += "        </div>";
    listado += "        <div class='second-content'>";
    listado += "            <div class='card-body'>";
    listado +=
      "                <h3 class='card-title'><strong>" +
      evento.nombre +
      "</strong></h3>";
    listado +=
      "                <p class='card-subtitle mb-2 text-muted'>" +
      evento.ciudad +
      "</p>";
    listado +="<p class='card-text'>" + evento.genero + "</p>";
    listado +="<input type='button' name='Editar' value='Editar'  class='btn' data-evento='"+JSON.stringify(evento)+"' data-boton-editar-evento></input>";
    listado +="<input type='button' name='Borrar' value='Borrar' class='btn' data-idevento='"+evento.id+"' data-boton-borrar-evento></input>";
    listado += "                <br />";
    listado += "            </div>";
    listado += "        </div>";
    listado += "    </div>";
    listado += "</div>";
  }

listado += "</div>";
listado += "</div>"; 
explorarUser.innerHTML = listado;
let botonesEditar = document.querySelectorAll("[data-boton-editar-evento]");
let botonesBorrar = document.querySelectorAll("[data-boton-borrar-evento]");

for (let botonEditarUser of botonesEditar) {
  botonEditarUser.addEventListener("click",editarEvento);
}
for (let botonBorrarUser of botonesBorrar) {
  botonBorrarUser.addEventListener("click",borrarEvento);
}
}



async function loadUsuarios() {
  let tabla = "";

  let tablaAdmin = document.querySelector("#adminUsuariosSec");

  let respuesta = await oEmpresa.listadoUsuarios();

  tabla = "<table class='table '>";
  tabla +=
    "<thead><tr><th>IdUsuario</th><th>Usuario</th><th>Contraseña</th><th>Nombre</th>><th>ROL</th><th>ACCION</th></tr></thead>";
  tabla += "<tbody><tr>";

  for (let usuario of respuesta.datos) {
    tabla += "<tr>";

    tabla += "<td>" + usuario.id + "</td>";
    tabla += "<td>" + usuario.usuario + "</td>";
    tabla += "<td>" + usuario.clave + "</td>";
    tabla += "<td>" + usuario.nombre + "</td>";
    tabla += "<td>" + usuario.rol + "</td>";
    tabla += "<td><input type='button' class='btn' value='Editar' name='btnEditarUsuario' data-usuario='" +JSON.stringify(usuario) +"' data-boton-editar-usuario><input type='button' class='btn' value='Borrar' name='btnBorrarUsuario' data-idusuario='" +usuario.id +"' data-boton-borrar-usuario></td>";
    tabla += "</tr>";
  }
  tabla += "</tr></tbody></table>";
  tablaAdmin.innerHTML = tabla;

  let botonesEditar = document.querySelectorAll("[data-boton-editar-usuario]");
  let botonesBorrar = document.querySelectorAll("[data-boton-borrar-usuario]");


  for (let botonEditar of botonesEditar) {
    botonEditar.addEventListener("click",editarUsuario);
  }
  for (let botonBorrar of botonesBorrar) {
    botonBorrar.addEventListener("click",borrarUsuario);
  }
}

async function procesarIniSes() {
  let usuario = frmIniSes.iniSesEmail.value.trim();
  let clave = frmIniSes.iniSesPass.value.trim();
  let respuesta = await oEmpresa.login(usuario, clave);
 
  if (!respuesta.error) {
    alert("Sesion iniciada correctamente");
    inicio.click();
    sessionStorage["usuario"] = JSON.stringify(respuesta.datos);

    controladorVistaPorRol();
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

function controladorVistaPorRol() {
  if (sessionStorage["usuario"] == undefined) {
    // No login
    // Acciones para modificar la vista para no logueados

    document.querySelector("#navBasica").style.display = "block";
    document.querySelector("#navAdmin").style.display = "none";
    document.querySelector("#navUser").style.display = "none";
  } else {
    let usuario = JSON.parse(sessionStorage["usuario"]);

    if (usuario.rol == "A") {
      document.querySelector("#navBasica").style.display = "none";
      document.querySelector("#navAdmin").style.display = "block";
    } else if (usuario.rol == "U") {
      document.querySelector("#navBasica").style.display = "none";
      document.querySelector("#navUser").style.display = "block";
    }
  }
}
async function procesarReg() {
  let usuario = frmReg.txtUsuario.value.trim();
  let password = frmReg.txtPassword.value.trim();
  let nombre = frmReg.txtNombre.value.trim();

  let respuesta = await oEmpresa.altaUsuario(
    new Usuario(null, usuario, password, nombre)
  );

  alert(respuesta.mensaje);
  if (!respuesta.error) {
    // Si NO hay error
    //Resetear formulario
    frmReg.reset();
  }
  inicio.click(); 
}
async function procesarEditarCuenta() {

  let usuario = frmEditarCuenta.editaUsuario.value.trim();
  let clave = frmEditarCuenta.editaClave.value.trim();
  let nombre = frmEditarCuenta.editaNombre.value.trim();
  let usuarioReg = JSON.parse(sessionStorage["usuario"]); 
  let respuesta = await oEmpresa.updateUsuario(
    new Usuario(usuarioReg.id, usuario, clave, nombre,'U')
  );


  alert(respuesta.mensaje);
  
}
async function procesarEditarUsuario() {
  let usuario = frmEditarUsuario.editaUsuarioAdmin.value.trim();
  let clave = frmEditarUsuario.editaClaveAdmin.value.trim();
  let nombre = frmEditarUsuario.editaNombreAdmin.value.trim();
  let rol = frmEditarUsuario.editaNombreAdmin.value.trim();
  let id =  frmEditarUsuario.editaIdAdmin.value.trim();
  
  let respuesta = await oEmpresa.updateUsuario(
    new Usuario(id, usuario, clave, nombre,rol)
  );

  alert(respuesta.mensaje);
  
}
async function procesarCrearEvento() {
  let foto = frmCrearEvento.creaEventoFoto.value.trim();
  let nombre = frmCrearEvento.creaEventoNombre.value.trim();
  let ciudad = frmCrearEvento.creaEventoCiudad.value.trim();
  let genero = frmCrearEvento.creaEventoGenero.value.trim();
  let usuario = JSON.parse(sessionStorage["usuario"]);

  let respuesta = await oEmpresa.altaEvento(
    new Evento(null, foto, nombre, ciudad, genero,parseInt(usuario.id) )
  );

  alert(respuesta.mensaje);
  if (!respuesta.error) {
    // Si NO hay error
    //Resetear formulario
    frmCrearEvento.reset();
  }
}
async function procesarEditarEvento() {

  let idEvento = frmEditarEvento.editaEventoFoto.value.trim();
  let foto = frmEditarEvento.ceditatoFoto.value.trim();
  let nombre = frmEditarEventoeditaentoNombre.value.trim();
  let ciudad = frmEditarEventoeditaEventoCiudad.value.trim();
  let genero = frmEditarEvento.editaEventoGenero.value.trim();
  let usuario = frmEditarEvento.editaEventoIdUser.value.trim();

  let respuesta = await oEmpresa.updateEvento(
    new Evento(idEvento, foto, nombre, ciudad, genero,usuario)
  );

  alert(respuesta.mensaje);
} 

async function editarEvento(oE){
  let oEvento = oE || window.event;

  let evento = JSON.parse(
    oEvento.target.dataset.evento
  );
  ocultarTodo();
    let editarEvento = document.querySelector("#editarEventoSec");
    editarEvento.style.display = "block";
    frmEditarEvento.editaEventoNombre.value =  evento.nombre
    frmEditarEvento.editaEventoCiudad.value =  evento.ciudad
    frmEditarEvento.editaEventoGenero.value = evento.genero
    frmEditarEvento.editaEventoFoto.value =  evento.foto
    frmEditarEvento.editaEventoId.value =  evento.id
    frmEditarEvento.editaEventoIdUser.value =  evento.idUser


}


async function editarUsuario(oE) { 
    let oEvento = oE || window.event;

    let usuario = JSON.parse(
      oEvento.target.dataset.usuario
    );

    ocultarTodo();
    let editarUsuario = document.querySelector("#editarUsuarioSec");
    editarUsuario.style.display = "block";

    frmEditarUsuario.editaIdAdmin.value = usuario.id;
    frmEditarUsuario.editaNombreAdmin.value = usuario.nombre;
    frmEditarUsuario.editaUsuarioAdmin.value = usuario.usuario;
    frmEditarUsuario.editaClaveAdmin.value = usuario.clave;
    frmEditarUsuario.editaRolAdmin.value = usuario.rol;


}

function editarCuenta() { 
    let usuario = JSON.parse(sessionStorage["usuario"]);
    console.log(sessionStorage["usuario"])
    ocultarTodo()
    let editarCuenta = document.querySelector("#editarCuentaSec");
    editarCuenta.style.display = "block"
    frmEditarCuenta.editaNombre.value = usuario.nombre;
    frmEditarCuenta.editaUsuario.value = usuario.usuario;
    frmEditarCuenta.editaClave.value = usuario.clave;




}

async function borrarEvento(oE) {
  let oEvento = oE || window.event;

  console.log('llega a codigo')

  let idEvento = parseInt(
    oEvento.target.dataset.idevento
  );
  let respuesta = await oEmpresa.borrarEvento(idEvento);

  alert(respuesta.mensaje);
  
}

async function borrarUsuario(oE) {
  let oEvento = oE || window.event;

  let idUsuario = parseInt(
    oEvento.target.dataset.idusuario
  );

  let respuesta = await oEmpresa.borrarUsuario(idUsuario);

  alert(respuesta.mensaje);
  loadUsuarios()
}
