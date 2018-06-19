var cardsColor = ["red", "green", "blue", "brown", "yellow", "gray", "cadetblue", "violet", "lightgreen", "red", "green", "blue", "brown", "yellow", "gray", "cadetblue", "violet", "lightgreen"];

const cardsColorFull = ["red", "green", "blue", "brown", "yellow", "gray", "cadetblue", "violet", "lightgreen", "red", "green", "blue", "brown", "yellow", "gray", "cadetblue", "violet", "lightgreen"];


let cards = document.querySelectorAll("div");
cards = [...cards];
//cards teraz bądz tablicą zamiast nodem [div, div, div...]

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length / 2;
let gameResult = 0;



const clickCard = function () {
    //    Mini gra - dwa kliknięcia
    activeCard = this;
    if (activeCard == activeCards[0]) return; // jeśli ktos kliknie 2 razy w ten sam element to nie rob wykonuj kolejnych funkcji

    activeCard.classList.remove("hidden");
    //    czy to 1 klikniecie
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        console.log('1');
        return; // zakoncz funkcje w tym miejscu
    }
    //    czy to 2 klikniecie
    else {
        console.log('2');
        cards.forEach(card => card.removeEventListener("click", clickCard))
        activeCards[1] = activeCard;
        setTimeout(function () {
            if (activeCards[0].className === activeCards[1].className) {
                console.log("wygrana")
                activeCards.forEach(card => card.classList.add("off"))
                gameResult++;
                if (gamePairs == gameResult) {
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime) / 1000;
                    alert(`Gratuluje, Twój czas to: ${gameTime} sekund!`); // gravisy `` zamiast "" żeby nie robić  tekst + gameTime + tekst.
                    location.reload(); // odświeżamy stronę żeby zagrać jeszcze raz
                }

            } else {
                console.log("przegrana");
                activeCards.forEach(card => card.classList.add("hidden"))
            }
            activeCard = "";
            activeCards.length = 0;

            cards.forEach(card => card.addEventListener("click", clickCard))
        }, 400)
    }

    //    Jesli drugie to zablokuj na czas klikniecia
    //    Jesli drugie to czy wygrana czy przegrana. Jesli wygrana to sprawdzić czy koniec gry
    //    Zabezpieczenia: dwukrotn e klikniecie w ten sam element i w element z klasa hidden
}



const init = function () {

    
    cards.forEach(card => {
        const position = Math.floor(Math.random() * cardsColor.length); // Math random 0 do 0.99999... a Math.floor nam zaokrągli do pełnych liczb  0,1,2,3,4...17.
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1);

    })

    setTimeout(function () {
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard)
        })
    }, 2000)
}

var demoInterval;
var drmoIntervalColor;

const demo = function () {
    
   
        demoInterval = setInterval(function () {
            const demoPosition = Math.floor(Math.random() * 18);
            const demoClass = Math.floor(Math.random() * 18);
            cards[demoPosition].classList.add(cardsColor[demoClass])
        }, 1000)
    
        demoIntervalColor = setInterval(function () {
             const demoPosition = Math.floor(Math.random() * 18);
            const demoClass = Math.floor(Math.random() * 18);
                cards[demoPosition].className = '';
                }, 1000)
    
}
const clearAllClass = function(){
    cards.forEach(card => card.className = '');
}
const updateColorTable = function(){
    cardsColor = cardsColorFull.slice();
}
const normalGameStart = function () {  
//    location.reload();
    //updateColorTable();
    clearInterval(demoInterval);
    clearInterval(demoIntervalColor);
    clearAllClass();
    init();
    
}

demo();

const buttonNormalGame = document.getElementById('buttonNormalGame');
buttonNormalGame.addEventListener("click", normalGameStart);
