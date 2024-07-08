let rolls = 2;
let playerInPlay = 1;
randomDices = {};
let arrayDicesSelected = {};
let diceHtml = [];
const imgHtml = document.createElement("img");
let canSelect = false;
let result = null;

/**
 * Initialise game and user interaction (like click)
 */
const initGame = () => {
    createDices();

    // * RELANCER LES DES
    document.getElementById("play").addEventListener('click', rollDices);

    // * SELECTIONNER UN DE
    for (let i = 0; i < diceHtml.length; i++) {
        diceHtml[i].addEventListener('click', () => selectDice(i));
    }

    // * ENREGISTRER UN SCORE
    // pour chaque colonnes de joueurs
    for (let playerIndex = 1; playerIndex < 7; playerIndex++) {
        // on recupere l'integralité de la colonne de score (toutes les lignes)
        const playersScore = document.getElementsByClassName('p' + playerIndex);
        // pour chaques lignes
        for (let i = 0; i < playersScore.length; i++) {
            // on ajouter un click
            playersScore[i].addEventListener('click', () => registerScore(playerIndex, i));
        }
    }
}

/**
 * Create the needed dice for play
 */
const createDices = () => {
    const dices = document.getElementById('dices');
    dices.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        diceHtml.push(document.createElement("div"));
        diceHtml[i].classList.add("dice");
        dices.appendChild(diceHtml[i]);
    }
}

/**
 * Relance les des non selectionner
 */
const rollDices = () => {
    canSelect = true;
    if (rolls >= 0) {
        for (let i = 0; i < diceHtml.length; i++) {

            if (!diceHtml[i].classList.contains('select')) {
                let hasard = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
                // diceHtml[i].innerText = hasard;
                diceHtml[i].innerHTML = `<img src="./assets/img/d${hasard}.png" alt="d${hasard}">`;
                randomDices[i] = hasard;
                diceHtml[i].classList.add("rotate");
                setTimeout(() => {
                    diceHtml[i].classList.remove('rotate');
                }, 100)
            }
        }
    }
    rolls--
}

/**
 * Selectionne ou deselectionne le de choisie
 * @param {number} i Le de à selectionner ou deselectionner
 * @returns void
 */
const selectDice = (i) => {
    if (!canSelect) return;
    arrayDicesSelected[i] = randomDices[i]
    diceHtml[i].classList.toggle('select')
}

/**
 * Enregistre un score pour un joueur en fonction du jet de de actuel
 * @param {number} player id du joueur qui veut enregistrer un score
 * @param {number} row ligne sur laquel enregistrer un score
 * @returns void
 */
const registerScore = (player, row) => {
    // * VERIFIE SI IL EST AUTORISE A ENREGISTRER
    // if (rolls == 2 || player !== playerInPlay) return;

    // * CHANGE LE TOUR DU JOUEUR
    if (playerInPlay == 6) {
        playerInPlay = 1;
    } else {
        playerInPlay++;
    }
    rolls = 2;

    // * CALCUL LE SCORE TOTAL DES DES EN FONCTION DE LA LIGNE CHOISIE
    let diceCombi = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
    }

    let score = 0;


















    
    for (let i = 0; i < Object.keys(randomDices).length; i++) {
        if (row + 1 == randomDices[i]) {
            score += randomDices[i];
        }
        diceCombi[randomDices[i]]++
    }

    if (row + 1 == 7) {
        score = brelan(diceCombi);
        //Condition carré
    } else if (row + 1 == 8) {
        score = square(diceCombi)
        //Condition Full
    } else if (row + 1 == 9) {

        for (let y = 1; y < Object.keys(diceCombi).length; y++) {
            if (diceCombi[y] >= 3) {
                score = 25;
            }
        }
        
    }

























    // * AFFICHE LE SCORE TOTAL DANS LE TABLEAU DES SCORE
    const playersScore = document.getElementsByClassName('p' + player);

    // * EMPECHE L'ECRASEMENT DES VALEURS PRECEDENTES SI EXISTENT SINON AFFICHE LE SCORE
    if (playersScore[row].textContent == '') {
        playersScore[row].innerHTML = score;
        randomDices = {};
    }

    // * Reinitialise les des
    for (let i = 0; i < diceHtml.length; i++) {
        diceHtml[i].classList.remove('select')
    }

    // * Affiche le joueur en cours
    document.getElementById('player').innerHTML = playerInPlay;

};

const brelan = (diceCombi) => {
    for (let y = 1; y < Object.keys(diceCombi).length; y++) {
        if (diceCombi[y] >= 3) {
            return y * 3;
        }
    }
    return 0;
}

const square = (diceCombi, i) => {
    for (let y = 1; y < Object.keys(diceCombi).length; y++) {
        if (diceCombi[y] >= 3) {
            console.log(y);
            return y * 4;
        }
    }
    return 0;
}

initGame();



//Condition Yams ?
        // } else if (row + 1 == 9 ) {
        //     diceCombi[randomDices[i]]++
        //     for (let y = 1; y < Object.keys(diceCombi).length; y++){
        //         if (diceCombi[y] >= 5) {
        //             score = 50;
        //         }
        //     }


// Le brelan : 3 faces identiques        Valeur : 3x la valeur de la face : 3x2=6 points
// Le carré : 4 faces identiques       Valeur : 4x la valeur de la face : 4x6=24 points
// Le full : un brelan et une paire       Valeur : 25 points
// La petite suite : une suite de quatre faces       Valeur : 30 points
// La grande suite : une suite de cinq faces       Valeur : 40 points
// Le yam's : 5 faces identiques       Valeur : 50 points
// La chance : N'importe quoi       Valeur : somme des 5 faces : 4+5+6+4+1=20 points