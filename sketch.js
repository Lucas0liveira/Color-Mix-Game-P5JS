// Todo: add history, add better buttons, add reset, add winning msg

let target_color;
let your_color;
let buttons = [];
let blend = [];
let button_colors = ["magenta", "cyan", "yellow", "white", "black"];
let max_mix_colors = 5;
let precision = 10;
let solution = [];

function setup() {
  createCanvas(0, 0);

  generate_target();
  your_color = color(255);

  // Create buttons
  buttons.push(document.querySelector("#magenta"));
  buttons.push(document.querySelector("#yellow"));
  buttons.push(document.querySelector("#cyan"));
  buttons.push(document.querySelector("#white"));
  buttons.push(document.querySelector("#black"));

  buttons.forEach((button) => {
    button.style.backgroundColor = button.id;
    button.style.boxShadow;
    button.color = color(button.id);
    button.onclick = () => {
      if (your_color != button.color) {
        blend.push(button.color);
        your_color = blend_colors(blend);

        let distance = calc_distance_between_colors(your_color, target_color);
        if (distance < precision) {
          win_game();
        }
      }
    };
  });

  // Setup reset button
  const reset = document.querySelector("#reset");
  reset.onclick = () => reset_game();
}

function draw() {
  const target = document.querySelector(".target>.color");
  const current = document.querySelector(".current>.color");
  target.style.backgroundColor = target_color;
  current.style.backgroundColor = your_color;
}

function win_game() {
  const msg = document.querySelector("#win-msg");
  const text = "Nice Job!!!";

  for (let i = 0; i < text.length; i++) {
    const char = text.charAt(i);
    const style = "--i:" + (i + 1);
    let span = document.createElement("span");
    span.innerHTML = char === " " ? "🧑‍🎨" : char;
    span.style = style;
    msg.append(span);
  }
}

function reset_game() {
  const win_msg = document.querySelector("#win-msg");
  win_msg.innerHTML = "";

  generate_target();
  blend = [];
  solution = [];
  your_color = color(255, 255, 255);
}

function generate_target() {
  let i = 0;

  while (i < max_mix_colors) {
    random_new_color = random(button_colors);
    solution.push(random_new_color);
    i++;
  }
  target_color = blend_colors(solution);
  solution.sort();
  console.table(solution);
}

function calc_distance_between_colors(color1, color2) {
  return dist(
    red(color1),
    green(color1),
    blue(color1),
    red(color2),
    green(color2),
    blue(color2)
  );
}

function blend_colors(colors) {
  let r = 0,
    g = 0,
    b = 0;

  colors.map((color) => {
    r += (1 / colors.length) * red(color);
    g += (1 / colors.length) * green(color);
    b += (1 / colors.length) * blue(color);
  });

  return color(r, g, b);
}
