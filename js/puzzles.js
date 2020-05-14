const puzzles = [{
        type: "Riddle",
        hints: [
            "Nope! Wrong! Try again...",
            "Dude! Still the wrong answer!",
            "Maybe you need a hint!? Answer lies within the riddle!",
            "You are not that clever, are you? The correct color is indicated by the objects/items in the riddle!",
            "You are hopeless!",
        ],
        tasks: [{
                text: "Travel to the sun, to find water",
                correct: ["yellow", "cyan"],
                wrong: ["red", "green", "brown"],
            },
            {
                text: "Travel to the forest, and step into the mud",
                correct: ["green", "brown"],
                wrong: ["yellow", "red", "cyan"],
            },
            {
                text: "The rose grows on rocks... What?",
                correct: ["red", "gray"],
                wrong: ["violet", "blue", "yellow"],
            },
            {
                text: "When I eat a banana, I think of strawberries",
                correct: ["red", "yellow"],
                wrong: ["cyan", "green", "black"],
            },
            {
                text: "When I peel my pees, I sit by the sea",
                correct: ["green", "cyan"],
                wrong: ["yellow", "gray", "red"],
            },
            {
                text: "Darth Vader sends his Storm Troopers",
                correct: ["black", "white"],
                wrong: ["crimson", "blue", "green"],
            },
            {
                text: "Eating grass is like jumping on tomatoes",
                correct: ["green", "crimson"],
                wrong: ["black", "blue", "white"],
            },
        ],
        currentTask: null,
        initialize: function(elmTxt, elmChoices, callback) {
            this.currentTask = this.tasks[randomInteger(0, this.tasks.length)];
            let colors = arrayCombine(this.currentTask.correct, this.currentTask.wrong);
            shuffleArray(colors);
            elmTxt.innerHTML = `<span class="game-riddle__title">${this.type}</span>: ${this.currentTask.text}`;
            colors.forEach(color => {
                let elmChoice = document.createElement("BUTTON");
                elmChoice.classList.add("game-choices__choice");
                elmChoice.style.backgroundColor = color;
                elmChoices.appendChild(elmChoice);
                elmChoice.addEventListener("click", function() {
                    callback(elmChoice, color);
                });
            });
        }
    },
    {
        type: "Stress test",
        hints: [
            "Nope! Wrong! Try again...",
            "Dude! Still the wrong answer!",
            "Maybe you need a hint!? Answer lies within the riddle!",
            "You are not that clever, are you? The correct color is indicated by the objects/items in the riddle!",
            "You are hopeless!",
        ],
        tasks: [{
                text: "Something",
                correct: ["yellow"],
                wrong: ["red", "green", "brown", "blue"],
            },
            {
                text: "Something else",
                correct: ["yellow"],
                wrong: ["red", "green", "brown", "blue"],
            },
        ],
        currentTask: null,
        initialize: function(elmChoices, callback) {
            this.currentTask = this.tasks[randomInteger(0, this.tasks.length)];
            let colors = arrayCombine(this.currentTask.correct, this.currentTask.wrong);
            shuffleArray(colors);
            colors.forEach(color => {
                let elmChoice = document.createElement("BUTTON");
                elmChoice.classList.add("game-choices__choice");
                elmChoice.style.backgroundColor = color;
                elmChoices.appendChild(elmChoice);
                elmChoice.addEventListener("click", function() {
                    callback(elmChoice, color);
                });
            });
        }
    }
]

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