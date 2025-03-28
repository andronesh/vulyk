"use client";

import { useState } from "react";
import { updateMarkerLastNumber } from "@/logic/repo/markersRepo";
import { MarkerEntity } from "@/utils/db/schema";
import DroneCreateForm from "./DroneCreateForm";
import { createDrone } from "@/logic/repo/dronesRepo";

type Props = {
	marker: MarkerEntity;
	onCreated: () => void;
	className?: string;
};

export default function DronesPanelHeader(props: Props) {
	const [inCreateMode, setInCreateMode] = useState(false);

	const toggleCreateMode = () => {
		setInCreateMode((prevInCreateMode) => !prevInCreateMode);
	};

	const doCreateDrone = async (markerNumber: string, comment?: string) => {
		try {
			await createDrone(props.marker.title, markerNumber, comment);
			if (props.marker.autoInc) {
				updateMarkerLastNumber(props.marker.id!, +markerNumber); // TODO do it in transaction
				// TODO: update lastNumber inside selected marker model (probably using some state manager)
			}
			toggleCreateMode();
			props.onCreated();
		} catch (error) {
			console.error(
				`Failed to create drone with marker=${props.marker.title}, number=${markerNumber}, and comment="${comment}"`,
				error,
			);
			window.alert(error); //TODO beautify
		}
	};

	return (
		<div className={`${props.className}`}>
			<div className="mb-1 flex flex-row items-center justify-between">
				<span className="text-lg font-bold">Дрони:</span>
				{!inCreateMode && (
					<span
						className="rounded-sm px-3 py-1 duration-300 hover:cursor-pointer hover:bg-military-500 hover:font-bold"
						onClick={toggleCreateMode}
					>
						додати дрон
					</span>
				)}
			</div>
			{inCreateMode && (
				<DroneCreateForm marker={props.marker} onCreate={doCreateDrone} onCancel={toggleCreateMode} />
			)}
		</div>
	);
}
