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

}


// Function to get two random unique cards
function getTwoRandomCards() {
  const indices = new Set();
  while (indices.size < 2) {
    const randomIndex = Math.floor(Math.random() * cardElements.length);
    indices.add(randomIndex);
  }
  return [...indices];
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

});



