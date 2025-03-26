"use client";

import { ChangeEvent, useEffect, useState } from "react";
import InputTextLabeled from "../common/InputTextLabeled";
import ButtonLoading from "../common/ButtonLoading";
import ButtonGhost from "../common/ButtonGhost";
import { ModelFormData, SpecEntity, SpecGroupModel, SpecOptionEntity } from "@/utils/db/schema";
import InputTextareaLabeled from "../common/InputTextareaLabeled";
import { useQueryClient } from "@tanstack/react-query";
import { useAllSpecsQuery } from "@/logic/queries/useAllSpecsQuery";
import SpecGroupsPanel from "../specs/SpecGroupsPanel";
import SpecOptionSelector from "../specs/SpecOptionSelector";
import { insertModel } from "@/logic/repo/modelsRepo";
import { ScrollArea } from "../ui/scroll-area";
import Spinner from "../common/Spinner";

type Props = {
	className?: string;
	onCanceled: () => void;
	onCreated: () => void;
};

export default function ModelCreateForm(props: Props) {
	const queryClient = useQueryClient();
	const { data: allSpecs, isFetching, isError } = useAllSpecsQuery();
	const [selectedGroup, setSelectedGroup] = useState<SpecGroupModel | undefined>();
	const [shownSpecs, setShownSpecs] = useState<SpecEntity[]>([]);
	const [selectedOptions, setSelectedOptions] = useState<Map<number, SpecOptionEntity>>(new Map());
	const [isSavingInProgress, setSavingInProgress] = useState(false);

	useEffect(() => {
		if (allSpecs) {
			if (selectedGroup) {
				setShownSpecs(allSpecs.filter((spec) => selectedGroup.specIds.includes(spec.id!)));
			} else {
				setShownSpecs(allSpecs);
			}
		}
	}, [selectedGroup, allSpecs]);

	const [newModelFormData, setNewModelFormData] = useState<ModelFormData>({
		title: "",
		comment: "",
	});

	const cleanFormData = () => {
		setNewModelFormData((prevData) => {
			return {
				...prevData,
				title: "",
				comment: "",
			};
		});
		props.onCanceled();
	};

	const updateTextValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setNewModelFormData((prevData) => {
			return { ...prevData, [event.target.name]: event.target.value };
		});
	};

	const selectOption = (option: SpecOptionEntity) => {
		setSelectedOptions(new Map(selectedOptions).set(option.specId, option));
	};

	const createModel = () => {
		if (!newModelFormData.title || newModelFormData.title.trim() === "") {
			window.alert(`Поле "назва" не має бути пустим`); // TODO show it as message inside form
			return;
		}
		setSavingInProgress(true);
		insertModel(
			[...selectedOptions.values().map((option) => option.id)],
			newModelFormData.title,
			newModelFormData.comment ? newModelFormData.comment : undefined,
		)
			.then(() => {
				cleanFormData();
				queryClient.invalidateQueries({ queryKey: ["models"] });
				props.onCreated();
			})
			.catch((error) => {
				console.error(`Failed to insert model`, error);
				window.alert(error);
			})
			.finally(() => setSavingInProgress(false));
	};

	return (
		<div className="dark:bg-military-600 flex flex-col rounded-sm">
			<SpecGroupsPanel onGroupChanged={setSelectedGroup} />
			{isFetching && <Spinner className="m-1 h-22 p-1" />}
			{isError && (
				<div className="rounded-sm bg-red-700 p-2 text-lg text-white">
					Не вдалось завантажити список характеристик з бази данних
				</div>
			)}
			<ScrollArea className="max-h-72">
				{shownSpecs.map((spec) => (
					<SpecOptionSelector key={spec.id} spec={spec} onOptionSelected={selectOption} />
				))}
			</ScrollArea>
			<div className="flex flex-col">
				<InputTextLabeled
					label="назва"
					name="title"
					value={newModelFormData.title}
					placeholder="max solo 2.5w"
					onChange={updateTextValue}
				/>
				<InputTextareaLabeled
					label={"коментар"}
					name={"comment"}
					value={newModelFormData.comment}
					onChange={updateTextValue}
					className="mt-3"
				/>
			</div>
			<div className="mt-3 flex flex-row justify-between">
				<ButtonGhost title="скасувати" onClick={cleanFormData} />
				<ButtonLoading
					title="зберегти"
					loadingTitle="записую в базу ..."
					isLoading={isSavingInProgress}
					onClick={createModel}
				/>
			</div>
		</div>
	);
}
