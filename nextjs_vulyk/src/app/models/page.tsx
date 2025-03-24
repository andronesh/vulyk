"use client";

import DronesPanel from "@/components/drones/DronesPanel";
import MarkersPanel from "@/components/markers/MarkersPanel";
import { MarkerEntity } from "@/utils/db/schema";
import { useState } from "react";

export default function ModelsPage() {
	const [selectedMarker, setSelectedMarker] = useState<MarkerEntity | undefined>();

	return <div className="flex flex-row">Моделі</div>;
}
