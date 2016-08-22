var stickman = document.getElementById('scaffold');
var wordDiv = document.getElementById('word');
var lettersDiv = document.getElementById('letters');
var guessesDiv = document.getElementById('guesses');
var secretWord = "";
var blanks = "";
var wrongGuesses = 0;

/**
 * Initializes a new game.
 */
function init() {  
  clearGuesses();
  resetLetters();
  drawStickMan(0);
  chooseSecretWord();
  drawBlanks();
  wrongGuesses = 0;
};
init();

/** 
 * Clear the guesses div of all prior guesses
 */
function clearGuesses() {
  guessesDiv.innerHTML = "";
}

/**
 * Resets the letters div with an anchor tag for each letter 
 * in the alphabet
 */
function resetLetters() {
  var letters = [];
  for(i=0; i<26; i++) {
    var letter = String.fromCharCode(65 + i); 
    letters.push('<a id="' + letter + '" onclick=guessLetter(' + letter + ') href="#' + letter + '">' + letter + '</a>');    
  }
  lettersDiv.innerHTML = letters.join('');
}

/**
 * Guesses a single letter, removes it from possible guesses, 
 * checks to see if it is in the secret word, and if it is
 * adds it to the secret word, if not, draws another hangman part
 * @param {elm} the element clicked
 */
function guessLetter(elm) {
  var letter = elm.id;

  // Remove the letter from possible guesses element
  var node = document.getElementById(letter);
  node.parentElement.removeChild(node);

  // Add the letter to the guesses div
  node = document.createElement('span');
  node.innerHTML = letter;
  guessesDiv.appendChild(node);
  
  //Checks if the letter is in the secret word. If so,
  //it will then replace the underscore with the letter, and
  //mark that it was a correct guess.
  var letterFound = false;
  for( var i = 0; i < secretWord.length; i++)
  {
	if(secretWord.charAt(i) == letter.toLowerCase())
	{
		wordDiv.children[i].innerHTML = letter.toLowerCase();
		letterFound = true;
	}
  }
  
  //Checks if the guess was correct or not. If wrong,
  //it will up the amount of wrong guesses and draw a body part.
  if(letterFound == false)
  {
	  wrongGuesses++;
	  drawStickMan(wrongGuesses);
  }
  
  //Checks if the game is over by looking for underscores.
  for( var i = 0; i < secretWord.length; i++)
  {
	if(wordDiv.children[i].innerHTML == "_")
	{
		return;
	}
  }
  gameOver(1);
}

/**
 * Draws the stickman
 * @param {wrongGuesses} the number of wrong guesses
 */
function drawStickMan(wrongGuesses) {
  if(wrongGuesses == 0) {
    scaffold.src = "scaffold.png";
  }
  else {	  
    scaffold.src = "stickman" + wrongGuesses + ".png";
	setTimeout(function(){
		if(wrongGuesses == 6){
		gameOver(0);
		}
	}, 200);
  }
}

/**
 * Chooses a random word from the dictionary to be our secret word
 * and set blanks to match the number of letters.
 */
function chooseSecretWord() {
  var index = Math.floor(Math.random() * dictionary.length);
  secretWord = dictionary[index].word; 
  blanks = '';
  for(i = 0; i < secretWord.length; i++) {
    blanks += '_';
  } 
}

/**
 * Renders the blanks and known letters of the secret word into
 * the wordDiv
 */
function drawBlanks(){
  var html = [];
  for(i=0; i < blanks.length; i++) {
    html.push('<span>' + blanks.charAt(i) + '</span>');
  }
  wordDiv.innerHTML = html.join('');
}

/**
 * Determines if the user won, or lost and displays the result 
 * to the user.
 * @param {winOrLose} 0 for lose, anything else for win.
 */
function gameOver(winOrLose){
	if(winOrLose == 0){
		var continuePlaying = window.confirm("You Lost! \n\nWould you like to continue playing? Press Ok to start another round, or cancel to stop playing.")
	}
	else{
		var continuePlaying = window.confirm("You Won! \n\nWould you like to continue playing? Press Ok to start another round, or cancel to stop playing.")
	}
	
	if(continuePlaying){
		init();
	}
	else{
		var lettersLeft = letters.children.length;
		for(var j = 0; j < lettersLeft; j++){
			letters.children[j].removeAttribute("onclick");
			letters.children[j].removeAttribute("href");
		}
		window.alert("Have a good day!");
	}
}