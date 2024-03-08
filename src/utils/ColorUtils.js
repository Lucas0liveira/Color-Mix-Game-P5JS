import tinycolor from "tinycolor2";

export const BaseColors = {
  magenta: tinycolor({ r: 255, g: 0, b: 255 }).toHex(),
  yellow: tinycolor({ r: 255, g: 255, b: 0 }).toHex(),
  cyan: tinycolor({ r: 0, g: 255, b: 255 }).toHex(),
  white: tinycolor({ r: 255, g: 255, b: 255 }).toHex(),
  black: tinycolor({ r: 0, g: 0, b: 0 }).toHex(),
};

export function getRandomColor() {
  const base = Object.keys(BaseColors);
  const selected = base[Math.floor(Math.random() * base.length)];
  return BaseColors[selected];
}

export function subtractColorArrays(array1, array2) {
  const frequencyMap = array2.reduce((map, val) => {
    map[val] = (map[val] || 0) + 1;
    return map;
  }, {});

  return array1.filter((val) => {
    if (frequencyMap[val]) {
      frequencyMap[val]--;
      return false;
    }
    return true;
  });
}
