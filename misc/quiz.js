function personalityQuiz() {
    // This line starts a function called personalityQuiz.
    console.log("Welcome to the Formula 1 Personality Quiz!");
    console.log("Answer the following questions to find out which F1 team you're most like.");

    // These lines display welcome messages in the console.

    const teams = [
        "Red Bull Racing", "Mercedes-AMG Petronas", "Ferrari", "McLaren",
        "Aston Martin", "Alpine", "Williams", "Alfa Romeo",
        "Haas", "AlphaTauri"
    ];

    // This creates a list (called an "array" in programming) of all the F1 teams.
    // It's like making a shopping list of teams.

    const question1Options = {
        "A": ["Red Bull Racing", "Ferrari"],
        "B": ["Mercedes-AMG Petronas", "McLaren"],
        "C": ["Aston Martin", "Alpine"],
        "D": ["Williams", "Alfa Romeo"],
        "E": ["Haas", "AlphaTauri"]
    };
    // This creates a set of options for the first question.
    // It's like a multiple-choice question where each letter (A, B, C, etc.)
    // is linked to one or more teams. This is an "object" or "dictionary".

    const question2Options = {
        "A": ["Red Bull Racing", "Mercedes-AMG Petronas"],
        "B": ["Ferrari", "McLaren"],
        "C": ["Aston Martin", "Williams"],
        "D": ["Alpine", "Alfa Romeo"],
        "E": ["Haas", "AlphaTauri"]
    };
    // Same as above, but for the second question.

    const question3Options = {
        "A": "Red Bull Racing",
        "B": "Mercedes-AMG Petronas",
        "C": "Ferrari",
        "D": "McLaren",
        "E": "Aston Martin",
        "F": "Alpine",
        "G": "Williams",
        "H": "Alfa Romeo",
        "I": "Haas",
        "J": "AlphaTauri"
    };
    // Options for the third question, where each letter corresponds to one specific team.

    function askQuestion(questionOptions) {
        // This is a function (mini-program) that handles asking a question and getting an answer.
        for (const option in questionOptions) {
            // This loop goes through each option (A, B, C, etc.) in the question.
            if (typeof questionOptions[option] === 'string') {
                console.log(option + ": " + questionOptions[option]);
            } else {
                console.log(option + ": " + questionOptions[option].join(" - "));
            }
        }
        // These lines display the question options to the user.

        while (true) {
            // This creates a loop that keeps asking the question until the user gives a valid answer.
            const answer = prompt("Enter your choice (A, B, C, etc.):").toUpperCase();
            // This line gets the user's input using a popup box and converts it to uppercase.
            if (answer in questionOptions) {
                // This checks if the user's answer is a valid option.
                return questionOptions[answer];
                // If it is, the function gives back the corresponding team(s).
            }
            console.log("Invalid input. Please enter a valid choice.");
            // If the answer is invalid, this message is displayed and the loop repeats.
        }
    }

    console.log("\nQuestion 1: What is your preferred approach to challenges?");
    const answer1 = askQuestion(question1Options);
    // This asks the first question and stores the answer.

    console.log("\nQuestion 2: What is most important to you?");
    const answer2 = askQuestion(question2Options);
    // This asks the second question and stores the answer.

    console.log("\nQuestion 3: Which of these statements resonates with you the most?");
    const answer3 = askQuestion(question3Options);
    // This asks the third question and stores the answer.

    const teamCounts = {};
    for (const team of teams) {
        teamCounts[team] = 0;
    }
    // This creates an object to keep track of how many times each team was "chosen".

    if (Array.isArray(answer1)) {
        for (const team of answer1) {
            teamCounts[team]++;
        }
    }
    if (Array.isArray(answer2)) {
        for (const team of answer2) {
            teamCounts[team]++;
        }
    }
    teamCounts[answer3]++;
    // These lines add 1 to the count of the teams that were chosen in the answers.

    let mostCompatibleTeam = "";
    let maxCount = 0;

    for (const team in teamCounts) {
        if (teamCounts[team] > maxCount) {
            maxCount = teamCounts[team];
            mostCompatibleTeam = team;
        }
    }
    // This finds the team with the highest count.

    console.log("\nYou are most like: " + mostCompatibleTeam + "!");
    // This displays the final result.
}

personalityQuiz();
// This line starts the quiz by calling the personalityQuiz function.