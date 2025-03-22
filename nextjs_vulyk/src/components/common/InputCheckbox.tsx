type Props = {
	label: string;
	name: string;
	value: boolean;
	disabled?: boolean;
	required?: boolean;
	onChange: (event: any) => void;
	className?: string;
};

export default function InputCheckbox(props: Props) {
	return (
		<div className={`flex flex-row items-center ${props.className}`}>
			<input
				checked={props.value}
				id={props.name}
				type="checkbox"
				className="m-1 h-4 w-4 rounded-sm border-meadow-600 bg-military-300 text-meadow-600 focus:outline focus:outline-meadow-700 focus:ring-meadow-500 dark:border-military-300 dark:bg-military-300 dark:focus:ring-meadow-500"
				onChange={props.onChange}
			/>
			<label htmlFor={props.name} className="ms-2 dark:text-foreground">
				{props.label}
			</label>
		</div>
	);
}
