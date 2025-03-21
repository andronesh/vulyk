"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createSpec } from "@/logic/repo/specsRepo";
import SpecCreateForm from "./SpecCreateForm";

type Props = {
	className?: string;
};

export default function SpecsPanelHeader(props: Props) {
	const queryClient = useQueryClient();
	const [inCreateMode, setInCreateMode] = useState(false);

	const toggleCreateMode = () => {
		setInCreateMode((prevInCreateMode) => !prevInCreateMode);
	};

	const doCreateSpec = async (title: string, description?: string) => {
		try {
			await createSpec(title, description);
			toggleCreateMode();
			queryClient.invalidateQueries({ queryKey: ["specs"] });
		} catch (error) {
			console.error(`Failed to create spec with title=${title} and description="${description}"`, error);
			window.alert(error); //TODO beautify
		}
	};

	return (
		<div className={`${props.className}`}>
			<div className="flex flex-row justify-between">
				<span className="">Характеристики:</span>
				{!inCreateMode && (
					<span
						className="rounded px-3 py-1 hover:cursor-pointer hover:bg-gray-800 hover:font-bold"
						onClick={toggleCreateMode}
					>
						+
					</span>
				)}
			</div>
			{inCreateMode && <SpecCreateForm onCreate={doCreateSpec} onCancel={toggleCreateMode} />}
		</div>
	);
}
