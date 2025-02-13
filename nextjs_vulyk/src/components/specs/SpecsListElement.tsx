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
			className={`flex flex-col m-1 rounded px-2 pt-2 pb-1 ${props.className} ${
				props.isSelected ? "bg-meadow-800" : "bg-military-500"
			} text-white hover:cursor-pointer hover:font-bold hover:bg-meadow-600 hover:text-military-600 duration-300`}
			onClick={() => props.onClick(props.spec)}
		>
			{props.spec.title}
			{props.spec.description && <span className="italic text-sm truncate">{props.spec.description}</span>}
		</div>
	);
}
