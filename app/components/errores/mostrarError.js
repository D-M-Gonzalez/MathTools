//modulo para mostrar los mensajes de error

import { solucionarError } from "./solucionError.js";
import { stringError } from "../../data/objError.js";

export async function mostrarError(id,string){
    let errores = new stringError();
    errores = await errores.cargarTextos(id);
    let ayuda = "";

    Swal.fire({
        icon: 'error',
        title: errores.title,
        text: errores.text,
        footer: `<a class="errorMsg" id=${id} href="">¿Cómo lo soluciono?</a>`
    })
    ayuda = errores.ayuda


    solucionarError(id,string,ayuda); //Llama a la funcion de ayuda
}