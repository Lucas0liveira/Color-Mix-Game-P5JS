import tinycolor from "tinycolor2";

export const BaseColors = {
  magenta: tinycolor({ r: 255, g: 0, b: 255 }),
  yellow: tinycolor({ r: 255, g: 255, b: 0 }),
  cyan: tinycolor({ r: 0, g: 255, b: 255 }),
  white: tinycolor({ r: 255, g: 255, b: 255 }),
  black: tinycolor({ r: 0, g: 0, b: 0 }),
};

export function get_random_color() {
  const base = Object.keys(BaseColors);
  const selected = base[Math.floor(Math.random() * base.length)];
  return BaseColors[selected];
}
