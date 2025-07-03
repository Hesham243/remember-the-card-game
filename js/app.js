/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let highlightedCards = [];
let playerSelection = [];
let roundCount = 0;
let clickable = false; // New flag to control click access




/*----- Cached Element References  -----*/
const cardElements = document.querySelectorAll('.card');
const playButtonElement = document.querySelector('.play-button');
const displayContainer = document.querySelector('.display-container');



/*-------------- Functions -------------*/
// Reset all cards and selections
function resetCards() {
  cardElements.forEach(card => card.classList.remove('highlight'));

  clickable = false; //  Disable clicking after result
  playerSelection = [];
}


// Function to get two random unique cards
function getTwoRandomCards() {
  let randomIndices = [];

  while (randomIndices.length < 2) {
    let randomNumber = Math.floor(Math.random() * cardElements.length);

    // If this number is not already in the list, add it
    if (!randomIndices.includes(randomNumber)) {
      randomIndices.push(randomNumber);
    }
  }

  return randomIndices;
}



// This function checks if the player selected the correct cards
function checkSelection() {
  
  // Get the IDs of the cards the player selected
  let selectedIds = [];
  for (let i = 0; i < playerSelection.length; i++) {
    selectedIds.push(playerSelection[i].id);
  }
  // console.log(selectedIds);


  // Get the correct card IDs that were highlighted
  let correctIds = [];
  // console.log(highlightedCards)
  for (let i = 0; i < highlightedCards.length; i++) {
    correctIds.push(highlightedCards[i].toString()); 
  }
  // console.log(correctIds)


  // Check if player picked exactly 2 cards AND both are correct
  let isCorrect = false;
  if (selectedIds.length === 2) {
    if (correctIds.includes(selectedIds[0]) && correctIds.includes(selectedIds[1])) {
      isCorrect = true;
    }
  }

  
  if (isCorrect) {
    roundCount++;
    displayContainer.innerHTML = `You win!<br><br>Round Completed<br>${roundCount}`;
  } else {
    roundCount = 0;
    displayContainer.innerHTML = `You lose!<br><br>Round Completed<br>${roundCount}`;
  }


  // After 1 second, reset cards and remove borders
  setTimeout(function () {
    resetCards(); // Clear player’s selection and highlights
    for (let i = 0; i < cardElements.length; i++) {
      cardElements[i].style.border = '2px solid #aaa';
    }
  }, 1000);
}





/*----------- Event Listeners ----------*/
// Handle Play Button
playButtonElement.addEventListener('click', () => {
  resetCards();

  // Randomly highlight two cards
  const indices = getTwoRandomCards();
  highlightedCards = indices;

  indices.forEach(i => {
    cardElements[i].classList.add('highlight');
  });

  // Show highlights for 2 seconds, then hide
  setTimeout(() => {
    cardElements.forEach(card => card.classList.remove('highlight'));
    clickable = true; // Allow clicking now
    displayContainer.textContent = 'Now, pick the cards!';
  }, 500);

});



// Handle card click
cardElements.forEach(card => {

    card.addEventListener('click', () => {
      if (!clickable) return; // Stop if not clickable

      if (playerSelection.length < 2 && !playerSelection.includes(card)) {
        playerSelection.push(card);
        card.style.border = '2px solid blue';
        // console.log(playerSelection)
        
        if (playerSelection.length === 2) {
          checkSelection();
        }
      }
    });
});
