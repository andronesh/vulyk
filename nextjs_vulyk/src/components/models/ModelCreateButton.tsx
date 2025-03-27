"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ModelCreateForm from "./ModelCreateForm";
import { Button } from "../ui/button";

type Props = {
	className?: string;
};

export default function ModelCreateButton(props: Props) {
	const [isModelCreateFormVisible, setModelCreateFormVisible] = useState(false);

	return (
		<div className={`${props.className}`}>
			<Button variant="ghost" size="sm" onClick={() => setModelCreateFormVisible(true)}>
				створити модель
			</Button>
			<Dialog open={isModelCreateFormVisible} onOpenChange={() => setModelCreateFormVisible(false)}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Нова характеристика</DialogTitle>
					</DialogHeader>
					<ModelCreateForm
						onCreated={() => setModelCreateFormVisible(false)}
						onCanceled={() => setModelCreateFormVisible(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
