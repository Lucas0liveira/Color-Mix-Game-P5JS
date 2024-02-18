let targetColor;
let your_color;
let buttons = [];
let buttonColors = ["magenta", "cyan", "yellow", "white", "black"];
let max_mix_colors = 3;
let solution = [];

function setup() {
  createCanvas(400, 450);

  generate_target();
  your_color = color(255);

  // Create buttons
  let buttonWidth = width / buttonColors.length;
  for (let i = 0; i < buttonColors.length; i++) {
    buttons.push(
      new Button(
        i * buttonWidth,
        height - 50,
        buttonWidth,
        50,
        color(buttonColors[i])
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
  fill(targetColor);
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
        your_color = blendColors(your_color, button.color);
        let distance = dist(
          red(targetColor),
          green(targetColor),
          blue(targetColor),
          red(your_color),
          green(your_color),
          blue(your_color)
        );
        if (distance < 20) {
          console.info("Aeeee");
        }
      }
      break;
    }
  }
}

function generate_target() {
  let i = 0;
  let random_new_color = random(buttonColors);
  let generated_color = color(random_new_color);
  solution.push(random_new_color);

  while (i < max_mix_colors) {
    random_new_color = random(buttonColors);
    solution.push(random_new_color);
    generated_color = blendColors(generated_color, color(random_new_color));
    i++;
  }
  targetColor = generated_color;
  console.log(solution);
}

function blendColors(color1, color2) {
  let r = 0.5 * red(color1) + 0.5 * red(color2);
  let g = 0.5 * green(color1) + 0.5 * green(color2);
  let b = 0.5 * blue(color1) + 0.5 * blue(color2);
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
