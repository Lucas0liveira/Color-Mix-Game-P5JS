import { useState, useEffect } from "react";
import tinycolor from "tinycolor2";
import ColorButton from "./components/ColorButton";
import Hits from "./components/Hits";
import {
  BaseColors,
  getRandomColor,
  subtractColorArrays,
} from "./utils/ColorUtils";
import "./base.scss";

function App() {
  const DIFFICULTY = 5;

  const [solution, setSolution] = useState([]);
  const [target_color, setTargetColor] = useState("");
  const [mix_color, setMixColor] = useState("");
  const [hits, setHits] = useState([]);
  const [misses, setMisses] = useState([]);
  const [lives, setLives] = useState(3);

  function generateSolution() {
    if (solution && solution.length) return;
    console.log("generating solution...");

    let i = 0;
    const new_solution = [];

    while (i < DIFFICULTY) {
      const random_color = getRandomColor();
      new_solution.push(random_color);
      i++;
    }

    const target = blendColors(new_solution);

    setSolution(() => new_solution);
    setTargetColor(() => target);
  }

  function blendColors(colors) {
    let r = 0;
    let g = 0;
    let b = 0;

    colors.map((color) => {
      const color_rgb = tinycolor(color);
      r += (1 / colors.length) * color_rgb._r;
      g += (1 / colors.length) * color_rgb._g;
      b += (1 / colors.length) * color_rgb._b;
    });
    return tinycolor({ r, g, b }).toHex();
  }

  function handleAddColor(color) {
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
    window.location.reload(0);
  }

  useEffect(() => generateSolution(), []);
  useEffect(() => checkVictory(), [hits]);
  useEffect(() => checkDefeat(), [misses]);

  return (
    <div className="container">
      <header>
        <h2>Palletle</h2>
      </header>

      <main>
        <h1>Match the color</h1>
        <section className="colors">
          <div
            className="color target"
            style={{ backgroundColor: `#${target_color}` }}
          />
          <div
            className={`color current ${mix_color ? "" : "waiting"}`}
            style={{ backgroundColor: `#${mix_color}` }}
          />
        </section>

        <Hits difficulty={DIFFICULTY} hits={hits} />

        <div className="pallete-buttons">
          {Object.values(BaseColors).map((color, index) => (
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
