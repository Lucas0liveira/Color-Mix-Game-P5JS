import React from "react";
import "./styles.scss";

type Props = {
	targetColor: string;
	currentColor: string;
};

export function ColorSlots(props: Props) {
	return (
		<section className="colors">
			<div
				className="color target"
				style={{
					backgroundColor: `#${props.targetColor}`,
				}}
			/>
			<div
				className={`color current ${
					props.currentColor ? "" : "waiting"
				}`}
				style={{
					backgroundColor: `#${props.currentColor}`,
				}}
			/>
		</section>
	);
}
