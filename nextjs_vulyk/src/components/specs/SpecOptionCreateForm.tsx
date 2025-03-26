"use client";

import { ChangeEvent, useEffect, useState } from "react";
import InputTextLabeled from "../common/InputTextLabeled";
import ButtonLoading from "../common/ButtonLoading";
import ButtonGhost from "../common/ButtonGhost";
import { SpecEntity, SpecOptionInsertData } from "@/utils/db/schema";
import InputTextareaLabeled from "../common/InputTextareaLabeled";
import { insertOption } from "@/logic/repo/specsRepo";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
	spec: SpecEntity;
	className?: string;
	onCanceled: () => void;
	onCreated: () => void;
};

export default function SpecOptionCreateForm(props: Props) {
	const queryClient = useQueryClient();
	const [newOptionData, setNewOptionData] = useState<SpecOptionInsertData>({
		specId: props.spec.id!, // TODO SpecEntity should be inferSelect
		specTitle: props.spec.title,
		title: "",
		shortName: "",
		comment: "",
	});

	useEffect(() => {
		setNewOptionData({
			// NEED to do this, why?
			specId: props.spec.id!, // TODO SpecEntity should be inferSelect
			specTitle: props.spec.title,
			title: "",
			shortName: "",
			comment: "",
		});
	}, [props.spec]);

	const cleanFormData = () => {
		setNewOptionData((prevData) => {
			return {
				...prevData,
				title: "",
				shortName: "",
				comment: "",
			};
		});
	};

	const updateTextValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setNewOptionData((prevData) => {
			return { ...prevData, [event.target.name]: event.target.value };
		});
	};

	const handleCancel = () => {
		cleanFormData();
		props.onCanceled();
	};

	const createOption = () => {
		if (!newOptionData.title || newOptionData.title.trim() === "") {
			window.alert(`Поле "назва" не має бути пустим`); // TODO show it as message inside form
			return;
		}
		insertOption(
			newOptionData.specId,
			newOptionData.specTitle,
			newOptionData.title,
			newOptionData.shortName,
			newOptionData.comment ? newOptionData.comment : undefined,
		)
			.then(() => {
				cleanFormData();
				queryClient.invalidateQueries({ queryKey: ["specs", props.spec.id, "options"] });
				props.onCreated();
			})
			.catch((error) => {
				console.error(`Failed to insert option for spec with id=${props.spec.id}`, error);
				window.alert(error);
			});
	};

	return (
		<div className="dark:bg-military-600 flex flex-col rounded-sm">
			<div className="flex flex-col">
				<InputTextLabeled
					label="назва"
					name="title"
					value={newOptionData.title}
					placeholder="max solo 2.5w"
					onChange={updateTextValue}
				/>
				<InputTextLabeled
					label="коротко"
					name="shortName"
					value={newOptionData.shortName}
					placeholder="RMSolo2w5"
					onChange={updateTextValue}
				/>
				<InputTextareaLabeled
					label={"коментар"}
					name={"comment"}
					value={newOptionData.comment}
					onChange={updateTextValue}
					className="mt-3"
				/>
			</div>
			<div className="mt-3 flex flex-row justify-between">
				<ButtonGhost title="скасувати" onClick={handleCancel} />
				<ButtonLoading title="зберегти" onClick={createOption} />
			</div>
		</div>
	);
}
