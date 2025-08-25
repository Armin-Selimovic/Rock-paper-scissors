let computer, auto_play_state = false;

const score = {
	win: 0,
	loss: 0,
	tie: 0
};

//playing with keyboard
document.body.addEventListener('keydown', (event)=> {
	if(event.key === 'q' && !auto_play_state)
		run_game("rock");
	else if(event.key === 'w' && !auto_play_state)
		run_game("paper");
	else if(event.key === 'e' && !auto_play_state)
		run_game("scissors");
	else if(event.key === 'r')
		reset_score();
	else if(event.key === 'a')
		auto_play();
})

document.querySelector(".reset_score_button").addEventListener('click', () => reset_score() );
document.querySelector(".auto_play_button").addEventListener('click', () => auto_play() );

document.getElementById("rock").onclick = () => {
	if(!auto_play_state)
		run_game("rock");
}

document.getElementById("paper").onclick = () => {
	if(!auto_play_state)
		run_game("paper");
}

document.getElementById("scissors").onclick = () => {
	if(!auto_play_state)
		run_game("scissors");
}

function auto_play() {
	if(auto_play_state === false)
	{
		document.getElementsByClassName('auto_play_button')[0].innerHTML = 'Loading...';
		auto_play_state = true;
		intervalID = setInterval(() => {
			random();
			let playerMove = computer;
			random();
			run_game(playerMove);

			if(document.getElementsByClassName('auto_play_button')[0].innerHTML === 'Loading...')
				document.getElementsByClassName('auto_play_button')[0].innerHTML = 'Stop auto play';

		}, 1000);
	}
	else
	{
		document.getElementsByClassName('auto_play_button')[0].innerHTML = 'Auto play';
		auto_play_state = false;
		clearInterval(intervalID);
	}
}

function run_game(input) {
	random();
	compare(input);
	change_output();
}

function reset_score() {
	score.loss = 0;
	score.tie = 0;
	score.win = 0;
	change_output();
	document.getElementById("state").innerHTML = "";
	document.getElementById("report").innerHTML = "";

	document.getElementsByClassName('auto_play_button')[0].innerHTML = 'Auto play';
	auto_play_state = false;
	clearInterval(intervalID);
}

function moveToImage(move) {
	if (move === "rock")
		return '<img src="rock-emoji.png" width="40">';
	else if (move === "paper")
		return '<img src="paper-emoji.png" width="40">';
	else
		return '<img src="scissors-emoji.png" width="40">';
}

function change_output() {
	document.getElementById("output").innerHTML = `Wins: ${score.win}, Loses: ${score.loss}, Ties: ${score.tie}`
}

function compare(input) {
	let message = `You picked ${input}. Computer picked ${computer}. `;
	let result;
	
	if(input === "rock")
	{
		if(computer === "paper")
		{
			//alert(message + "You lose.");
			document.getElementById("state").innerHTML = "You lose.";
			score.loss += 1;
		}
		else if(computer === "rock")
		{
			//alert(message + "Tie");
			document.getElementById("state").innerHTML = "Tie.";
			score.tie += 1;
		}
		else
		{
			//alert(message + "You win!");
			document.getElementById("state").innerHTML = "You win!";
			score.win += 1;
		}
	}
	else if(input === "paper")
	{
		if(computer === "paper")
		{
			//alert(message + "Tie");
			document.getElementById("state").innerHTML = "Tie.";
			score.tie += 1;
		}
		else if(computer === "rock")
		{
			//alert(message + "You win!");
			document.getElementById("state").innerHTML = "You win!";
			score.win += 1;
		}
		else
		{
			//alert(message + "You lose.");
			document.getElementById("state").innerHTML = "You lose.";
			score.loss += 1;
		}
	}
	else
	{
		if(computer === "paper")
		{
			//alert(message + "You win!");
			document.getElementById("state").innerHTML = "You win!";
			score.win += 1;
		}
		else if(computer === "rock")
		{
			//alert(message + "You lose.");
			document.getElementById("state").innerHTML = "You lose.";
			score.loss += 1;
		}
		else
		{
			//alert(message + "Tie");
			document.getElementById("state").innerHTML = "Tie.";
			score.tie += 1;
		}
	}

	document.getElementById("report").innerHTML = `You ${moveToImage(input)} vs. ${moveToImage(computer)} Computer`;
}

function random() {
	let random = Math.floor(Math.random() * 3) + 1;
	if(random === 1)
		computer = "rock";
	else if(random === 2)
		computer = "paper";
	else
		computer = "scissors";
}