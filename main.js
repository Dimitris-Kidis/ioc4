const tiles = document.getElementsByClassName('tile');
const body = document.querySelector('body');
var beep = new Audio('beep.mp3');

const timeSpent = document.getElementById('time-spent');
const averageTime = document.getElementById('average-time');
const table = document.getElementById('table');

console.log(timeSpent);
console.log(averageTime);
console.log(table);

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
const zeroPad = (num, places) => String(num).padStart(places, '0');


var startTime, endTime;

function start() {
  startTime = new Date();
};

function endFun() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  var seconds = Math.round(timeDiff);
  console.log(seconds + " seconds");
  timeSpent.innerHTML = `${zeroPad((Math.floor(seconds/60)),2)}:${zeroPad((seconds%60),2)}`;

  let tmp=0;
  for(let i = 0; i < timePerStep.length; i++) {
    tmp += timePerStep[i]; 
  }
  averageTime.innerHTML = `${tmp / timePerStep.length}`;

  for (let i = 0; i < timePerStep.length; i++) {
    table.innerHTML += `
    <tr>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 height="21" align="center" valign=middle bgcolor="#F7F7F7"><font color="#000000">${i+1}</font></td>
            <td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#F7F7F7"><font color="#000000">${timePerStep[i]}</font></td>
    </tr>
    `;
  }

  table.classList.remove('hidden');
}


var colorCheck = true; // true - black, false - red
var blackNumber = 1;
var redNumber = 24;
var end = false;
var counter = 0;
var timeFlag = 0;

var timeBRstart, timeBRend, timeRBstart, timeRBend;
var timePerStep = [];

function BtoRstart () {
  timeBRstart = new Date();
}

function BtoRend () {
  timeBRend = new Date();
  var timeDiff = timeBRend - timeBRstart; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  var seconds = Math.round(timeDiff);
  // console.log(seconds + " seconds");
  timePerStep.push(seconds);
}

function RtoBstart () {
  timeRBstart = new Date();
}

function RtoBend () {
  timeRBend = new Date();
  var timeDiff = timeRBend - timeRBstart; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  var seconds = Math.round(timeDiff);
  // console.log(seconds + " seconds");
  timePerStep.push(seconds);
}


function countAndCheck (tile) {

  if ( colorCheck === true && parseInt(tile.innerText) === blackNumber && !tile.classList.contains('red')) {
    BtoRstart();
    if (blackNumber !== 1) {
      RtoBend();
    }
    beep.play();
    blackNumber++;
    console.log('красная', redNumber);
    counter++;
    colorCheck = false;
  } else if ( colorCheck === false && parseInt(tile.innerText) === redNumber && tile.classList.contains('red')) {
    BtoRend();
    RtoBstart();
    beep.play();
    redNumber--;
    counter++;
    console.log('черная', blackNumber);
    colorCheck = true;
  }
  if ( blackNumber === 26 ) {
    end = true;
    console.log('finish');
    endFun();
    
  }
  console.log(timePerStep);
}

for(tile of tiles) {
    tile.addEventListener('click', e => {
      if (timeFlag === 0) {
        timeFlag++;
        start();
      }
      end === false ? countAndCheck(e.target) : 'You can\'n!' ;
});
}




