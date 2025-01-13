"use client";

import MarkersPanel from "@/components/markers/MarkersPanel";
import { MarkerEntity } from "@/utils/db/schema";
import { useState } from "react";

export default function Home() {
	const [selectedMarker, setSelectedMarker] = useState<MarkerEntity | undefined>();

	return (
		<div className="flex flex-row">
			<div className="w-72">
				<MarkersPanel onMarkerSelected={setSelectedMarker} />
			</div>
		</div>
	);
}
