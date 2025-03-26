"use client";

import { SpecEntity, SpecGroupModel } from "@/utils/db/schema";
import { useEffect, useState } from "react";
import Spinner from "../common/Spinner";
import { useAllSpecsQuery } from "@/logic/queries/useAllSpecsQuery";
import SpecsPanelHeader from "./SpecsPanelHeader";
import SpecsListElement from "./SpecsListElement";
import SpecGroupsPanel from "./SpecGroupsPanel";

type Props = {
	onSpecSelected: (spec: SpecEntity) => void;
	className?: string;
};

export default function SpecsPanel(props: Props) {
	const { data: specs, isFetching, isError } = useAllSpecsQuery();
	const [selectedSpec, setSelectedSpec] = useState<SpecEntity | undefined>();
	const [selectedGroup, setSelectedGroup] = useState<SpecGroupModel | undefined>();
	const [shownSpecs, setShownSpecs] = useState<SpecEntity[]>([]);

	useEffect(() => {
		if (specs) {
			if (selectedGroup) {
				setShownSpecs(specs.filter((spec) => selectedGroup.specIds.includes(spec.id!)));
			} else {
				setShownSpecs(specs);
			}
		}
	}, [selectedGroup, specs]);

	const selectSpec = (spec: SpecEntity) => {
		setSelectedSpec(spec);
		props.onSpecSelected(spec);
	};

	return (
		<div className={`${props.className}`}>
			<SpecsPanelHeader />
			<SpecGroupsPanel onGroupChanged={setSelectedGroup} />
			<div className="flex flex-col">
				{isError && (
					<div className="rounded-sm bg-red-700 p-2 text-lg text-white">
						Не вдалось завантажити список характеристик з бази данних
					</div>
				)}
				{isFetching && <Spinner />}
				{!isFetching &&
					!isError &&
					shownSpecs?.map((spec) => (
						<SpecsListElement
							key={spec.id}
							spec={spec}
							isSelected={selectedSpec?.id === spec.id}
							onClick={selectSpec}
						/>
					))}
			</div>
		</div>
	);
}
