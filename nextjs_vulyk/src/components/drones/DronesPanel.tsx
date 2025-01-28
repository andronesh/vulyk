"use client";

import { getDronesWithMarker, listAllDrones } from "@/logic/repo/dronesRepo";
import { DroneEntity, MarkerEntity } from "@/utils/db/schema";
import { useEffect, useState } from "react";
import DronesPanelHeader from "./DronesPanelHeader";

type Props = {
	selectedMarker: MarkerEntity;
	className?: string;
};

export default function DronesPanel(props: Props) {
	const [drones, setDrones] = useState<DroneEntity[]>([]);

	useEffect(() => {
		refreshDronesList();
	}, [props.selectedMarker]);

	const refreshDronesList = () => {
		const result = props.selectedMarker ? getDronesWithMarker(props.selectedMarker.title) : listAllDrones();
		result.then(setDrones).catch((error) => {
			console.error("Failed to load drones from DB", error);
			window.alert(JSON.stringify(error)); // TODO beautify errors
		});
	};

	return (
		<div className={`flex flex-col ${props.className}`}>
			<DronesPanelHeader marker={props.selectedMarker} onCreated={refreshDronesList} />
			{drones.length > 0 && (
				<div className="rounded-md border-gray-600 border-2">
					{drones.map((drone) => (
						<div
							key={drone.id}
							className="p-2 font-semibold [&:not(:last-child)]:border-b-2 border-gray-600 hover:cursor-pointer hover:font-bold hover:bg-blue-950"
						>
							{drone.markerTitle}-{drone.markerNumber}
						</div>
					))}
				</div>
			)}
			{drones.length === 0 && <div className="mt-3 italic text-center">Немає дронів з цим маркером</div>}
		</div>
	);
}
