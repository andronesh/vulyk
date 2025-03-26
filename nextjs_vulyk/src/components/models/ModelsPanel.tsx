"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ModelCreateForm from "./ModelCreateForm";
import { Button } from "../ui/button";
import { useAllModelsWithOptionsQuery } from "@/logic/queries/useAllModelsWithOptionsQuery";

type Props = {
	className?: string;
};

export default function ModelsPanel(props: Props) {
	const [isModelCreateFormVisible, setModelCreateFormVisible] = useState(false);
	const { data: allModels } = useAllModelsWithOptionsQuery();

	return (
		<div className={`flex flex-col justify-around ${props.className}`}>
			<Button variant="ghost" size="sm" onClick={() => setModelCreateFormVisible(true)}>
				створити модель
			</Button>
			{allModels?.map((model) => (
				<div key={model.id} className="flex justify-between">
					<b>{model.title}</b>
					<span>{model.optionsShort}</span>
				</div>
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
	);
}
