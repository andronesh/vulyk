type Props = {
	title: string;
	loadingTitle?: string;
	isLoading?: boolean;
	onClick: (event: any) => void;
	className?: string;
};

export default function ButtonLoading(props: Props) {
	return (
		<div className={props.className}>
			<button
				className="flex rounded bg-meadow-800 px-4 py-2 font-bold text-white hover:bg-meadow-600 hover:text-military-600 disabled:bg-meadow-900 disabled:text-gray-400 duration-200"
				disabled={props.isLoading}
				onClick={props.onClick}
			>
				{props.isLoading ? props.loadingTitle : props.title}
			</button>
		</div>
	);
}
