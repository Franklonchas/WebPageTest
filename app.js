// App node para testear webs

const API_KEY = 'A.5bdccb75b5e5f69674bb95875adbcc03'; //API KEY registrada por fjsanchez
// Otra API KEY en caso de ser necesaria A.c81af22f737e8816d9142187fbb34fe3
const WebPageTest = require('webpagetest');
const wptPublic = new WebPageTest('www.webpagetest.org', API_KEY);
const fs = require('fs');
const download = require('download');

//variables entorno
var variable1 = '';
var variable2 = '';
var variable3 = '';
var Tempdata = [];
var href = '';
var path = '';
var email = '';


//Lectura de parametros de entrada
'use strict';
for (let j = 0; j < process.argv.length; j++) {
    console.log(j + ' -> ' + (process.argv[j]));
    href = process.argv[2]; //URL a testear
    path = process.argv[3]; //Directorio donde se guardaran los test
    email = process.argv[4]; //Email al que sera mandado los resultados
}

// Rutas dinamicas

const rutaDesktop = path + 'testDesktopChrome4G.csv';
const rutaAndroid = path + 'TestMobileAndroidChrome4G.csv';

const rutaDesktop2 = path + 'testDesktopChrome4G_SUMMARY.csv';
const rutaAndroid2 = path + 'TestMobileAndroidChrome4G_SUMMARY.csv';

const localizacionDesktop = 'ec2-eu-central-1'; //Frankfurt, Germany - EC2
const localizacionAndroid = 'Dulles_MotoG4'; //Motorola G (4gen)


//Realizacion de tets (2).
for (let i = 0; i < 3; i++) {
    if (i === 1) {
        variable1 = localizacionDesktop;
        variable2 = rutaDesktop;
        variable3 = rutaDesktop2;
        peticionTest(variable1, variable2, variable3, href, email);
    } else if (i === 2) {
        variable1 = localizacionAndroid;
        variable2 = rutaAndroid;
        variable3 = rutaAndroid2;
        peticionTest(variable1, variable2, variable3, href, email);
    }
}


//Funcion para mandar test en base a los parametros establecidos en https://github.com/marcelduran/webpagetest-api
function peticionTest(variable1, variable2, variable3, href, email) {
    wptPublic.runTest(href, {
        location: variable1,
        connectivity: '4G',
        video: true,
        runs: 1,
        priority: 9,
        notifyEmail: email //fjsanchez@trevenque.es NO funciona ya que el dominio lo detecta como SPAM.
    }, (err, data) => {
        console.log(err || data);
        getStatus();

        var tempId = '';
        var tempCSV = '';
        var tempUrl = '';
        var tempLightCSV = '';
        Tempdata.push(data);

        for (let i in Tempdata) {
            tempId = Tempdata[i].data.testId;
            tempCSV = Tempdata[i].data.detailCSV;
            tempUrl = Tempdata[i].data.userUrl;
            tempLightCSV = Tempdata[i].data.summaryCSV;
        }

        //Preguntar cuando ha finalizado el test a la web
        function getStatus() {
            wptPublic.getTestStatus(tempId, (err, data) => {
                console.log(err || data);
                console.log('URL de consulta: ' + tempUrl);
                console.log('ID de consulta: ' + tempId);
                var tempStatus = [];
                tempStatus.push(data);

                if (tempStatus[0].statusCode === 200) {
                    getResult();
                    tempStatus = [];
                } else {
                    //console.log("Esperando respuesta...");
                    //getStatus();
                    setTimeout(getStatus, 180000); //Refresca cada 3 minutos la comprobacion
                }
            });
        }

        //Muestra los resultados cuando el test ha finalizado y descarga un csv
        function getResult() {
            wptPublic.getTestResults(tempId, (err, data) => {
                console.log(err || data);
                console.log('Link descarga CSV: ' + tempCSV);
                console.log("Link version HTML: " + tempUrl);
                console.log("Link version CSV Summary: " + tempLightCSV);

                //Funcion para descargar fichero
                download(tempCSV).then(data => {
                    fs.writeFileSync(variable2, data);
                    console.log('Fichero CSV_DETAIL guardado satisfactoriamente!!')
                });

                //Funcion para descargar fichero
                download(tempLightCSV).then(data => {
                    fs.writeFileSync(variable3, data);
                    console.log('Fichero CSV_SUMMARY guardado satisfactoriamente!!');
                });

                //Limpiar variables
                tempCSV = "";
                tempId = "";
                tempUrl = "";
                Tempdata = [];
            });
        }
    });
}

href = "";
path = "";
email = "";