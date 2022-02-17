function obtenerFiguraDisponible() {
    const figuraDisponible = figurasDisponibles[0];
    figurasDisponibles.shift();
    
    return figuraDisponible;
    
}

function obtenerColorDisponible(){
    const colorDisponible = coloresDisponibles[0];
    coloresDisponibles.shift();
    
    return colorDisponible;
    
}

function devolverColorYFigura(color, figura){
    coloresDisponibles.unshift(color);
    figurasDisponibles.unshift(figura);
    
}

function buscarDatosCrudos() {
    const datosCrudos = [];
    datosSeleccionados.forEach((datoSeleccionado) => {
        const datoEncontrado = datos.find(
            (dato) => dato.unidad == datoSeleccionado.unidad.toUpperCase()
        );
        if (datoEncontrado) {
            datosCrudos.push({
                unidad: datoEncontrado.unidad,
                tipo: datoSeleccionado.tipo,
                datos: datoEncontrado[datoSeleccionado.tipo.toLowerCase()],
                figura: datoSeleccionado.figura,
                linea: datoSeleccionado.linea,
                color: datoSeleccionado.color,
            });
        }
    });
    return datosCrudos;
}

function armarData(datosCrudos) {
    const labels = [
        "ENE20",
        "FEB20",
        "MAR20",
        "ABR20",
        "MAY20",
        "JUN20",
        "JUL20",
        "AGO20",
        "SEP20",
        "OCT20",
        "NOV20",
        "DIC20",
        "ENE21",
        "FEB21",
        "MAR21",
        "ABR21",
        "MAY21",
        "JUN21",
        "JUL21",
        "AGO21",
        "SEP21",
        "OCT21",
        "NOV21",
        "DIC21",
    ];

    const datasets = [];

    datosCrudos.forEach((dato) => {
        
        const dataset = {
            type: "line",
            label: dato.tipo + " " + dato.unidad,

            backgroundColor: dato.color,
            borderColor: dato.color,

            borderWidth: function (context) {
                var width = context.chart.width;
                return width <= 500 ? 2 : 2; //
            },
            data: dato.datos,
            elements: {
                point: {
                    pointStyle: dato.figura,
                    pointRadius: function (context) {
                        var width = context.chart.width;
                        return width <= 500 ? 3 : 7; //
                    },
                },
            },
            borderDash: dato.tipo=="MUERTES"? [3,3]:[],
        };
        datasets.push(dataset);
    });

    return { labels, datasets };
}

const DELAYGRAFICACION=75

function graficar() {
    if (!document.getElementById("btn-guardar").classList.contains("d-none")) {
        document.getElementById("btn-guardar").classList.add("d-none");
    }
    
    const newCanvas = document.createElement("canvas");
    const canvas = document.getElementById("myChart");
    const container = canvas.parentElement;
    container.removeChild(canvas);
    newCanvas.id = "myChart";
    container.appendChild(newCanvas);
    const data = armarData(buscarDatosCrudos());
    
    const delayBetweenPoints = DELAYGRAFICACION;
    const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const myChart = new Chart(newCanvas, {
        data: data,
        options: {
            
            animation: {
                x: {
                    type: 'number',
                    easing: 'linear',
                    duration: delayBetweenPoints,
                    from: NaN, // the point is initially skipped
                    delay(ctx) {
                      if (ctx.type !== 'data' || ctx.xStarted) {
                        return 0;
                      }
                      ctx.xStarted = true;
                      return ctx.index * delayBetweenPoints;
                    }
                  },
                  y: {
                    type: 'number',
                    easing: 'linear',
                    duration: delayBetweenPoints,
                    from: previousY,
                    delay(ctx) {
                      if (ctx.type !== 'data' || ctx.yStarted) {
                        return 0;
                      }
                      ctx.yStarted = true;
                      return ctx.index * delayBetweenPoints;
                    }
                  }
            },
            
            
            responsive: true,
            layout: {
                padding: function (context) {
                    var width = context.chart.width;

                    return width / 20; // el ancho del grafico dividido por 20
                },
            },
            aspectRatio: 1.8,
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
    
                            
                            return label;
                        }
                    }
                },
                legend: {
                    labels: {
                        usePointStyle: true,
                        font: function (context) {
                            var width = context.chart.width;
                            var size = Math.round(width / 60);
                            width < 300 ? (size = size * 1.5) : (size = size); // si el ancho es menor a 300 se multiplica por 1.5
                            return {
                                size: size,
                                weight: 550,
                            };
                        },
                    },
                },
            },
            
            
            scales: {
                x: {
                    ticks: {
                        autoSkip: true,
                        
                        display: true //this will remove only the label
                    }
                },
                y: {
                    ticks: {
                        
                        display: false //this will remove only the label
                    }
                }
              }
        },
        plugins: [
            {
                id: "custom_canvas_background_image",
                beforeDraw: (chart) => {
                    //fondo blanco
                    const ctx = chart.canvas.getContext("2d");
                    ctx.save();
                    ctx.globalCompositeOperation = "destination-over";
                    ctx.fillStyle = "white";
                    ctx.fillRect(0, 0, chart.canvas.width, chart.canvas.height);

                    ctx.restore();
                   
                    let image = new Image();
                    image.src = "../img/watermark.png";
                    if (image.complete) {
                        const ctx = chart.ctx;
                        const { top, left, width, height } = chart.chartArea;
                        //mantener la relación de aspecto de la imagen con el canvas
                        let newWidth;
                        if (window.innerWidth > 450) {
                            newWidth = chart.canvas.width / 10;
                        } else {
                            newWidth = chart.canvas.width / 30;
                        }
                        const newHeight =
                            (image.height * newWidth) / image.width;
                        const newLeft = left + (width - newWidth);
                        const newTop = top + (height - newHeight);
                        // fin mantener la relación de aspecto de la imagen con el canvas
                        ctx.drawImage(
                            image,
                            newLeft,
                            newTop,
                            newWidth,
                            newHeight
                        );
                    } else {
                        image.onload = () => chart.draw();
                    }
                    
                },
                
            },
        ],
    });
    
    graficoMostrado=myChart
    if(document.getElementById("canvas").classList.contains("d-none")) {
        mostrarGrafico()
        let verInstructivo= idioma=="es" ? "Ver Instructivo" : "Show Instructive"
        document.getElementById("btn-instructivo").textContent=verInstructivo
    }
    //esperar a que se cargue el grafico
    
        setTimeout(() => {
            if(datosSeleccionados.length!=0){
                mostrarBotones();
                
            }
 }, DELAYGRAFICACION*data.labels.length);


    
    
    
    

}






function cargarOpcionesPantallaCompleta() {
    const elem = document.documentElement;
    function abrirPantallaCompleta() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    function cerrarPantallaCompleta() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
	const btnAbrirPantallaCompleta = document.getElementById("btn-abrir-pantalla-completa");
	const btnCerrarPantallaCompleta = document.getElementById("btn-cerrar-pantalla-completa");
	btnCerrarPantallaCompleta.classList.add("d-none");
	
	
	btnAbrirPantallaCompleta.addEventListener("click", function () {
		abrirPantallaCompleta();
		btnAbrirPantallaCompleta.classList.toggle("d-none");
		btnCerrarPantallaCompleta.classList.toggle("d-none");
	});
	
	
	btnCerrarPantallaCompleta.addEventListener("click", function () {
		cerrarPantallaCompleta();
		btnCerrarPantallaCompleta.classList.toggle("d-none");
		btnAbrirPantallaCompleta.classList.toggle("d-none");
	});
}


function mostrarGrafico() {
    if(document.getElementById("canvas").classList.contains("d-none")) {
        document.getElementById("canvas").classList.remove("d-none");
        document.getElementById("instructivo").classList.add("d-none");
    }
    
}

function ocultarGrafico() {
    if(!document.getElementById("canvas").classList.contains("d-none")) {
        document.getElementById("canvas").classList.add("d-none");
        document.getElementById("instructivo").classList.remove("d-none");
    }
}

function ocultarBotones(parametro) {
    if(!document.getElementById("btn-guardar").classList.contains("d-none")) {
        document.getElementById("btn-guardar").classList.add("d-none")
    }
    if(!document.getElementById("btn-instructivo").classList.contains("d-none") && parametro!="botonInstructivo") {
        document.getElementById("btn-instructivo").classList.add("d-none")
    }
    if(!document.getElementById("btn-guardar-historial").classList.contains("d-none")) {
            document.getElementById("btn-guardar-historial").classList.add("d-none")
    }
            
    
}
function mostrarBotones() {
    
    if(document.getElementById("btn-guardar").classList.contains("d-none")) {
        document.getElementById("btn-guardar").classList.remove("d-none")
    }
    if(document.getElementById("btn-guardar-historial").classList.contains("d-none")) {
        document.getElementById("btn-guardar-historial").classList.remove("d-none")
    }
    if(document.getElementById("btn-instructivo").classList.contains("d-none")) {
        document.getElementById("btn-instructivo").classList.remove("d-none")
    }
        
    
}


cargarOpcionesPantallaCompleta()