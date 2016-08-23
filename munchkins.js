// initialize variables

var imgArray = [
        "gg1-100.jpg", "gg2-100.jpg", "gg3-100.jpg", "ev1-100.jpg",
        "ev2-100.jpg", "ev3-100.jpg", "mg1-100.jpg", "mg2-100.jpg",
        "gg1-100.jpg", "gg2-100.jpg", "gg3-100.jpg", "ev1-100.jpg",
        "ev2-100.jpg", "ev3-100.jpg", "mg1-100.jpg", "mg2-100.jpg"
      ];
var gameStarted = false   // use to prevent responding to invalid clicks
var secondClick = false;
var timing = false;
var clickedTiles = [];
var openSeconds = 2000;  // milliseconds to leave pictures open before flipping them.
var imgSource = "./images/";
var minutes = 0;
var seconds = 0;
buildBoard();


// event handlers
$( document ).ready(function() {
  //event handler for tile clicking
  $("[id^='tile']").on("click", function() {
    // if (!tileClicked) {  // don't respond to second click
      if (!gameStarted) {
        startGame();
      }
      console.log(this.id + " Clicked")
      tileClick(this.id);
    // }
  });

  //event handler for reset button clicking
    $("#reset").on("click", function() {
      gameStarted = true;
      // $(this).innerHTML= "Play Again";
      buildBoard();
      startGame();
    })
});

// build the game board
function buildBoard() {
  console.log("buildBoard");
  tileStatus = "";
  $("#buildhere").html("");
  // pointers = shuffleArray(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]);
  pointers = ["1", "6", "0", "3", "7", "2", "10", "14", "12", "13", "4", "11", "9", "5", "8", "15"];
  for (i=0; i <= 15; i++) {
    imgTile = imgArray[pointers[i]];
    divStart = '<div class="normal" id="tile'
    divEnd = '</div>'
    quote = '" '
    divImgSrc = '<img src="' + imgSource + imgTile + '">';
    // console.log(divStart + i + '">' + divImgSrc  +  divEnd);
    // console.log("#buildhere")
    // $('#buildhere').append(divStart + i + '">' + divImgSrc  +  divEnd);
    // $('#fuck').append("<div>Whatever</div>");
  }
}


// start a new game
function startGame() {
  gameStarted = true;
  tileClicked = false;    // prevents this from being run on next click
  seconds = 0;        // reset to 0 for timer
  clickedTiles = [];   // blank array stores names of clicked images
  openCells=[];        // blank array stores cell numbers of clicked images
  matches=0;           // used to count matches, game wins when set to 8
  $("#matches").text("");
  startTimer();
}

// process a clicked tile
function tileClick(cellID) {
  console.log(cellID);
  tileClicked = true
  cellNum = cellID.substring(4);
  cellIDStr = "#" + cellID
  $("#" + cellID).toggleClass("active normal");
  openTiles = clickedTiles.push(imgArray[pointers[cellNum]]);
  // pushFile = clickedTiles[pointers[cellNum]];
  console.log("pushFile");
  if (openTiles === 2)  {
    console.log(clickedTiles);
    if (clickedTiles[0] === clickedTiles[1]) {   // check to see if file names match
      matches += 1;     // update match count
        console.log("matches" + matches);
      $("#matches").text(matches + " matches");     // update match display
      setTimeout(freezeOpenTiles, 2000);
      if (matches == 8) {                // if we have 8 matches we win!
        gameWon();
      }
      openTiles = 0;
      clickedTiles = [];
    } else {
    console.log("file names don't match");
      setTimeout(closeOpenTiles, 2000);   // close open cells; needs timer
      openTiles = 0;
      clickedTiles = [];
    }
  }
}

function closeOpenTiles() {
  $(".active").toggleClass("active normal");
}

function freezeOpenTiles() {
  $(".active").toggleClass("active matched");
}


// determine if the game has been won
function gameWon() {
  clearInterval(timer);
  alert("You've won! ");
}

//start the timer for a new game
function startTimer(){
  timing=true;
  var minutes = 0;
  var seconds = 0;
  timer=setInterval(updateTimer, 1000);
}

function updateTimer() {
  seconds ++;
  if (seconds >=60) {
    seconds=0;
    minutes ++
  }
  seconds = (seconds < 10) ? ("0" + seconds) : seconds;
  $("#timer").text(minutes+":"+seconds);
}

function shuffleArray(array) {            //borrowed from the Internet
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
