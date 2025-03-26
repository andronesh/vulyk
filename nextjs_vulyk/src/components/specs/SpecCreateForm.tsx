"use client";

import { ChangeEvent, useState } from "react";
import InputTextLabeled from "../common/InputTextLabeled";
import ButtonLoading from "../common/ButtonLoading";
import ButtonGhost from "../common/ButtonGhost";
import { SpecEntity } from "@/utils/db/schema";
import InputTextareaLabeled from "../common/InputTextareaLabeled";

type Props = {
	onCreate: (title: string, description?: string) => void;
	onCancel: () => void;
	className?: string;
};

export default function SpecCreateForm(props: Props) {
	const [newSpecData, setNewSpecData] = useState<SpecEntity>({
		title: "",
		description: "",
	});

	const updateTextValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setNewSpecData((prevData) => {
			return { ...prevData, [event.target.name]: event.target.value };
		});
	};

	const createMarker = () => {
		if (!newSpecData.title || newSpecData.title.trim() === "") {
			window.alert(`Поле "назва" не має бути пустим`); // TODO show it as message inside form
			return;
		}
		props.onCreate(newSpecData.title, newSpecData.description ? newSpecData.description : undefined);
	};

	return (
		<div className="flex flex-col">
			<div className="flex flex-col">
				<InputTextLabeled
					label="назва"
					name="title"
					value={newSpecData.title}
					placeholder="VTX"
					onChange={updateTextValue}
				/>
				<InputTextareaLabeled
					label={"опис"}
					name={"description"}
					value={newSpecData.description}
					onChange={updateTextValue}
					className="mt-3"
				/>
			</div>
			<div className="mt-3 flex flex-row justify-between">
				<ButtonGhost title="Скасувати" onClick={props.onCancel} />
				<ButtonLoading title="Зберегти" onClick={createMarker} />
			</div>
		</div>
	);
}
