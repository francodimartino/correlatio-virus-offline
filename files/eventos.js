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
        toggleInstructivo();
        if(botonInstructivo.textContent == "Ver Instructivo"){
            botonInstructivo.textContent = "Volver a Grafico";
        }else{
            botonInstructivo.textContent = "Ver Instructivo";

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
            title: "ATENCIÓN",
            text: "Solo puede graficar 8 datos",
        });
    } else if (encontrado) {
        Swal.fire({
            icon: "error",
            title: "ATENCIÓN",
            text: "La información deseada ya se encuentra seleccionada",
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
