"use client";

import { ModelWithOptionsDto } from "@/logic/repo/modelsRepo";
import { Button } from "../ui/button";
import { useState } from "react";
import BfDumpEditForm from "../bfConfigs/BfDumpEditForm";

type Props = {
	model: ModelWithOptionsDto;
	className?: string;
};

export default function ModelDetailsPanel(props: Props) {
	const [isBfConfigEditFormVisible, setBfConfigEditFormVisible] = useState(false);

	return (
		<div className={`flex flex-row p-1 px-2 ${props.className}`}>
			<div className={`flex w-72 flex-col p-1 px-2`}>
				<div className="flex justify-between">
					<b>{props.model.title}</b>
					<span>{props.model.optionsShort}</span>
				</div>
				<i>{props.model.comment}</i>
				<div className={`bg-military-500 flex flex-col rounded p-1 px-2 ${props.className}`}>
					{props.model.options.map((option) => (
						<div key={option.id} className="flex flex-col">
							<div className="flex space-x-2">
								<span className="text-military-100">{option.specTitle}:</span>
								<span>{option.title}</span>
							</div>
							{option.comment && <i>{"  " + option.comment}</i>}
						</div>
					))}
				</div>
				<div className="mt-2">
					<Button variant="secondary" onClick={() => setBfConfigEditFormVisible(true)}>
						прикріпити дамп
					</Button>
				</div>
			</div>
			{isBfConfigEditFormVisible && (
				<BfDumpEditForm
					className="ml-3 p-3"
					model={props.model}
					onCanceled={() => setBfConfigEditFormVisible(false)}
					onSaved={() => setBfConfigEditFormVisible(false)}
				/>
			)}
		</div>
	);
}
