import { useState, useEffect } from "react";
import tinycolor from "tinycolor2";
import ColorButton from "./components/ColorButton";
import { BaseColors, get_random_color } from "./utils/ColorUtils";
import "./base.scss";

function App() {
  const [targetColor, setTargetColor] = useState("");
  const [mixColor, setMixColor] = useState("");
  const [attempt, setAttempt] = useState([]);
  let solution = [];
  // nao permitir adicao de cores erradas, so as certas

  function generate_solution(difficulty = 5) {
    if (solution.length) return;
    let i = 0;

    while (i < difficulty) {
      const color = get_random_color();
      solution.push(color);
      i++;
    }
  }

  function generate_color_from_solution() {
    generate_solution();
    return blend_colors(solution);
  }

  function add_color_to_mix(color) {
    const incremented_attempt = [...attempt, color];
    setAttempt(incremented_attempt);
    setMixColor(blend_colors(incremented_attempt));
  }

  function blend_colors(colors) {
    let red = 0;
    let green = 0;
    let blue = 0;

    console.log(colors);

    colors.map((color) => {
      red += (1 / colors.length) * color._r;
      green += (1 / colors.length) * color._g;
      blue += (1 / colors.length) * color._b;
    });

    return tinycolor({ r: red, g: green, b: blue });
  }

  function win_game() {
    alert("Acertou!");
    reset_game();
  }

  function reset_game() {
    setMixColor("");
    setAttempt([]);
    solution = [];
    setTargetColor(generate_color_from_solution());
  }

  useEffect(() => {
    setTargetColor(generate_color_from_solution());
    console.log(solution.map((s) => s.toName()));
  }, []);

  useEffect(() => {
    if (
      targetColor &&
      mixColor &&
      targetColor._r == mixColor._r &&
      targetColor._g == mixColor._g &&
      targetColor._b == mixColor._b
    ) {
      win_game();
    }
  }, [mixColor]);

  return (
    <div className="container">
      <header>
        <h2>Palletle</h2>
      </header>

      <main>
        <h1>Match the color</h1>
        <div className="colors">
          <div
            className="color target"
            style={{ backgroundColor: targetColor }}
          ></div>
          <div
            className={`color current ${mixColor ? "" : "waiting"}`}
            style={{ backgroundColor: mixColor }}
          ></div>
        </div>
        <div className="pallete-buttons">
          <ColorButton
            color={BaseColors.magenta}
            onClick={() => add_color_to_mix(BaseColors.magenta)}
          />
          <ColorButton
            color={BaseColors.yellow}
            onClick={() => add_color_to_mix(BaseColors.yellow)}
          />
          <ColorButton
            color={BaseColors.cyan}
            onClick={() => add_color_to_mix(BaseColors.cyan)}
          />
          <ColorButton
            color={BaseColors.white}
            onClick={() => add_color_to_mix(BaseColors.white)}
          />
          <ColorButton
            color={BaseColors.black}
            onClick={() => add_color_to_mix(BaseColors.black)}
          />
        </div>
      </main>

      <footer>
        <p>Footer Content Goes Here</p>
      </footer>
    </div>
  );
}

export default App;
