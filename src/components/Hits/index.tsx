/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./styles.scss";

type Props = {
	difficulty: number;
	hits: string[];
};

export function Hits(props: Props) {
	const [slots, setSlots] = useState<{ hit: boolean; color: string }[]>(
		[]
	);

	function calcSlots() {
		const new_slots = Array(props.difficulty);

		for (let i = 0; i < props.difficulty; i++) {
			if (props.hits[i]) {
				new_slots.push({
					hit: true,
					color: props.hits[i],
				});
			} else {
				new_slots.push({
					hit: false,
					color: "",
				});
			}
		}

		setSlots(new_slots);
	}

	useEffect(() => {
		calcSlots();
	}, [props.hits]);

	return (
		<section className="mix">
			{props.hits &&
				slots.map((slot, index) => {
					return (
						<div
							key={index}
							className={
								slot.hit
									? "filled"
									: "empty"
							}
							style={{
								backgroundColor:
									slot.hit
										? `#${slot.color}`
										: "",
							}}
						></div>
					);
				})}
		</section>
	);
}
