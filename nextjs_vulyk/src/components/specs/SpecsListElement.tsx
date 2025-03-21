"use client";

import { SpecEntity } from "@/utils/db/schema";

type Props = {
	spec: SpecEntity;
	isSelected: boolean;
	onClick: (spec: SpecEntity) => void;
	className?: string;
};

export default function SpecsListElement(props: Props) {
	return (
		<div
			className={`m-1 flex flex-col rounded px-2 pb-1 pt-2 ${props.className} ${
				props.isSelected ? "bg-meadow-800" : "bg-military-500"
			} text-white duration-300 hover:cursor-pointer hover:bg-meadow-600 hover:font-bold hover:text-military-600`}
			onClick={() => props.onClick(props.spec)}
		>
			{props.spec.title}
			{props.spec.description && <span className="truncate text-sm italic">{props.spec.description}</span>}
		</div>
	);
}
