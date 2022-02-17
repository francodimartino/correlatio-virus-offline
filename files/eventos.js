try {
    document.getElementById("nav-idioma").addEventListener("click", () => {
        cambiarIdioma();
    });
} catch (error) {}

try {
    document.getElementById("seleccionar").addEventListener("click", () => {
        if(cmsm2()){
            seleccionarDato();

        }
        
    });
} catch (error) {}



try {
    document
        .getElementById("eliminar-historial")
        .addEventListener("click", eliminarHistorial);
} catch (error) {}

try {
    document
        .getElementById("btn-limpiar")
        .addEventListener("click", limpiarListado);
} catch (error) {}

try {
    document
        .getElementById("btn-guardar")
        .addEventListener("click", guardarImagen);
} catch (error) {}

try {
    document.getElementById("btn-guardar-historial").addEventListener("click", ()=>{
        cargarHistorial(datosSeleccionados);
    });
} catch (error) {
    
}

try{
    let botonInstructivo=document.getElementById("btn-instructivo");
    botonInstructivo.addEventListener("click", ()=>{

        let verInstructivo=idioma=="es"?"Ver Instructivo":"Show Instructive";
        let volverAGrafico=idioma=="es"?"Volver a Grafico":"Back to Graphic";
        
        if(botonInstructivo.textContent == verInstructivo){
            ocultarGrafico();
            ocultarBotones("botonInstructivo");
            botonInstructivo.textContent = volverAGrafico;
        }else{
            mostrarGrafico();
            mostrarBotones();
            botonInstructivo.textContent = verInstructivo;

        }
    });
}catch{

}


function seleccionarDato(elemento) {
    let tipo, unidad, linea;
    if (elemento == undefined) {
        tipo = document.getElementById("select-tipo").value;
        unidad = document.getElementById("select-unidad-informacion").value;
        linea = tipo == "muertes" ? "dash" : "continua";
    } else {
        tipo = elemento.tipo;
        unidad = elemento.unidad;
        linea = elemento.linea;
    }

    let encontrado = datosSeleccionados.find(
        (dato) => dato.tipo == tipo && dato.unidad == unidad
    );

    if (datosSeleccionados.length == 8) {
        Swal.fire({
            icon: "error",
            title: idioma=="es"? "ATENCIÓN":"ATTENTION",
            text: idioma=="es"? "Solo puede graficar 8 datos":"You can only graph 8 data",
        });
    } else if (encontrado) {
        Swal.fire({
            icon: "error",
            title: idioma=="es"?"ATENCIÓN":"ATTENTION",
            text: idioma=="es"? "La información deseada ya se encuentra seleccionada":"The information desired is already selected",
        });
    } else {
        let figura = obtenerFiguraDisponible();
        let color = obtenerColorDisponible();
        datosSeleccionados.push({
            tipo: tipo,
            unidad: unidad,
            figura: figura,
            linea: linea,
            color: color,
        });
        cambiarContadorSeleccionados();
        if (datosSeleccionados.length == 8) {
            document
                .getElementById("seleccionar")
                .setAttribute("disabled", "disabled");
        }
        graficar();
    }

    mostrarListado();

    if (datosSeleccionados.length > 0) {
        document.getElementById("btn-limpiar").classList.remove("d-none");
    }
}
