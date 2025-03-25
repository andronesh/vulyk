import { ChangeEvent } from "react";

type Props = {
	label: string;
	name: string;
	value: string | undefined | null;
	placeholder?: string;
	required?: boolean;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	className?: string;
};

export default function InputTextareaLabeled(props: Props) {
	return (
		<div className={`${props.className}`}>
			<label htmlFor={props.name} className="mb-1 block text-left text-sm font-medium text-white">
				{props.label}
			</label>
			<textarea
				name={props.name}
				id={props.name}
				value={props.value ? props.value : undefined}
				rows={3}
				onChange={props.onChange}
				className="border-military-500 bg-military-300 text-foreground focus:border-meadow-700 focus:outline-meadow-700 focus:ring-meadow-700 block w-full rounded-lg border p-2 text-sm placeholder-gray-400 focus:outline"
				placeholder={props.placeholder}
				required={props.required}
			/>
		</div>
	);
}
