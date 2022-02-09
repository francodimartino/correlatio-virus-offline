const variablesEstaticas = {
	en: [
		//  { "label-categorias": "Variable for reference by areas" },
		{ "label-region": "Step 1: Region" },
		{ "label-unidad": "Step 2: Unit to Graph" },
		{ "label-tipo": "Step 3: Type of Data" },
		{ "label-seleccionar": "Step 4: Click to Graph" },
		{ "seleccionar": "Graph" },
		{ "restantes": "Remaining" },
		{ "btn-guardar": "Print / Save PDF" },
		{ "btn-limpiar": "Back" },
		{ "btn-instructivo": "Show instructions" },
		{ "nav-pantalla-completa": "FULLSCREEN" },
		{ "nav-notas": "NOTES" },
		{ "nav-graficar": "GRAPH" },
		{ "nav-contacto": "CONTACT" },
		{ "nav-idioma": "ESPAÑOL" },
		{ "nav-descargar": "DOWNLOAD" },
		{ "seccion-historial": "HISTORY" },
		{ "btn-abrir-pantalla-completa": "FULLSCREEN" },
		{ "btn-cerrar-pantalla-completa": "CLOSE FULLSCREEN" },
		{ "correlatio-virus": "CORRELATIO VIRUS (2020-2021) is universal, free and free to use. Trelew - Patagonia Argentina - February 7th, 2022." },
		{ "programadores": "Programmers: " },
		{ "derechos": "All rights reserved." },
		{ "btn-guardar-historial": "Save to History" },
	],
    es: [
        //  { "label-categorias": "Variable for reference by areas" },
    ]
};

let idioma = localStorage.getItem("idioma");
if (idioma == null) {
	localStorage.setItem("idioma", "es");
}
idioma = localStorage.getItem("idioma");
Object.entries(variablesEstaticas[idioma]).forEach((element) => {
	const campo = Object.entries(element[1])[0][0];
	const valor = Object.entries(element[1])[0][1];
	if (document.getElementById(campo)) {
        
		document.getElementById(campo).textContent = valor;
	}
});
if (idioma == "en") {
	aplicarTextos();
}

function aplicarTextos() {
   
		try {
			console.log("hola");
			document.getElementById("introduccion-texto-es").classList.add("d-none");
			document.getElementById("introduccion-texto-en").classList.remove("d-none");
			document.getElementById("intro-texto-es").classList.add("d-none");
			document.getElementById("intro-texto-en").classList.remove("d-none");

		} catch (error) {
		}

		try {
			document.getElementById("mas-informacion-texto-es").classList.add("d-none");
			document.getElementById("mas-informacion-texto-en").classList.remove("d-none");
		} catch (error) {
			
		}

		try {
			document.getElementById("instructivo-es").classList.add("d-none");
			document.getElementById("instructivo-en").classList.remove("d-none");
		} catch (error) {
			
		}

}

function cambiarIdioma() {
	if (idioma == "en") {
		idioma = "es";
	} else {
		idioma = "en";
	}
	localStorage.setItem("idioma", idioma);
	location.reload();
}