type Props = {
	title: string;
	onClick: (event: any) => void;
	className?: string;
};

export default function ButtonGhost(props: Props) {
	return (
		<div className={props.className}>
			<button
				className="flex rounded px-4 py-2 font-bold duration-300 hover:bg-meadow-600 hover:text-military-600 dark:text-white"
				onClick={props.onClick}
			>
				{props.title}
			</button>
		</div>
	);
}
