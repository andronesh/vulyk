"use client";

import { useState } from "react";
import InputTextLabeled from "../common/InputTextLabeled";
import ButtonLoading from "../common/ButtonLoading";
import { Marker } from "./types";
import ButtonGhost from "../common/ButtonGhost";

type Props = {
	onCreate: (title: string, startNumber: number) => void;
	onCancel: () => void;
	className?: string;
};

export default function MarkerCreateForm(props: Props) {
	const [newMarkerData, setNewMarkerData] = useState<Marker>({
		title: "",
		startNumber: 111,
	});

	const createMarker = () => {
		if (!newMarkerData.title || newMarkerData.title.trim() === "") {
			window.alert(`Поле "скорочення" не має бути пустим`); // TODO show it as message inside form
			return;
		}
		if (newMarkerData.startNumber < 100) {
			window.alert(`Поле "почати з" має бути більше 99`); // TODO show it as message inside form
			return;
		}
		console.info("save marker", newMarkerData);
	};

	return (
		<div className="flex flex-col p-3 mt-3 rounded bg-gray-50 dark:bg-gray-800">
			<div className="flex flex-row">
				<InputTextLabeled
					label="скорочення"
					name="title"
					value={newMarkerData.title}
					placeholder="AAA"
					onChange={(event) => {
						setNewMarkerData((prevData) => {
							console.info(prevData);
							return { ...prevData, title: event.target.value };
						});
					}}
					className="mr-3"
				/>
				<InputTextLabeled
					label="почати з"
					name="startNumber"
					value={newMarkerData.startNumber.toString()}
					placeholder="111"
					onChange={(event) => {
						const newValue = event.target.value;
						if (isNaN(+newValue)) {
							window.alert(`"Почати з" повинен бути числом від 100`); // TODO show it as message inside form
						} else {
							setNewMarkerData((prevData) => {
								return { ...prevData, startNumber: +newValue };
							});
						}
					}}
				/>
			</div>
			<div className="flex flex-row mt-3 justify-between">
				<ButtonGhost title="Скасувати" onClick={props.onCancel} />
				<ButtonLoading title="Зберегти" onClick={createMarker} />
			</div>
		</div>
	);
}
