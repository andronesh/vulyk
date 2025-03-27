"use client";

import DroneGroupCreateButton from "@/components/droneGroups/DroneGroupCreateButton";
import DroneGroupsList from "@/components/droneGroups/DroneGroupsList";

export default function DronesPage() {
	return (
		<div className="flex flex-row">
			<div className="w-72">
				<DroneGroupCreateButton />
				<DroneGroupsList className="mt-2" />
			</div>
		</div>
	);
}
