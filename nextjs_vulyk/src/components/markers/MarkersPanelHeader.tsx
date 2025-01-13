"use client";

import { useState } from "react";
import MarkerCreateForm from "./MarkerCreateForm";

type Props = {
	onCreate: (title: string, startNumber: number) => void;
	className?: string;
};

export default function MarkersPanelHeader(props: Props) {
	const [inCreateMode, setInCreateMode] = useState(false);

	const toggleCreateMode = () => {
		setInCreateMode((prevInCreateMode) => !prevInCreateMode);
	};

	const createMarker = (title: string, startNumber: number) => {
		console.info(`Create marker with title="${title}" and startNumber=${startNumber}`);
	};

	return (
		<div className={`${props.className}`}>
			<div className="flex flex-row justify-between">
				<span className="">Маркери:</span>
				{!inCreateMode && (
					<span
						className="px-3 py-1 hover:cursor-pointer hover:font-bold hover:bg-gray-800 rounded"
						onClick={toggleCreateMode}
					>
						+
					</span>
				)}
			</div>
			{inCreateMode && <MarkerCreateForm onCreate={createMarker} onCancel={toggleCreateMode} />}
		</div>
	);
}
