const player = document.querySelector('.player')
const saveScore = document.querySelector('#saveScore')
const finalScore = document.querySelector('#finishForm')
const recentScore = document.querySelector('#finalScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

// 



// 
finalScore.innerText = recentScore

// reenables save button
player.addEventListener('keyup', () => {
    saveScore.disabled = !player.value
})

saveScore = i => {
    i.preventDefault()

    const score = {
        score: recentScore,
        name: player.value
    }
}

highScores.push(score)

highScores.sort((a,b) => {
    return b.score - a.score
})

highScores.splice(5)

localStorage.setItem('highScores', JSON.stringify(highScores))
window.location.assign('/')