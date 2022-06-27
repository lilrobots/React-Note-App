import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Die from "./Components/Die";
import { nanoid } from "nanoid";

export default function App() {
	const [currentScore, setCurrentScore] = useState({
		rolls: 0,
		time: 0,
	});

	const [topScore, setTopScore] = useState(
		JSON.parse(localStorage.getItem("topScore")) || {
			rolls: 0,
			time: 0,
		}
	);

	const [timerOngoing, setTimerOngoing] = useState(null);
	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);

	function generateNewDie() {
		return {
			value: Math.floor(Math.random() * 6 + 1),
			isHeld: false,
			id: nanoid(),
		};
	}

	function allNewDice() {
		const diceArray = [];
		for (let i = 0; i < 10; i++) {
			diceArray.push(generateNewDie());
		}
		return diceArray;
	}

	const diceElements = dice.map((die) => (
		<Die
			key={die.id}
			value={die.value}
			isHeld={die.isHeld}
			id={die.id}
			holdDice={holdDice}
		/>
	));

	function rollDice() {
		setDice((oldDice) =>
			oldDice.map((die) => {
				return die.isHeld ? die : generateNewDie();
			})
		);
		setCurrentScore((oldScore) => ({
			...oldScore,
			rolls: oldScore.rolls + 1,
		}));
	}

	function holdDice(id) {
		setDice((prevDice) =>
			prevDice.map((die) => ({
				...die,
				isHeld: die.id === id ? !die.isHeld : die.isHeld,
			}))
		);
	}

	function tick() {
		if (!tenzies) {
			setCurrentScore((prevScore) => ({
				...prevScore,
				time: prevScore.time + 1,
			}));
		}
	}

	useEffect(() => {
		let checkDie = dice[0].value;
		for (let die of dice) {
			if (die.value === checkDie && die.isHeld) {
			} else return;
		}
		setTenzies(true);
	}, [dice]);

	function newGame() {
		setTenzies(false);
		setDice(allNewDice());
		setCurrentScore({
			rolls: 0,
			time: 0,
		});
	}

	// Start timer and update top score
	useEffect(() => {
		if (!timerOngoing) {
			setTimerOngoing(setInterval(tick, 1000));
		}
		if (tenzies) {
			clearInterval(timerOngoing);
			setTimerOngoing(null);
			setTopScore((prevTopScore) => ({
				time:
					prevTopScore.time === 0 || prevTopScore.time > currentScore.time
						? currentScore.time
						: prevTopScore.time,
				rolls:
					prevTopScore.rolls === 0 || prevTopScore.rolls > currentScore.rolls
						? currentScore.rolls
						: prevTopScore.rolls,
			}));

			localStorage.setItem("topScore", JSON.stringify(topScore));
		}
	}, [tenzies]);


	return (
		<main>
			{tenzies ? <Confetti /> : ""}
			<h1>Tenzies</h1>
			<p className="rules">
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls.
			</p>
			<div className="dice-container">{diceElements}</div>
			<button onClick={tenzies ? newGame : rollDice} className="roll">
				{tenzies ? "New Game" : "Roll"}
			</button>
			<div className="score">
				<div className="roll-score">
					<p>Current rolls: {currentScore.rolls}</p>
					<p>Top score: {topScore.rolls}</p>
				</div>
				<div className="time-score">
					<p>Current time: {currentScore.time}</p>
					<p>Top time: {topScore.time}</p>
				</div>
			</div>
		</main>
	);
}
