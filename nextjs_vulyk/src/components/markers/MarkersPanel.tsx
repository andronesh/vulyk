"use client";

import { MarkerEntity } from "@/utils/db/schema";
import MarkersPanelHeader from "./MarkersPanelHeader";
import { useEffect, useState } from "react";
import { listAllMarkers } from "@/logic/repo/markersRepo";

type Props = {
	className?: string;
};

export default function MarkersPanel(props: Props) {
	const [markers, setMarkers] = useState<MarkerEntity[]>([]);

	useEffect(() => {
		refreshMarkersList();
	}, []);

	const refreshMarkersList = () => {
		listAllMarkers()
			.then(setMarkers)
			.catch((error) => {
				console.error("Failed to load markers from DB", error);
				window.alert(JSON.stringify(error)); // TODO beautify errors
			});
	};

	return (
		<div className={`${props.className}`}>
			<MarkersPanelHeader onCreated={refreshMarkersList} />
			{markers.map((marker) => (
				<div key={marker.id}>
					{marker.title}:{marker.lastNumber}
				</div>
			))}
		</div>
	);
}
