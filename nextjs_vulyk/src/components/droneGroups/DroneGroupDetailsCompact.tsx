"use client";

import { DroneGroupWithModelDto } from "@/logic/repo/droneGroupsRepo";

type Props = {
	group: DroneGroupWithModelDto;
	className?: string;
};

export default function DroneGroupDetailsCompact(props: Props) {
	return (
		<div className={`flex w-full flex-col rounded p-1 text-white duration-300 ${props.className}`}>
			<div className="flex w-full items-center">
				<div className="pr-3 pl-2 text-3xl">{props.group.amount}</div>
				<div className="flex flex-col">
					<b>{props.group.model.title}</b>
					<span className={`text-sm`}>{props.group.model.optionsShort}</span>
				</div>
			</div>

			{props.group.comment && <div className="px-2 italic">{props.group.comment}</div>}
		</div>
	);
}
