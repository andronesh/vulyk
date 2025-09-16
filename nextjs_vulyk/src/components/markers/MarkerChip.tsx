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
			} hover:bg-meadow-600 hover:text-military-600 text-white duration-300 hover:cursor-pointer hover:font-bold`}
			onClick={() => props.onClick(props.marker)}
		>
			{props.marker.slug}
			{props.marker.lastNumber !== null ? ":" + props.marker.lastNumber : ""}
		</div>
	);
}
