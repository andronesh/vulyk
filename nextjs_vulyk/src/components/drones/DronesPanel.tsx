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
		<div className={`flex ${props.className}`}>
			<DronesPanelHeader marker={props.selectedMarker} onCreated={refreshDronesList} />
			{drones.map((drone) => (
				<div key={drone.id}>
					{drone.markerTitle}-{drone.markerNumber}
				</div>
			))}
		</div>
	);
}
