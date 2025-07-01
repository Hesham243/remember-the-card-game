/*-------------- Constants -------------*/


/*---------- Variables (state) ---------*/
let gameState
let roundsCompleted
let maxSelection = 2
let correctCards = []
let playerSelection = []
let allCards = [
  {
    id: '',
    isSelected: false,
    isCorrect: false,
    isRevealed: false,
  },
  {
    id: '',
    isSelected: false,
    isCorrect: false,
    isRevealed: false,
  },
  {
    id: '',
    isSelected: false,
    isCorrect: false,
    isRevealed: false,
  },
  {
    id: '',
    isSelected: false,
    isCorrect: false,
    isRevealed: false,
  },
  {
    id: '',
    isSelected: false,
    isCorrect: false,
    isRevealed: false,
  },
  {
    id: '',
    isSelected: false,
    isCorrect: false,
    isRevealed: false,
  },
]
// console.log(allCards)



/*----- Cached Element References  -----*/
const cardElements = document.querySelectorAll('.card')
// console.log(cardElements)



/*-------------- Functions -------------*/


// Assign each element.id to a matching allCards[i].id
for (let i = 0; i < allCards.length; i++) {
  allCards[i].id = cardElements[i].id;
}
// console.log(allCards)
  


//  This loop iterate 2 times and push 2 random numbers (0-5) in correctCards list and the numbers represent the correct card indexs
for (let i = 0; i < 2; i++){
  let ind = Math.floor(Math.random() * 6)
  correctCards.push(ind)
  allCards[ind].isCorrect = true
}
// console.log(correctCards)
// console.log(allCards)





/*----------- Event Listeners ----------*/

/* 
When a card is clicked:
If playerSelection.length !== 2, the card's id is pushed to playerSelection list.
If playerSelection.length === 2, the return exits the function which is handling the click event, and nothing else in that click handler runs.
*/
cardElements.forEach( (element) => {
  element.addEventListener('click', (event) => {
    
    if (playerSelection.length !== 2){
      playerSelection.push(event.target.id)

    }else{
      return
    }
    
  })
})