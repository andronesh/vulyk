"use client";

import { useState } from "react";
import MarkerCreateForm from "./MarkerCreateForm";
import { createMarker } from "@/logic/repo/markersRepo";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
	className?: string;
};

export default function MarkersPanelHeader(props: Props) {
	const queryClient = useQueryClient();
	const [inCreateMode, setInCreateMode] = useState(false);

	const toggleCreateMode = () => {
		setInCreateMode((prevInCreateMode) => !prevInCreateMode);
	};

	const doCreateMarker = async (
		slug: string,
		comment: string | null,
		autoInc: boolean,
		lastNumber: number | null,
	) => {
		try {
			await createMarker(slug, comment, autoInc, lastNumber);
			toggleCreateMode();
			queryClient.invalidateQueries({ queryKey: ["markers"] });
		} catch (error) {
			console.error(`Failed to create marker with slug=${slug} and lastNumber=${lastNumber}`, error);
			window.alert(error); //TODO beautify
		}
	};

	return (
		<div className={`${props.className}`}>
			<div className="flex flex-row justify-between">
				<span className="">Маркери:</span>
				{!inCreateMode && (
					<span
						className="rounded-sm px-3 py-1 hover:cursor-pointer hover:bg-gray-800 hover:font-bold"
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
