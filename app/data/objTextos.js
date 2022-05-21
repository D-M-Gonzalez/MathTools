export class objTextos { //arrays de textos aleatorios
    constructor(){
        this.inicioEtapa = new Array();
        this.mediaEtapa = new Array();
        this.finalEtapa = new Array();
        this.sinEtapas = new Array();
    }

    cargarTextos(){
        fetch('https://raw.githubusercontent.com/D-M-Gonzalez/MathTools/main/public/strings.json')
        .then( (respuesta) => respuesta.json())
        .then( (textos) => {
             this.mediaEtapa = textos.mediaEtapa;
             this.inicioEtapa = textos.inicioEtapa;
             this.finalEtapa = textos.finalEtapa;
             this.sinEtapas = textos.sinEtapas;
            });
    }
}

const textos = new objTextos();
textos.cargarTextos();
export { textos };