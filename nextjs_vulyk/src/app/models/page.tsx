"use client";

import ModelSelectPanel from "@/components/models/ModelsPanel";

export default function ModelsPage() {
	return (
		<div className="flex flex-row">
			<div className="w-72">
				<ModelSelectPanel />
			</div>
		</div>
	);
}
