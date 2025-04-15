"use client";

import { useState } from "react";
import { useAllModelsWithOptionsQuery } from "@/logic/queries/useAllModelsWithOptionsQuery";
import ModelsListElement from "./ModelsListElement";
import ModelDetailsPanel from "./ModelDetailsPanel";
import { ModelWithOptionsDto } from "@/logic/repo/modelsRepo";
import ModelCreateButton from "./ModelCreateButton";
import Spinner from "../common/Spinner";

type Props = {
	className?: string;
};

export default function ModelsPanel(props: Props) {
	const [selectedModel, setSelectedModel] = useState<ModelWithOptionsDto>();
	const { data: allModels, isFetching, isError } = useAllModelsWithOptionsQuery();

	return (
		<div className="flex space-x-2">
			<div className={`flex h-fit w-72 flex-col justify-around space-y-2 ${props.className}`}>
				<ModelCreateButton />
				{isError && (
					<div className="rounded-sm bg-red-700 p-2 text-lg text-white">
						Не вдалось завантажити список груп з бази данних
					</div>
				)}
				{isFetching && <Spinner />}
				{!isFetching &&
					!isError &&
					allModels?.map((model) => (
						<ModelsListElement
							key={model.id}
							model={model}
							onClick={setSelectedModel}
							isSelected={selectedModel?.id === model.id}
						/>
					))}
			</div>
			{selectedModel && <ModelDetailsPanel model={selectedModel} className="w-72" />}
		</div>
	);
}
