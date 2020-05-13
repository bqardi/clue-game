const puzzles = [{
        type: "Riddle",
        instantAnswer: false,
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
    },
    {
        type: "Stress test",
        instantAnswer: true,
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
        }, ]
    }
]