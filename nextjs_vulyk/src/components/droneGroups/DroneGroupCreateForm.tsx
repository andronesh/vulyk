"use client";

import { ChangeEvent, useState } from "react";
import InputTextLabeled from "../common/InputTextLabeled";
import ButtonLoading from "../common/ButtonLoading";
import ButtonGhost from "../common/ButtonGhost";
import { DroneGroupFormData } from "@/utils/db/schema";
import InputTextareaLabeled from "../common/InputTextareaLabeled";
import { useQueryClient } from "@tanstack/react-query";
import { ModelWithOptionsDto } from "@/logic/repo/modelsRepo";
import { useAllModelsWithOptionsQuery } from "@/logic/queries/useAllModelsWithOptionsQuery";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import ModelCreateButton from "../models/ModelCreateButton";
import MoswlDetailsCompact from "../models/ModelDetailsCompact";
import { insertDroneGroup } from "@/logic/repo/droneGroupsRepo";

type Props = {
	className?: string;
	onCanceled: () => void;
	onCreated: () => void;
};

export default function DroneGroupCreateForm(props: Props) {
	const queryClient = useQueryClient();
	const [selectedModel, setSelectedModel] = useState<ModelWithOptionsDto>();
	const { data: allModels } = useAllModelsWithOptionsQuery();

	const [newGroupData, setNewGroupData] = useState<DroneGroupFormData>({
		amount: 0,
		optionsShort: "",
		modelId: 0,
		comment: "",
	});

	const cleanFormData = () => {
		setNewGroupData((prevData) => {
			return {
				...prevData,
				title: "",
				amount: 0,
				optionsShort: "",
				modelId: 0,
				comment: "",
			};
		});
	};

	const updateTextValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setNewGroupData((prevData) => {
			return { ...prevData, [event.target.name]: event.target.value };
		});
	};

	const updateNumericValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setNewGroupData((prevData) => {
			return { ...prevData, [event.target.name]: Number(event.target.value) };
		});
	};

	const updateSelectedModel = (modelId: string) => {
		const model = allModels?.find((element) => element.id?.toString() === modelId);
		if (model) {
			setSelectedModel(model);
		}
	};

	const handleCancel = () => {
		cleanFormData();
		props.onCanceled();
	};

	const createDroneGroup = () => {
		if (selectedModel === undefined) {
			window.alert("Модель вибирати обов'язково"); // TODO show it as message inside form
			return;
		}
		if (newGroupData.amount < 1) {
			window.alert("Кількість має бути більше нуля"); // TODO show it as message inside form
			return;
		}
		if (newGroupData.modelId < 0) {
			window.alert(`Поле "назва" не має бути пустим`); // TODO show it as message inside form
			return;
		}

		insertDroneGroup(
			selectedModel.id,
			newGroupData.amount,
			[],
			newGroupData.optionsShort ? newGroupData.optionsShort : undefined,
			newGroupData.comment ? newGroupData.comment : undefined,
		)
			.then(() => {
				cleanFormData();
				queryClient.invalidateQueries({ queryKey: ["droneGroups"] });
				props.onCreated();
			})
			.catch((error) => {
				console.error(`Failed to insert group`, error);
				window.alert(error);
			});
	};

	return (
		<div className="flex flex-col">
			<div className="flex flex-col space-y-2">
				<Select onValueChange={updateSelectedModel}>
					<SelectTrigger className="w-full pl-2">
						<SelectValue placeholder="вибрати модель" />
					</SelectTrigger>
					<SelectContent>
						{allModels?.map((model) => (
							<SelectItem key={model.id} value={model.id!.toString()}>
								<MoswlDetailsCompact model={model} />
							</SelectItem>
						))}

						<ModelCreateButton />
					</SelectContent>
				</Select>
				<InputTextLabeled
					label="кількість"
					name="amount"
					value={newGroupData.amount ? newGroupData.amount.toString() : ""}
					placeholder="20"
					onChange={updateNumericValue}
				/>
				<InputTextareaLabeled
					label={"коментар"}
					name={"comment"}
					value={newGroupData.comment}
					onChange={updateTextValue}
				/>
			</div>
			<div className="mt-3 flex flex-row justify-between">
				<ButtonGhost title="скасувати" onClick={handleCancel} />
				<ButtonLoading title="зберегти" onClick={createDroneGroup} />
			</div>
		</div>
	);
}
