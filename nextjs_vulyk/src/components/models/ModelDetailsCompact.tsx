"use client";

import { ModelWithOptionsDto } from "@/logic/repo/modelsRepo";

type Props = {
	model: ModelWithOptionsDto;
	className?: string;
};

export default function MoswlDetailsCompact(props: Props) {
	return (
		<div className={`flex w-full flex-col rounded text-white duration-300 ${props.className}`}>
			<div className="flex w-full items-center justify-between">
				<b>{props.model.title}</b>
				<span className={`bg-military-100 ml-2 rounded px-1 text-sm duration-200`}>
					{props.model.optionsShort}
				</span>
			</div>
			{props.model.comment && <div className="italic">{props.model.comment}</div>}
		</div>
	);
}
