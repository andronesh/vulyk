"use client";

import SpecsPanel from "@/components/specs/SpecsPanel";

export default function Home() {
	// const [selectedSpec, setSelectedMarker] = useState<MarkerEntity | undefined>();

	return (
		<div className="flex flex-row">
			<div className="w-72">
				{/* <SpecsPanel onSpecSelected={setSelectedMarker} /> */}
				<SpecsPanel />
			</div>
			<div className="flex">
				{/* {selectedMarker && <DronesPanel selectedMarker={selectedMarker} className="w-1/3" />}
				{!selectedMarker && (
					<div className="self-center w-full text-center">Виберіть маркер щоб переглянути список дронів</div>
				)} */}
			</div>
		</div>
	);
}
