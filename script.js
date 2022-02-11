/* global variables */
let inputNumber;
let plays = 0;
const cardBoard = document.querySelector("#cardboard");
const imgsTotal = [
    'bobrossparrot.gif',
    'explodyparrot.gif',
    'fiestaparrot.gif',
    'metalparrot.gif',
    'revertitparrot.gif',
    'tripletsparrot.gif',
    'unicornparrot.gif'
];
let cardHTML = "";

/* start */

informedNumber();

function informedNumber() {
    while(true) {
        inputNumber = parseInt(prompt("Digite um número par entre 4 e 14"));
        if (inputNumber >= 4 && inputNumber <=14 && (inputNumber % 2) == 0 ) {
            break;
        }
    }
}

/* shuffles the images */
imgsTotal.sort(comp);

function comp(){
    return Math.random() - 0.5;
}

/* select the images according to the inputNumber */
const imgs = imgsTotal.slice(0,inputNumber/2);

/* create the html structure of the cards */
imgs.forEach(img => {
    cardHTML += `<div class="memory-card" data-identifier="card" data-card="${img}">
    <img class="front-face" data-identifier="front-face" src="images/${img}"/>
    <img class="back-face" data-identifier="back-face" src="images/front.png">
    </div>`;
});

/* duplicate the cards on board */
cardBoard.innerHTML = cardHTML + cardHTML;

/* end of html rendering */

/* secondary global variables */
const cards = document.querySelectorAll(".memory-card");
let firstCard, secondCard;
let lockCards = false;

function flipCard() {
    if (lockCards) return false;

    this.classList.add("flip");

    if (!firstCard) {
    firstCard = this;
    return false;
    }

    secondCard = this;

    checkForMatch();

    playsNumber();
}

function checkForMatch() {
    /* boolean variable for comparing cards */
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    /* ternary operator ~ if isMatch variable is true, return false and call resetCards, otherwise, return true and call unFlipCards */
    !isMatch ? unFlipCards() : resetCards(isMatch);
}

function unFlipCards() {
    lockCards = true;
    setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetCards();
    }, 1000);
}

function resetCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    }

    [firstCard, secondCard, lockCards] = [null, null, false];

    checkForEndGame();
}

cards.forEach(card => card.addEventListener("click", flipCard));

(function shuffle(){
    cards.forEach( card => {
        let rand = Math.floor(Math.random() * 14);
        card.style.order = rand;
    })
})()

function playsNumber(){
    if(true) {
        plays++
    }
}

function checkForEndGame(){
    const flipedCards = document.querySelectorAll(".flip");
    setTimeout(() => {
    if (flipedCards.length == inputNumber){
        alert(`Parabéns, você ganhou em ${plays} jogadas!`);
    }}, 1000)
}