"use client";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

type Props = {
	title: string;
	isOpen: boolean;
	onCancel?: () => void;
	onConfirm: () => void;
	className?: string;
};

export default function ConfirmationDialog(props: Props) {
	// const [isCreateOptionDialogOpen, setCreateOptionDialogOpen] = useState(false);

	return (
		<Dialog open={props.isOpen} onOpenChange={props.onCancel}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{props.title}</DialogTitle>
				</DialogHeader>

				<DialogFooter>
					<Button variant="ghost" onClick={props.onCancel}>
						скасувати
					</Button>
					<Button variant="destructive" onClick={props.onConfirm}>
						таки видалити
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
