import React from "react";
import { ColorButton } from "../ColorButton/index";
import { Hits } from "../Hits/index";
import { ColorSlots } from "../ColorSlots/index";
import {
	blendColors,
	subtractColorArrays,
	type Palette,
} from "../../utils/ColorUtils";
import "./styles.scss";

type Props = {
	currentColor: string;
	targetColor: string;
	difficulty: number;
	solution: string[];
	palette: Palette;
	hits: string[];
	misses: string[];
	lives: number;
	onChangeCurrentColor: (color: string) => void;
	onHit: (color: string) => void;
	onMiss: (color: string) => void;
};

export function Stage(props: Props) {
	function handleAddColor(color: string) {
		const remaining = subtractColorArrays(
			props.solution,
			props.hits
		);

		if (remaining.includes(color)) {
			const newCurrentColor = blendColors([
				...props.hits,
				color,
			]);
			props.onChangeCurrentColor(newCurrentColor);
			props.onHit(color);
		} else {
			props.onMiss(color);
		}
	}

	return (
		<main className="stage">
			<h1 className="nes-title">Match the color</h1>

			<ColorSlots
				targetColor={props.targetColor}
				currentColor={props.currentColor}
			/>

			<Hits difficulty={props.difficulty} hits={props.hits} />

			<div className="pallete-buttons">
				{Object.values(props.palette).map(
					(color, index) => (
						<ColorButton
							key={index}
							color={color}
							onClick={() =>
								handleAddColor(
									color
								)
							}
						/>
					)
				)}
			</div>

			<h3>Lives: {props.lives}/3</h3>
		</main>
	);
}
