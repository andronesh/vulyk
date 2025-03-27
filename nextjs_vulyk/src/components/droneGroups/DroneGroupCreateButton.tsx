"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import DroneGroupCreateForm from "./DroneGroupCreateForm";

type Props = {
	className?: string;
};

export default function DroneGroupCreateButton(props: Props) {
	const [isCreateOptionDialogOpen, setCreateOptionDialogOpen] = useState(false);

	return (
		<div className={`flex justify-around ${props.className}`}>
			<Button variant="secondary" onClick={() => setCreateOptionDialogOpen(true)}>
				додати групу
			</Button>
			<Dialog open={isCreateOptionDialogOpen} onOpenChange={setCreateOptionDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>нова група дронів</DialogTitle>
					</DialogHeader>
					<DroneGroupCreateForm
						onCreated={() => setCreateOptionDialogOpen(false)}
						onCanceled={() => setCreateOptionDialogOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
