"use client";

import { useAllDroneGroupsQuery } from "@/logic/queries/useAllDroneGroupsQuery";
import Spinner from "../common/Spinner";
import DroneGroupDetailsCompact from "./DroneGroupDetailsCompact";

type Props = {
	className?: string;
};

export default function DroneGroupsList(props: Props) {
	const { data: allGroups, isFetching, isError } = useAllDroneGroupsQuery();

	return (
		<div className={`flex justify-around ${props.className}`}>
			<div className="flex w-full flex-col space-y-2">
				{isError && (
					<div className="rounded-sm bg-red-700 p-2 text-lg text-white">
						Не вдалось завантажити список груп з бази данних
					</div>
				)}
				{isFetching && <Spinner />}
				{!isFetching &&
					!isError &&
					allGroups?.map((group) => (
						<DroneGroupDetailsCompact key={group.id} group={group} className="bg-military-600 rounded" />
					))}
			</div>
		</div>
	);
}
