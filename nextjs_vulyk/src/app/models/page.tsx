"use client";

import ModelSelectPanel from "@/components/models/ModelSelectPanel";

export default function ModelsPage() {
	return (
		<div className="flex flex-row">
			<div className="w-72">
				<ModelSelectPanel />
			</div>
		</div>
	);
}
