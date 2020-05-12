document.addEventListener("DOMContentLoaded", event => {
    const gameRiddle = document.getElementById("game-riddle");
    const gameChoices = document.getElementById("game-choices");

    const riddleOne = [{
            text: "Travel to the sun, to find water",
            colorsCorrect: ["yellow", "cyan"],
            colorsWrong: ["red", "green", "brown"],
        },
        {
            text: "Travel to the forest, and step into the mud",
            colorsCorrect: ["green", "brown"],
            colorsWrong: ["yellow", "red", "cyan"],
        },
    ]

    let answer = [];

    const activeObj = riddleOne[randomInteger(0, riddleOne.length)];

    setRiddle(gameRiddle, gameChoices, activeObj);

    function setRiddle(elmTxt, elmChoices, obj) {
        elmTxt.innerHTML = `<span class="game-riddle__title">Riddle</span>: ${obj.text}`;
        let colors = arrayCombine(obj.colorsCorrect, obj.colorsWrong);
        shuffleArray(colors);
        colors.forEach(color => {
            let elmChoice = document.createElement("BUTTON");
            elmChoice.classList.add("game-choices__choice");
            elmChoice.style.backgroundColor = color;
            elmChoices.appendChild(elmChoice);
            elmChoice.addEventListener("click", function() {
                elmChoice.classList.toggle("js-chosen");
                if (elmChoice.classList.contains("js-chosen")) {
                    answer.push(color);
                } else {
                    const index = answer.indexOf(color);
                    if (index > -1) {
                        answer.splice(index, 1);
                    }
                }
                console.log(answer);
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