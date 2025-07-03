/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let highlightedCards = [];
let playerSelection = [];
let roundCount = 0;



/*----- Cached Element References  -----*/
const cardElements = document.querySelectorAll('.card');
const playButtonElement = document.querySelector('.play-button');
const displayContainer = document.querySelector('.display-container');



/*-------------- Functions -------------*/
// Reset all cards and selections
function resetCards() {
  cardElements.forEach(card => card.classList.remove('highlight'));
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


// Check if player's selection is correct
function checkSelection() {
  
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
  }, 2000);

  displayContainer.textContent = 'Now, pick the cards!';
});



// Handle card click
cardElements.forEach(card => {
  card.addEventListener('click', () => {
    if (playerSelection.length < 2 && !playerSelection.includes(card)) {
      playerSelection.push(card);
      card.style.border = '2px solid blue';

      if (playerSelection.length === 2) {
        checkSelection();
      }
    }
  });
});
