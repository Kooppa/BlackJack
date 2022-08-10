//C = Clubs
//D = Diaminds
//S = Spades
//H = Hearths
//Actualizado

(() => {
    'use strict'

    // const personajes = ['Ana', 'Mercy', 'Mei'];
    // console.log(personajes);

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    //Referencias html
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),//
        btnNuevo = document.querySelector('#btnNuevo'),//

        puntoshtml = document.querySelectorAll('small'),

        divCartasJ = document.querySelector('#jugador-cartas'),
        divCartasC = document.querySelector('#computadora-cartas');


    //Funcion para crear la lista de cartas
    const crearDeck = () => {
        deck = [];
        for( let i = 2; i <= 10; i++){
            for (let tipo of tipos){
                deck.push(i+tipo);
            }

            //deck.push(i+'C');
        }

        for( let tipo of tipos){
            for( let esp of especiales){
                deck.push(esp+tipo);
            }
        }
        //console.log(deck);
        
        //console.log(deck)
        return _.shuffle(deck);
    }

    crearDeck();


    //Funcion para tomar una carta
    const pedirCarta = () => {

        if(deck.length === 0){
            throw 'No hay mas cartas';
        }

        const carta = deck.pop();
        //console.log(carta);
        return carta;
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length-1);
        return ( isNaN(valor))?
                ((valor === 'A')? 11 : 10)
                : (valor*1);
        // let puntos;
        // //console.log({valor});
        // if( isNaN(valor) ) {
        //     //No es numero
        //     puntos = (valor === 'A')? 11 : 10;
        // } else {
        //     //Si es numero
        //     puntos = valor*1;
        // }
        // console.log(puntos);
    }

    //const valor = valorCarta(pedirCarta());

    //Turno PC
    const turnoComputadora = (puntosMinimos) => {
        do{
            const carta = pedirCarta();
            //console.log(carta);

            puntosComputadora = puntosComputadora + valorCarta(carta);
            //Hace referencia al segundo small del html
            puntoshtml[1].innerHTML = puntosComputadora;

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');

            //<img class="carta" src="assets/cartas/KH.png">
            divCartasC.append(imgCarta);
            if(puntosMinimos>21){
                break;
            }

        }while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );
        finalScore(puntosMinimos, puntosComputadora);
    }


    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        console.log(carta);

        puntosJugador = puntosJugador + valorCarta(carta);
        //Hace referencia al primer small del html
        puntoshtml[0].innerHTML = puntosJugador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        //<img class="carta" src="assets/cartas/KH.png">
        divCartasJ.append(imgCarta);

        if(puntosJugador > 21){
            
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21){
            console.warn('21, Got it!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
        


    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    });

    const finalScore = (puntosJ, puntosPC) => {

        setTimeout(() => {
            
        
        if(puntosJ === puntosPC){
            alert('Es un empate!');
            console.warn('Tie!');
            
        } else if (puntosPC <= 21){
            alert('Gana la computadora!');
            console.warn('Derrota...');
            
        } else if (puntosPC > 21){
            alert('Felicidades, has ganado!');
            console.warn('Victoria');
            
        }
        }, 1000);
    }

    btnNuevo.addEventListener('click', () => {
        console.clear;

        deck = [];
        deck = crearDeck();

        puntosJugador=0;
        puntosComputadora=0;

        puntoshtml[0].innerText=0;
        puntoshtml[1].innerText=0;

        divCartasJ.innerHTML='';
        divCartasC.innerHTML='';

        btnDetener.disabled=false;
        btnPedir.disabled=false;
    });

})();

