document.addEventListener("DOMContentLoaded", event => {
    const gameTask = document.getElementById("game-task");
    const gameChoices = document.getElementById("game-choices");
    const gameAdvance = document.getElementById("game-advance");

    let levelFileName = location.href.split("/").slice(-1)[0];
    let level = parseInt(levelFileName.substr(0, levelFileName.length));
    // let level = parseInt(levelFileName.substr(6, 4));
    const levelIndex = level - 1;
    let answers = [];
    let wrongAnswerCount = 0;


    // const activeObj = puzzles[levelIndex].task[randomInteger(0, puzzles[levelIndex].task.length)];
    let activeTask;

    taskType(gameTask, gameChoices, puzzles[levelIndex]);

    gameAdvance.addEventListener("click", tryAdvance);

    function taskType(elmTxt, elmChoices, obj) {
        switch (obj.type) {
            case "Riddle":
                setColorButtons(elmTxt, elmChoices, obj);
                break;
            case "Stress test":
                setColorButtons(elmTxt, elmChoices, obj);
                break;

            default:
                break;
        }
    }

    function tryAdvance() {
        const answerResponse = checkAnswers();
        if (answerResponse === "Correct") {
            location.href = `${level + 1}.html`;
        } else {
            if (answerResponse != "Wrong" || puzzles[levelIndex].hints.length === 0) {
                alert(answerResponse);
                return;
            }
            alert(puzzles[levelIndex].hints[wrongAnswerCount]);
            if (wrongAnswerCount < puzzles[levelIndex].hints.length - 1) {
                wrongAnswerCount++;
            }
        }
    }

    function checkAnswers() {
        if (answers.length === 0) {
            return "You need to select something!";
        }
        if (answers.length !== activeTask.correct.length) {
            return "The selected amount of answers are incorrect!";
        }
        for (let i = 0; i < activeTask.correct.length; i++) {
            const correctAnswer = activeTask.correct[i];
            if (!answers.includes(correctAnswer)) {
                return "Wrong";
            }
        }
        return "Correct";
    }

    function setColorButtons(elmTxt, elmChoices, obj) {
        activeTask = obj.tasks[randomInteger(0, obj.tasks.length)]
        elmTxt.innerHTML = `<span class="game-riddle__title">${obj.type}</span>: ${activeTask.text}`;
        let colors = arrayCombine(activeTask.correct, activeTask.wrong);
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
                if (obj.instantAnswer) {

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