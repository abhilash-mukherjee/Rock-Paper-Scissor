const Elements = Object.freeze({
    ROCK: Symbol("ROCK"),
    PAPER: Symbol("PAPER"),
    SCISSOR: Symbol("SCISSOR")
} )
const Winner = Object.freeze({
        PLAYER: Symbol("PLAYER"),
        COMPUTER: Symbol("COMPUTER"),
        NONE: Symbol("NONE")
})
alert("Let's start the game");
const btns = document.querySelectorAll('button');
const result = document.querySelector('#result');
let playerScore= 0 , computerScore = 0;

btns.forEach(btn => btn.addEventListener('click', onButtonClick));

function onButtonClick(e)
{
    let playerChoice = getPlayerChoiceFromButton(e);
    let computerChoice = getComputerChoice();
    let winner = playRound(playerChoice,computerChoice);
    let roundResultString = '', gameResultString = '';
    if(winner === Winner.PLAYER) playerScore++;
    else if(winner === Winner.COMPUTER) computerScore++;
    roundResultString = getRoundResultString(playerChoice,computerChoice,winner);
    if(playerScore === 5)
    {
        gameResultString = `You WON. Your score = 5. Computer score = ${computerScore}`;
        computerScore = 0;
        playerScore = 0;
    }
    else if (computerScore === 5)
    {
        gameResultString = `You LOST. Computer's score = 5. Your score = ${playerScore}`;
        computerScore = 0;
        playerScore = 0;
    }
    else gameResultString = '';
    divLog(`${roundResultString}. ${gameResultString}`);
}

function getRoundResultString(playerChoiceElement,computerChoiceElement,winner)
{
    let playerChoice = getElementValue(playerChoiceElement);
    let computerChoice = getElementValue(computerChoiceElement);
    if(winner === Winner.PLAYER) return `You WON!!! ${playerChoice} beats ${computerChoice}`;
    if(winner === Winner.COMPUTER) return `You LOST!!! ${computerChoice} beats ${playerChoice}`;
    else return `Match DRAWN!!! Both chose ${playerChoice}`
}

function getPlayerChoiceFromButton(e)
{
    let choiceString = e.target.getAttribute('id').toUpperCase();
    if(choiceString.localeCompare('ROCK') == 0)return Elements.ROCK;
    if(choiceString.localeCompare('PAPER') == 0)return Elements.PAPER;
    if(choiceString.localeCompare('SCISSOR') == 0)return Elements.SCISSOR;
    else return undefined;
}

function getElementValue(element)
{
    if(element === Elements.ROCK) return "ROCK";
    if(element === Elements.PAPER) return "PAPER";
    if(element === Elements.SCISSOR) return "SCISSOR";
    return "NONE";
}
function getWinnertValue(element)
{
    if(element === Winner.PLAYER) return "PLAYER";
    if(element === Winner.COMPUTER) return "COMPUTER";
    return "NONE";
}

function divLog(message)
{
    result.textContent = message;
}

function getComputerChoice()
{
    let choiceInt = getRandomInteger(3);
    switch (choiceInt)
    {
        case 0:
            return Elements.ROCK;
        case 1:
            return Elements.PAPER;
        case 2:
            return Elements.SCISSOR;
    }
}

function getRandomInteger(maxExclusive)
{
    return Math.floor(Math.random() * maxExclusive);
}

function playRound(playerChoice,computerChoice)
{
    if(playerChoice === computerChoice) return Winner.NONE;
    switch(playerChoice)
    {
        case Elements.ROCK:
            if (computerChoice === Elements.PAPER) return Winner.COMPUTER;
            else return Winner.PLAYER;
        case Elements.PAPER:
            if (computerChoice === Elements.SCISSOR) return Winner.COMPUTER;
            else return Winner.PLAYER;
        case Elements.SCISSOR:
            if (computerChoice === Elements.ROCK) return Winner.COMPUTER;
            else return Winner.PLAYER;

    }
}
