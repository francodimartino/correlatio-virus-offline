function mostrarListado() {
    let lista = document.getElementById("listado");
    lista.innerHTML = "";
    datosSeleccionados.forEach((element) => {
        let div = document.createElement("div");
        div.className = "list-group-item list-group-item-action";
        div.innerHTML = `<small class=" pe-1">${element.tipo} - ${element.unidad} </small>`;
        let botonEliminar = document.createElement("div");
        botonEliminar.className = "btn btn-danger btn-sm btn-close float-end";

        botonEliminar.addEventListener("click", () => {
            eliminarElemento(element);
            
            if (datosSeleccionados.length==0){
                toggleInstructivo("grafico")
                if(!document.getElementById("btn-guardar").classList.contains("d-none") ){
                    document.getElementById("btn-guardar").classList.add("d-none")
            
                }
            }else{
                graficar();
            }
            
        });
        div.appendChild(botonEliminar);
        lista.appendChild(div);
    });
}

function cambiarContadorSeleccionados() {
    let contador = figurasDisponibles.length;
    document.getElementById("contador-seleccionados").textContent = contador;
}

function eliminarElemento(element) {
    datosSeleccionados.splice(datosSeleccionados.indexOf(element), 1);
    devolverColorYFigura(element.color, element.figura);
    cambiarContadorSeleccionados();

    mostrarListado();
    if(datosSeleccionados.length==0){
        document.getElementById("btn-limpiar").classList.add("d-none")
        
    }
}


function limpiarListado() {
    while (datosSeleccionados.length > 0) {
        let element = datosSeleccionados[0];

        eliminarElemento(element);
    }

    mostrarListado();
    
    toggleInstructivo("grafico")
    if(!document.getElementById("btn-guardar").classList.contains("d-none") ){
        document.getElementById("btn-guardar").classList.add("d-none")

    }
    
}