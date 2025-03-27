"use client";

import DronesPanel from "@/components/drones/DronesPanel";
import MarkersPanel from "@/components/markers/MarkersPanel";
import { MarkerEntity } from "@/utils/db/schema";
import { useState } from "react";

export default function MarkersPage() {
	const [selectedMarker, setSelectedMarker] = useState<MarkerEntity | undefined>();

	return (
		<div className="flex flex-row">
			<div className="w-72">
				<MarkersPanel onMarkerSelected={setSelectedMarker} />
			</div>
			<div className="flex w-full">
				{selectedMarker && <DronesPanel selectedMarker={selectedMarker} className="w-1/3" />}
				{!selectedMarker && (
					<div className="w-full self-center text-center">Виберіть маркер щоб переглянути список дронів</div>
				)}
			</div>
		</div>
	);
}
