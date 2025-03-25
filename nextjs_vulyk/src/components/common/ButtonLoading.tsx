type Props = {
	title: string;
	loadingTitle?: string;
	isLoading?: boolean;
	onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	className?: string;
};

export default function ButtonLoading(props: Props) {
	return (
		<div className={props.className}>
			<button
				className="bg-meadow-800 hover:bg-meadow-600 hover:text-military-600 disabled:bg-meadow-900 flex rounded-sm px-4 py-2 font-bold text-white duration-200 hover:cursor-pointer disabled:text-gray-400"
				disabled={props.isLoading}
				onClick={props.onClick}
			>
				{props.isLoading ? props.loadingTitle : props.title}
			</button>
		</div>
	);
}
