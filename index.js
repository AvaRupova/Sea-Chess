const squares = document.querySelectorAll('.square')
const playerX = 'X'
const playerO = 'O'
let turn = playerX

const gameOverContainer = document.querySelector('.game-over-container')
const gameOverMessage = document.querySelector('.game-over-winner')
const playAgainButton = document.querySelector('.restart')
const line = document.querySelector('.line')


const movesArr = Array(squares.length)
movesArr.fill(null)

squares.forEach(square => square.addEventListener('click', clickSquare))
squares.forEach(square => square.addEventListener('mouseover', hoverSquare))

function hoverSquare(e) {

    const currentSquare = e.target

    if (currentSquare.innerText === "") {
        if (turn === playerX) {
            currentSquare.classList.add('x-hover')
            currentSquare.classList.remove('o-hover')
        } else {
            currentSquare.classList.add('o-hover')
            currentSquare.classList.remove('x-hover')
        }
    }

}

function clickSquare(e) {




    if (gameOverContainer.classList.contains('visible')) {
        return
    }

    const currentSquare = e.target
    const indexOfCurrentSquare = currentSquare.dataset.index

    if (currentSquare.innerText != '') {
        return
    }
    
    function ding() {
        const click = new Audio('sound/click.wav')
        click.play()
    }
    ding()

    if (turn === playerX) {
        currentSquare.innerText = playerX
        movesArr[indexOfCurrentSquare - 1] = turn
        turn = playerO
    } else {
        currentSquare.innerText = playerO
        movesArr[indexOfCurrentSquare - 1] = turn
        turn = playerX
    }

    

    checkWinner()
}

function checkWinner() {

    for (const winnerCombination of winnerCombinations) {
        const { combination, winClass } = winnerCombination

        const squareValue1 = movesArr[combination[0] - 1]
        const squareValue2 = movesArr[combination[1] - 1]
        const squareValue3 = movesArr[combination[2] - 1]
        console.log(squareValue1);
        console.log(squareValue2);
        console.log(squareValue3);


        if (squareValue1 != null &&
            squareValue1 === squareValue2 &&
            squareValue1 === squareValue3
        ) {
            line.classList.add(winClass)
            gameOverContainer.classList.replace('hidden', 'visible')
            gameOverMessage.innerText = `The winner is ${squareValue1}!`

        }
        else {

            let isGridFull = true

            for (const position of movesArr) {
                if (position === null) {
                    isGridFull = false
                }
            }

            if (isGridFull) {
                gameOverContainer.classList.replace('hidden', 'visible')
                gameOverMessage.innerText = 'There is no winner!'
            }

        }
    }


}

const winnerCombinations = [
    { combination: [1, 2, 3], winClass: 'line-row-1' },
    { combination: [4, 5, 6], winClass: 'line-row-2' },
    { combination: [7, 8, 9], winClass: 'line-row-3' },

    { combination: [1, 4, 7], winClass: 'line-column-1' },
    { combination: [2, 5, 8], winClass: 'line-column-2' },
    { combination: [3, 6, 9], winClass: 'line-column-3' },

    { combination: [1, 5, 9], winClass: 'line-diagonal-1' },
    { combination: [3, 5, 7], winClass: 'line-diagonal-2' }
]

playAgainButton.addEventListener('click', restartGame)

function restartGame() {
    gameOverContainer.classList.replace('visible', 'hidden')
    line.classList = 'line'
    turn = playerX
    squares.forEach(square => square.innerText = '')
    movesArr.fill(null)

}