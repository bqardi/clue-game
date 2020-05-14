document.addEventListener("DOMContentLoaded", event => {
    const gameTask = document.getElementById("game-task");
    const gameChoices = document.getElementById("game-choices");
    const gameAdvance = document.getElementById("game-advance");

    let levelFileName = location.href.split("/").slice(-1)[0];
    let level = parseInt(levelFileName.substr(0, levelFileName.length));
    const levelIndex = level - 1;
    let wrongAnswerCount = 0;

    const puzzle = puzzles[levelIndex];
    let activeTask;
    let answers = [];

    taskType(gameTask, gameChoices);

    gameAdvance.addEventListener("click", tryAdvance);

    function taskType(elmTxt, elmChoices) {
        switch (puzzle.type) {
            case "Riddle":
                puzzle.initialize(elmTxt, elmChoices, function(choiceBtn, color) {
                    choiceBtn.classList.toggle("js-chosen");
                    if (choiceBtn.classList.contains("js-chosen")) {
                        answers.push(color);
                    } else {
                        const index = answers.indexOf(color);
                        if (index > -1) {
                            answers.splice(index, 1);
                        }
                    }
                });
                break;
            case "Stress test":
                puzzle.initialize(elmChoices, function(choiceBtn, color) {
                    elmTxt.innerHTML = `<span class="game-riddle__title">${puzzle.type}</span>: ${puzzle.currentTask.text}`;
                    if (color === puzzle.currentTask.correct[0]) {
                        console.log("Correct");
                    } else {
                        console.log("Wrong");
                    }
                });
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
            if (answerResponse != "Wrong" || puzzle.hints.length === 0) {
                alert(answerResponse);
                return;
            }
            alert(puzzle.hints[wrongAnswerCount]);
            if (wrongAnswerCount < puzzle.hints.length - 1) {
                wrongAnswerCount++;
            }
        }
    }

    function checkAnswers() {
        if (answers.length === 0) {
            return "You need to select something!";
        }
        if (answers.length !== puzzle.currentTask.correct.length) {
            return "The selected amount of answers are incorrect!";
        }
        for (let i = 0; i < puzzle.currentTask.correct.length; i++) {
            const correctAnswer = puzzle.currentTask.correct[i];
            if (!answers.includes(correctAnswer)) {
                return "Wrong";
            }
        }
        return "Correct";
    }
});