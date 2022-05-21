//Funciones de error, agregar nuevos en este módulo
import { objError } from "../data/objError.js";

//Todas las variables que necesito para determinar los errores
const listaValidChars = "1234567890={}[](). +-*/^";
const listaNumAntPar = ["0(","1(","2(","3(","4(","5(","6(","7(","8(","9(","0[","1[","2[","3[","4[","5[","6[","7[","8[","9[","0{","1{","2{","3{","4{",
"5{","6{","7{","8{","9{",".(",".[",".{"];
const listaNumDpsPar = [")0",")1",")2",")3",")4",")5",")6",")7",")8",")9","]0","]1","]2","]3","]4","]5","]6","]7","]8","]9","}0","}1","}2","}3","}4",
"}5","}6","}7","}8","}9",").","].","}."];
const listaOpAntPar = ["+)","-)","*)","/)","^)","+]","-]","*]","/]","^]","+}","-}","*}","/}","^}"];
const listaDobleOp = ["++","+-","-+","--","**","*+","+*","*-","-*","//","/+","+/","/-","-/","/*","*/","^^","^+","+^","^-","-^","^*","*^","^/","/^","+=","-=","/=","*=","^="];
const cierreParentesis = [")","]","}"];
const abreParentesis = ["(","[","{"];
let error = new objError();

//Declaración de todas las funciones de error

export function caracterInvalido (formula) { //Si ingreso un caracter no incluido en la lista de permitidos
    for ( const [pos,el] of formula.entries()){
        if(!listaValidChars.includes(el)){
            let string = formula[pos-2] + formula[pos-1] + " ' " + formula[pos] + " ' " + formula[pos+1] + formula[pos+2];
            error.string = string.replace(/undefined|NaN/g,'');
            error.id = "invChar";
            error.bool = true;
        }        
    }
    return error;  
}

export function ingresoIgual (formula) { //Si ingreso un caracter no incluido en la lista de permitidos
    for ( const [pos,el] of formula.entries()){
        if(el === "="){
            let string = formula[pos-2] + formula[pos-1] + " ' " + formula[pos] + " ' " + formula[pos+1] + formula[pos+2];
            error.string = string.replace(/undefined|NaN/g,'');
            error.id = "ingIgual";
            error.bool = true;
        }        
    }
    return error;  
}

export function numAntPar(formula) { //Si ingreso un número antes de un paréntesis
    for ( const [pos,el] of formula.entries()){
        if(listaNumAntPar.includes(el + formula[pos+1])){
            let string = formula[pos-2] + formula[pos-1] + " ' " + formula[pos] + " ' " + formula[pos+1] + formula[pos+2];
            error.string = string.replace(/undefined|NaN/g,'');
            error.id = "numAntesPar";
            error.bool = true;
        }        
    }
    return error; 
}

export function numDpsPar(formula) { //Si ingreso un número despues de un paréntesis
    for ( const [pos,el] of formula.entries()){
        if(listaNumDpsPar.includes(el + formula[pos+1])){
            let string = formula[pos-2] + formula[pos-1] + " ' " + formula[pos] + " ' " + formula[pos+1] + formula[pos+2];
            error.string = string.replace(/undefined|NaN/g,'');
            error.id = "numDpsPar";
            error.bool = true;
        }        
    }
    return error; 
}

export function opAntPar(formula) { //Si ingreso un operador antes de cerrar un paréntesis
    for ( const [pos,el] of formula.entries()){
        if(listaOpAntPar.includes(el + formula[pos+1])){
            let string = formula[pos-2] + formula[pos-1] + " ' " + formula[pos] + " ' " + formula[pos+1] + formula[pos+2];
            error.string = string.replace(/undefined|NaN/g,'');
            error.id = "opAntesPar";
            error.bool = true;           
        }        
    }
    return error;  
}

export function opConse(formula) { //Si ingreso dos operadores juntos sin número
    for ( const [pos,el] of formula.entries()){
        if(listaDobleOp.includes(el + formula[pos+1])){
            let string = formula[pos-2] + formula[pos-1] + " ' " + formula[pos] + " ' " + formula[pos+1] + formula[pos+2];
            error.string = string.replace(/undefined|NaN/g,'');
            error.id = "opCons";
            error.bool = true;
        }        
    }
    return error;   
}

export function parDeParentesis (formula) { //Busco pares de paréntesis, se usa despues para el cálculo

    let abrirP = formula.filter((el)=>abreParentesis.includes(el));
    let cerrarP = formula.filter((el)=>cierreParentesis.includes(el));

    if ( abrirP.length != cerrarP.length ){
        error.bool = true;
        error.id = "missPar";
        error.string = "";
    } else {
        formula.tierCount = abrirP.length;
        error.bool = false;
    }
    return error; 
}