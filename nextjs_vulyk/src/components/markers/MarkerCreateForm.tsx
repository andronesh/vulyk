"use client";

import { useState } from "react";
import InputTextLabeled from "../common/InputTextLabeled";
import ButtonLoading from "../common/ButtonLoading";
import ButtonGhost from "../common/ButtonGhost";
import InputCheckbox from "../common/InputCheckbox";
import { MarkerFormData } from "@/utils/db/schema";
import InputTextareaLabeled from "../common/InputTextareaLabeled";

type Props = {
	onCreate: (slug: string, comment: string | null, autoInc: boolean, lastNumber: number | null) => void;
	onCancel: () => void;
	className?: string;
};

export default function MarkerCreateForm(props: Props) {
	const [newMarkerData, setNewMarkerData] = useState<MarkerFormData>({
		// TODO replace with ZOD schema, and remove "newMarkerData.autoInc ? true : false" everywhene
		slug: "",
		comment: "",
		autoInc: false,
		lastNumber: 0,
	});

	const createMarker = () => {
		if (!newMarkerData.slug || newMarkerData.slug.trim() === "") {
			window.alert(`Поле "скорочення" не має бути пустим`); // TODO show it as message inside form
			return;
		}
		if (
			newMarkerData.autoInc &&
			(newMarkerData.lastNumber === null ||
				newMarkerData.lastNumber === undefined ||
				newMarkerData.lastNumber < 0)
		) {
			window.alert(`Поле "нумерувати після" має бути більше 0`); // TODO show it as message inside form
			return;
		}
		console.info(
			"newMarkerData.autoInc && newMarkerData.lastNumber !== null && newMarkerData.lastNumber !== undefined: " +
				(newMarkerData.autoInc && newMarkerData.lastNumber !== null && newMarkerData.lastNumber !== undefined),
		);
		props.onCreate(
			newMarkerData.slug,
			newMarkerData.comment ? newMarkerData.comment : null,
			newMarkerData.autoInc ? true : false,
			newMarkerData.lastNumber !== null && newMarkerData.lastNumber !== undefined
				? newMarkerData.lastNumber
				: null,
		);
	};

	return (
		<div className="dark:bg-military-600 mt-3 flex flex-col rounded-sm p-3">
			<div className="flex flex-col">
				<InputTextLabeled
					label="скорочення"
					name="slug"
					value={newMarkerData.slug}
					placeholder="AAA"
					onChange={(event) => {
						setNewMarkerData((prevData) => {
							return { ...prevData, slug: event.target.value };
						});
					}}
				/>
				<InputCheckbox
					label={"автонумерація"}
					name={"autoInc"}
					value={newMarkerData.autoInc ? true : false}
					onChange={(event) => {
						setNewMarkerData((prevData) => {
							return { ...prevData, autoInc: event.target.checked };
						});
					}}
					className="py-3"
				/>
				{newMarkerData.autoInc && (
					<InputTextLabeled
						label="нумерувати після"
						name="lastNumber"
						value={
							newMarkerData.lastNumber !== null && newMarkerData.lastNumber !== undefined
								? newMarkerData.lastNumber.toString()
								: ""
						}
						placeholder="111"
						onChange={(event) => {
							const newValue = event.target.value;
							if (isNaN(+newValue)) {
								window.alert(`"нумерувати після" повинен бути числом`); // TODO show it as message inside form
							} else {
								setNewMarkerData((prevData) => {
									return { ...prevData, lastNumber: +newValue };
								});
							}
						}}
					/>
				)}
				<InputTextareaLabeled
					label={"коментар"}
					name={"comment"}
					value={newMarkerData?.comment}
					rows={5}
					onChange={(event) => {
						setNewMarkerData((prevData) => {
							return { ...prevData, comment: event.target.value };
						});
					}}
				/>
			</div>
			<div className="mt-3 flex flex-row justify-between">
				<ButtonGhost title="Скасувати" onClick={props.onCancel} />
				<ButtonLoading title="Зберегти" onClick={createMarker} />
			</div>
		</div>
	);
}
