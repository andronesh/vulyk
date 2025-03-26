import { ChangeEvent } from "react";

type Props = {
	label: string;
	name: string;
	value: string | undefined;
	placeholder: string;
	disabled?: boolean;
	required?: boolean;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	className?: string;
};

export default function InputTextLabeled(props: Props) {
	return (
		<div className={props.className}>
			<label htmlFor={props.name} className="text-foreground mr-3 mb-1 block text-left text-sm font-medium">
				{props.label}
			</label>
			<input
				type="text"
				name={props.name}
				id={props.name}
				value={props.value}
				onChange={props.onChange}
				className="border-military-500 bg-military-300 text-foreground focus:border-meadow-700 focus:outline-meadow-700 focus:ring-meadow-700 block w-full rounded-lg border p-2 text-sm placeholder-gray-400 focus:outline"
				placeholder={props.placeholder}
				disabled={props.disabled}
				required={props.required}
			/>
		</div>
	);
}
