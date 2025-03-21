"use client";

import { MarkerEntity } from "@/utils/db/schema";
import MarkersPanelHeader from "./MarkersPanelHeader";
import { useState } from "react";
import MarkerChip from "./MarkerChip";
import Spinner from "../common/Spinner";
import { useAllMarkersQuery } from "@/logic/queries/useAllMarkersQuery";

type Props = {
	onMarkerSelected: (marker: MarkerEntity) => void;
	className?: string;
};

export default function MarkersPanel(props: Props) {
	const { data: markers, isFetching, isError } = useAllMarkersQuery();
	const [selectedMarker, setSelectedMarker] = useState<MarkerEntity | undefined>();

	const selectMarker = (marker: MarkerEntity) => {
		setSelectedMarker(marker);
		props.onMarkerSelected(marker);
	};

	return (
		<div className={`${props.className}`}>
			<MarkersPanelHeader />
			<div className="flex flex-row flex-wrap">
				{isError && (
					<div className="rounded bg-red-700 p-2 text-lg text-white">
						Не вдалось завантажити список маркеів з бази данних
					</div>
				)}
				{isFetching && <Spinner />}
				{!isFetching &&
					!isError &&
					markers?.map((marker) => (
						<MarkerChip
							key={marker.id}
							marker={marker}
							isSelected={selectedMarker?.id === marker.id}
							onClick={selectMarker}
						/>
					))}
			</div>
		</div>
	);
}
