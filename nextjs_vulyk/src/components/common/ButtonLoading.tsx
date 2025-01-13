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
				className="flex rounded bg-blue-700 px-4 py-2 font-bold text-white hover:bg-blue-600 disabled:bg-blue-900 disabled:text-gray-400 disabled:hover:bg-blue-900"
				disabled={props.isLoading}
				onClick={props.onClick}
			>
				{props.isLoading ? props.loadingTitle : props.title}
			</button>
		</div>
	);
}
