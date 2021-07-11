// Activación de los tooltips ())utilizados en las imágenes que se usan para seleccionar la opción del jugador)
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

// Defino varias variables que usaré en el programa.  Las defino en esta zona porque se convierten en variables globales
// que puedo usar en todo el programa
let rondaenjuego = 1;
let rondas = 1
let victorias_jugador = 0;
let victorias_cpu = 0;
let empates = 0;
let nombre = "";
let ganaronda = "";
let ganadoresrondas = "";
let finalizar_torneo = false;
let modal_is_closed = false;

// función para solicitar el nombre y personalizar la pantalla con el nombre del usuario
function solicita_nombre(){
    // primero solicita el nombre utilizando un "prompt"
    nombre = prompt("Ingrese su nombre:", "Alvaro");

    //Da un mensaje de bienvenida al usuario
    alert(`Bienvenido ${nombre}, hoy te enfrentarás al gran CPU en esta competencia`)

    //Pregunta cuántas rondas desea jugar
    rondas = prompt("Cuántas rondas deseas jugar?", 5);

    //luego lo inserta en el documento utilizando innerHTML, en el subtítulo
    document.getElementById("subtitulo").innerHTML = `Hoy, ${nombre} y la CPU se enfrentarán a ${rondas} rondas`;

    //se agrega el nombre en la grilla, en la posición del jugador
    document.getElementById("jugador").innerHTML = nombre;
}


// Función que evalúa la jugada.  Toma la selección del jugador, determina una selección para la computadora
// y con una sencilla evaluación determina al ganador, o el empate
function seleccion(opcionJugador){

    //Opciones tanto para el jugador y el CPU
    // 0: papel
    // 1: tijera
    // 2: piedra
    //Las posibles combinaciones serían:
    //  jugador: 0 - CPU: 0 => empate
    //  jugador: 0 - CPU: 1 => gana CPU
    //  jugador: 0 - CPU: 2 => gana jugador
    //  jugador: 1 - CPU: 0 => gana jugador
    //  jugador: 1 - CPU: 1 => empate
    //  jugador: 1 - CPU: 2 => gana CPU
    //  jugador: 2 - CPU: 0 => gana CPU
    //  jugador: 2 - CPU: 1 => gana jugador
    //  jugador: 2 - CPU: 2 => empate

    var ganador = "";

    var opcionCPU = Math.floor(Math.random()*3);

    var imagen_jugador = selectimage(opcionJugador);
    var imagen_cpu = selectimage(opcionCPU);

    
    //Evaluacion de la jugada, evalúa todo y da como resultado un entero: 0:gana el jugador, 1: empate, 2:pierde el jugador
    const r = ((opcionJugador - opcionCPU + 2) % 1.5) * 2;

    switch (r) {
        case 0:{
            victorias_jugador++;
            ganaronda = `gana ${nombre}`;
            break;
        }

        case 1:{
            empates++;
            ganaronda = `empate`;
            break;
        }

        case 2:{
            victorias_cpu++;
            ganaronda = "Gana CPU";
            break;
        }

    }

    // De acuerdo al resultado de la jugada, se llenan algunos campos de un modal donde se mostrarán los resultados
    document.getElementById("decisionCPU").src= imagen_cpu;
    document.getElementById("exampleModalLabel").innerHTML = `Resultado de la ronda ${rondaenjuego}:`
    document.getElementById("mod_jugador").innerHTML = nombre;
    document.getElementById("mod_cpu").innerHTML = "CPU";
    document.getElementById("ppt_jugador").src = imagen_jugador;
    document.getElementById("ppt_cpu").src = imagen_cpu;
    document.getElementById("mod_quiengana").innerHTML = ganaronda;

    ganadoresrondas = ganadoresrondas + rondaenjuego + ": " + ganaronda + "<br/>";
    document.getElementById("ganorondaprevia").innerHTML = ganadoresrondas;

    $("#exampleModal").modal('show');

    setTimeout(() => {  document.getElementById("decisionCPU").src = "assets/img/favicon.png"; }, 1000);


    // Verifica que sea la última ronda que hay que jugar y de ser así llama la función que cierra el juego
    if (rondaenjuego >= rondas) { fin_de_juego() }
    rondaenjuego++;

}


// Función para seleccionar la imagen a mostrar en el modal de acuerdo a la opción del jugador y del CPU
function selectimage(opcionimagen){
    switch(opcionimagen){
        case 0:{
            imagen = "assets/img/papel01.png";
            break;
        }
        case 1:{
            imagen = "assets/img/tijera01.png";
            break;
        }
        case 2:{
            imagen = "assets/img/piedra01.png";
            break;
        }
    }
    return imagen;

}


// FUnción que llena  la sección del resultado el campeonato diciendo quien gana.  Muestra un boton para reinciiar
function fin_de_juego(){

    if (rondaenjuego >= rondas){
        //
        document.getElementById("victoriasjugador").innerHTML = `Victorias ${nombre}: ${victorias_jugador}`;
        document.getElementById("victoriascpu").innerHTML = `Victorias CPU: ${victorias_cpu}`;

        if (victorias_jugador > victorias_cpu){
            document.getElementById("ganacampeonato").innerHTML = `El campeón es: ${nombre}`;
        } else if(victorias_jugador < victorias_cpu){
            document.getElementById("ganacampeonato").innerHTML = "El campeón es la CPU";
        } else {
            document.getElementById("ganacampeonato").innerHTML = "Hubo un empate";
        }

        setTimeout(() => {  alert("Fin del Juego!"); }, 2000);

        document.getElementById("reinicio").style.display = "block";

        const btns_jgo = document.querySelectorAll("#botonjuego");
        for (let i = 0; i < btns_jgo.length; i++){
            btns_jgo[i].disabled = true;
        }
    };

}

// función para reiniciar el juego, carga la página nuevamente
function reiniciar(){
    location.reload();

}


