import data from '../json/resultado.json' assert {type: 'json'};

const width_threshold = 480;
var totalretenciones = [];
var a = 0;
var ultiteración = data.length;
console.log(ultiteración);

var dict = {};
dict['Enero'] = [];
dict['Febrero'] = [];
dict['Marzo'] = [];
dict['Abril'] = [];
dict['Mayo'] = [];
dict['Junio'] = [];
dict['Julio'] = [];
dict['Agosto'] = [];
dict['Septiembre'] = [];
dict['Octubre'] = [];
dict['Noviembre'] = [];
dict['Diciembre'] = [];


//INICIALIZANDO EL ENCABEZADO
//document.getElementById("demo").innerHTML += "<tr><th>ESTADO</th><th>numeroAutorizacion</th><th>fechaAutorizacion</th><th>ambiente</th></tr>";

data.forEach(element => {
    
    var re = /\\/gi;
    if(!element.isDirectory){
      var str = element.path;
      var newstr = str.replace(re, "/");
    CargarDatos(newstr); 
    }
    
});


var y = 0;
var datos= [];
var dataSeries = { type: "line" };
var dataPoints = [];





drawLineChart3();

function CargarDatos(ruta){
  var xhr = new XMLHttpRequest();
  //por cada cambio de estado se ejecutara la siguiente función
  xhr.onreadystatechange = function(){  //funcion anónima 
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
  
  

  for(let i = 0; i<factura.length; i++){
      tabla += "<tr><td>";
      //CONDICIÓN PARA EL COLOR DEL ESTADO
      /**
      if(factura[i].getElementsByTagName("estado")[0].textContent == "AUTORIZADO"){
        tabla += '<div class="tm-status-circle moving"></div>';
      }else{
        tabla += '<div class="tm-status-circle cancelled"></div>';
      }  */
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

      var fecha1 = (xmlcomprobante.getElementsByTagName("fechaEmision")[0].textContent.split('/'));                  
      let mes = calmes( parseInt(fecha1[1]-1));
      let diccionarito = {};
      diccionarito['x'] = new Date(fecha1[2], fecha1[1]-1, fecha1[0]);
      diccionarito['y'] = parseFloat(totalretenciones[a]);
      dict[mes].push(diccionarito);
      /**
      y = parseFloat(totalretenciones[a]);
      dataPoints.push({x: a - 53 / 2,y: y});
      
      dataSeries.dataPoints = dataPoints;
      datos.push(dataSeries);*/

      a=a + 1;
  }
  if(a == ultiteración){    
    
    prub1(dict);
  }
  
  
  document.getElementById("demo2").innerHTML += tabla; 
}

function sumrepet(myArray){
  var tempArray = [];
  var tam = myArray.length;
  const unicos = [];
  for( var i = 0; i<tam; i++){
    const elemento = myArray[i]['x']; //sat 04 2020 

    if(!unicos.includes(myArray[i]['x'].getDate()) ){
      unicos.push(elemento.getDate());
      tempArray.push(myArray[i]);
    }else{
      var indice = unicos.indexOf(elemento.getDate()); //indice de la primera aparición del día
      tempArray[indice]['y'] += myArray[i]['y'];
    }
  }
  
  return tempArray;
}

function burburja (myArray){ 
  var tam = myArray.length; 
  for ( var temp =1; temp < tam; temp++) { 
    for (var izq = 0; izq< (tam - temp); izq++) { 
      var dcha = izq+1;
      if (myArray[izq]['x'].getDate() > myArray[dcha]['x'].getDate()) { 
        ordenar(myArray, izq, dcha); 
      } 
    } 
    }return myArray;}

function ordenar(myArray, valor1, valor2){ 
  var temp = myArray[valor1]; 
  myArray[valor1] = myArray[valor2]; 
  myArray[valor2] = temp; 
  return myArray;
}



function calmes(num){
  switch(num){
    case 0:
      return "Enero";
    case 1:
      return "Febrero";
    case 2:
      return "Marzo";
    case 3:
      return "Abril";
    case 4:
      return "Mayo";
    case 5:
      return "Junio";
    case 6:
      return "Julio";
    case 7:
      return "Agosto";
    case 8:
      return "Septiembre";
    case 9:
      return "Octubre";
    case 10:
      return "Noviembre";
    case 11:
      return "Diciembre";
  }
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

//PROMEDIO ARRAY
function promdArray(myArray) {
  var i = 0, summ = 0, ArrayLen = myArray.length;
  while (i < ArrayLen) {
      summ = summ + myArray[i++];
}
  return summ / ArrayLen;
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


 function prub1(inputdic){
    /**
    let arrmeses = [];
    for(var key in inputdic){
        arrmeses.push(inputdic[key]);
    }
    console.log(dictionar); */

  var chart = new CanvasJS.Chart("lineChart", {
    animationEnabled: true,
    title:{
      text: "Website Traffic"
    },
    axisX:{
      valueFormatString: "DD MMM"
    },
    axisY: {
      title: "Number of Visitors",
      scaleBreaks: {
        autoCalculate: true
      }
    },
    data: [{
      type: "line",
      xValueFormatString: "DD MMM",
      color: "#F08080",
      dataPoints:  sumrepet(burburja(dict['Junio']))
      /**[
        { x: new Date(2017, 0, 29), y: 890 },
        { x: new Date(2017, 0, 30), y: 930 },
        { x: new Date(2017, 0, 31), y: 750 }
      ]*/
    }]
  });
  chart.render();
  
  }



function drawLineChart2() {   
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
            "Enero"
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
              data:[0.32, 1.73, 0.33, 4.10, 1.23, 5.03, 12.31, 0.32, 2.13, 2.06, 15.04, 1.65, 9.00, 16.43, 5.34, 13.74, 1.30, 0.27, 1.40, 18.16, 0.67, 1.50, 4.10, 20.76, 0.61, 0.37, 15.04, 0.63, 28.54, 1.97, 1.80, 0.18, 2.24, 0.37, 32.60, 0.33, 1.23, 2.99, 6.63, 0.79, 1.15, 1.95, 3.90, 45.86, 2.63, 7.41, 1.02, 0.62, 1.47, 19.10, 1.90, 2.94, 0.65],
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


function drawLineChart3(datos){   
    var chart = new CanvasJS.Chart("lineChart", {
    animationEnabled: true,
    zoomEnabled: true,
    title:{
      text: "Try Zooming and Panning" 
    },
    data: datos // random generator below
  });
  chart.render();

    
}

