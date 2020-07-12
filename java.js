//http://127.0.0.1:8887/
let posicionActual = 0;

const TEXTOS = [
    'database/text/text1.json',
    'database/text/text2.json',
    'database/text/text3.json',
    'database/text/text4.json',
    'database/text/text5.json'
];
const IMAGENES = [
    'database/img/1.png',
    'database/img/2.png',
    'database/img/3.png',
    'database/img/4.png',
    'database/img/5.png'
];

window.onload = function () {
// Variable

const TIEMPO_INTERVALO_MILESIMAS_SEG = 1000;
let $botonRetroceder = document.querySelector('#retroceder');
let $botonAvanzar = document.querySelector('#avanzar');
let $imagen = document.querySelector('#imagen');
let $botonActualice =document.querySelector('#btn');
let intervalo;

// Funciones


function pasarFoto() {
    if(posicionActual >= IMAGENES.length - 1) {
        posicionActual = 0;
    } else {
        posicionActual++;
    }
    renderizarImagen();
}

/**
 * Funcion que cambia la foto en la anterior posicion
 */
function retrocederFoto() {
    if(posicionActual <= 0) {
        posicionActual = IMAGENES.length - 1;
    } else {
        posicionActual--;
    }
    renderizarImagen();
}
/**
 * Funcion que cambia la foto en la siguiente posicion
 */

/**
 * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
 */
function renderizarImagen () {
    $imagen.style.backgroundImage = `url(${IMAGENES[posicionActual]})`;
}
/**
 * Para el autoplay de la imagen
 */

function traerDatos(){
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET',TEXTOS[posicionActual],true);
    xhttp.send();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            let datos = JSON.parse(this.responseText);
            console.log(datos.length);
            if(datos.length == 0){
                alert('Revisa la camara raspberry, no se estan detectando datos de pacientes');
            }else{
                let res =document.querySelector('#actualice');
                res.innerHTML='';
                for(let item of datos){
                    //console.log(item);
                    res.innerHTML += "<tr><td>"+ item.Names + "</td><td>" + item.val + "</td><td>";
                }
            }
        }
    }
}
// Eventos
$botonAvanzar.addEventListener('click', pasarFoto);
$botonRetroceder.addEventListener('click', retrocederFoto);
$botonActualice.addEventListener('click',traerDatos);
// Iniciar
renderizarImagen();

    
return posicionActual

}

