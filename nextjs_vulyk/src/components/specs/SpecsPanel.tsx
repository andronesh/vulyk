"use client";

import { SpecEntity } from "@/utils/db/schema";
import { useState } from "react";
import Spinner from "../common/Spinner";
import { useAllSpecsQuery } from "@/logic/queries/useAllSpecsQuery";
import SpecsPanelHeader from "./SpecsPanelHeader";
import SpecsListElement from "./SpecsListElement";

type Props = {
	onSpecSelected: (spec: SpecEntity) => void;
	className?: string;
};

export default function SpecsPanel(props: Props) {
	const { data: specs, isFetching, isError } = useAllSpecsQuery();
	const [selectedSpec, setSelectedSpec] = useState<SpecEntity | undefined>();

	const selectSpec = (spec: SpecEntity) => {
		setSelectedSpec(spec);
		props.onSpecSelected(spec);
	};

	return (
		<div className={`${props.className}`}>
			<SpecsPanelHeader />
			<div className="flex flex-col">
				{isError && (
					<div className="rounded-sm bg-red-700 p-2 text-lg text-white">
						Не вдалось завантажити список характеристик з бази данних
					</div>
				)}
				{isFetching && <Spinner />}
				{!isFetching &&
					!isError &&
					specs?.map((spec) => (
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
