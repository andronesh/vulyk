"use client";

import { ChangeEvent, useEffect, useState } from "react";
import InputTextLabeled from "../common/InputTextLabeled";
import ButtonLoading from "../common/ButtonLoading";
import ButtonGhost from "../common/ButtonGhost";
import { BfDumpEntity, BfDumpFormData, ModelEntity } from "@/utils/db/schema";
import InputTextareaLabeled from "../common/InputTextareaLabeled";
import { insertDump } from "@/logic/repo/dumpsRepo";

type Props = {
	model?: ModelEntity;
	className?: string;
	onCanceled: () => void;
	onSaved: (savedDumpId: number) => void;
};

export default function BfDumpEditForm(props: Props) {
	const [isSavingInProgress, setSavingInProgress] = useState(false);

	const [newBfDumpFormData, setNewBfDumpFormData] = useState<Partial<BfDumpEntity>>({
		bfVersion: "",
		boardName: "",
		boardManuf: "",
		title: "",
		content: "",
		comment: "",
		modelId: props.model?.id,
	});

	useEffect(() => {
		if (newBfDumpFormData?.content) {
			parseBfDump();
		}
	}, [newBfDumpFormData?.content]); // eslint-disable-line react-hooks/exhaustive-deps

	const updateTextValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (event.target.value) {
			setNewBfDumpFormData((prevData) => {
				return { ...prevData, [event.target.name]: event.target.value?.trim() };
			});
		}
	};

	const parseBfDump = () => {
		if (!newBfDumpFormData?.content) {
			return;
		}
		console.info("Parsing data from", newBfDumpFormData?.content);
		const dumpLines = newBfDumpFormData?.content.split("\n");
		let bfVersionParsed = false;
		let boardNameParsed = false;
		let boardManufParsed = false;
		for (let i = 0; i < dumpLines.length; i++) {
			const line = dumpLines[i];
			if (line.startsWith("# version")) {
				const versionLine = dumpLines[i + 1];
				const regex = /\b(\d+\.\d+\.\d+)\s+(?=Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/;

				const match = versionLine.match(regex);
				if (match) {
					setNewBfDumpFormData((prevData) => {
						return { ...prevData, bfVersion: match[1] };
					});
					bfVersionParsed = true;
				}
			} else if (line.startsWith("board_name")) {
				const lineParts = dumpLines[i].split(" ");
				if (lineParts.length > 1) {
					setNewBfDumpFormData((prevData) => {
						return { ...prevData, boardName: lineParts[1].trim() };
					});
					boardNameParsed = true;
				}
			} else if (line.startsWith("manufacturer_id")) {
				const lineParts = dumpLines[i].split(" ");
				if (lineParts.length > 1) {
					setNewBfDumpFormData((prevData) => {
						return { ...prevData, boardManuf: lineParts[1].trim() };
					});
					boardManufParsed = true;
				}
			}
			if (bfVersionParsed && boardNameParsed && boardManufParsed) {
				break;
			}
		}
	};

	const validateBfDump = (): BfDumpFormData | undefined => {
		if (!newBfDumpFormData.content || newBfDumpFormData.content.trim() === "") {
			window.alert(`Поле "дамп" не може бути пустим`); // TODO show it as message inside form
			return undefined;
		}
		if (!newBfDumpFormData.title || newBfDumpFormData.title.trim() === "") {
			window.alert(`Поле "назва" не може бути пустим`); // TODO show it as message inside form
			return undefined;
		}
		if (!newBfDumpFormData.bfVersion || newBfDumpFormData.bfVersion.trim() === "") {
			window.alert(`Поле "версія BF" не може бути пустим`); // TODO show it as message inside form
			return undefined;
		}
		if (!newBfDumpFormData.boardManuf || newBfDumpFormData.boardManuf.trim() === "") {
			window.alert(`Поле "виробник FC" не може бути пустим`); // TODO show it as message inside form
			return undefined;
		}
		if (!newBfDumpFormData.boardName || newBfDumpFormData.boardName.trim() === "") {
			window.alert(`Поле "модель FC" не може бути пустим`); // TODO show it as message inside form
			return undefined;
		}
		return newBfDumpFormData as BfDumpFormData;
	};

	const saveBfDump = () => {
		const validDump = validateBfDump();
		if (!validDump) {
			return;
		}
		setSavingInProgress(true);
		insertDump(validDump)
			.then((insertedDumpId) => {
				props.onSaved(insertedDumpId);
			})
			.catch((error) => {
				console.error(`Failed to insert dump`, error);
				window.alert(error);
			})
			.finally(() => setSavingInProgress(false));
	};

	return (
		<div className={`dark:bg-military-600 flex flex-col rounded-sm ${props.className} space-y-3`}>
			<InputTextareaLabeled
				label={"дамп"}
				name={"content"}
				value={newBfDumpFormData?.content}
				rows={13}
				onChange={updateTextValue}
			/>
			<InputTextLabeled
				label="назва"
				name="title"
				value={newBfDumpFormData?.title}
				placeholder="дефолтний бекап"
				onChange={updateTextValue}
			/>
			<InputTextareaLabeled
				label="коментар"
				name="comment"
				value={newBfDumpFormData?.comment ? newBfDumpFormData?.comment : undefined}
				onChange={updateTextValue}
			/>
			<div className="flex flex-row space-x-3">
				<InputTextLabeled
					label="версія BF"
					name="bfVersion"
					value={newBfDumpFormData?.bfVersion}
					disabled={true}
				/>

				<InputTextLabeled
					label={"виробник FC"}
					name={"boardManuf"}
					value={newBfDumpFormData?.boardManuf}
					disabled={true}
				/>
			</div>
			<InputTextLabeled
				label="модель FC"
				name="boardName"
				value={newBfDumpFormData?.boardName}
				disabled={true}
			/>
			<div className="mt-3 flex flex-row justify-between">
				<ButtonGhost title="скасувати" onClick={() => props.onCanceled()} />
				<ButtonLoading
					title="зберегти"
					loadingTitle="зберігається ..."
					isLoading={isSavingInProgress}
					onClick={saveBfDump}
				/>
			</div>
		</div>
	);
}
