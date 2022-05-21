//Objeto que guarda datos del error

export class objError {
    constructor () {
        this.id = "noError";
        this.bool = false;
        this.string = "";
    }
}

export class stringError {
    constructor () {
        this.title = "";
        this.text = "";
        this.ayuda = "";
    }
    async cargarTextos(error){
        await fetch('https://raw.githubusercontent.com/D-M-Gonzalez/MathTools/main/public/errores.json')
        .then( (respuesta) => respuesta.json())
        .then( (textos) => {
             this.title = textos[error].title;
             this.text = textos[error].text;
             this.ayuda = textos[error].ayuda;
            });
        return this;
    }
}