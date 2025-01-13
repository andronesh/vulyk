"use client";

import { MarkerEntity } from "@/utils/db/schema";
import MarkersPanelHeader from "./MarkersPanelHeader";
import { useEffect, useState } from "react";
import { listAllMarkers } from "@/logic/repo/markersRepo";
import MarkerChip from "./MarkerChip";

type Props = {
	onMarkerSelected: (marker: MarkerEntity) => void;
	className?: string;
};

export default function MarkersPanel(props: Props) {
	const [markers, setMarkers] = useState<MarkerEntity[]>([]);
	const [selectedMarker, setSelectedMarker] = useState<MarkerEntity | undefined>();

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

	const selectMarker = (marker: MarkerEntity) => {
		setSelectedMarker(marker);
		props.onMarkerSelected(marker);
	};

	return (
		<div className={`${props.className}`}>
			<MarkersPanelHeader onCreated={refreshMarkersList} />
			<div className="flex flex-row flex-wrap">
				{markers.map((marker) => (
					<MarkerChip
						key={marker.id}
						marker={marker}
						isSelected={selectedMarker?.id === marker.id}
						onClick={selectMarker}
					/>
				))}
			</div>
		</div>
	);
}
