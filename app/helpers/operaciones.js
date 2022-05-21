import { toFixedString } from "./auxiliares.js";
let posOperacion = 0;

export function armarTier(formula,pos,tier){

    let oldPos = pos;
    let tierClose = ")]}";
    tier = tier + 1;
    //busco las etapas en un loop de la misma función
    if (formula[0].tierCount > tier){
        pos++;
        armarTier(formula,formula[0].buscarAbreTier(pos-1)+1,tier);       
    }
    pos = oldPos;
    let newPos = 0;
    //busco el cierre de la etapa y genero su fórmula exclusiva
    while(!tierClose.includes(formula[0].strNum[0][pos])){
        formula[0].strNum[tier].push(formula[0].strNum[0][pos]);
        newPos++;
        pos++;
    }
    //calculo e informo cada etapa
    formula[0].etapa[tier] = new Array();
    formula[0].etapa[tier][0] = toFixedString(formula[0].strNum[tier]);
    formula[0].resultado = calcular(formula,tier);
    tier = tier - 1;
    formula[0].strNum[0].splice(oldPos-1,newPos+2,formula[0].resultado);
}

//función que llama a las distintas operaciones en el orden de prioridad correcto
export function calcular(formula,tier){
    posOperacion = 0;
    for (const [pos] of formula[0].strNum[tier].entries()){operar(pos,formula[0].strNum[tier],formula,tier,"potenciar")}
    for (const [pos] of formula[0].strNum[tier].entries()){operar(pos,formula[0].strNum[tier],formula,tier,"multiplicar")}
    for (const [pos] of formula[0].strNum[tier].entries()){operar(pos,formula[0].strNum[tier],formula,tier,"dividir")}
    for (const [pos] of formula[0].strNum[tier].entries()){operar(pos,formula[0].strNum[tier],formula,tier,"restar")}
    for (const [pos] of formula[0].strNum[tier].entries()){operar(pos,formula[0].strNum[tier],formula,tier,"sumar")}
    return formula[0].strNum[tier][0];
}

//funciones de operaciones
function operar(pos,arr,formula,tier,operacion){
    let opero = false;
    let operacionStr = "";
    let operacionFuncion;
    let operacionTexto = "";

    switch(operacion){
        case "sumar":
            if(arr[pos] == "+"){
                opero = true;
                operacionStr = "sumar";
                operacionTexto = "Sumamos: ";
                operacionFuncion = (a,b) => {return a + b}
            }
        break;
        case "restar":
            if(arr[pos] == "-"){
                opero = true;
                operacionStr = "restar";
                if (pos==0){
                    arr.unshift("0");
                    pos++;
                }
                operacionTexto = "Restamos: ";
                operacionFuncion = (a,b) => {return a - b}
            }
        break;
        case "multiplicar":
            if(arr[pos] == "*"){
                opero = true;
                operacionStr = "multiplicar";
                operacionTexto = "Multiplicamos: ";
                operacionFuncion = (a,b) => {return a * b}
            }
        break;
        case "dividir":
            if(arr[pos] == "/"){
                opero = true;
                operacionStr = "dividir";
                operacionTexto = "Dividimos: ";
                operacionFuncion = (a,b) => {return a / b}
            }
        break;
        case "potenciar":
            if(arr[pos] == "^"){
                opero = true;
                operacionStr = "potenciar";
                operacionTexto = "Realizamos la potencia: ";
                operacionFuncion = (a,b) => {return Math.pow(a,b)}
            }
        break;        
    }
    if (opero){
        posOperacion++;
        formula[0].etapa[tier][posOperacion] = parseFloat(arr[pos-1]).toFixed(1) + " " + arr[pos] + " " + parseFloat(arr[pos+1]).toFixed(1);
        arr[pos-1] = operacionFuncion(parseFloat(arr[pos-1]),parseFloat(arr[pos+1]))
        arr.splice(pos,2);
        formula[0].etapa[tier][posOperacion] = operacionTexto + formula[0].etapa[tier][posOperacion] + " = " + arr[pos-1].toFixed(1);
        for (const [pos] of formula[0].strNum[tier].entries()){
            operar(pos,formula[0].strNum[tier],formula,tier,operacionStr)}
    }
}