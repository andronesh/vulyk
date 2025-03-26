"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ModelCreateForm from "./ModelCreateForm";
import { Button } from "../ui/button";
import { useAllModelsWithOptionsQuery } from "@/logic/queries/useAllModelsWithOptionsQuery";
import ModelsListElement from "./ModelsListElement";
import ModelDetailsPanel from "./ModelDetailsPanel";
import { ModelWithOptionsDto } from "@/logic/repo/modelsRepo";

type Props = {
	className?: string;
};

export default function ModelsPanel(props: Props) {
	const [isModelCreateFormVisible, setModelCreateFormVisible] = useState(false);
	const [selectedModel, setSelectedModel] = useState<ModelWithOptionsDto>();
	const { data: allModels } = useAllModelsWithOptionsQuery();

	return (
		<div className="flex space-x-2">
			<div className={`flex h-fit w-72 flex-col justify-around space-y-2 ${props.className}`}>
				<Button variant="ghost" size="sm" onClick={() => setModelCreateFormVisible(true)}>
					створити модель
				</Button>
				{allModels?.map((model) => (
					<ModelsListElement
						key={model.id}
						model={model}
						onClick={setSelectedModel}
						isSelected={selectedModel?.id === model.id}
					/>
				))}
				<Dialog open={isModelCreateFormVisible} onOpenChange={() => setModelCreateFormVisible(false)}>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>Нова характеристика</DialogTitle>
						</DialogHeader>
						<ModelCreateForm
							onCreated={() => setModelCreateFormVisible(false)}
							onCanceled={() => setModelCreateFormVisible(false)}
						/>
					</DialogContent>
				</Dialog>
			</div>
			{selectedModel && <ModelDetailsPanel model={selectedModel} className="w-72" />}
		</div>
	);
}
