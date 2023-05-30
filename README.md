# Javascript Hangman API 

The Hangman Game API is a HTTP-based RESTful API that allows players to create and play the classic game of Hangman. Players can create a new game, make letter guesses, retrieve the current state of the game and delete an existing game.

<hr>

The server will start running on `http://localhost:4567`. For information about how to install Node and all dependencies scroll down to **How To** section.

## API Endpoints

### Create a New Game

Starts a new game of Hangman.

- **URL:** `/games/`
- **Method:** `POST`
- **Response Code:** 200 (OK)
- **Response Body:** Game ID

### Get Game State

Retrieves the current state of a game.

- **URL:** `/games/{gameId}`
- **Method:** `GET`
- **Response Code:** 200 (OK)
- **Response Body:** Game state (remaining attempts, word with masked letters, game status, list of incorrect guesses)

### Make a Guess

Allows the player to make a letter guess for a game.

- **URL:** `/games/{gameId}/guesses`
- **Method:** `POST`
- **Request Body:** `{ "letter": "Player guess one letter" }` (JSON format)
- **Response Code:** 200 (OK)
- **Response Body:** Updated game state

### Delete a Game

Deletes a game.

- **URL:** `/games/{gameId}`
- **Method:** `DELETE`
- **Response Code:** 204 (No Content)

## Game State

The game state object returned in the API response includes the following properties:

- `remainingGuesses`: Number of remaining attempts
- `word`: The word with masked letters using
- `status`: Game status ("In Progress", "Completed", or "Lost")
- `incorrectGuesses`: Array of incorrect guesses made so far

## Error Handling

The API returns appropriate status codes and error messages for invalid requests or game conditions.

The technologies used are:

- Node version 18
- Node Package Manager (included with node)
- [Express](https://expressjs.com/)
  - Express is a micro web framework that is used to expose API endpoints.
- [Jest](https://jestjs.io/) 
  - Jest is a Javascript testing framework focused on simplicity.

---

## How to: Run Application

- Please skip Installer sections if you already have the following installed:
  - Node
  - NPM


### Manual Installation macOS & Windows

1. Install Node

To install Node 18 on Windows or macOS, follow these steps:

- Visit the Node website at https://nodejs.org/en/download.

- Make sure the LTS (long-term support) tab is selected 

- Click on the installer that is relevant for your computer. A download should begin with the pkg/msi.

- Follow the installation wizard with the default settings selected.

2. Verify installation

- Open a terminal/command line

- type `node -v`
  - You should see `V18.12.0` or similar appear.


### Package Installation

Installation can also be completed using a package manager.
- Chocolatey: Windows
- Homebrew: macOS
- https://nodejs.org/en/download/package-manager: linux

This approach can be more problematic if a problem occurs and requires more terminal/command line experience. If using WSL with windows we can also use the linux package managers depending on the distribution installed on the WSL.

### Node Version Manager

The last approach for installing node can be completed using Node Version Manager (nvm). This is only available using linux or macOS and can be completed follow the guide [here](https://github.com/nvm-sh/nvm).

Once installed you can simply type:

```
nvm install 18
nvm use 18
```

## Running the Javascript Application

To run the Javascript service using node & npm, follow these steps:

- Navigate to the root directory of your Javascript service project in the terminal/command line. For this repository the command would be:
  - `cd javascript`

1. Run the following command to install the services dependencies: `npm install`
2. Run the following command to start up the application: `npm start`
3. (optional) Run the following command to execute the unit tests: `npm test`

The app should now be available at: `http://localhost:4567`

Happy coding :) 