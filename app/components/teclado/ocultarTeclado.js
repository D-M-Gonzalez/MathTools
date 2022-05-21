//modulo que oculta el teclado

import { teclado } from "./escribirConTeclado.js";
import { HTML } from "../../data/objHTML.js"

HTML.main.addEventListener("click", ocultarTeclado);
HTML.formularioCalculo.addEventListener("submit", ocultarTeclado);

export function ocultarTeclado(e){ //oculta el teclado 
    if (teclado.style.display == "grid" && e.target != botonMath){
        teclado.style.display = "none";
    }
}