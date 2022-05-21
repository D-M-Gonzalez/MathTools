//modulo que escribe el paso a paso

import * as auxiliares from "../../helpers/auxiliares.js"
import { objHTML } from "../../data/objHTML.js";
import { textos } from "../../data/objTextos.js";
import { animarSolucion } from "./animarSolucion.js";

const HTML = new objHTML(); //Objeto que guarda todas las variables del HTML

export function escribirSolucion(formula){
    const formulaOriginalText = document.createElement("DIV");
    const resultadoDiv = document.getElementById("resultado");
    formulaOriginalText.setAttribute("class","formOrg");
    document.getElementById("text5").innerHTML = formula[0].resultado;
    resultadoDiv.style.display = "none";

    if ( !formula[0].errorBol ){
        formula[0].etapa.forEach((_,i)=>{
            let etapa = document.createElement("DIV"); //creo el DIV de etapa
            etapa.setAttribute("class","etapas"); //Y le doy clase etapas
            if (formula[0].etapa.length == 1){ //Averiguo en que etapa estoy, para poder ingresar el string correcto
                etapa.textContent = textos.sinEtapas[auxiliares.getRandomInt(0,6)] + formula[0].etapa[i][0];
            } else {
                switch(i){
                    case 0: 
                    etapa.textContent = textos.finalEtapa[auxiliares.getRandomInt(0,15)] + formula[0].etapa[i][0];
                        break;
                    case formula[0].etapa.length-1: 
                    etapa.textContent = textos.inicioEtapa[auxiliares.getRandomInt(0,13)] + "(" + formula[0].etapa[i][0] + ")";
                        break;
                    default: 
                    etapa.textContent = textos.mediaEtapa[auxiliares.getRandomInt(0,22)] + "(" + formula[0].etapa[i][0] + ")";
                        break;
                }
            }
            formula[0].etapa[i].shift(); //saco la fórmula inicial de la etapa
            formula[0].etapa[i].reverse().forEach((_,b)=>{ //itero de manera inversa en mis operaciones
            let calculo = document.createElement("DIV"); //creo el DIV de operaciones
            calculo.innerHTML = `<div class=resultados>${formula[0].etapa[i][b]}</div>`;
            calculo.style.opacity = 0;
            HTML.resolucion.appendChild(calculo);            
            })
            etapa.style.opacity = 0;
            HTML.resolucion.appendChild(etapa);  
        })
        formulaOriginalText.textContent = formula[0].formulaStr; //Ingreso la fórmula original
        formulaOriginalText.style.opacity = 0;
        HTML.resolucion.appendChild(formulaOriginalText);

        animarSolucion(HTML.resolucion);
    }
}