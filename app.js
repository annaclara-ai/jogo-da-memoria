const board = document.querySelector(".table__board");
const score = document.querySelector(".table__score");
const btnRestart = document.querySelector("#btn-restart");

let initialPairs = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]

let selectedCards = []

let scoreCount = 0;

const load = () => {
    scoreCount = 0;
    selectedCards = [];

    const sufflePairs = suffle(initialPairs)

    while(board.firstChild) {
        board.firstChild.remove();
    }

    createCards(sufflePairs)
}

const suffle = (pairs) => {
    
    for(let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]]
    }

    return pairs
}

const createCards = (pairs) => {
    pairs.forEach(pair => {
        const card = document.createElement("div")
    
        card.className = 'table__board__card';
        card.dataset.value = pair;
        card.innerText = pair;
    
        card.addEventListener("click", itIsAMatch);
    
        board.append(card);
    });
}

const itIsAMatch = (value) => {
    const clickedCard = value.target;

    if (clickedCard.classList.contains('open')) {
        return;
    }

    clickedCard.classList.toggle('open');

    selectedCards.push(clickedCard);

    if (selectedCards.length > 1) {
        const [firstCard, secondCard] = [...selectedCards];

        if (firstCard.dataset.value === secondCard.dataset.value) {
            scoreCount = scoreCount + 1;

            score.innerText = `score: ${scoreCount}`

            selectedCards = [];
        } else {

            selectedCards = [];

            setTimeout(() => {
                firstCard.classList.toggle('open');
                secondCard.classList.toggle('open');
            }, 800);
        }
    }
}

load()
btnRestart.addEventListener("click", load)
