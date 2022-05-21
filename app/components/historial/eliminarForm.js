import * as objHistorial from "../../data/objHistorial.js";
import { guardarEnLocal } from "./manejarHistorial.js";

const botonLimpiar = document.getElementById("limpiar"); //Boton para limpiar historial

export function anadirEvento(el,pos,parent){ //añade los eventos pasando por parámetro datos del padre

    el.addEventListener("click",eliminar);
    el.parent = parent;
    el.pos = pos;
}

export function eliminar(e){ //elimina el nodo y refresca todos para actualizar las posiciones
    e.preventDefault();

    e.currentTarget.parent.remove();
    localStorage.clear();
    objHistorial.historial.splice(e.currentTarget.pos,1);

    objHistorial.historial.forEach((el,pos,arr)=>{
        el.pos = pos;
    })

    for( let el of objHistorial.historial){
        guardarEnLocal(el.pos,JSON.stringify(el));
    }
    objHistorial.historial.length === 0 && (botonLimpiar.style.display = "none");
    refrescarEventos();

}

function refrescarEventos(){ //refresca los eventos para actualizar los atributos de los nodos
    const eliminarHistorial = document.querySelectorAll(".inputHist3");
    eliminarHistorial.forEach((el)=>el.removeEventListener("click",eliminar));
    eliminarHistorial.forEach((el,pos)=>{
        const parent = el.parentNode;
        anadirEvento(el,pos,parent);
      });
}