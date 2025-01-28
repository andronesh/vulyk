"use client";

import { MarkerEntity } from "@/utils/db/schema";

type Props = {
	marker: MarkerEntity;
	isSelected: boolean;
	onClick: (marker: MarkerEntity) => void;
	className?: string;
};

export default function MarkerChip(props: Props) {
	return (
		<div
			className={`m-1 rounded px-2 pt-2 pb-1 ${props.className} ${
				props.isSelected ? "bg-meadow-800" : "bg-military-500"
			} text-white hover:cursor-pointer hover:font-bold hover:bg-meadow-600 hover:text-military-600 duration-300`}
			onClick={() => props.onClick(props.marker)}
		>
			{props.marker.title}:{props.marker.lastNumber}
		</div>
	);
}
