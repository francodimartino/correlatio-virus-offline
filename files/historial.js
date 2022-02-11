const MAX_HISTORIAL = 100;

function eliminarHistorial() {
	localStorage.setItem("historialvirus", JSON.stringify([]));
	
	mostrarHistorial();
}
function fueCargadoUltimo(conjunto, historial) {
	const ultimoConjunto = historial[0] ?? "";

	if (conjunto.length != ultimoConjunto.length) {
		return false;
	}
	const copiaConjunto = conjunto.map((elemento) => elemento);
	const copiaUltimoElemento = ultimoConjunto.map((elemento) => elemento);
	copiaConjunto.sort();
	copiaUltimoElemento.sort();

	for (let i = 0; i < conjunto.length; i++) {
		if (
			copiaConjunto[i].tipo != copiaUltimoElemento[i].tipo ||
			copiaConjunto[i].unidad != copiaUltimoElemento[i].unidad
		) {
			return false;
		}
	}

	return true;
}
function cargarHistorial(conjunto) {
	const historial = JSON.parse(localStorage.getItem("historialvirus")) ?? [];
	if (!fueCargadoUltimo(conjunto, historial)) {
		historial.unshift(conjunto);
		if (historial.length > MAX_HISTORIAL) {
			historial.pop();
		}
		
		localStorage.setItem("historialvirus", JSON.stringify(historial));
		mostrarHistorial();
		mostrarAlertaCargaHistorial(conjunto)
	}else{
		mostrarErrorCargaHistorial(conjunto)
	}
}


function mostrarAlertaCargaHistorial(conjunto) {
	let textoAlert=""
	conjunto.forEach((elemento) => {
		textoAlert += `${elemento.tipo} - ${elemento.unidad}<br> `
	});
	

	Swal.fire({
		icon: "success",
		title: "GUARDADO EN HISTORIAL",
		html: textoAlert,
	});
}

function mostrarErrorCargaHistorial(conjunto) {
	let textoAlert=""
	conjunto.forEach((elemento) => {
		textoAlert += `${elemento.tipo} - ${elemento.unidad}<br> `
	});
	

	Swal.fire({
		icon: "error",
		title: "ESTE GRAFICO ES EL ULTIMO GUARDADO",
		html: textoAlert,
	});
}

function mostrarHistorial() {
	const historial = JSON.parse(localStorage.getItem("historialvirus")) ?? [];
	
	const lista = document.getElementById("historial");
	lista.innerHTML = "";
	if (historial.length > 0) {
		document.getElementById("eliminar-historial").classList.remove("d-none");
		document.getElementById("guardados").textContent = `Guardados: ${historial.length} de ${MAX_HISTORIAL}`;
		historial.forEach((conjunto, index) => {
			//  conjunto es asi {tipo: 'CONTAGIOS', unidad: 'AFGANISTAN', figura: 'circle', linea: 'continua', color: 'rgb(0, 0, 255)'}
			const div = document.createElement("div");
			const row = document.createElement("div");
			row.classList.add("row","m-2");
			const numero = document.createElement("div");
			numero.innerHTML = `<h5>➡</h5>`;
			numero.classList.add("col-2","d-flex","justify-content-center","mt-auto", "mb-auto");
			row.appendChild(numero);
			
			div.classList.add(
				"list-group",
				"list-group-item-action",
				"text-center",
				"p-0",
				"m-0"
			);
			div.classList.add("list-group-item", "list-group-item-action");
			div.addEventListener("click", (e) => {
				if (!e.target.classList.contains("btn-close")) {
					document.getElementById("cerrar-historial").click();
					limpiarListado();
					conjunto.forEach((elemento) => {
						seleccionarDato(elemento);
					});
					//	refactorizar
					graficar();
				}
			});
			const variables = document.createElement("div");
			variables.classList.add("col-8","mt-auto", "mb-auto");
			conjunto.forEach((elemento) => {
				const item = document.createElement("div");
				item.classList.add("p-0", "fw-bold", "fs-7");
				item.textContent = `${elemento.tipo} ${elemento.unidad}`;
				variables.appendChild(item);
			});
			row.appendChild(variables);

			let botonEliminar = document.createElement("div");
			botonEliminar.className = "btn btn-danger btn-sm btn-close mt-auto mb-auto col-2 ms-auto";
			botonEliminar.addEventListener("click", () => {
				historial.splice(index, 1);
				localStorage.setItem("historialvirus", JSON.stringify(historial));
				mostrarHistorial();
			});
			row.appendChild(botonEliminar);

			div.appendChild(row);
			lista.appendChild(div);
		});
	} else {
		document.getElementById(
			"guardados"
		).textContent = `Guardados: ${historial.length} de ${MAX_HISTORIAL}`;
		if (
			!document
				.getElementById("eliminar-historial")
				.classList.contains("d-none")
		) {
			document.getElementById("eliminar-historial").classList.add("d-none");
		}
	}
}
