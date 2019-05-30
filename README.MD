# WebPageTets API

Esta es una aplicación realizada con Nodejs, a la cual pasandole la URL, un directorio y un email
de tu web hará 2 test (en distintos dispositivos) para determinar la velocidad de conexión, cache y
otros muchos más datos útiles para optimizar tu web, guardará el test localmente y te mandara un email
notificándote la finalización de tu test y resultados de estos(sumario).

#####Limitado a 200 peticiones diarias

## Empecemos

Para poner en marcha el proyecto es necesario tener instalado Node.js en 
tu máquina, sino no podrás instalar las dependencias necesarias ni
arrancar la app.

### Prerequisitos e instalación

La aplicación ha sido desarrollada de acuerdo a la API de http://webpagetest.org/
. Teniendo ya instalado Node.js en tu máquina podrás o bien instalar
las dependencias desde el pacakage.json o bien instalando las 
dependencias por separado.

```
npm install -g webpagetest --save
npm install -g download --save
```

Esto generará en el directorio en el que te encuentres una carpeta
node_modules, y en ese mismo directorio deberá de estar tu app.js
(no dentro de la carpeta node_modules).

### Usando la aplicación

Vayamos por pasos:

* Para ejecutarlo debes poner en la consola:

```
node app.js <URL> <ruta_ficheros> <email>
```
#####Asegurate de poner los parametros URL y ruta_ficheros o no arrancará la aplicación (El email es opcional)


IMPORTANTE: La URL debe respetar la siguiente estructura (tanto en
Linux como en Windows) --> C:\Users\fjsanchez\Documents\proyectos\
webtest\ 

La ruta ha de ser absoluta y terminar con \ (o / en Linux), si no se
guardaran los ficheros en el directorio padre.

* Una vez ejecutado el comando correrá solo hasta que acaben los 3 test,
todos corren a la vez y cuando acaba uno se cierra ese hilo, de manera que
si un test se queda colgado por retraso de la API, no se quedara colgada la app
y los demás test seguirán hasta que finalice.

    Una vez finalizado cada test dejará 2 ficheros (recomiendo siempre utilizar directorios distintos para
    evitar sobre escrituras de ficheros).
    Los ficheros son .csv, donde uno será un sumario de todo el test y otro será
    el examen exhaustivo.

* La notificación del email no solo indicara que el test ha acabado, sino que mandara también
resultados para que tengas un sumario de cómo ha ido. Como cada test es independiente recibirás
1 correo por test.

* Todos los test tienen disponible un video para visualizar la carga del contenido.
El enlace al video esta disponible tanto en el email como en la generacion de los ficheros

Tambien esta disponible la visualizacion de los test en version Web(enlace en 
email y ficheros) para ver todo lo anterior graficamente.
## Configuracion de los test

Los test están predefinidos para correr:

* Versión de Escritorio (Chrome), con conexión 4G.
* Moto G (4gen) - (Chrome), con conexión 4G.
* iPhone6 (4gen) - (Safari/Chrome), con conexión 4G.

Más información de los dispositivos disponibles desde la API: https://www.webpagetest.org/getLocations.php?k=A&f=html

## Modificaciones previstas

Ninguna por el momento.

---------------------------------------------------------------------------------------------

Realizado por: Francisco Javier Sánchez de la Torre

Email: fjsanchez@trevenque.es
