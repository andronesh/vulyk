"use client";

import { ChangeEvent, useState } from "react";
import InputTextLabeled from "../common/InputTextLabeled";
import ButtonLoading from "../common/ButtonLoading";
import ButtonGhost from "../common/ButtonGhost";
import { SpecOptionEntity } from "@/utils/db/schema";
import InputTextareaLabeled from "../common/InputTextareaLabeled";
import { updateOption } from "@/logic/repo/specsRepo";

type Props = {
	option: SpecOptionEntity;
	className?: string;
	onCanceled: () => void;
	onSaved: () => void;
};

export default function SpecOptionEditForm(props: Props) {
	const [formData, setFormData] = useState<SpecOptionEntity>(props.option);

	const updateTextValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData((prevData) => {
			return { ...prevData, [event.target.name]: event.target.value };
		});
	};

	const doUpdateOption = () => {
		if (!formData.title || formData.title.trim() === "") {
			window.alert(`Поле "назва" не має бути пустим`); // TODO show it as message inside form
			return;
		}
		updateOption(formData.id, formData.title.trim(), formData.comment?.trim())
			.then(() => {
				props.onSaved();
			})
			.catch((error) => {
				console.error(`Failed to update option with id=${props.option.id}`, error);
				window.alert(error);
			});
	};

	return (
		<div className="dark:bg-military-600 flex flex-col rounded-sm">
			<div className="flex flex-col">
				<InputTextLabeled
					label="назва"
					name="title"
					value={formData.title}
					placeholder="max solo 2.5w"
					onChange={updateTextValue}
				/>
				<InputTextareaLabeled
					label={"коментар"}
					name={"comment"}
					value={formData.comment}
					onChange={updateTextValue}
					className="mt-3"
				/>
			</div>
			<div className="mt-3 flex flex-row justify-between">
				<ButtonGhost title="скасувати" onClick={props.onCanceled} />
				<ButtonLoading title="зберегти" onClick={doUpdateOption} />
			</div>
		</div>
	);
}
