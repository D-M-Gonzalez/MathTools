import { HTML } from "../data/objHTML.js";

const eventSubmit = new Event ("submit");

//funcion que da un numero aleatorio y lo pasa a INT
export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function copiarAlPrincipal(e){ //copia de form ejemplo al principal y ejecuta el submit
    e.preventDefault();
    HTML.formularioCalculo.children[0].value = e.target.children[0].value;
    HTML.formularioCalculo.dispatchEvent(eventSubmit);
}

//funcion que toma un array y lo transforma en un string, pero ademas aproxima cada uno de los Float a 1 decimal para facilitar su lectura, sin tocar los originales
export function toFixedString(arr){
    let tempArr = new Array();
    let str = "";
    tempArr = arr;

    tempArr = arr.map((el)=>{
        let num = 0.0;
        let num2 = el;
        num = parseFloat(el);
        num && (num2 = num.toFixed(1));
        return num2;
    })
    str = tempArr.join(" ");
    return str;
}

export function removerChilds(el){
    while (el.lastElementChild){
        el.removeChild(el.lastElementChild);
    }
};