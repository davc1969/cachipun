
// Primero se le piden cuantas jugadas quiere jugar
const jugadas = parseInt(prompt("ingrese número de jugadas:", 3));

// Funcion 'resultados' para evaluación del piedra, papel o tijeras.  Optimizada para una sola evaluación
// Recibe dos argumentos: p y c, que corresponden a las jugadas del jugador y de la cónsola. Las posibles opciones son:
//  0: papel
//  1: tijera
//  2: piedra

const res = (p, c) => {
    const j = ["papel", "tijera", "piedra"];
    const v = ["gana", "empata", "pierde"];

    const r = ((p - c + 2) % 1.5) * 2;

    return `Jugador ${v[r]}: (Jugador eligió ${j[p]} y cónsola eligió ${j[c]})`
}


// Luego se hace un ciclo for en el que se le va pidiendo la selección al jugador y se evalúa contra la computadora
for (let i = 1; i <= jugadas; i++){
    const p = parseInt(prompt("Ingrese su selección (0: papel, 1: tijera, 2: piedra)", 0));
    const c = Math.floor(Math.random() * 3)
    console.log(res(p, c))
}


