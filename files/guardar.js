function guardarImagen() {
    
    
    if (graficoMostrado != "") {
        dinonear("ocultar");
        
        if(!detectarCelu()){
            
            window.print();
        
        }else {
        
            descargarImagen();
        }
        
        dinonear("mostrar");
    } else {
        
        Swal.fire({
            icon: "error",
            title: idioma=="es"? "ATENCIÓN": "ATTENTION",
            text: idioma=="es"? "NO HAY DATOS DISPONIBLES PARA GRAFICAR": "NO DATA AVAILABLE TO GRAPH",
        });
    }
}

function dinonear(clave) {
    
    if (clave == "ocultar") {
        
        document.getElementById("columna-izq").classList.add("d-none");
        document.getElementById("navbar").classList.add("d-none");
        document.getElementById("btn-instructivo").classList.add("d-none");
        document.getElementById("btn-guardar-historial").classList.add("d-none");
        
    } else {
        document.getElementById("columna-izq").classList.remove("d-none");
        document.getElementById("navbar").classList.remove("d-none");
        document.getElementById("btn-instructivo").classList.remove("d-none");
        document.getElementById("btn-guardar-historial").classList.remove("d-none");
    }
}


function detectarCelu() {
    let agente = navigator.userAgent.toLowerCase();
    let esAndroid = agente.indexOf("android") > -1;
    let esIos = agente.indexOf("iphone") > -1;
    if (esAndroid || esIos) {
        return true;
    } else {
        return false;
    }
}


function descargarImagen() {

    
    let fecha=new Date();
    // del objeto fecha "lunes 21 de febrero de 2022 a las 12:00"
    let fechaString = fecha.toLocaleString();
    let nombre = `${fechaString.replace(/\s/g, "")}.png`;
    
    let a = document.createElement("a");
    if (graficoMostrado != null) {
        function cambiarTamanio() {
            return new Promise((resolve, reject) => {
                width = 995;
                height = 552;
                graficoMostrado.options.responsive = false;
                graficoMostrado.options.maintainAspectRatio = false;
                document.getElementById("myChart").style.width = width + "px";
                document.getElementById("myChart").style.height = height + "px";
                document.getElementById("canvas").style.width = width + "px";
                document.getElementById("canvas").style.height = height + "px";

                let ancho = graficoMostrado.canvas.width;
                const poll = (resolve) => {
                    if (graficoMostrado.canvas.width != ancho) resolve();
                    else setTimeout((_) => poll(resolve), 1000);
                };
                poll(resolve);
            });
        }

        async function descargar() {
            await cambiarTamanio();
            
                a.href = graficoMostrado.toBase64Image();
                a.download = nombre;
                a.click();
            
        }
        descargar().then(() => {
            resizearGrafico();
        });
    } else {
        alert("");
        Swal.fire({
            icon: 'error',
            title: idioma=="es"?'ATENCIÓN':'ATTENTION',
            text: idioma=="es"?'NO HAY DATOS DISPONIBLES PARA GRAFICAR':'NO DATA AVAILABLE TO GRAPH',
          })
    }
}


function resizearGrafico() {
    document.getElementById("myChart").style.removeProperty("width");
    document.getElementById("myChart").style.removeProperty("height");
    document.getElementById("canvas").style.removeProperty("width");
    document.getElementById("canvas").style.removeProperty("height");

    
    graficar()
}