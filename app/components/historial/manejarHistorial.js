//modulo que maneja las funciones generales del historial
import * as objHistorial from "../../data/objHistorial.js";
import { crearFormHistorial } from "./crearForm.js";
import { copiarAlPrincipal } from "../../helpers/auxiliares.js";
import { mouseOutColor } from "../../helpers/mouseOut.js";
import { mouseOverColor } from "../../helpers/mouseOver.js";
import { mouseOutColorRed } from "../../helpers/mouseOut.js";
import { anadirEvento } from "./eliminarForm.js";

const botonLimpiar = document.getElementById("limpiar"); //Boton para limpiar historial

botonLimpiar.addEventListener("click",limpiar);

export function guardarEnLocal(clave,valor){ //guarda los valores en la memoria local
    localStorage.setItem(clave,valor);
}

function limpiar(){ //limpio tanto el array como el storage
    Swal.fire({
        title: '¿Estas seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, borrar.',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            while(objHistorial.historial[0]){objHistorial.historial.pop()} 
            localStorage.clear();
            while(objHistorial.divHistorial.childElementCount){
                objHistorial.divHistorial.removeChild(objHistorial.divHistorial.lastElementChild);        
            }
            botonLimpiar.style.display = "none";
            Swal.fire(
                'Hecho!',
                'El historial fué borrado',
                'success'
            )
        }
    }) 
}

export function anadirHistorial(formula){ //añade los DIV declarados en el DIV historial
    let tempHistorial = new objHistorial.objHistorial();

    objHistorial.historial.length > 19 && objHistorial.historial.shift(); //si supero el máximo saca uno del array original
    objHistorial.divHistorial.childElementCount > 19 && objHistorial.divHistorial.removeChild(objHistorial.divHistorial.firstElementChild); //si supero el máximo elimina el primero

    tempHistorial.formula = formula[0].formulaStr; // declaro un array temporal para poder operar sin borar el original
    tempHistorial.pos = objHistorial.historial.length;
    tempHistorial.resultado = formula[0].resultado;
    objHistorial.historial.push(tempHistorial);
    localStorage.clear(); //limpio el storage para luego agregar el correcto sin los valores sobrantes

    for( let [pos,el] of objHistorial.historial.entries()){
        guardarEnLocal(pos,JSON.stringify(el));
    }

    crearFormHistorial(objHistorial.divHistorial,tempHistorial.formula + tempHistorial.resultado); //añado los form correspondientes con sus valores al historial
    botonLimpiar.style.display = "flex";
    anadirEventos();
}

function anadirEventos(){ //Añade los eventos a los diferentes botones del historial
    const formHistorial = document.querySelectorAll(".formHist");
    const inputHistorial = document.querySelectorAll(".inputHist2");
    const eliminarHistorial = document.querySelectorAll(".inputHist3");

    formHistorial.forEach((el)=>el.addEventListener("submit", copiarAlPrincipal));
    inputHistorial.forEach((el)=>{el.addEventListener("mouseover", mouseOverColor);el.addEventListener("mouseout", mouseOutColor);});
    eliminarHistorial.forEach((el)=>{el.addEventListener("mouseover", mouseOverColor);el.addEventListener("mouseout", mouseOutColorRed);});
    eliminarHistorial.forEach((el,pos)=>{
        const parent = el.parentNode;
        anadirEvento(el,pos,parent);
      });

}