//modulo que muestra el teclado

import { teclado } from "./escribirConTeclado.js";

const botonMath = document.getElementById("botonMath"); //Boton para desplegar el teclado

botonMath.addEventListener("click", mostrarTeclado);

function mostrarTeclado(e){ //muestra el teclado
    teclado.style.display == "grid" ? teclado.style.display = "none" : teclado.style.display = "grid";
}