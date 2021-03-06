//Importamos todas las funciones que llaman a los json para poder iterar con ellas
import { getFilms } from "./films.js";
import { getHotel } from "./hotel.js";
import { getJoc } from "./juego.js";
import { getMusic } from "./music.js";
import { getRest } from "./restaurante.js";
import { getSeries } from "./series.js";
import { getViaje } from "./viajes.js";

//Esta pequeña linea nos llama a una función para recuperar al usuario guardado
//En el sessionStorage
window.onload = getUserFromStorage;

function getUserFromStorage() {
  console.log("estoy dentro");
  // Recupera l'item del storage i el transforma a un objecte JSON.
  let userObjStorage = JSON.parse(sessionStorage.getItem("user"));
  console.log(userObjStorage);
  let container = document.getElementById("imagenUser");
  container.innerHTML = ` <a href="#"class="imagen"><img class="imagen" src="${userObjStorage.imagen}" alt="user" /></a><p id="name">${userObjStorage.name}</p>
  `;
}

//Esta constante accede al botón que recarga la página para volver a ver la pantalla inicial
const buttonRecargar = document.getElementById("principal");
buttonRecargar.addEventListener("click", recargar);

function recargar() {
  window.location.assign("./remember.html");
}

//Esta constante accede al boton que carga todos los usuarios de la página
//Los muestra en bantalla
const buttonAmigos = document.getElementById("amigos");

buttonAmigos.addEventListener("click", function (e) {
  cargarUsers();
});
function cargarUsers() {
  let users = JSON.parse(localStorage.getItem("user"));
  const contenedor = document.getElementById("contenido");
  contenedor.innerHTML = "";
  for (let use of users) {
    console.log(use.nombre);
    contenedor.innerHTML += `<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
  <div class="col-md-4 film">
     <img src="${use.img}" width="50%" alt="...">
   </div>
   <div class="col-md-8">
     <div class="card-body">
       <h5 class="card-title">${use.nombre}</h5>
       <p class="card-text">${use.email}</p>
      </div>
   </div>
   </div>
   </div>`;
  }
}
//La siguiente constante nos llama al select de categorias
const categoria = document.getElementById("categoria");

//La siguiente variable nos accede al input buscador
let palabra = document.getElementById("buscar");

//A partir de aquí llamamos a todas las funciones para recuperar los datos
//Según las letras que introduzca el usuario
palabra.addEventListener("keyup", () => {
  let valorCategory = categoria.value;
  let buscadorPalabra = palabra.value;
  switch (valorCategory) {
    case "film":
      getFilms(buscadorPalabra);
      break;
    case "hotel":
      getHotel(buscadorPalabra);
      break;
    case "juegos":
      getJoc(buscadorPalabra);
      break;
    case "musica":
      getMusic(buscadorPalabra);
      break;
    case "restaurante":
      getRest(buscadorPalabra);
      break;
    case "serie":
      getSeries(buscadorPalabra);
      break;
    case "viaje":
      getViaje(buscadorPalabra);
      break;
    default:
      return false;
  }
});
