import "./styles.scss";

type Props = {
	title?: string;
	color: string;
	onClick: () => void;
};

export function ColorButton(props: Props) {
	return (
		<button
			style={{ backgroundColor: `#${props.color}` }}
			onClick={() => props.onClick()}
		>
			{props.title}
		</button>
	);
}
