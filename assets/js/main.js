var rondaenjuego = 1;
var rondas = 1
var victorias_jugador = 0;
var victorias_cpu = 0;
var empates = 0;
var nombre = "";
var ganaronda = "";
var ganadoresrondas = "";
var finalizar_torneo = false;
var modal_is_closed = false;

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

    //se agrega el en la grilla, en la posición del jugador
    document.getElementById("jugador").innerHTML = nombre;


}



function seleccion(opcion){

    //Opciones tanto para el jugador y el CPU
    // 0: piedra
    // 1: papel
    // 2: tijera
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

    var imagen_jugador = selectimage(opcion);
    var imagen_cpu = selectimage(opcionCPU);


    switch(opcion){
        case 0:{  //piedra
            switch(opcionCPU){
                case 0:{  //piedra
                    empates += 1;
                    ganaronda = "Empate";
                    break;
                }
                case 1:{  //papel
                    victorias_cpu += 1;
                    ganaronda = "Gana CPU";
                    break;
                }
                case 2:{  //tijeras
                    victorias_jugador += 1;
                    ganaronda = `gana ${nombre}`;
                    break;
                }
            }
            break;
        }
        case 1:{
            switch(opcionCPU){
                case 0:{
                    victorias_jugador += 1;
                    ganaronda = `gana ${nombre}`;
                    break;
                }
                case 1:{
                    empates += 1;
                    ganaronda = "Empate";
                    break;
                }
                case 2:{
                    victorias_cpu += 1;
                    ganaronda = "Gana CPU";
                    break;
                }
            }
            break;
        }
        case 2:{
            switch(opcionCPU){
                case 0:{
                    victorias_cpu += 1;
                    ganaronda = "Gana CPU"
                    break;
                }
                case 1:{
                    victorias_jugador += 1;
                    ganaronda = `gana ${nombre}`;
                    break;
                }
                case 2:{
                    empates += 1;
                    ganaronda = "Empate";
                    break;
                }
            }
            break;
        }

    }

    document.getElementById("decisionCPU").src= imagen_cpu;
    document.getElementById("exampleModalLabel").innerHTML = `Resultado de la ronda ${rondaenjuego}:`
    document.getElementById("mod_jugador").innerHTML = nombre;
    document.getElementById("mod_cpu").innerHTML = "CPU";
    document.getElementById("ppt_jugador").src = imagen_jugador;
    document.getElementById("ppt_cpu").src = imagen_cpu;
    document.getElementById("mod_quiengana").innerHTML = ganaronda;

    ganadoresrondas = ganadoresrondas + rondaenjuego + ": " + ganaronda + "<br/>";
    document.getElementById("ganorondaprevia").innerHTML = ganadoresrondas;

    finalizar_torneo = false;

    $("#exampleModal").modal('show');

    setTimeout(() => {  document.getElementById("decisionCPU").src = "../assets/img/favicon.png"; }, 1000);

    

    finalizar_torneo = false;
    console.log("despues de final " & finalizar_torneo);

}



function selectimage(opcionimagen){
    switch(opcionimagen){
        case 0:{
            imagen = "assets/img/piedra01.png";
            break;
        }
        case 1:{
            imagen = "assets/img/papel01.png";
            break;
        }
        case 2:{
            imagen = "assets/img/tijera01.png";
            break;
        }
    }
    return imagen;

}



function fin_de_juego(){

    if (rondaenjuego >= rondas){
        //
        document.getElementById("victoriasjugador").innerHTML = `Victorias ${nombre}: ${victorias_jugador}`;
        document.getElementById("victoriascpu").innerHTML = `Victorias CPU: ${victorias_cpu}`;
        
        if (victorias_jugador > victorias_cpu){
            document.getElementById("ganacampeonato").innerHTML = `El campeón es: ${nombre}`;
        } else if(victorias_jugador > victorias_cpu){
            document.getElementById("ganacampeonato").innerHTML = "El campeón es la CPU";
        } else {
            document.getElementById("ganacampeonato").innerHTML = "Hubo un empate";
        }

        alert("Fin del Juego!")

        document.getElementById("reinicio").style.display = "block";
        
    };

    console.log(rondaenjuego);
    console.log(finalizar_torneo);


    rondaenjuego += 1;

}


function reiniciar(){
    location.reload();

}
