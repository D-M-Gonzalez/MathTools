//Funcion que selecciona el caracter erroneo y nos lo muestra en una ayuda
export function solucionarError(id,string,ayuda){
    const linkError = document.getElementById(id);
    linkError.string = string;
    linkError.ayuda = ayuda;
    linkError.addEventListener("click", mensaje);
}

function mensaje(e){
    e.preventDefault();
    Swal.fire({
        title: e.currentTarget.string,
        text: e.currentTarget.ayuda,
    })
}

