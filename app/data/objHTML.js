//Objeto que guarda datos generales del HTML que se repiten en varios lugares

export class objHTML {
    constructor(){
        this.main = document.getElementById("Main"); //toda mi página
        this.formularioCalculo = document.getElementById("form1"); //Mi form principal
        this.resultado = document.getElementById("resultado"); //Mi resultado actual
        this.error = document.getElementById("error"); //Estado de errores
        this.resolucion = document.getElementById("resolucion"); //DIV donde se incluye la resolución
    }
}

const HTML = new objHTML(); //Objeto que guarda todas las variables del HTML

export { HTML };