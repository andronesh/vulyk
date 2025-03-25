"use client";

import { SpecGroupEntity } from "@/utils/db/schema";

type Props = {
	group: SpecGroupEntity;
	isSelected: boolean;
	onClick: (group: SpecGroupEntity) => void;
	className?: string;
};

export default function GroupChip(props: Props) {
	return (
		<div
			className={`m-1 rounded px-2 pt-1 pb-1 ${props.className} ${
				props.isSelected
					? "bg-meadow-800"
					: "bg-military-500 hover:bg-meadow-600 hover:text-military-600 hover:cursor-pointer"
			} text-white duration-300`}
			onClick={() => props.onClick(props.group)}
		>
			{props.group.title}
		</div>
	);
}
