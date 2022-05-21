const resultadoDiv = document.getElementById("resultado");

export async function animarSolucion (div){
    for (let b = div.childElementCount-1; b>=0; b--){
            for (let i = 0; i<=100; i=i+33){
                const promise2 = new Promise ((resolve,reject)=>{                
                    setTimeout(()=>{
                        div.childNodes[b].style.opacity = i/100;
                        resolve("asd");
                    },1)
                })
                let respuesta2 = await promise2;                
            }
    }
    setTimeout(()=>{
        resultadoDiv.style.display = "flex";
    },0)
} 