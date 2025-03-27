"use client";

import DroneGroupCreateButton from "@/components/droneGroups/DroneGroupCreateButton";

export default function DronesPage() {
	return (
		<div className="flex flex-row">
			<div className="w-72">
				<DroneGroupCreateButton />
			</div>
		</div>
	);
}
