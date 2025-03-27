"use client";

import { useState } from "react";
import { useAllModelsWithOptionsQuery } from "@/logic/queries/useAllModelsWithOptionsQuery";
import ModelsListElement from "./ModelsListElement";
import ModelDetailsPanel from "./ModelDetailsPanel";
import { ModelWithOptionsDto } from "@/logic/repo/modelsRepo";
import ModelCreateButton from "./ModelCreateButton";

type Props = {
	className?: string;
};

export default function ModelsPanel(props: Props) {
	const [selectedModel, setSelectedModel] = useState<ModelWithOptionsDto>();
	const { data: allModels } = useAllModelsWithOptionsQuery();

	return (
		<div className="flex space-x-2">
			<div className={`flex h-fit w-72 flex-col justify-around space-y-2 ${props.className}`}>
				<ModelCreateButton />
				{allModels?.map((model) => (
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
