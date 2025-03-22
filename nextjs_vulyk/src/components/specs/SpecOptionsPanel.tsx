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
					<div className="rounded-sm bg-red-700 p-2 text-lg text-white">
						Не вдалось завантажити варіанти характеристик з бази данних
					</div>
				)}
				{isFetching && <Spinner />}

				{!isFetching &&
					!isError &&
					options?.map((option) => (
						<div
							key={option.id}
							className={`bg-military-500 hover:bg-meadow-600 hover:text-military-600 m-1 flex flex-col rounded-sm px-2 pt-2 pb-1 text-white duration-300 hover:cursor-pointer hover:font-bold`}
						>
							{option.title}
							{option.description && <span className="truncate text-sm italic">{props.spec.description}</span>}
						</div>
					))}
			</div>
			<SpecOptionCreateForm spec={props.spec} />
		</div>
	);
}
