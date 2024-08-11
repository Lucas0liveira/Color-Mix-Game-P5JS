import tinycolor from "tinycolor2";

export type Palette = {
	magenta: string;
	yellow: string;
	cyan: string;
	white: string;
	black: string;
};

const paletteOptions: Palette[] = [
	{
		magenta: tinycolor({ r: 255, g: 0, b: 255 }).toHex(), // magenta
		yellow: tinycolor({ r: 255, g: 255, b: 0 }).toHex(), // yellow
		cyan: tinycolor({ r: 0, g: 255, b: 255 }).toHex(), // cyan
		white: tinycolor({ r: 255, g: 255, b: 255 }).toHex(), // white
		black: tinycolor({ r: 0, g: 0, b: 0 }).toHex(), // black
	},
	{
		magenta: tinycolor({ r: 255, g: 165, b: 0 }).toHex(), //  orange
		yellow: tinycolor({ r: 0, g: 128, b: 128 }).toHex(), //  teal
		cyan: tinycolor({ r: 255, g: 105, b: 180 }).toHex(), //  pink
		white: tinycolor({ r: 255, g: 255, b: 240 }).toHex(), // ivory
		black: tinycolor({ r: 54, g: 69, b: 79 }).toHex(), // charcoal
	},
	{
		magenta: tinycolor({ r: 255, g: 215, b: 0 }).toHex(), //  gold
		yellow: tinycolor({ r: 127, g: 255, b: 212 }).toHex(), //  aqua
		cyan: tinycolor({ r: 255, g: 0, b: 255 }).toHex(), // Pure fuchsia (vibrant magenta)
		white: tinycolor({ r: 255, g: 250, b: 250 }).toHex(), // snow
		black: tinycolor({ r: 112, g: 128, b: 144 }).toHex(), // gray
	},
	{
		magenta: tinycolor({ r: 255, g: 191, b: 0 }).toHex(), //  amber
		yellow: tinycolor({ r: 135, g: 206, b: 235 }).toHex(), // Light sky blue (shifted cyan)
		cyan: tinycolor({ r: 255, g: 0, b: 127 }).toHex(), //  rose
		white: tinycolor({ r: 245, g: 245, b: 220 }).toHex(), // beige
		black: tinycolor({ r: 53, g: 56, b: 57 }).toHex(), // onyx
	},
	{
		magenta: tinycolor({ r: 255, g: 247, b: 0 }).toHex(), //  lemon
		yellow: tinycolor({ r: 189, g: 252, b: 201 }).toHex(), //  mint
		cyan: tinycolor({ r: 238, g: 130, b: 238 }).toHex(), //  violet
		white: tinycolor({ r: 250, g: 240, b: 230 }).toHex(), // linen
		black: tinycolor({ r: 85, g: 93, b: 80 }).toHex(), // ebony
	},
	{
		magenta: tinycolor({ r: 200, g: 0, b: 255 }).toHex(), //  lemon
		yellow: tinycolor({ r: 50, g: 255, b: 120 }).toHex(), //  mint
		cyan: tinycolor({ r: 255, g: 125, b: 0 }).toHex(), //  violet
		white: tinycolor({ r: 255, g: 255, b: 255 }).toHex(), // linen
		black: tinycolor({ r: 0, g: 0, b: 0 }).toHex(), // ebony
	},
];

export const getPalette = (index?: number) => {
	if (typeof index === "number") {
		return paletteOptions[index];
	}
	return paletteOptions[
		Math.floor(Math.random() * paletteOptions.length)
	];
};

export function getRandomColorFromPalette(palette: Palette): string {
	const base = Object.keys(palette) as (keyof Palette)[];
	const selected = base[Math.floor(Math.random() * base.length)];
	return palette[selected];
}

export function subtractColorArrays(
	array1: string[],
	array2: string[]
): string[] {
	const frequencyMap: Record<string, number> = array2.reduce(
		(map, val) => {
			map[val] = (map[val] || 0) + 1;
			return map;
		},
		{} as Record<string, number>
	);

	return array1.filter((val) => {
		if (frequencyMap[val]) {
			frequencyMap[val]--;
			return false;
		}
		return true;
	});
}

export function blendColors(colors: string[]) {
	let r = 0;
	let g = 0;
	let b = 0;

	colors.map((color) => {
		const color_rgb = tinycolor(color)?.toRgb();
		r += (1 / colors.length) * color_rgb.r;
		g += (1 / colors.length) * color_rgb.g;
		b += (1 / colors.length) * color_rgb.b;
	});
	return tinycolor({ r, g, b }).toHex();
}
