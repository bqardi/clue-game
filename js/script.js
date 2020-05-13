document.addEventListener("DOMContentLoaded", event => {
    const gameRiddle = document.getElementById("game-riddle");
    const gameChoices = document.getElementById("game-choices");
    const gameAdvance = document.getElementById("game-advance");

    let levelFileName = location.href.split("/").slice(-1)[0];
    let level = parseInt(levelFileName.substr(6, 4));
    let answers = [];
    let wrongAnswerCount = 0;


    const activeObj = riddleOne.riddles[randomInteger(0, riddleOne.riddles.length)];

    setRiddle(gameRiddle, gameChoices, activeObj);

    gameAdvance.addEventListener("click", tryAdvance);

    function tryAdvance() {
        const answerResponse = checkAnswers();
        if (answerResponse === "Correct") {
            location.href = `level-${level + 1}.html`;
        } else {
            if (answerResponse != "Wrong" || riddleOne.hints.length === 0) {
                alert(answerResponse);
                return;
            }
            alert(riddleOne.hints[wrongAnswerCount]);
            if (wrongAnswerCount < riddleOne.hints.length - 1) {
                wrongAnswerCount++;
            }
        }
    }

    function checkAnswers() {
        if (answers.length === 0) {
            return "You need to select something!";
        }
        if (answers.length !== activeObj.correct.length) {
            return "The selected amount of answers are incorrect!";
        }
        for (let i = 0; i < activeObj.correct.length; i++) {
            const correctAnswer = activeObj.correct[i];
            if (!answers.includes(correctAnswer)) {
                return "Wrong";
            }
        }
        return "Correct";
    }

    function setRiddle(elmTxt, elmChoices, obj) {
        elmTxt.innerHTML = `<span class="game-riddle__title">Riddle</span>: ${obj.text}`;
        let colors = arrayCombine(obj.correct, obj.wrong);
        shuffleArray(colors);
        colors.forEach(color => {
            let elmChoice = document.createElement("BUTTON");
            elmChoice.classList.add("game-choices__choice");
            elmChoice.style.backgroundColor = color;
            elmChoices.appendChild(elmChoice);
            elmChoice.addEventListener("click", function() {
                elmChoice.classList.toggle("js-chosen");
                if (elmChoice.classList.contains("js-chosen")) {
                    answers.push(color);
                } else {
                    const index = answers.indexOf(color);
                    if (index > -1) {
                        answers.splice(index, 1);
                    }
                }
            })
        });
    }

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function arrayCombine(array1, array2) {
        let array = array1;
        array = array.concat(array2);
        return array;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = randomInteger(0, array.length);
            let tmp = array[i];
            array[i] = array[j];
            array[j] = tmp;
        }
    }
});