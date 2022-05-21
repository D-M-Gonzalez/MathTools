import * as objHistorial from "./data/objHistorial.js";
import {crearFormHistorial} from "./components/historial/crearForm.js";
import { mouseOutColor } from "./helpers/mouseOut.js";
import { mouseOverColor } from "./helpers/mouseOver.js";
import { copiarAlPrincipal } from "./helpers/auxiliares.js";
import { anadirEvento } from "./components/historial/eliminarForm.js";
import { mouseOutColorRed } from "./helpers/mouseOut.js";

const botonMain = document.getElementById("input2"); //Boton = principal
const formulariosEjem = document.querySelectorAll(".formEjem"); //Todos los form de ejemplo
const botonEjem = document.querySelectorAll(".inputEjem2"); //Todos los = de ejemplo
const botonLimpiar = document.getElementById("limpiar"); //Boton para limpiar historial

document.addEventListener("DOMContentLoaded", (e) => { //inicializo los eventos para lo que tengo en el index.html
  while(objHistorial.historial[0]){objHistorial.historial.pop()} //inicializo cualquier dato que tenga el array
    for (let i=0; i<localStorage.length; i++){
        objHistorial.historial.push(JSON.parse(localStorage.getItem(i)));
        crearFormHistorial(objHistorial.divHistorial,objHistorial.historial[i].formula + objHistorial.historial[i].resultado);
    }
  objHistorial.historial.length > 0 && (botonLimpiar.style.display = "flex");
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
  formulariosEjem.forEach((el)=>el.addEventListener("submit", copiarAlPrincipal));
  botonEjem.forEach((el)=>{el.addEventListener("mouseover", mouseOverColor);el.addEventListener("mouseout", mouseOutColor);});
  botonMain.addEventListener("mouseout", mouseOutColor);
  botonMain.addEventListener("mouseover", mouseOverColor);
  const formHistorial2 = document.getElementsByClassName("formHist");
  console.log(formHistorial)
  console.log(formHistorial2)

  })
