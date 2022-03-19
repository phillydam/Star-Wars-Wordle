const question = document.querySelector(".question")
const choices = Array.from(document.querySelectorAll(".choice-text"))
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let correctAnswer = true
let score = 0
let questionCounter = 0
let availableQuestion = []


// let luke = document.getElementsByClassName('images');
// element.innerHTML = '<img src="photos\LukeSkywalker.png"/>'


// let image = document.getElementById("image")
let imageArray = [
    "LukeSkywalker.png", "DarthVader.png", "Leia.png", "Yoda.png"
]
// let imageIndex = 0

// nextImage = () => {
//     document.body.appendChild(imageArray)
//     image.setAttribute("src", imageArray[imageIndex])
//     imageIndex = (imageIndex + 1) % imageArray.length
// }

nextImage = () => {
    let image = document.getElementById("image")
    for(let j = 0; j < imageArray.length; j++){
        if(imageArray[j].src == image.src){
            if(j === imageArray.length){
                document.getElementById("image").src = imageArray[0].src
                break
            }
            document.getElementById("image").src = imageArray[j+1].src
            break
        }
        document.body.appendChild(imageArray)
    }
}

let questions = [
    {
        question: "Who is This?",
        choice1: "Boba Fett",
        choice2: "Yoda",
        choice3: "Luke Skywalker",
        choice4: "Obi Wan Kenobi",
        answer: 3
    },
    {
        question: "Who is This?",
        choice1: "Boba Fett",
        choice2: "Yoda",
        choice3: "Luke Skywalker",
        choice4: "Obi Wan Kenobi",
        answer: 3
    },
    {
        question: "Who is This?",
        choice1: "Boba Fett",
        choice2: "Yoda",
        choice3: "Luke Skywalker",
        choice4: "Obi Wan Kenobi",
        answer: 3
    },
    {
        question: "Who is This?",
        choice1: "Boba Fett",
        choice2: "Yoda",
        choice3: "Luke Skywalker",
        choice4: "Obi Wan Kenobi",
        answer: 3
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestion = [...questions]
    nextQuestion()
    nextImage()
}

nextQuestion = () => {
    // if(availableQuestion.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //     localStorage.setItem('recentScore', score)
    //     return window.location.assign("/finish.html")
    // }

    if(score >= 400 || availableQuestion.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('recentScore', score)
        return window.location.assign("youwin.html")

        if(score < 400 || availableQuestion.length === 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem('recentScore', score)
            return window.location.assign("/youlose.html")
        }
    }

    questionCounter++
    // for (questionCounter = 0; questionCounter >= availableQuestion.length; questionCounter++)
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.height = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestion.length)
    currentQuestion = availableQuestion[questionsIndex]
    questions.innerText = currentQuestion.questgion

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestion.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', i => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = i.target
        const selectedAnswer = selectedChoice.dataset["number"]


        // come back to this section to review
        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect"

        if(classToApply === "correct"){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            nextQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()