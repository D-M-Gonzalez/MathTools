//modulo que prepara todo para crear un form en el historial y luego agregarle los valores correspondientes

export function crearFormHistorial(parent,resultado){
    let div = document.createElement("form");
    div.classList.add("formHist");
    div.innerHTML = `<input class="inputHist1" value=${resultado}>
                     <input class="inputHist2" type="submit" value="=">
                     <input class="inputHist3" type="submit" value="X">`;
    parent.appendChild(div);  
}