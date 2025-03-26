"use client";

import { ModelWithOptionsDto } from "@/logic/repo/modelsRepo";

type Props = {
	model: ModelWithOptionsDto;
	className?: string;
};

export default function ModelDetailsPanel(props: Props) {
	return (
		<div className={`flex flex-col p-1 px-2 ${props.className}`}>
			<div className="flex justify-between">
				<b>{props.model.title}</b>
				<span>{props.model.optionsShort}</span>
			</div>
			<i>{props.model.comment}</i>
			<div className={`bg-military-500 flex flex-col rounded p-1 px-2 ${props.className}`}>
				{props.model.options.map((option) => (
					<div key={option.id}>
						{option.title}
						{option.comment && <i>{"  " + option.comment}</i>}
					</div>
				))}
			</div>
		</div>
	);
}
