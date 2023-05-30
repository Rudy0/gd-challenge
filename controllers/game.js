const { v4: uuid } = require("uuid");

const words = ["Banana", "Canine", "Unosquare", "Airport"];
const games = {};

const retrieveWord = () => words[Math.floor(Math.random(words.length - 1))];

const clearUnmaskedWord = (game) => {
    const withoutUnmasked = { 
        ...game,
    };
    delete withoutUnmasked.unmaskedWord;
    return withoutUnmasked;
}


function createGame(req, res) {
  const newGameWord = retrieveWord();
  const newGameId = uuid();
  const newGame = {
    remainingGuesses: 6,
    unmaskedWord: newGameWord,
    word: newGameWord.replaceAll(/[a-zA-Z0-9]/g, "_"),
    status: "In Progress",
    incorrectGuesses: [],
  };

  games[newGameId] = newGame;

  res.send(newGameId);
}

function getGame(req, res) { 
    const { gameId } = req.params;
    if (!gameId) return res.sendStatus(404);

    var game = games[gameId];
    if (!game) {
        return res.sendStatus(404); 
    }

    res.status(200).json(clearUnmaskedWord(game));
}

//DELETE existing game
function deleteGame(req, res){
    const { gameId } = req.params;
    if (!gameId) return res.sendStatus(404);

    var game = games[gameId];
    if (!game) {
        return res.sendStatus(404); 
    }

    delete games[gameId];

    res.status(204).json({
        Message: "Game deleted successfuly!"
    });
}

function createGuess(req, res) { 
    const { gameId } = req.params;
    const { letter } = req.body;

    if (!gameId) return res.sendStatus(404);

    var game = games[gameId];
    if (!game) return res.sendStatus(404); 

    if (!letter || letter.length != 1) {
        return res.status(400).json({
            Message: "Guess must be supplied with 1 letter"
        })
    }

    // Check if game is in progress 
    if (game.status != "In Progress") {
        return res.status(400).json({
            Message: "Guess cannot be made! Game has ended!",
            Game: clearUnmaskedWord(game)
        })

        // check the remaining guesses for game
    } else if(game.remainingGuesses == 0){
        game.status = "Lost";

        return res.status(200).json({
            Message: "Game Over! You lost!",
            Game: clearUnmaskedWord(game)
        })

        //check if the guess letter was already used
    } else if(game.incorrectGuesses.includes(letter.toLowerCase())){
        return res.status(400).json({
            Message: "Error: Letter already used!"
        })

        //check if the guess letter is in the word
    } else if(game.unmaskedWord.toLowerCase().includes(letter.toLowerCase())){

        // update the masked word so that shows the correct guess letter 
        const updatedWord = game.word.split("").map((char, index) => {
            if (game.unmaskedWord[index].toLowerCase() === letter.toLowerCase()) {
                return game.unmaskedWord[index];
            } else {
                return char;
            }
        }).join("");
    
        game.word = updatedWord;
    
        //check if all the letters have been guessed and end the game if so
        if (!updatedWord.includes("_")) {
            game.status = "Completed";
            return res.status(200).json({
                Message: 'Congratulations! You won!',
                Game: clearUnmaskedWord(game)
            });
        } else{
            return res.status(200).json({
                Message: "Correct! Keep going!",
                Game: clearUnmaskedWord(game)
            });
        }
        
    } else{
        
        //incorrect guess letter is added to the incorrectGuesses and lose 1 from the guess number
        game.remainingGuesses -= 1;
        game.incorrectGuesses.push(letter);
        return res.status(200).json({
            Message: "Try again!",
            Game: clearUnmaskedWord(game)
        })
    }
}


module.exports = {
    createGame,
    getGame,
    createGuess,
    deleteGame,
  };