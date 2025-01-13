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
				props.isSelected ? "bg-blue-800" : "bg-gray-700"
			} text-white hover:cursor-pointer hover:font-bold hover:bg-blue-950`}
			onClick={() => props.onClick(props.marker)}
		>
			{props.marker.title}:{props.marker.lastNumber}
		</div>
	);
}
