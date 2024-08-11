import "./style.scss";

type Props = {
	title?: string,
	color: string,
	onClick: () => void
}

const ColorButton = (props: Props) => {
	return (
		<button
			style={{ backgroundColor: `#${props.color}` }}
			onClick={() => props.onClick()}
		>
			{props.title}
		</button>
	);
};

export default ColorButton;
