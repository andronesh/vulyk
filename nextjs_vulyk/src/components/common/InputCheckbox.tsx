type Props = {
	label: string;
	name: string;
	value: boolean;
	disabled?: boolean;
	required?: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
};

export default function InputCheckbox(props: Props) {
	return (
		<div className={`flex flex-row items-center ${props.className}`}>
			<input
				checked={props.value}
				id={props.name}
				type="checkbox"
				className="border-meadow-600 bg-military-300 text-meadow-600 focus:outline-meadow-700 focus:ring-meadow-500 dark:border-military-300 dark:bg-military-300 dark:focus:ring-meadow-500 m-1 h-4 w-4 rounded-sm focus:outline"
				onChange={props.onChange}
			/>
			<label htmlFor={props.name} className="dark:text-foreground ms-2">
				{props.label}
			</label>
		</div>
	);
}
