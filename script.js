function Komputer()
{
var origBoard;
const Gracz = 'O';
const Bot = 'X';
//mozliwe kombinacje
const winCombos = 
[
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();
CurrentPlayer();

function CurrentPlayer()
{
	let status = document.querySelector('.status');
        status.innerText = `Grasz kolkiem`;
}

function startGame() 
{
	document.querySelector(".wynik").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function turnClick(square) 
{
	if (typeof origBoard[square.target.id] == 'number') 
	{
		turn(square.target.id, Gracz)
		if (!checkWin(origBoard, Gracz) && !checkTie()) turn(bestSpot(), Bot);
	}
}

function turn(squareId, player) 
{
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player) 
{
	let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) {
		if (win.every(elem => plays.indexOf(elem) > -1)) 
		{
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) 
{
	for (let index of winCombos[gameWon.index]) 
	{
		document.getElementById(index).style.backgroundColor =
			gameWon.player == Gracz ? "blue" : "red";
	}
	for (var i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == Gracz ? "Wygrales!" : "Przegrales :(");
}

function declareWinner(who) 
{
	document.querySelector(".wynik").style.display = "block";
	document.querySelector(".wynik .text").innerText = who;
}

function emptySquares() 
{
	return origBoard.filter(s => typeof s == 'number');
}

function bestSpot() 
{
	return minimax(origBoard, Bot).index;
}

function checkTie() 
{
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "lightblue";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Remis!")
		return true;
	}
	return false;
}

function minimax(newBoard, player) 
{
	var availSpots = emptySquares();

	if (checkWin(newBoard, Gracz)) 
	{
		return {score: -10};
	} else if (checkWin(newBoard, Bot)) 
	{
		return {score: 10};
	} else if (availSpots.length === 0) 
	{
		return {score: 0};
	}
	var moves = [];
	for (var i = 0; i < availSpots.length; i++) 
	{
		var move = {};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == Bot) 
		{
			var result = minimax(newBoard, Gracz);
			move.score = result.score;
		} else {
			var result = minimax(newBoard, Bot);
			move.score = result.score;
		}

		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if(player === Bot) 
	{
		var bestScore = -10000;
		for(var i = 0; i < moves.length; i++) 
		{
			if (moves[i].score > bestScore) 
			{
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	} else {
		var bestScore = 10000;
		for(var i = 0; i < moves.length; i++) 
		{
			if (moves[i].score < bestScore) 
			{
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}

	return moves[bestMove];
}
}
function Multi()
{

var origBoard;
const PLAYER1 = 'O';
const PLAYER2 = 'X';
let round =1;
let kolej=2;
let finish=false;
const winCombos = [
	//kombinacje poziome
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	//kombinacje pionowe
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	//kombinacje na ukos
	[0, 4, 8],
	[6, 4, 2]
]

const cells = document.querySelectorAll('.cell');
startGame();
CurrentPlayer();

function startGame()
 {
	document.querySelector(".wynik").style.display = "none";
	origBoard = Array.from(Array(9).keys());
	for (var i = 0; i < cells.length; i++) 
	{
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}
}

function CurrentPlayer() 
{
	if(finish==false)
	{
    let status = document.querySelector('.status');
    if((kolej%2)!=0){
        status.innerText = `Biezacy gracz: kolko`;
    } else
    {
        status.innerText = `Biezacy gracz: krzyzyk`;
    }
	kolej++;
}
}

function turnClick(square) 
{
	if(finish==false)
	{
		if(typeof origBoard[square.target.id]=='number')
		{
	CurrentPlayer();
	if(round%2==0)
	{
	turn(square.target.id, PLAYER1)
	}
	else
	{
		turn(square.target.id,PLAYER2)
	}
		}
	round++;
}
}
function turn(squareId, player) 
{
	origBoard[squareId] = player;
	document.getElementById(squareId).innerText = player;
	let gameWon = checkWin(origBoard, player)
	if (gameWon) gameOver(gameWon)
	let koniec = checkTie()
	if(koniec) gameOver(checkTie)
	
}

function checkWin(board, player) 
{
	let plays = board.reduce((a, e, i) => 
		(e === player) ? a.concat(i) : a, []);
	let gameWon = null;
	for (let [index, win] of winCombos.entries()) 
	{
		if (win.every(elem => plays.indexOf(elem) > -1)) 
		{
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon) 
{
	for (let index of winCombos[gameWon.index])
		{
		document.getElementById(index).style.backgroundColor =
			gameWon.player == PLAYER1 ? "lightblue" : "red";
			finish=true;
	}
	for (var i = 0; i < cells.length; i++) 
	{
		cells[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player == PLAYER1 ? "Wygrywa kolko!" : "Wygrywa krzyzyk!");

}
function declareWinner(who) 
{
	document.querySelector(".wynik").style.display = "block";
	document.querySelector(".wynik .text").innerText = who;
}
function emptySquares() 
{
	return origBoard.filter(s => typeof s == 'number');
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "red";
			cells[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Remis!")
		return true;
	}
	return false;
}
}