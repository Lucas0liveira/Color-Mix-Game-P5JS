// Todo: add history, add better buttons, add reset, add winning msg

let target_color;
let your_color;
let buttons = [];
let blend = [];
let button_colors = ["magenta", "cyan", "yellow", "white", "black"];
let max_mix_colors = 10;
let precision = 5;
let solution = [];

function setup() {
  createCanvas(400, 450);

  generate_target();
  your_color = color(255);

  // Create buttons
  let buttonWidth = width / button_colors.length;
  for (let i = 0; i < button_colors.length; i++) {
    buttons.push(
      new Button(
        i * buttonWidth,
        height - 50,
        buttonWidth,
        50,
        color(button_colors[i])
      )
    );
  }
}

function draw() {
  background(220);
  noStroke();

  // Draw top color
  fill(your_color);
  rect(0, 0, width, 200);

  // Draw target color
  fill(target_color);
  rect(0, height - 250, width, 200);

  // Draw buttons
  for (let button of buttons) {
    button.show();
  }
}

function mouseClicked() {
  for (let button of buttons) {
    if (button.contains(mouseX, mouseY)) {
      if (your_color != button.color) {
        blend.push(button.color);
        your_color = blend_colors(blend);
        let distance = calc_distance_between_colors(your_color, target_color);
        if (distance < precision) {
          console.info("Aeeee");
        }
      }
      break;
    }
  }
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
class Button {
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  show() {
    fill(this.color);
    rect(this.x, this.y, this.w, this.h);
  }

  contains(px, py) {
    return (
      px > this.x && px < this.x + this.w && py > this.y && py < this.y + this.h
    );
  }
}
