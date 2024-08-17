import { useState, useEffect } from "react";
import { Stage } from "./components/Stage/index";
import {
	type Palette,
	getPalette,
	getRandomColorFromPalette,
	blendColors,
} from "./utils/ColorUtils";
import "./base.scss";

const DIFFICULTY = 2;
const STARTING_LIVES = 3;

function App() {
	const [palette, setPalette] = useState<Palette>(getPalette());
	const [solution, setSolution] = useState<string[]>([]);
	const [currentColor, setCurrentColor] = useState("");
	const [targetColor, setTargetColor] = useState("");
	const [difficulty, setDifficulty] = useState(DIFFICULTY);
	const [hits, setHits] = useState<string[]>([]);
	const [misses, setMisses] = useState<string[]>([]);
	const [lives, setLives] = useState(STARTING_LIVES);

	const completed = hits.length === difficulty;

	useEffect(() => {
		generateSolution();
	}, []);

	function generateSolution(
		newDifficulty: number = difficulty,
		newPalette: Palette = palette
	) {
		let i = 0;
		const new_solution: string[] = [];

		while (i < newDifficulty) {
			const random_color =
				getRandomColorFromPalette(newPalette);
			new_solution.push(random_color);
			i++;
		}

		const target = blendColors(new_solution);

		setSolution(new_solution);
		setTargetColor(target);
	}

	function checkVictory() {
		const correct = solution.every((s) => hits.includes(s));
		const alive = lives > 0;

		if (completed && correct && alive) {
			nextStage();
		}
	}

	function checkDefeat() {
		if (lives === 0) {
			loseGame();
		}
	}

	useEffect(() => {
		checkVictory();
	}, [completed]);

	useEffect(() => {
		checkDefeat();
	}, [lives]);

	function loseGame() {
		setTimeout(() => {
			alert("Morreu!");
			resetGame();
		}, 1000);
	}

	function nextStage() {
		setTimeout(() => {
			const newDifficulty = difficulty + 1;
			const newPalette = getPalette();
			setCurrentColor("");
			setHits([]);
			setMisses([]);
			setPalette(newPalette);
			generateSolution(newDifficulty, newPalette);
			setDifficulty(newDifficulty);
		}, 1500);
	}

	function handleMiss(color: string) {
		setMisses((misses) => [...misses, color]);
		setLives((lives) => lives - 1);
	}

	function handleHit(color: string) {
		setHits((hits) => [...hits, color]);
	}

	function resetGame() {
		window.location.reload();
	}

	return (
		<div className="container">
			<header>
				<h2>Palletle</h2>
			</header>

			<Stage
				currentColor={currentColor}
				targetColor={targetColor}
				solution={solution}
				palette={palette}
				lives={lives}
				difficulty={difficulty}
				onChangeCurrentColor={setCurrentColor}
				hits={hits}
				misses={misses}
				onMiss={handleMiss}
				onHit={handleHit}
			/>

			<footer>
				<p>Footer Content Goes Here</p>
			</footer>
		</div>
	);
}

export default App;
