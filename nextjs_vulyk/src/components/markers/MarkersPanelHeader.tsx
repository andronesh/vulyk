"use client";

import { useState } from "react";
import MarkerCreateForm from "./MarkerCreateForm";
import { createMarker } from "@/logic/repo/markersRepo";

type Props = {
	onCreated: () => void;
	className?: string;
};

export default function MarkersPanelHeader(props: Props) {
	const [inCreateMode, setInCreateMode] = useState(false);

	const toggleCreateMode = () => {
		setInCreateMode((prevInCreateMode) => !prevInCreateMode);
	};

	const doCreateMarker = async (title: string, startNumber: number) => {
		try {
			await createMarker(title, startNumber);
			toggleCreateMode();
			props.onCreated();
		} catch (error) {
			console.error(`Failed to create marker with title=${title} and startNumber=${startNumber}`, error);
			window.alert(error); //TODO beautify
		}
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
			{inCreateMode && <MarkerCreateForm onCreate={doCreateMarker} onCancel={toggleCreateMode} />}
		</div>
	);
}
