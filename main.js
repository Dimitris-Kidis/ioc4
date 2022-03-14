const tiles = document.getElementsByClassName('tile');
const body = document.querySelector('body');
var beep = new Audio('beep.mp3');

for(let i = 0; i < 7; i++) {
  body.innerHTML += `
  <div class="row">
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
            <div class="tile"></div>
  </div>
  `;
}

var redTiles = [];
var numArr = [];
while(redTiles.length < 24 && numArr.length < 24){
    var red = Math.floor(Math.random() * 49)  ;
    var num = Math.floor(Math.random() * 24)+1 ;
    if(redTiles.indexOf(red) === -1 && numArr.indexOf(num) === -1 ) {
      redTiles.push(red);
      numArr.push(num);
    } 
}

var blackTiles = [];
while(blackTiles.length < 25){
    var black = Math.floor(Math.random() * 25) + 1 ;
    if( blackTiles.indexOf(black) === -1 ) {
      blackTiles.push(black);
    } 
}

var count = 0;
for(let i = 0; i < tiles.length; i++) {
  for(let j = 0; j < tiles.length; j++) {
    if ( i === redTiles[j] ) {
      tiles[i].classList.add('red');
      tiles[i].innerHTML = numArr[j];
    }
  }
  if ( !tiles[i].classList.contains('red') ) {
    tiles[i].innerHTML = blackTiles[count];
    count++;
  }
}



var colorCheck = true; // true - black, false - red
var blackNumber = 1;
var redNumber = 24;
var end = false;
var counter = 0;
function countAndCheck (tile) {
  if ( colorCheck === true && parseInt(tile.innerText) === blackNumber && !tile.classList.contains('red')) {
    beep.play();
    blackNumber++;

    console.log('черная', parseInt(tile.innerText));
    counter++;

    colorCheck = false;
  } else if ( colorCheck === false && parseInt(tile.innerText) === redNumber ) {
    beep.play();
    redNumber--;

    counter++;
    console.log('красная', parseInt(tile.innerText));

    colorCheck = true;
  }
  if ( blackNumber === 26 ) {
    end = true;
    console.log('finish');
    return
  }
}

for(tile of tiles) {
    tile.addEventListener('click', e => {
      end === false ? countAndCheck(e.target) : 'You can\'n!' ;
});
}