"use client";

import { ModelWithOptionsDto } from "@/logic/repo/modelsRepo";

type Props = {
	model: ModelWithOptionsDto;
	isSelected: boolean;
	onClick: (model: ModelWithOptionsDto) => void;
	className?: string;
};

export default function ModelsListElement(props: Props) {
	return (
		<div
			className={`group flex flex-col rounded p-1 px-2 text-white duration-300 ${props.className} ${
				props.isSelected
					? "bg-meadow-800"
					: "bg-military-500 hover:bg-meadow-600 hover:text-military-600 hover:cursor-pointer"
			}`}
			onClick={() => props.onClick(props.model)}
		>
			<div className="flex items-center justify-between">
				<b>{props.model.title}</b>
				<span
					className={`rounded px-1 text-sm duration-300 ${
						props.isSelected
							? "bg-meadow-800"
							: "bg-military-300 group-hover:bg-meadow-400 group-hover:text-military-600 group-hover:cursor-pointer"
					}`}
				>
					{props.model.optionsShort}
				</span>
			</div>
			{props.model.comment && <div className="italic">{props.model.comment}</div>}
		</div>
	);
}
