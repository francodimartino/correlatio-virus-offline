//  recibiria ["Contagios", "Muertos"]
function cargarTipos(tipos){
    const select = document.createElement("select");
    select.id = "select-tipo";
    select.classList.add("form-select");

    tipos.forEach((tipo) => {
        const opcion = document.createElement("option");
        opcion.setAttribute("value", tipo);
        opcion.textContent = tipo;
        opcion.classList.add("fs-7");
        opcion.classList.add("fw-bold");
        select.appendChild(opcion);
    });
    
	document.getElementById("opciones-tipo").appendChild(select);
}

//  recibiria [{region: "America del sur", unidad:"Argentina"}, {region: "America del norte", unidad:"Estados Unidos"}]
function cargarUnidadesInformacion(unidadesInformacion) {
    const select = document.createElement("select");
    select.id = "select-unidad-informacion";
    select.classList.add("form-select");

    unidadesInformacion.forEach((unidad) => {
        const opcion = document.createElement("option");
        opcion.setAttribute("value", unidad.unidad);
        opcion.textContent = unidad.unidad;
        opcion.classList.add("fs-7");
        opcion.classList.add("fw-bold");
        select.appendChild(opcion);
    });

    const container = document.getElementById("opciones-unidad");
	if (container.firstChild == null) {
        container.appendChild(select);
	} else {
        container.removeChild(container.firstChild);
		container.appendChild(select);
	}
    
    
	document.getElementById("opciones-unidad").appendChild(select);
}