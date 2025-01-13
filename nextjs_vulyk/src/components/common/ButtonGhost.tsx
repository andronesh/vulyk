type Props = {
	title: string;
	onClick: (event: any) => void;
	className?: string;
};

export default function ButtonGhost(props: Props) {
	return (
		<div className={props.className}>
			<button
				className="flex rounded px-4 py-2 font-bold dark:text-white hover:bg-gray-700 "
				onClick={props.onClick}
			>
				{props.title}
			</button>
		</div>
	);
}
