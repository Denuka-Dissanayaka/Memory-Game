const cards = document.querySelectorAll('.memory-card');
const gameOverBlock = document.querySelector('.game-over');
const playAgainBtn = document.querySelector('.play-again');
const section = document.querySelector('.memory-game');

let hasCardflip = false;
let firstCard;
let secondCard;
section.innerHTML = '';
let currentNum = -1;
let newCards = [];
let gameOver = [];

function startFunc() {
    hasCardflip = false;
    section.innerHTML = '';
    currentNum = -1;
    newCards = [];
    gameOver = [];

    cards.forEach((card) => {
    
        const num = Math.round(Math.random()*10);
        console.log(num)
        if(num > currentNum || num === currentNum){
            newCards.push(card);
        } else {
            newCards.unshift(card);
        }
        currentNum = num;
    
    })
    
    newCards.forEach((card) => {
        section.appendChild(card);
    })
}

startFunc();




for(let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function() {
        this.classList.add('flip');
        
        if(!hasCardflip) {
            hasCardflip = true;
            firstCard = this;
        } else if(hasCardflip) {
            secondCard = this;
            if (secondCard === firstCard) {
                secondCard.classList.remove('flip');
                firstCard = '';
                secondCard = '';
            }
            hasCardflip = false;
        }

        if(firstCard && secondCard) {
            const firstCardShadow = firstCard;
            const secondCardShawod = secondCard;
            
            if(firstCardShadow.id !== secondCardShawod.id) {
                setTimeout(() => {
                    firstCardShadow.classList.remove('flip');
                    secondCardShawod.classList.remove('flip');
                },1000)
                
            }
            if(firstCardShadow.id === secondCardShawod.id) {
                gameOver.push(firstCardShadow, secondCardShawod);
                if(gameOver.length === 12) {
                    firstCard = '';
                    secondCard = '';
                    setTimeout(() => {
                        gameOverBlock.style.display = 'block';
                        playAgainBtn.addEventListener('click', () => {
                            gameOver.forEach((card) => {
                                card.classList.remove('flip');
                            })
                            gameOverBlock.style.display = 'none';
                            startFunc();
                        })
                    },1500)
                }
                
                
                
            }
            firstCard = '';
            secondCard = '';
        }

        
    })
}


