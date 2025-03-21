"use client";

import SpecOptionsPanel from "@/components/specs/SpecOptionsPanel";
import SpecsPanel from "@/components/specs/SpecsPanel";
import { SpecEntity } from "@/utils/db/schema";
import { useState } from "react";

export default function Home() {
	const [selectedSpec, setSelectedSpec] = useState<SpecEntity | undefined>(); // TODO use zustand to manage this state

	return (
		<div className="flex flex-row">
			<div className="w-72">
				<SpecsPanel onSpecSelected={setSelectedSpec} />
			</div>

			<div className="w-72">{selectedSpec && <SpecOptionsPanel spec={selectedSpec} />}</div>
		</div>
	);
}
