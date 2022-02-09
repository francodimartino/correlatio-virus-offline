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
    // document.getElementById("label-tipo").innerHTML = traducirLabel("Tipo"); CONULTAR LINEA ¿Deberiamos traer la logica de traducir label?
    document.getElementById("label-tipo").innerHTML = "Paso 3: Tipo de dato";
	document.getElementById("opciones-tipo").appendChild(select);
}

//  recibiria ["America del sur", "America del norte"] y [{region: "America del sur", unidad:"Argentina"}, {region: "America del norte", unidad:"Estados Unidos"}]
function cargarRegiones(regiones, unidadesInformacion) {
    const select = document.createElement("select");
    select.id = "select-region";
    select.classList.add("form-select");
    regiones.sort();
    regiones.splice(regiones.findIndex((region) => region == "MUNDO"), 1)
    regiones.unshift("MUNDO");
    regiones.forEach((region) => {
        const opcion = document.createElement("option");
        opcion.setAttribute("value", region);
        opcion.textContent = region;
        opcion.classList.add("fs-7");
        opcion.classList.add("fw-bold");
        select.appendChild(opcion);
    });

    select.addEventListener("change", (e) => {
        const region = e.target.value;
        if (region == "MUNDO") {
            cargarUnidadesInformacion(unidadesInformacion);
        } else {
            const unidadesFiltradas = unidadesInformacion.filter((element) => element.region === region);
            cargarUnidadesInformacion(unidadesFiltradas);
        }
    });

    // document.getElementById("label-tipo").innerHTML = traducirLabel("Tipo"); CONULTAR LINEA ¿Deberiamos traer la logica de traducir label?
    document.getElementById("label-region").innerHTML = "Paso 1: Región";
	document.getElementById("opciones-region").appendChild(select);

    const e = new Event("change");
    const element = document.getElementById("select-region");
    element.dispatchEvent(e);
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
    
    // document.getElementById("label-tipo").innerHTML = traducirLabel("Tipo"); CONULTAR LINEA ¿Deberiamos traer la logica de traducir label?
    document.getElementById("label-unidad").innerHTML = "Paso 2: Unidad de información";
	document.getElementById("opciones-unidad").appendChild(select);
}
//  cargarRegiones(["America del sur", "America del norte"], [{region: "America del sur", unidad:"Argentina"}, {region: "America del norte", unidad:"Estados Unidos"}])