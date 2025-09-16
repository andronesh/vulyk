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
	}, [props.selectedMarker]); // eslint-disable-line react-hooks/exhaustive-deps

	const refreshDronesList = () => {
		const result = props.selectedMarker ? getDronesWithMarker(props.selectedMarker.slug) : listAllDrones();
		result.then(setDrones).catch((error) => {
			console.error("Failed to load drones from DB", error);
			window.alert(JSON.stringify(error)); // TODO beautify errors
		});
	};

	return (
		<div className={`flex flex-col ${props.className}`}>
			<DronesPanelHeader marker={props.selectedMarker} onCreated={refreshDronesList} />
			{drones.length > 0 && (
				<div className="border-military-500 rounded-md border-4">
					{drones.map((drone) => (
						<div
							key={drone.id}
							className="border-military-500 hover:bg-military-500 p-2 font-semibold not-last:border-b-2 hover:cursor-pointer hover:font-bold"
						>
							{drone.markerTitle}-{drone.markerNumber}
						</div>
					))}
				</div>
			)}
			{drones.length === 0 && <div className="mt-3 text-center italic">Немає дронів з цим маркером</div>}
		</div>
	);
}
