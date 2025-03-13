"use client";

import { SpecEntity } from "@/utils/db/schema";
import Spinner from "../common/Spinner";
import { useSpecOptionsQuery } from "@/logic/queries/useSpecOptionsQuery";
import SpecOptionCreateForm from "./SpecOptionCreateForm";

type Props = {
	spec: SpecEntity;
	className?: string;
};

export default function SpecOptionsPanel(props: Props) {
	const { data: options, isFetching, isError } = useSpecOptionsQuery(props.spec.id!);

	return (
		<div className={`${props.className}`}>
			<h2>{props.spec.title} варіанти:</h2>
			<div className="flex flex-col">
				{isError && (
					<div className="text-white bg-red-700 text-lg p-2 rounded">
						Не вдалось завантажити варіанти характеристик з бази данних
					</div>
				)}
				{isFetching && <Spinner />}
				{!isFetching &&
					!isError &&
					options?.map((option) => (
						<div key={option.id}
							className={`flex flex-col m-1 rounded px-2 pt-2 pb-1 bg-military-500 text-white hover:cursor-pointer hover:font-bold hover:bg-meadow-600 hover:text-military-600 duration-300`}
						>
							{option.title}
							{option.description && <span className="italic text-sm truncate">{props.spec.description}</span>}
						</div>
					))}
			</div>
			<SpecOptionCreateForm spec={props.spec} />
		</div>
	);
}
