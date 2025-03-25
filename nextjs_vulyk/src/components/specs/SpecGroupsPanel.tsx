"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import SpecGroupCreateForm from "./SpecGroupCreateForm";
import { useAllSpecGroupsQuery } from "@/logic/queries/useAllSpecGroupsQuery";
import Spinner from "../common/Spinner";
import GroupChip from "./GroupChip";
import { SpecGroupEntity } from "@/utils/db/schema";

type Props = {
	className?: string;
};

export default function SpecGroupsPanel(props: Props) {
	const [isCreateGroupFormVisible, setCreateGroupFormVisible] = useState(false);
	const [selectedGroup, setSelectedGroup] = useState<SpecGroupEntity | undefined>(undefined);
	const { data: allGroups, isFetching, isError } = useAllSpecGroupsQuery();

	return (
		<div className={`${props.className}`}>
			<div className="flex flex-row flex-wrap items-center justify-between">
				<GroupChip
					key={0}
					group={{ id: 0, title: "всі х-ки", comment: null }}
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
				<Button variant="ghost" size="sm" onClick={() => setCreateGroupFormVisible(true)}>
					+ групу
				</Button>
				{isFetching && <Spinner className="m-1 h-12 p-1" />}
				{isError && (
					<div className="rounded-sm bg-red-700 p-2 text-lg text-white">
						Не вдалось завантажити список груп з бази данних
					</div>
				)}
			</div>
			<Dialog open={isCreateGroupFormVisible} onOpenChange={() => setCreateGroupFormVisible(false)}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Нова група характеристик</DialogTitle>
					</DialogHeader>
					<SpecGroupCreateForm
						onSaved={() => setCreateGroupFormVisible(false)}
						onCanceled={() => setCreateGroupFormVisible(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
