"use client";

import { useState } from "react";
import InputTextLabeled from "../common/InputTextLabeled";
import ButtonLoading from "../common/ButtonLoading";
import { Marker } from "./types";
import ButtonGhost from "../common/ButtonGhost";
import InputCheckbox from "../common/InputCheckbox";

type Props = {
	onCreate: (title: string, autoInc: boolean, startNumber: number | null) => void;
	onCancel: () => void;
	className?: string;
};

export default function MarkerCreateForm(props: Props) {
	const [newMarkerData, setNewMarkerData] = useState<Marker>({
		title: "",
		autoInc: false,
		startNumber: 111,
	});

	const createMarker = () => {
		if (!newMarkerData.title || newMarkerData.title.trim() === "") {
			window.alert(`Поле "скорочення" не має бути пустим`); // TODO show it as message inside form
			return;
		}
		if (newMarkerData.autoInc && (newMarkerData.startNumber === null || newMarkerData.startNumber < 100)) {
			window.alert(`Поле "почати з" має бути більше 99`); // TODO show it as message inside form
			return;
		}
		props.onCreate(
			newMarkerData.title,
			newMarkerData.autoInc,
			newMarkerData.autoInc ? newMarkerData.startNumber : null,
		);
	};

	return (
		<div className="dark:bg-military-600 mt-3 flex flex-col rounded-sm p-3">
			<div className="flex flex-col">
				<InputTextLabeled
					label="скорочення"
					name="title"
					value={newMarkerData.title}
					placeholder="AAA"
					onChange={(event) => {
						setNewMarkerData((prevData) => {
							return { ...prevData, title: event.target.value };
						});
					}}
				/>
				<InputCheckbox
					label={"автонумерація"}
					name={"autoInc"}
					value={newMarkerData.autoInc}
					onChange={(event) => {
						setNewMarkerData((prevData) => {
							return { ...prevData, autoInc: event.target.checked };
						});
					}}
					className="py-3"
				/>
				{newMarkerData.autoInc && (
					<InputTextLabeled
						label="стартовий номер"
						name="startNumber"
						value={newMarkerData.startNumber ? newMarkerData.startNumber.toString() : ""}
						placeholder="111"
						onChange={(event) => {
							const newValue = event.target.value;
							if (isNaN(+newValue)) {
								window.alert(`"стартовий номер" повинен бути числом від 100`); // TODO show it as message inside form
							} else {
								setNewMarkerData((prevData) => {
									return { ...prevData, startNumber: +newValue };
								});
							}
						}}
					/>
				)}
			</div>
			<div className="mt-3 flex flex-row justify-between">
				<ButtonGhost title="Скасувати" onClick={props.onCancel} />
				<ButtonLoading title="Зберегти" onClick={createMarker} />
			</div>
		</div>
	);
}
