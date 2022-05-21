//modulo que escribe lo que apretamos en el teclado
const teclado = document.getElementById("dropdown-botonMath");

const botones = document.querySelectorAll(".teclado"); //Botones dentro del teclado

botones.forEach((el)=>{el.addEventListener("click",escribirSimbolo)});

function escribirSimbolo(e){ //funcion para escribir los símbolos en la posición del cursos
    e.stopPropagation();
    let simbolo = e.target.innerHTML;
    let range = input1.selectionStart;
    input1.value = input1.value.substring(0,range) + simbolo + input1.value.substring(range,input1.length); //verifico donde está el cursor
    input1.focus();
    input1.setSelectionRange(range+1,range+1); //vuelvo a poner el cursor donde estaba
}

export { teclado }