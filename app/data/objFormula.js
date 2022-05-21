//Objeto general que guarda todos los datos de las fórmulas ingresadas

import { buscarError } from "../components/errores/buscarError.js";
import { mostrarError } from "../components/errores/mostrarError.js";
import { objError } from "./objError.js";

export class objFormula {
    constructor(formulaPos){
        this.formulaPos = formulaPos; //id de la fórmula ingresada
        this.formulaStr = ""; //string de la fórmula ingresada ya verificado
        this.formulaFinal = new Array(); //array que contiene la fórmula verificada
        this.strNum = new Array(); //matriz que contiene cada uno de los caracteres en cada una de las etapas
        this.etapa = new Array(); //array que contiene los strings de fórmulas para cada etapa
        this.operacion = new Array(); //array que contiene los strings de fórmulas para cada operación realizada
        this.errorBol = false; //boolean que evita la ejecución de la app
        this.errorStr = ""; //se guarda en un STR el valor del error
        this.tierCount = 0; //contador para las etapas
        this.resultado = 0; //resultado de la fórmula
    }
    //El método limpiarStr tiene como objetivo analizar la fórmula ingresada, y en caso de ser necesario declarar un errorBol para luego frenar la ejecución
    limpiarStr(arrayFormulaOriginal){
        let error = new objError();
        //realizo las operaciones de verificación para cada caso
        this.formulaFinal = arrayFormulaOriginal.filter((el) => !el.includes(" "));
        this.formulaStr = this.formulaFinal.join("");
        error = buscarError(this.formulaFinal); //busco errores
        this.errorBol = error.bool && mostrarError(error.id,error.string); //si encontre errores llamo al módulo de errores para mostrarlos
        this.formulaFinal.push("=");
        this.formulaStr = this.formulaStr + "=";
        return this.formulaFinal.tierCount
    }
    //El método nuevoArray tiene como objetivo inicializar la matriz de strNum
    nuevoDobleArray(){
        for ( let i = 0; i<=this.tierCount; i++){
            this.strNum.push();
        }
        for ( let i = 0; i<=this.tierCount; i++){
            this.strNum[i] = new Array();
        }
    }
    //el método agruparNumeros toma caracteres individuales consecutivos de números y los transforma en un número único
    agruparNumeros(){
        let validNum = "1234567890.";
        this.formulaFinal.forEach((item,pos,arr)=>{
            let tempStr = arr[pos];
            while(validNum.includes(arr[pos+1]) && validNum.includes(item)){
                tempStr = tempStr + arr[pos+1];
                arr.shift();
            }
            this.strNum[0].push(tempStr);                   
        })
    }
    //el método buscarAbreTier tiene como objetivo encontrar donde se inicia una nueva etapa
    buscarAbreTier(posInicial){
        let pos = 0;
        let tempArr = this.strNum[0].slice(posInicial,this.strNum[0].length)       
        pos = tempArr.findIndex((el)=>{
            let tierOpen = "([{";
            return tierOpen.includes(el) == true;
        })
        return pos + posInicial;
    }
}