let datosDinamicos;
let graficoMostrado="";
let datosSeleccionados=[]
const figurasDisponibles = ['circle', 'cross', 'crossRot', 'line', 'rect', 'rectRot', 'star', 'triangle']

//arreglo de 8 colores para las lineas en formato rgb(0, 0, 255)
const coloresDisponibles = [
    "rgb(0, 0, 255)",
    "rgb(0, 255, 0)",
    "rgb(255, 0, 0)",
    "rgb(0, 191, 255)",
    "rgb(255, 0, 255)",
    "rgb(255, 150, 0)",
    "rgb(0, 0, 0)",
    "rgb(125, 125, 125)",
];


buscarDatos();
cargarTipos(datosDinamicos.tipos)
cargarUnidadesInformacion(datosDinamicos.unidades)
cambiarContadorSeleccionados();
mostrarHistorial();
