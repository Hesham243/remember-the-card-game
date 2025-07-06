let highlightedCards = []
let playerSelections = []
let roundCount = 0
let clickable = false



const cardElements = document.querySelectorAll('.cardItem')
const playButtonElement = document.querySelector('.play-button')
const displayContainer = document.querySelector('.display-container')



function resetCards() {
  cardElements.forEach(card => card.classList.remove('highlight'))
  clickable = false
  playerSelections = []
}

function getTwoRandomCards() {
  let randomIndices = []

  while (randomIndices.length < 2) {
    let randomNumber = Math.floor(Math.random() * cardElements.length)

    if (!randomIndices.includes(randomNumber)) {
      randomIndices.push(randomNumber)
    }
  }

  return randomIndices
}

function checkSelection() {
  let selectedIds = []
  for (let i = 0; i < playerSelections.length; i++) {
    selectedIds.push(playerSelections[i].id)
  }

  let correctIds = []
  for (let i = 0; i < highlightedCards.length; i++) {
    correctIds.push(highlightedCards[i].toString())
  }

  let isCorrect = false
  if (selectedIds.length === 2) {
    if (correctIds.includes(selectedIds[0]) && correctIds.includes(selectedIds[1])) {
      isCorrect = true
    }
  }
  
  if (isCorrect) {
    roundCount++
    displayContainer.innerHTML = `
    <p class="result-status win"> You win </p>
    <p class="round-text"> Round Completed </p>
    <div class="round-score"> ${roundCount} </div>`
  } else {
    roundCount = 0
    displayContainer.innerHTML = `
    <p class="result-status lose"> You lose </p>
    <p class="round-text"> Round Completed </p>
    <div class="round-score"> ${roundCount} </div>`
  }

  setTimeout(function () {
    resetCards()
    for (let i = 0; i < cardElements.length; i++) {
      cardElements[i].style.border = '2px solid #aaa'
    }
  }, 100)
}



playButtonElement.addEventListener('click', () => {
  resetCards()

  const indices = getTwoRandomCards()
  highlightedCards = indices

  indices.forEach(i => {
    cardElements[i].classList.add('highlight')
  })

  setTimeout(() => {
    cardElements.forEach(card => card.classList.remove('highlight'))
    clickable = true
    displayContainer.innerHTML = '<p class="result-status"> Now, pick the cards </p>'
  }, 200)

})


cardElements.forEach(card => {

    card.addEventListener('click', () => {
      if (!clickable) return

      if (playerSelections.length < 2 && !playerSelections.includes(card)) {
        playerSelections.push(card)
        card.style.border = '2px solid blue'        
        if (playerSelections.length === 2) {
          checkSelection()
        }
      }
    })
})


