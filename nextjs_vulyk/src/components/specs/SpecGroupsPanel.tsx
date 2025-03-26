"use client";

import { useEffect, useState } from "react";

import { useAllSpecGroupsQuery } from "@/logic/queries/useAllSpecGroupsQuery";
import Spinner from "../common/Spinner";
import GroupChip from "./GroupChip";
import { SpecGroupModel } from "@/utils/db/schema";

type Props = {
	onGroupChanged: (group: SpecGroupModel | undefined) => void;
	className?: string;
};

export default function SpecGroupsPanel(props: Props) {
	const [selectedGroup, setSelectedGroup] = useState<SpecGroupModel | undefined>(undefined);
	const { data: allGroups, isFetching, isError } = useAllSpecGroupsQuery();

	useEffect(() => {
		props.onGroupChanged(selectedGroup);
	}, [selectedGroup]);

	return (
		<div className={`${props.className}`}>
			<div className="flex flex-row flex-wrap items-center justify-between">
				<GroupChip
					key={0}
					group={{ id: 0, title: "всі х-ки", comment: null, specIds: [] }}
					isSelected={selectedGroup === undefined}
					onClick={() => setSelectedGroup(undefined)}
				/>
				{!isFetching &&
					!isError &&
					allGroups?.map((group) => (
						<GroupChip
							key={group.id}
							group={group}
							isSelected={selectedGroup?.id === group.id}
							onClick={setSelectedGroup}
						/>
					))}
				{isFetching && <Spinner className="m-1 h-12 p-1" />}
				{isError && (
					<div className="rounded-sm bg-red-700 p-2 text-lg text-white">
						Не вдалось завантажити список груп з бази данних
					</div>
				)}
			</div>
		</div>
	);
}
