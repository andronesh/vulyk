"use client";

import MarkersPanelHeader from "./MarkersPanelHeader";

type Props = {
	className?: string;
};

export default function MarkersPanel(props: Props) {
	return (
		<div className={`${props.className}`}>
			<MarkersPanelHeader
				onCreate={(title, startNumber) => {
					console.info(`Create marker with title="${title}" and startNumber=${startNumber}`);
					// TODO implement markers creation
				}}
			/>
		</div>
	);
}
