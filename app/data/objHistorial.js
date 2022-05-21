//Objeto que guarda datos necesarios para manejar el historial

const divHistorial = document.getElementById("historial");

export class objHistorial {
    constructor() {
        this.pos = 0;
        this.formula = "";
        this.resultado = "";
    }
}
export class objFormHist {
    constructor() {
        this.formHistorial = "";
        this.formulaHistorial = "";
        this.botonhistorial = "";
    }
}

let historial = new Array();
export { historial }; //objeto global que guarda mis datos del historial 
export { divHistorial }; //contenedor del historial