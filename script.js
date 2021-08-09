//alert('hi');

const ageindays = () => {
    let birthyear = prompt('whats your birth year in days young man?');
    let agedays = (2021 - birthyear) * 365;
    
   let h1 = document.createElement('h1');
   let textResults = document.createTextNode(`You are ${agedays} days old`);
   h1.setAttribute('id', 'ageindayss');
   h1.appendChild(textResults);
   document.getElementById('result-area').appendChild(h1);

}

const reset = () => {
    document.getElementById('ageindayss').remove();
}


//altimate function | controller function
const rpsGame = (yourChoice) => {
    console.log(yourChoice);

    let humanChoice, botChoice;
    humanChoice = yourChoice.id;
    
    botChoice = numberOfChoice(randBotInt());
    console.log('The computer choice:', botChoice);
    
    results = decideWinner(humanChoice, botChoice); // [0, 1] human lost | bot win
    console.log(results);
   
    message = finalMessage(results) // you won {'message' : 'you won!', 'color' : 'green'}
    console.log(message);
   
    rpsFrontEnd(yourChoice.id, botChoice, message)
}

const randBotInt = () => {
    return Math.floor(Math.random() * 3);
}

const numberOfChoice = (number) =>{
    return ['rock', 'paper', 'scissors'][number];
}

const decideWinner = (yourChoice, computerChoice) => {
    let rpsDatabase = {
        'rock' : {'rock': 0.5, 'paper': 0, 'scissors': 1},
        'paper': {'rock': 1, 'paper': 0.5, 'scissors': 0},
        'scissors': {'rock': 0, 'paper': 1, 'scissors': 0.5}
    };

    let yourScore = rpsDatabase[yourChoice][computerChoice];
    let computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

const finalMessage = ([yourScore, computerScore]) => {
    if(yourScore === 0){
        return {'message' : 'You lost', 'color' : 'red'};
    } 
    else if(yourScore === 0.5){
        return {'message' : 'You tied', 'color' : 'yellow'};
    } 
    else {
        return {'message': 'You won', 'color': 'green'};
    }
}

const rpsFrontEnd = (humanImageChoice, botImageChoice, finalMessage) =>{
    let imagesDatabase = {
        'rock' : document.getElementById('rock').src,
        'paper' : document.getElementById('paper').src,
        'scissors' : document.getElementById('scissors').src
    };
        //lets remove all the images 

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    //creating divs where the results will be appended
    
    let humandiv = document.createElement('div');
    let botdiv = document.createElement('div');
    let messagediv = document.createElement('div')

    humandiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] +  "' width=150 height=150 style='box-shadow: 0 10px 50px rgba(37, 50, 233, 1)'>"
    messagediv.innerHTML = "<h1 style ='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botdiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] +  "' width=150 height=150 style='box-shadow: 0 10px 50px rgba(243, 38, 24, 1)'>"

    document.getElementById('flex-box-div').appendChild(humandiv);
    document.getElementById('flex-box-div').appendChild(messagediv);
    document.getElementById('flex-box-div').appendChild(botdiv);
}


//change the color of all buttons
let all_buttons = document.getElementsByTagName('button');

let copyOfAllButtons = [];
for(let i=0; i<all_buttons.length; i++){
    copyOfAllButtons.push(all_buttons[i].classList[0]);
    console.log(copyOfAllButtons);
}

//Altimate function | controller function 
const buttonColorChange = (buttonThingy) =>{
    console.log(buttonThingy.value);
    if(buttonThingy.value ==='red'){
        buttonsred();
    }
    else if(buttonThingy.value ==='green'){
        buttonsgreen();
    }
    else if(buttonThingy.value ==='reset'){
        buttonColorReset();
    }
    else if(buttonThingy.value ==='random'){
        randomsColor();
    }
}

const buttonsred = () => {
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[0]);
        all_buttons[i].classList.add('danger');
    }
}
const buttonsgreen = () => {
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[0]);
        all_buttons[i].classList.add('success');
    }
}

const buttonColorReset = () => {
    for(let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[0]);
        all_buttons[i].classList.add(copyOfAllButtons[i]);
    }
}

const randomsColor = () => {
    let choices = ['primary', 'danger', 'warning', 'success'];

    for(let i=0; i<all_buttons.length; i++){
        let randomNumber = Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[0]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

//Furious and Curious Code Challenge: BlackJack.

//accessing the hit button
let blackjackGame = {
    'you' : {'scorespan': '#your-blackjack-result', 'div' : '#your-box', 'score':0},
    'dealer' : {'scorespan': '#dealer-blackjack-result', 'div' : '#dealer-box', 'score':0},
    'cards' : ['2', '3', '4', '5', '6', '7', '8','9', '10', 'A', 'J', 'K', 'Q'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'K': 10, 'Q': 10, 'A': [1, 11]},
    'wins': 0,
    'losses':0,
    'draws':  0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');

const blackjackhit = () => {
   // showCard(card,DEALER);
  if(blackjackGame['isStand'] ===false) {
    let card = randomCard();
    console.log(card);
    showCard(card ,YOU);
    updateScore(card, YOU);
    showScore(YOU);
    console.log(YOU['score']);
  } 
    
}
document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackhit);

const showCard = (card, activePlayer) => {
    if(activePlayer['score'] <=21){
    let cardImage = document.createElement('img');
    cardImage.src =`cards/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
    }
}

const blackjackdeal = () => {
    //showResults(computeWinner());
  if(blackjackGame['turnsOver'] === true){

    blackjackGame['isStand'] = false;

    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    
    for(let i=0; i < yourImages.length; i++){
        yourImages[i].remove();
    }

    for(let i=0; i < dealerImages.length; i++){
        dealerImages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = '#fff';
    document.querySelector('#dealer-blackjack-result').style.color = '#fff';

    document.querySelector('#blackjack-result').textContent ='Lets play';
    document.querySelector('#blackjack-result').style.color ='black';

    blackjackGame['turnsOver'] =true;
 }
}
document.querySelector('#blackjack-deal-button').addEventListener('click',  blackjackdeal);

const randomCard = () => {
    let randomIndex = Math.floor(Math.random()* 13);
    return blackjackGame['cards'][randomIndex]
}

const updateScore = (card, activePlayer) => {

    //if adding 11 keeps me below 21, add 11, otherwise add 1
    if(card ==='A'){
        if(activePlayer['score'] += blackjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }
        else {
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }
    else {
    activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

const showScore = (activePlayer) => {
    if(activePlayer['score'] > 21){
        document.querySelector(activePlayer['scorespan']).textContent = 'BUST!!';
        document.querySelector(activePlayer['scorespan']).style.color = 'red';
    }
    else{
    document.querySelector(activePlayer['scorespan']).textContent = activePlayer['score'];
    }
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const dealerLogic = async () => {
    blackjackGame['isStand'] = true;

    while(DEALER['score'] < 16 && blackjackGame['isStand'] ===true){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
        //computeWinner();
        //showResults();
    }
    //if(DEALER['score'] > 15){
        blackjackGame['turnsOver'] = true;
         //showResults(computeWinner());
        let winner = computeWinner();
        showResults(winner)
        console.log(blackjackGame['turnsOver']);
    //}
}

document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

//compute winner and return who just won.
//update the wins, losses, draws
const computeWinner = () => {
    let winner;

    if(YOU['score'] <=21){
        //condition: higher score than dealer or when dealer bursts but you are 21 or under
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackjackGame['wins'] ++;
            //console.log('You won');
            winner = YOU;
        }
        else if (YOU['score'] < DEALER['score']){
            blackjackGame['losses'] ++;
            //console.log('You Lost');
            winner = DEALER;
        }
        else if (YOU['score'] === DEALER['score']){
            blackjackGame['draws'] ++;
            //console.log('You drew');
        }

    }
    //condition: when you burst and the dealer doesnt

    else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        console.log('You lost!!');
        winner = DEALER;
    }

    //when you AND the dealer busts

    else if(YOU['score'] > 21 && DEALER['score'] > 21){
        console.log('You drew');
    }

    //console.log('Winner is', winner);
    console.log(blackjackGame);
    return winner;
}

const showResults = (winner) => {
    let message, messageColor;

    if(blackjackGame['turnsOver'] ===true){

        if(winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame['wins'];
            message = 'You won';
            messageColor = 'green';
            winSound.play();
        }
        else if (winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame['losses'];
            message = 'You lost';
            messageColor = 'red';
            lossSound.play();
        }
        else {
            document.querySelector('#draws').textContent = blackjackGame['draws'];
            message = 'You drew';
            messageColor = 'black';
        }

        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }    
}




// const waru = (a,b) =>  {
//     a = parseInt(prompt('Enter Number, a'));
//     b= parseInt(prompt('enter number, b'));
//     let c= a + b;  
//     console.log('My sum is', c)
// }
// waru()









