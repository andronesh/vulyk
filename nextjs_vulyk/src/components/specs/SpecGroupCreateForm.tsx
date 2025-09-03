"use client";

import { ChangeEvent, useEffect, useState } from "react";
import InputTextLabeled from "../common/InputTextLabeled";
import ButtonLoading from "../common/ButtonLoading";
import { SpecEntity, SpecGroupFormData } from "@/utils/db/schema";
import InputTextareaLabeled from "../common/InputTextareaLabeled";
import { useAllSpecsQuery } from "@/logic/queries/useAllSpecsQuery";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { insertGroup } from "@/logic/repo/specsRepo";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
	onSaved: () => void;
	onCanceled: () => void;
	className?: string;
};

type SpecGroupSpecsSelectorItemModel = {
	spec: SpecEntity;
	selected: boolean;
};

export default function SpecCreateForm(props: Props) {
	const queryClient = useQueryClient();
	const { data: specs } = useAllSpecsQuery();
	const [specSelectorItems, setSpecSelectorItems] = useState<SpecGroupSpecsSelectorItemModel[]>([]);

	const [newSpecGroupData, setNewSpecGroupData] = useState<SpecGroupFormData>({
		title: "",
		comment: "",
	});

	useEffect(() => {
		if (specs) {
			const items = specs?.map((spec) => {
				const isSelected = specSelectorItems.find((item) => item.spec.id === spec.id) !== undefined;
				return {
					spec: spec,
					selected: isSelected,
				};
			});
			setSpecSelectorItems(items);
		}
	}, [specs]); // eslint-disable-line react-hooks/exhaustive-deps

	const toggleSpecSelection = (specId: number, isSelected: boolean) => {
		setSpecSelectorItems((prevState) => {
			const newItems = [...prevState];
			const index = newItems.findIndex((item) => item.spec.id === specId);
			newItems[index].selected = isSelected;
			return newItems;
		});
	};

	const updateTextValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setNewSpecGroupData((prevData) => {
			return { ...prevData, [event.target.name]: event.target.value };
		});
	};

	const createGroup = () => {
		if (!newSpecGroupData.title || newSpecGroupData.title.trim() === "") {
			window.alert(`Поле "назва" не має бути пустим`); // TODO show it as message inside form
			return;
		}
		insertGroup(
			specSelectorItems.filter((item) => item.selected).map((item) => item.spec.id!),
			newSpecGroupData.title,
			newSpecGroupData.comment ? newSpecGroupData.comment : undefined,
		)
			.then(() => {
				queryClient.invalidateQueries({ queryKey: ["spec_groups"] });
			})
			.catch((error) => {
				console.error("Failed to insert spec group: " + JSON.stringify(newSpecGroupData), error);
				window.alert(error);
			});
		props.onSaved();
	};

	return (
		<div className="flex flex-col">
			<div className="flex flex-col">
				{specSelectorItems?.map((item) => (
					<div key={item.spec.id} className="flex space-y-2 space-x-2">
						<Checkbox
							id={item.spec.id?.toString()}
							checked={item.selected}
							onCheckedChange={(checked) => toggleSpecSelection(item.spec.id!, checked === true)}
						/>
						<label
							htmlFor={item.spec.id?.toString()}
							className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
						>
							{item.spec.title}
							{item.spec.description && <span className="pl-2 text-xs italic">({item.spec.description})</span>}
						</label>
					</div>
				))}
				<InputTextLabeled
					label="назва"
					name="title"
					value={newSpecGroupData.title}
					placeholder="колібрі"
					onChange={updateTextValue}
				/>
				<InputTextareaLabeled
					label={"коментар"}
					name={"comment"}
					value={newSpecGroupData.comment}
					onChange={updateTextValue}
					className="mt-3"
				/>
			</div>
			<div className="mt-3 flex flex-row justify-between">
				<Button variant="ghost" onClick={props.onCanceled} />
				<ButtonLoading title="Зберегти" onClick={createGroup} />
			</div>
		</div>
	);
}
