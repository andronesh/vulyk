"use client";

import { ChangeEvent, useEffect, useState } from "react";
import InputTextLabeled from "../common/InputTextLabeled";
import ButtonLoading from "../common/ButtonLoading";
import ButtonGhost from "../common/ButtonGhost";
import { SpecEntity, SpecOptionInsertData } from "@/utils/db/schema";
import InputTextareaLabeled from "../common/InputTextareaLabeled";
import { insertOption } from "@/logic/repo/specsRepo";
import { useQueryClient } from "@tanstack/react-query";

interface Props<T> {
	// spec: SpecEntity;
	initialFormData: T;
	formComponent: React.FC<CreateFormProps<T>>;
	className?: string;
}

export interface CreateFormProps<T> {
	initialFormData: T;
	// onValueChanged: (field: string, value: string) => void;
	doSave: () => void;
}

export default function CreateFormCollapsible<T>(props: Props<T>) {
	const queryClient = useQueryClient();
	const [newFormData, setNewFormData] = useState<T>(props.initialFormData);
	const FormComponent = props.formComponent;

	useEffect(() => {
		setNewOptionData(props.initialFormData);
	}, [props.initialFormData]);

	const cleanFormData = () => {
		// 	setNewOptionData((prevData) => {
		// 		return {
		// 			...prevData,
		// 			title: "",
		// 			comment: "",
		// 		};
		// 	});
	};

	const updateTextValue = (event: ChangeEvent<HTMLInputElement>) => {
		setNewOptionData((prevData) => {
			return { ...prevData, [event.target.name]: event.target.value };
		});
	};

	const createOption = () => {
		// if (!newOptionData.title || newOptionData.title.trim() === "") {
		// 	window.alert(`Поле "назва" не має бути пустим`); // TODO show it as message inside form
		// 	return;
		// }
		// insertOption(
		// 	newOptionData.specId,
		// 	newOptionData.title,
		// 	newOptionData.comment ? newOptionData.comment : undefined,
		// )
		// 	.then(() => {
		// 		cleanFormData();
		// 		queryClient.invalidateQueries({ queryKey: ["specs", props.spec.id, "options"] });
		// 	})
		// 	.catch((error) => {
		// 		console.error(`Failed to insert option for spec with id=${props.spec.id}`, error);
		// 		window.alert(error);
		// 	});
	};

	return (
		<div className="mx-1 mt-3 flex flex-col rounded border-2 border-solid border-military-500 p-3 dark:bg-military-600">
			<FormComponent
				re
				initialFormData={props.initialFormData}
				onValueChanged={function (field: string, value: string): void {
					throw new Error("Function not implemented.");
				}}
			/>
			<div className="mt-3 flex flex-row justify-between">
				<ButtonGhost title="Очистити" onClick={cleanFormData} />
				<ButtonLoading title="Зберегти" onClick={createOption} />
			</div>
		</div>
	);
}
