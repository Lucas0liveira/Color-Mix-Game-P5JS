import { useState, useEffect } from "react";
import ColorButton from "./components/ColorButton/index";
import Hits from "./components/Hits/index";
import {
	type Palette,
	getPalette,
	getRandomColorFromPalette,
	blendColors,
	subtractColorArrays,
} from "./utils/ColorUtils";
import "./base.scss";

const DIFFICULTY = 5;
const STARTING_LIVES = 3

function App() {
	const [palette, setPalette] = useState<Palette>(getPalette())
	const [solution, setSolution] = useState<string[]>([]);
	const [target_color, setTargetColor] = useState("");
	const [mix_color, setMixColor] = useState("");
	const [hits, setHits] = useState<string[]>([]);
	const [misses, setMisses] = useState<string[]>([]);
	const [lives, setLives] = useState(STARTING_LIVES);

	useEffect(() => {
		generateSolution()
	}, []);

	function generateSolution() {
		if (solution && solution.length) return;

		let i = 0;
		const new_solution: string[] = [];

		while (i < DIFFICULTY) {
			const random_color = getRandomColorFromPalette(palette);
			new_solution.push(random_color);
			i++;
		}

		const target = blendColors(new_solution);

		setSolution(new_solution);
		setTargetColor(target);
	}

	function handleAddColor(color: string) {
		const remaining = subtractColorArrays(solution, hits);

		if (remaining.includes(color)) {
			setHits((hits) => [...hits, color]);
			setMixColor(() => blendColors([...hits, color]));
		} else {
			setMisses((misses) => [...misses, color]);
			setLives((lives) => lives - 1);
		}
	}

	function checkVictory() {
		if (!solution) return;
		const completed = hits.length === 5;
		const correct = solution.every((s) => hits.includes(s));
		const alive = lives > 0;

		if (completed && correct && alive) {
			winGame();
		}
	}

	function checkDefeat() {
		if (lives === 0) loseGame();
	}

	function winGame() {
		setTimeout(() => {
			alert("Acertou!");
			resetGame();
		}, 1000);
	}

	function loseGame() {
		setTimeout(() => {
			alert("Morreu!");
			resetGame();
		}, 1000);
	}

	function resetGame() {
		window.location.reload();
	}

	useEffect(() => checkVictory(), [hits]);
	useEffect(() => checkDefeat(), [misses]);

	return (
		<div className="container">
			<header>
				<h2>Palletle</h2>
			</header>

			<main>
				<h1 className="nes-title">Match the color</h1>
				<section className="colors">
					<div
						className="color target"
						style={{ backgroundColor: `#${target_color}` }}
					/>
					<div
						className={`color current ${
							mix_color ? "" : "waiting"
						}`}
						style={{ backgroundColor: `#${mix_color}` }}
					/>
				</section>

				<Hits difficulty={DIFFICULTY} hits={hits} />

				<div className="pallete-buttons">
					{Object.values(palette).map((color, index) => (
						<ColorButton
							key={index}
							color={color}
							onClick={() => handleAddColor(color)}
						/>
					))}
				</div>

				<h3>Lives: {lives}/3</h3>
			</main>

			<footer>
				<p>Footer Content Goes Here</p>
			</footer>
		</div>
	);
}

export default App;
