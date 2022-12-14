//Listar archivos.
const path = require('path');
const fs = require('fs');

var data=[];

console.log("Buscando...")
function scanDirs(directoryPath){
   try{
      var ls=fs.readdirSync(directoryPath);

      for (let index = 0; index < ls.length; index++) {
         const file = path.join(directoryPath, ls[index]);
         var dataFile =null;
         try{
            dataFile =fs.lstatSync(file);
         }catch(e){}

         if(dataFile ){
            /**EN CASO QUE SE DESEE OBTENER TAMBIEN LAS CARPETAS: DESCOMENTAR EL SIGUIENTE CÓDIGO ADEMÁS DE ELIMAR EL ELSE               
             * data.push(
                  {
                     path: file,
                     isDirectory: dataFile.isDirectory(),
                     length: dataFile.size
                  });
             */

            if(dataFile.isDirectory()){
               scanDirs(file)
            }else{
               data.push(
                  {
                     path: file,
                     isDirectory: dataFile.isDirectory(),
                     length: dataFile.size
                  });
            }
         }
      }
   }catch(e){}
}

scanDirs("./xml/2022");


const jsonString = JSON.stringify(data);
//actualiza los valores en dado caso sean iguales
fs.writeFile('./json/resultado.json', jsonString, err => { //dirección donde queremos que se guarde además del nombre del archivo
   if (err) {
      console.log('Error al escribir en el archivo', err)
   } else {
      console.log('Archivo guardado.')
   }
});
