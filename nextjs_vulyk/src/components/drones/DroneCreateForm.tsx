"use client";

import { useState } from "react";
import InputTextLabeled from "../common/InputTextLabeled";
import ButtonLoading from "../common/ButtonLoading";
import ButtonGhost from "../common/ButtonGhost";
import { DroneEditableData } from "./types";
import { MarkerEntity } from "@/utils/db/schema";
import InputTextareaLabeled from "../common/InputTextareaLabeled";

type Props = {
	marker: MarkerEntity;
	onCreate: (markerNumber: string, comment?: string) => void;
	onCancel: () => void;
	className?: string;
};

export default function DroneCreateForm(props: Props) {
	const [newDroneData, setNewDroneData] = useState<DroneEditableData>({
		markerTitle: "",
		markerNumber: props.marker.lastNumber !== null ? (props.marker.lastNumber + 1).toString() : undefined,
	});

	const createDrone = () => {
		if (!newDroneData.markerNumber || newDroneData.markerNumber.trim() === "") {
			window.alert(`Поле "номер" не має бути пустим`); // TODO show it as message inside form
			return;
		}
		props.onCreate(newDroneData.markerNumber, newDroneData.comment);
	};

	return (
		<div className="dark:bg-military-600 mb-3 flex flex-col rounded-sm bg-gray-50 p-3">
			<div className="flex flex-row">
				<InputTextLabeled
					label="маркер"
					name="markerTitle"
					value={props.marker.slug}
					placeholder="AAA"
					disabled={true}
					onChange={() => {}}
					className="mr-3"
				/>
				<InputTextLabeled
					label="номер"
					name="markerNumber"
					value={newDroneData.markerNumber ? newDroneData.markerNumber : ""}
					disabled={props.marker.autoInc}
					placeholder="111"
					onChange={(event) => {
						setNewDroneData((prevData) => {
							return { ...prevData, markerNumber: event.target.value };
						});
					}}
				/>
			</div>
			<InputTextareaLabeled
				label="коментар"
				name="comment"
				value={newDroneData.comment}
				onChange={(event) => {
					setNewDroneData((prevData) => {
						return { ...prevData, comment: event.target.value };
					});
				}}
				className="mt-3"
			/>
			<div className="mt-3 flex flex-row justify-between">
				<ButtonGhost title="Скасувати" onClick={props.onCancel} />
				<ButtonLoading title="Зберегти" onClick={createDrone} />
			</div>
		</div>
	);
}
