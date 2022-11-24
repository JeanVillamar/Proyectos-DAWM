import data from '../json/resultado.json' assert {type: 'json'};

const width_threshold = 480;
var totalretenciones = [];
var a = 0;
//INICIALIZANDO EL ENCABEZADO
//document.getElementById("demo").innerHTML += "<tr><th>ESTADO</th><th>numeroAutorizacion</th><th>fechaAutorizacion</th><th>ambiente</th></tr>";

data.forEach(element => {
    var re = /\\/gi;
    var str = element.path;
    var newstr = str.replace(re, "/");
    var a = 0;
    //CargarDatos("./"+newstr);    
    
    CargarDatos(newstr);    
    
});

drawLineChart();    
drawBarChart();     //BARRAS
drawPieChart();     //PASTEL
updateLineChart();
updateBarChart();


function CargarDatos(ruta){
  var xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function(){
      if(this.readyState ==4 && this.status == 200){
          cargarXML(this);
      }
  };
   xhr.open("GET", ruta, true);
   xhr.send();
}




function cargarXML(xml){
  var docXML = xml.responseXML; //responseXML
  var tabla = "";
  var factura = docXML.getElementsByTagName("autorizacion");
  var factura2 = docXML.getElementsByTagName("comprobante");
  
  

  for(var i = 0; i<factura.length; i++){
      tabla += "<tr><td>";
      //CONDICIÓN PARA EL COLOR DEL ESTADO
      /**
      if(factura[i].getElementsByTagName("estado")[0].textContent == "AUTORIZADO"){
        tabla += '<div class="tm-status-circle moving"></div>';
      }else{
        tabla += '<div class="tm-status-circle cancelled"></div>';
      }  */

      //tabla += factura[i].getElementsByTagName("estado")[0].textContent;
      //tabla += "</td><td>";
      //tabla += factura[i].getElementsByTagName("numeroAutorizacion")[0].textContent;
      //tabla += "</td><td>";
      //tabla += factura[i].getElementsByTagName("fechaAutorizacion")[0].textContent;
      //tabla += "</td><td>";   

      var cot = factura2[i].textContent; //string
      //con reemplazo eliminamos la parte del xml que nos da problemas al momento de identificar los tag 
      //esta parte del codigo esta en los xml debido a que dentro de ellos se quiere agregar caracteres como la "ñ" entre otros
      //dentro de esta no se aceptan los ] y las & .
      cot = cot.replace('<?xml version="1.0" encoding="UTF-8"?>','');
      //STRING A XML
      var xmlcomprobante = StringToXML(cot);

      
      /**
      tabla += tabla3SRI(parseInt(xmlcomprobante.getElementsByTagName("codDoc")[0].textContent));
      tabla += "</td><td>"; */

      //NUMERO DE FACTURA    
      var sec = (xmlcomprobante.getElementsByTagName("estab")[0].textContent) +"-"+ (xmlcomprobante.getElementsByTagName("ptoEmi")[0].textContent) +"-"+ (xmlcomprobante.getElementsByTagName("secuencial")[0].textContent);
      tabla += sec;
      tabla += "</td><td>";

      tabla +=  xmlcomprobante.getElementsByTagName("fechaEmision")[0].textContent;            
      tabla += "</td><td>";

      //SI TIENE 2 ELEMENTOS ENTONCES TIENE 2 CODIGO LO QUE CORRESPONDERÍA AL IVA y el otro a la RENTA
      //el primer elemento es el IVA y el segundo en caso que exista es el de RETENCIÓN
      var arrcodigo =  xmlcomprobante.getElementsByTagName('codigo');
      var valr1 = 0;
      var valr2 = 0;
      if(arrcodigo.length == 2){
        tabla +=  (xmlcomprobante.getElementsByTagName("baseImponible")[0].textContent);      
        tabla += "</td><td>";
        tabla +=  (xmlcomprobante.getElementsByTagName("porcentajeRetener")[0].textContent);      
        tabla += "</td><td>";
        tabla +=  (xmlcomprobante.getElementsByTagName("valorRetenido")[0].textContent);     
        tabla += "</td><td>";

        tabla +=  (xmlcomprobante.getElementsByTagName("baseImponible")[1].textContent);      
        tabla += "</td><td>";
        tabla +=  (xmlcomprobante.getElementsByTagName("porcentajeRetener")[1].textContent); 
        tabla += "</td><td>";
        tabla +=  (xmlcomprobante.getElementsByTagName("valorRetenido")[1].textContent); 
        valr1 = parseFloat(xmlcomprobante.getElementsByTagName("valorRetenido")[0].textContent);
        valr2 = parseFloat(xmlcomprobante.getElementsByTagName("valorRetenido")[1].textContent);

        //TOTAL RETENCIÓN
        totalretenciones[a] = (valr1+valr2).toFixed(2); //redonde a dos decimales 
        //totalretenciones.push((valr1+valr2).toFixed(2)); //redonde a dos decimales 
        
      }else{
        tabla +=  (xmlcomprobante.getElementsByTagName("baseImponible")[0].textContent);      
        tabla += "</td><td>";
        tabla +=  (xmlcomprobante.getElementsByTagName("porcentajeRetener")[0].textContent);  
        tabla += "</td><td>";
        tabla +=  (xmlcomprobante.getElementsByTagName("valorRetenido")[0].textContent);   
        tabla += "</td><td>";
        tabla +=  0;  
        tabla += "</td><td>";
        tabla +=  0;  
        tabla += "</td><td>";
        tabla +=  0;  
        
        valr1 = parseFloat(xmlcomprobante.getElementsByTagName("valorRetenido")[0].textContent); 
        //TOTAL RETENCIÓN
        totalretenciones[a] = valr1.toFixed(2); //redonde a dos decimales       
        //totalretenciones.push(valr1.toFixed(2)); //redonde a dos decimales 
      }
      tabla += "</td><td>";
      
      tabla += totalretenciones[a];
      
      tabla += "</td></tr>";
      
      a=a + 1;
      console.log(totalretenciones[a]);
  }  
  
  document.getElementById("demo2").innerHTML += tabla;

}


//TABLA 3
function tabla3SRI(id){
  switch(id){
    case 1:
      return "FACTURA";
  
    case 3:
      return "LIQUIDACIÓN DE COMPRA DE BIENES Y PRESTACIÓN DE SERVICIOS";
  
    case 4:
      return "NOTA DE CRÉDITO";
    
    case 5:
      return "NOTA DE DÉBITO";
    
    case 6:
      return "GUÍA DE REMISIÓN";
    
    case 7:
      return "COMPROBANTE DE RETENCIÓN";

  }

}

//TABLA 20: retención del iva
function tabla20SRI(id){
  switch(id){
    case 9:
      return "10%";
    case 10:
      return "20%";
    case 1:
      return "30%";
    case 11:
      return "50%";
    case 2:
      return "70%";
    case 3:
      return "100%";
    case 7:
      return "0%";
    case 8:
      return "0%";
    case 8:
      return "5%";
  }

}




//CONVERSION STRING TO XML
function StringToXML(oString) {
  //code for IE
  if (window.ActiveXObject) { 
  var oXML = new ActiveXObject("Microsoft.XMLDOM"); oXML.loadXML(oString);
  return oXML;
  }
  // code for Chrome, Safari, Firefox, Opera, etc. 
  else {
    
    return (new DOMParser()).parseFromString(oString, "text/xml");
  }
 }





function drawLineChart() {
    console.log(totalretenciones);
    
  
    if ($("#lineChart").length) {
      ctxLine = document.getElementById("lineChart").getContext("2d");
      optionsLine = {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "Hits"
              }
            }
          ]
        }
      };
  
      // Set aspect ratio based on window width
      optionsLine.maintainAspectRatio =
        $(window).width() < width_threshold ? false : true;
  
      configLine = {
        type: "line",
        data: {
          labels: [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo"
          ],
          datasets: [
            /*
            {
              label: "Latest Hits",
              data: [88, 68, 79, 57, 50, 55, 70],
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              cubicInterpolationMode: "monotone",
              pointRadius: 0
            },
            {
              label: "Popular Hits",
              data: [33, 45, 37, 21, 55, 74, 69],
              fill: false,
              borderColor: "rgba(255,99,132,1)",
              cubicInterpolationMode: "monotone",
              pointRadius: 0
            },**/
            {
              label: "Comprobante Rent.",
              data:[33, 45, 37, 21, 55, 74, 69],
              fill: false,
              borderColor: "rgba(153, 102, 255, 1)",
              cubicInterpolationMode: "monotone",
              pointRadius: 0
            }
          ]
        },
        options: optionsLine
      };
  
      lineChart = new Chart(ctxLine, configLine);
    }
  }
  
  function drawBarChart() {
    if ($("#barChart").length) {
      ctxBar = document.getElementById("barChart").getContext("2d");
  
      optionsBar = {
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 0.2,
              ticks: {
                beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: "Hits"
              }
            }
          ]
        }
      };
  
      optionsBar.maintainAspectRatio =
        $(window).width() < width_threshold ? false : true;
  
      /**
       * COLOR CODES
       * Red: #F7604D
       * Aqua: #4ED6B8
       * Green: #A8D582
       * Yellow: #D7D768
       * Purple: #9D66CC
       * Orange: #DB9C3F
       * Blue: #3889FC
       */
  
      configBar = {
        type: "horizontalBar",
        data: {
          labels: ["Red", "Aqua", "Green", "Yellow", "Purple", "Orange", "Blue"],
          datasets: [
            {
              label: "# of Hits",
              data: [33, 40, 28, 49, 58, 38, 44],
              backgroundColor: [
                "#F7604D",
                "#4ED6B8",
                "#A8D582",
                "#D7D768",
                "#9D66CC",
                "#DB9C3F",
                "#3889FC"
              ],
              borderWidth: 0
            }
          ]
        },
        options: optionsBar
      };
  
      barChart = new Chart(ctxBar, configBar);
    }
    
  }
  
  function drawPieChart() {
    if ($("#pieChart").length) {
      var chartHeight = 300;
  
      $("#pieChartContainer").css("height", chartHeight + "px");
  
      ctxPie = document.getElementById("pieChart").getContext("2d");
  
      optionsPie = {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
          }
        },
        legend: {
          position: "top"
        }
      };
  
      configPie = {
        type: "pie",
        data: {
          datasets: [
            {
              data: [13.24, 11.5, 9.15],
              backgroundColor: ["#F7604D", "#4ED6B8", "#A8D582"],
              label: "Storage"
            }
          ],
          labels: [
            "Used Storage (18.240GB)",
            "System Storage (6.500GB)",
            "Available Storage (9.150GB)"
          ]
        },
        options: optionsPie
      };
  
      pieChart = new Chart(ctxPie, configPie);
    }
  }
  
  function updateLineChart() {
    if (lineChart) {
      lineChart.options = optionsLine;
      lineChart.update();
    }
  }
  
  function updateBarChart() {
    if (barChart) {
      barChart.options = optionsBar;
      barChart.update();
    }
  }
  