console.log('hi from memory.js');//check file

//---dom elements
// const btns = document.querySelectorAll('#difficulty button');
// console.log('btns', btns,'btn id', btns[1].id);//show btns and id of btn - 'medium'
const difDiv = document.querySelector('#difficulty');
const board = document.querySelector('.grid');
const slider = document.querySelector('input');
const h3 = document.querySelector('h3');

const grid = document.querySelector('.grid');
const matches = document.querySelector('#matches');

const btn = document.querySelector('button');
btn.addEventListener('click', createDeck);

const reset = document.querySelector('.reset');
reset.addEventListener('click', createDeck);

let arr = Array(50).fill().map((x,i)=>i+1).sort(() => Math.random() - .5);//arr of all posible cards
let deck = [];//arr to hold cards once difficulty selected
let attemps = 0;//counter
let tileChosen = [];
let tileId = [];
let tileWon = [];

/*---using slider instead of btns so player can pick number of cards
---choose difficulty btn
btns.forEach(b => b.addEventListener('click', () => {
    if(b.id == 'easy'){//number of tiles based on difficulty
        arr = arr.slice(0,10);
        board.style.width = '500px';        
    } else if (b.id == 'medium'){
        arr = arr.slice(0,20);
        board.style.width = '750px'; 
    } else {
        arr = arr.slice(0,30);
        board.style.width = '1000px';
    }
    console.log('arr from btns', arr);
    difDiv.style.display = 'none';//hide btns for game play
    createDeck();
    return arr;    
}));
*/

//---difficulty range
slider.addEventListener('change', () => {
    console.log('slider', slider.value);
    h3.innerHTML = slider.value;
    createDeck();
});

//--- create deck
function createDeck() {
    arr = arr.slice(0, slider.value);
    difDiv.style.display = 'none';

    let cardObj = arr.map(e => {
        if(+e < 10) e = `0${e}`;
        return {
            name: `Halloween-${e}`,
            imgFile:`images/flat/Halloween-${e}.png`,
        }
    });//end map
    deck = [...cardObj,...cardObj];
    console.log('cardObj', cardObj); console.log('deck', deck);//check output

    deck.sort(() => Math.random() - 0.5); //shuffle
   
    createBoard();
    return deck;
}//end createDeck()

console.log('deck out of function', deck);

//--- create board
function createBoard(){
    deck.forEach((e, i) => {
        const tile = new Image;//create tile
        tile.src = 'images/halloween-blank.png';//set img src
        tile.setAttribute('data-id', i);//set index as id
        tile.addEventListener('click', flipTile);//call flip tile on click
        grid.appendChild(tile);//place card
        matches.style.visibility = 'visible';
        document.querySelector('#board').style.visibility = 'visible';
    });
}//end createBoard

//---check match
function checkForMatch(){

    const tiles = document.querySelectorAll('img');
    // const tile1 = tileId[0];
    // const tile2 = tileId[1];

    if(tileChosen[0] == tileChosen[1]){//match found
        matches.textContent = 'You found a match!';//user message
        tiles[tileId[0]].src = tiles[tileId[1]].src = 'images/white.png';//remove from game board
        // tiles[tile2].src = 'images/blank.png';
        tileWon.push(tileChosen);//save match
    } else{ 
        tiles[tileId[0]].src = tiles[tileId[1]].src = `images/halloween-blank.png`;
    }     
    
    tileChosen.splice(0);//clear
    tileId.splice(0);//clear
    matches.innerHTML = `Matches: <strong>${tileWon.length}</strong> <span style="padding: 8px"></span> Guesses: <strong>${attemps/2}</strong>`;  
    if(tileWon.length == slider.value){
        // matches.textContent = `Game Over! You found all the matches`;
        reset.style.display = 'flex';
        difDiv.style.display = 'inherit';
    }

}//end checkForMatch

//---flip card
function flipTile(){
    attemps++;
    let cardID = this.getAttribute('data-id');//get id
    tileChosen.push(deck[cardID].name);//same card name
    tileId.push(cardID);//save card id
    this.src = deck[cardID].imgFile;//reveal
    console.log('this', this);
    console.log('tileChosen', tileChosen);
    if(tileChosen.length > 1){
        setTimeout(checkForMatch, 500);//check after slight pause
    }

}//end flipCard

// createBoard();