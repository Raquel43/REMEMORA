//Aquí creo los usuarios fijos de la aplicación
let users = [
  {
    nombre: "Emilio",
    email: "emilio@gmail.com",
    img: "img/emilio.jpg",
    password: "1234",
    telefono: "643211324",
  },
  {
    nombre: "Raquel",
    email: "raquel@gmail.com",
    img: "img/raquel.jpg",
    password: "raquel44",
    telefono: "643211324",
  },
  {
    nombre: "Cristina",
    email: "cristina@gmail.com",
    img: "img/cristina.jpg",
    password: "cristina20",
    telefono: "643211324",
  },
  {
    nombre: "Alex",
    email: "alex@gmail.com",
    img: "img/alex.jpg",
    password: "alex31",
    telefono: "643211324",
  },
];
//Esta constante es la que me permite añadir nuevos usuarios cuando se hace click
const buttonAfegir = document.getElementById("afegir");

buttonAfegir.addEventListener("click", agregarUsuario);


//Esta función me permite validar si el email es correcto
function validarEmail(elemento) {
  var regex = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+.)+[A-Z]{2,4}$/i;

  if (!regex.test(elemento)) {
   mostrarAlertMail();
    return false;
  } else {
    return true;
  }
}

//La siguiente función muestra un alert si el email es incorrecto
function mostrarAlertMail() {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Email incorrecto",
    showConfirmButton: true,
    timer: 5000,
  });
}

//La siguiente función evita que se introduzcan usuarios con el mismo e-mail
function evitarDuplicados(email) {
  for (let user of users) {
    if (user.email == email) {
     mostrarAlertMail2();
      return false;
    }
  }
  return true;
}

//La siguiente alerta muestra un aviso si el e-mail está duplicado
function mostrarAlertMail2() {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "El email introducido está duplicado",
    showConfirmButton: true,
    timer: 5000,
  });
}
//La siguiente función agrega los nuevos usuarios despues de la validación
//También llama a otra función para guardar todos los usuarios en el localStorage
function agregarUsuario() {
 let nombre = document.getElementById("newUser").value;
  let email = document.getElementById("mail").value;
  let img ="https://thispersondoesnotexist.com/image";
  let password = document.getElementById("paso").value;
  let telefono = document.getElementById("tel").value;
  if (evitarDuplicados(email) && validarEmail(email)) {
  let usuarios = {
    nombre: nombre,
    email: email,
    img: img,
    password: password,
    telefono: telefono,
  }
  users.push(usuarios);
  console.log(users);
  GuardaUsuarios();
  };
 }

// La siguiente constante es el botón que envia los datos del login para validarlos
const buttonAdd = document.getElementById("btn-enviar");
buttonAdd.addEventListener("click", function (e) {
  getUsers();
});

// La siguiente función valida si el usuario y la contraseña son correctos 
// También llama a la función del Storage, especificamente la de Sesión
// Para después recuperar dichos datos
function getUsers() {
  const inputName = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  let usuario = users.find((user) => user.nombre == inputName);
  if (usuario && usuario.password == contrasena) {
    saveUserInStorage();
    mostrarAlert();
    window.location.assign("./remember.html");
  } else {
    mostrarAlert2();
  }

  //Alerta para que el usuario verifique que se ha validado correctamente
  function mostrarAlert() {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Usuario Validado",
      showConfirmButton: true,
      timer: 4000,
    });
  }
//Alerta que indica que el usuario no está registrado o a puesto mal la contraseña
  function mostrarAlert2() {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "usuario no registrado o contraseña incorrecta",
      showConfirmButton: true,
      timer: 5000,
    });
  }

  //Función que guarda el usuario validado en el SessionStorage
  function saveUserInStorage() {
    // Comprovar en primer lloc si l'objecte Storage es troba definit al motor del navegador
    if (typeof Storage == "undefined") {
      alert("sessionStorage no soportado por el navegador");
    } else {
      // LocalStorage disponible
      // Guardar i extreure objectes json del Storage:
      let userObj = {
        name: document.getElementById("usuario").value,
        imagen: usuario.img,
      };
      sessionStorage.setItem("user", JSON.stringify(userObj));
      console.log("Datos guardados correctamente");
      //entrar();
    }
  }
}

//Función que me guarda todos los usuarios en el localStorage
function GuardaUsuarios() {
 
  if (typeof Storage == "undefined") {
    alert("Localstore no soportado por el navegador");
  } else {
    console.log("Estoy guardando usuarios");

    // LocalStorage disponible
    // Guardar i extreure objectes json del Storage:
    let userObj = users;

    localStorage.setItem("user", JSON.stringify(userObj));
    mostrarAlert();

  //Alerta que informa de que el usuario se ha registrado correctamente
    function mostrarAlert() {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario Registrado",
        showConfirmButton: true,
        timer: 4000,
      });
    }
   
  }
}

//Pequeña broma de aviso al usuario.. no podemos recuperar contraseñas o guardarlas
// Ya que aun no trabajamos del lado del servidor
const olvidado = document.getElementById("olvido");
olvidado.addEventListener("click",broma);
function broma() {
  Swal.fire({
    position: "center",
    icon: "info",
    title: "Pues pega bots!! JAJAJA...",
    showConfirmButton: true,
    timer: 5000,
  });
}

//Función que me cambia el contenido del botón de crear cuenta por el de login al pulsar
let inicio = document.getElementById("iniciar");
inicio.addEventListener("click",cambiar);
function cambiar(){
 if(inicio.textContent == "Crear Cuenta"){
  inicio.innerHTML = "Login";
 }else{
   inicio.innerHTML = "Crear Cuenta";

 }
}



