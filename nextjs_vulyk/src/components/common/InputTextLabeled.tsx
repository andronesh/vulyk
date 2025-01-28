type Props = {
	label: string;
	name: string;
	value: string | undefined;
	placeholder: string;
	disabled?: boolean;
	required?: boolean;
	onChange: (event: any) => void;
	className?: string;
};

export default function InputTextLabeled(props: Props) {
	return (
		<div className={props.className}>
			<label htmlFor={props.name} className="mb-1 mr-3 block text-left text-sm font-medium text-foreground">
				{props.label}
			</label>
			<input
				type="text"
				name={props.name}
				id={props.name}
				value={props.value}
				onChange={props.onChange}
				className="block w-full rounded-lg border border-military-500 bg-military-300 p-2 text-sm text-foreground placeholder-gray-400 focus:border-meadow-700 focus:outline focus:outline-meadow-700 focus:ring-meadow-700"
				placeholder={props.placeholder}
				disabled={props.disabled}
				required={props.required}
			/>
		</div>
	);
}
