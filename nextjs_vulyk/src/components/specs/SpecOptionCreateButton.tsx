"use client";

import { useState } from "react";
import { SpecEntity } from "@/utils/db/schema";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import SpecOptionCreateForm from "./SpecOptionCreateForm";

type Props = {
	spec: SpecEntity;
	className?: string;
};

export default function SpecOptionCreateButton(props: Props) {
	const [isCreateOptionDialogOpen, setCreateOptionDialogOpen] = useState(false);

	return (
		<div className="flex justify-around">
			<Button variant="secondary" onClick={() => setCreateOptionDialogOpen(true)}>
				додати варіант
			</Button>
			<Dialog open={isCreateOptionDialogOpen} onOpenChange={setCreateOptionDialogOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							Новий варіант для <b>{props.spec.title}</b>
						</DialogTitle>
					</DialogHeader>
					<SpecOptionCreateForm
						spec={props.spec}
						onCreated={() => setCreateOptionDialogOpen(false)}
						onCanceled={() => setCreateOptionDialogOpen(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
