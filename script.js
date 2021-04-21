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
/* nowe testy */
function scroll_to(){
    $('html, body').animate({
        scrollTop: $('#screen').offset().top
    },1000);
}
function show_image(src) {
    var img = document.createElement("img");
    img.src = src;
    document.getElementById('screen').appendChild(img);
}



function loadInt(){
    /*var divGameBoard= $('.game-board');*/
    
    /*var divPlayer1=$('.player1');
    var divPlayer2=$('.player2');
    var divPodzial=$('#podzial');
    var divPkt= $('.pkt');
    var divStartGame=$('.title4');

    divGameBoard.empty();
    divPlayer1.empty();
    divPlayer2.empty();
    divPodzial.empty();
    divPkt.empty();
    divStartGame.empty();
    divStartGame.css('background-color','#282828');

    divStartGame.off("mouseover mouseout");*/
    var divScreen=$('#pomoc');
    divScreen.text('Interstellar is a 2014 epic science fiction film directed, co-written and co-produced by Christopher Nolan. It stars Matthew McConaughey, Anne Hathaway, Jessica Chastain, Bill Irwin, Ellen Burstyn, Matt Damon, and Michael Caine. Set in a dystopian future where humanity is struggling to survive, the film follows a group of astronauts who travel through a wormhole near Saturn in search of a new home for humanity.Interstellar premiered on October 26, 2014, in Los Angeles, California. The film had a worldwide gross of over $677 million, making it the tenth-highest-grossing film of 2014. Interstellar received positive reviews for its screenplay, direction, themes, visual effects, musical score, acting, and ambition. At the 87th Academy Awards, the film won the Academy Award for Best Visual Effects, and was nominated for Best Original Score, Best Sound Mixing, Best Sound Editing and Best Production Design.');

   scroll_to();
}



function loadOnce(){
    var divGameBoard= $('.game-board');
    
    var divPlayer1=$('.player1');
    var divPlayer2=$('.player2');
    var divPodzial=$('#podzial');
    var divPkt= $('.pkt');
    var divStartGame=$('.title4');

    divGameBoard.empty();
    divPlayer1.empty();
    divPlayer2.empty();
    divPodzial.empty();
    divPkt.empty();
    divStartGame.empty();
    divStartGame.css('background-color','#282828');

    divStartGame.off("mouseover mouseout");

    var divScreen=$('#pomoc');
    divScreen.text('Once Upon a Time in Hollywood is a comedy-drama film written and directed by Quentin Tarantino. It features a cast led by Leonardo DiCaprio, Brad Pitt, and Margot Robbie. Set in 1969 Los Angeles, the film follows an actor and his stunt double as they navigate the changing film industry, and features "multiple storylines in a modern fairy tale tribute to the final moments of Hollywoods golden age. Once Upon a Time in Hollywood premiered on May 21, 2019. The film has grossed $374 million worldwide and received praise from critics for Tarantinos screenplay and direction, acting, cinematography, costume design, production values, and soundtrack. The film was chosen by the American Film Institute and the National Board of Review as one of the top ten films of the year. It received 10 nominations at the 92nd Academy Awards, including Best Picture, and won Best Supporting Actor (Pitt) and Best Production Design. It also won Best Motion Picture – Musical or Comedy at the 77th Golden Globe Awards.');

    scroll_to();
}

function loadMatrix(){
    var divGameBoard= $('.game-board');
    
    var divPlayer1=$('.player1');
    var divPlayer2=$('.player2');
    var divPodzial=$('#podzial');
    var divPkt= $('.pkt');
    var divStartGame=$('.title4');

    divGameBoard.empty();
    divPlayer1.empty();
    divPlayer2.empty();
    divPodzial.empty();
    divPkt.empty();
    divStartGame.empty();
    divStartGame.css('background-color','#282828');

    divStartGame.off("mouseover mouseout");

    var divScreen=$('#pomoc');
    divScreen.text('The Matrix is a 1999 science fiction action film written and directed by the Wachowskis. It stars Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving, and Joe Pantoliano. It depicts a dystopian future in which humanity is unknowingly trapped inside a simulated reality, the Matrix, created by intelligent machines to distract humans while using their bodies as an energy source. When computer programmer Thomas Anderson, under the hacker alias "Neo", uncovers the truth, he "is drawn into a rebellion against the machines" along with other people who have been freed from the Matrix. The Matrix was on March 31, 1999, and grossed over $460 million worldwide. It won four Academy Awards, as well as other accolades, including BAFTA Awards and Saturn Awards. The Matrix was praised for its innovative visual effects, action sequences, cinematography and entertainment value. The film is considered to be among the best science fiction films of all time.');

    scroll_to();
}

function loadAvatar()
{

    var divScreen=$('#pomoc');
    divScreen.text('Avatar is a 2009 American epic science fiction film directed, written, produced, and co-edited by James Cameron and stars Sam Worthington, Zoe Saldana, Stephen Lang, Michelle Rodriguez, and Sigourney Weaver. The film is set in the mid-22nd century when humans are colonizing Pandora, a lush habitable moon of a gas giant in the Alpha Centauri star system, in order to mine the mineral unobtanium, a room-temperature superconductor. The expansion of the mining colony threatens the continued existence of a local tribe of Navi – a humanoid species indigenous to Pandora. Avatar premiered in London on December 10, 2009, with critics highly praising its groundbreaking visual effects. During its theatrical run, the film broke several box office records and became the highest-grossing film at the time, surpassing Camerons Titanic, which had held those records for twelve years. Avatar remained the highest-grossing film worldwide for nearly a decade, before being overtaken by Avengers: Endgame in 2019. To this day, Avatar remains the second highest-grossing movie of all time when adjusted for inflation after Gone with the Wind with a total of more than $3 billion. It also became the first film to gross more than $2 billion. Avatar was nominated for nine Academy Awards, including Best Picture and Best Director, and won three, for Best Art Direction, Best Cinematography and Best Visual Effects.');

   scroll_to();
}
