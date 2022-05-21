// Esta APP tiene como objetivo tomar una fórmula ingresada como STRING, analizarla y luego resolverla. En esta versión es capaz de tomar cualquier operación básica combinada.

//Importo los ficheros y objetos necesarios
import { objFormula } from "./data/objFormula.js";
import { objHTML } from "./data/objHTML.js";
import { anadirHistorial } from "./components/historial/manejarHistorial.js";
import { escribirSolucion } from "./components/solucion/escribirSolucion.js";
import * as auxiliares from "./helpers/auxiliares.js"
import * as operaciones from "./helpers/operaciones.js"

//declaro las globales
const formula = new Array(); //Mi array de fórmulas
const HTML = new objHTML(); //Objeto que guarda todas las variables del HTML

//variables que guardan posiciones
let posFormulas = 0;
let tier = 0;

//declaro los eventos
HTML.formularioCalculo.addEventListener("submit", hacerCalculo);  

// Tomo el valor ingresado en el cuadro de texto o al presionar enter
function hacerCalculo(e){

    e.preventDefault();
    const formulaOriginal = e.target.children[0].value;
    //const arrayTemp = formulaOriginal.split("=");
    const arrayFormulaOriginal = (formulaOriginal).split("");

    //remuevo los cálculos viejos
    auxiliares.removerChilds(HTML.resolucion);
    HTML.resultado.style.display = "none";
    calculo(arrayFormulaOriginal);      
}
    

//realizo el cálculo de la fórmula ingresada
function calculo(arrayFormulaOriginal){
    //ingreso una nueva fórmula en mi array de fórmulas
    tier = 0;
    posFormulas++;
    const nuevaFormula = new objFormula(posFormulas);   
    formula.unshift(nuevaFormula);
    // Limpio el string para solamente dejar los operadores y numeros ademas informo errores
    formula[0].tierCount = formula[0].limpiarStr(arrayFormulaOriginal);

    //Inicializo la matriz de caracteres y etapas
    formula[0].nuevoDobleArray();
    //verifico errores antes de continuar
    if ( formula[0].errorBol == false){
        //agrupo los números para poder operarlos
        formula[0].agruparNumeros();
        //Busco etapas y realizo su cálculo si existen
        formula[0].tierCount > 0 && operaciones.armarTier(formula,formula[0].buscarAbreTier(0) + 1,tier);
        //realizo el cálculo de la etapa inicial e informo resultado y fórmula de la etapa inicial
        formula[0].etapa[0] = new Array();
        formula[0].etapa[0][0] = auxiliares.toFixedString(formula[0].strNum[0]);
        formula[0].resultado = operaciones.calcular(formula,tier);
        formula[0].resultado = formula[0].resultado.toFixed(2);
    
        //escribo el paso a paso
        escribirSolucion(formula);  
        //añado el cálculo al historial
        anadirHistorial(formula);  
    }
}