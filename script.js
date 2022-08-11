const ROCK = "ROCK", PAPER = "PAPER", SCISSOR = "SCISSOR";
main();
function main()
{
    alert("Let's start the game");
    game(displayOutputWithAlert,consoleLog,getPlayerChoiceThroughAlert);
}


function consoleLog(message)
{
    console.log(message);
}

function displayOutputWithAlert(output)
{
    alert(output)
}

function game(displayOutput,log, getPlayerChoice){
    let compScore =0,playerScore = 0;
    for(i=0;i<5;i++)
    {
        let playerChoice = getPlayerChoice(log);
        let computerChoice = getComputerChoice();
        let roundResult = playRound(playerChoice,computerChoice,log);
        if(!!roundResult === false)continue;
        if(roundResult.includes("Won"))playerScore++;
        else if(roundResult.includes("Lost"))compScore++;
        displayOutput(roundResult);
    }
    let firstPart, secondPart;
    if(playerScore>compScore){
        firstPart = "You are WINNER. ";
    }
    else if(playerScore<compScore){
        firstPart = "You lost the game. ";
    }
    else firstPart = "Match Drawn"
    secondPart = `Your score ${playerScore}, Computer's score ${compScore}`;
    displayOutput(firstPart + secondPart);
}
function getComputerChoice()
{
    let choiceInt = getRandomInteger(3);
    switch(choiceInt)
    {
        case 0:
            return "ROCK"
            break;
        case 1:
            return "PAPER"
            break;
        case 2:
            return "SCISSOR"
            break;
    }
}
function getPlayerChoiceThroughAlert(log)
{
    let input = prompt("ROCK, PAPER or SCISSOR?");
    log(`Input is ${input} of type ${typeof(input)}`);
    return formatInput(input);
}
function formatInput(input)
{
    let tempInp = input.toUpperCase();
    tempInp = tempInp.trim();
    return tempInp;
}
function getRandomInteger(maxExclusive)
{
    return Math.floor(Math.random() * maxExclusive);
}

function playRound(playerChoice,computerChoice,log)
{
    if(!isPlayerInputValid(playerChoice))
    {
        log("Incorrect Input. Try again");
        return;
    }
    if(playerChoice.localeCompare(computerChoice) == 0)
    {
        return `Match DRAWN. Both you and computer picked ${computerChoice}`;
    }
    const WIN = "You Won! ", LOOSE = "You Lost! ";
    let partOne,partTwo;
    let winner,looser;
    if(playerChoice.localeCompare(ROCK) == 0)
    {
        if(computerChoice.localeCompare(PAPER))
        {
            partOne = LOOSE;
            winner = PAPER;
            looser = ROCK;
        }
        else{
            partOne = WIN;
            winner = ROCK;
            looser = SCISSOR;
        }
    }
    else if(playerChoice.localeCompare(PAPER) == 0)
    {
        if(computerChoice.localeCompare(ROCK))
        {
            partOne = WIN;
            winner = PAPER;
            looser = ROCK;
        }
        else{
            partOne = LOOSE;
            winner = SCISSOR;
            looser = PAPER;
        }
    }
    else if(playerChoice.localeCompare(SCISSOR) === 0)
    {
        if(computerChoice.localeCompare(PAPER))
        {
            partOne = WIN;
            winner = SCISSOR;
            looser = PAPER;
        }
        else{
            partOne = LOOSE;
            winner = ROCK;
            looser = SCISSOR;
        }
    }
    partTwo = `${winner} beats ${looser}.`;
    return partOne + partTwo;
}

function isPlayerInputValid(input)
{
    let formattedInp = formatInput(input);
    let inputValidity = 
        formattedInp.localeCompare(ROCK) === 0 || 
        formattedInp.localeCompare(PAPER) === 0 ||
        formattedInp.localeCompare(SCISSOR) === 0
    ;
    return inputValidity;
}