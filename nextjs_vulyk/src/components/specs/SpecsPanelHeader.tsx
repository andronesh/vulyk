"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createSpec } from "@/logic/repo/specsRepo";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import SpecGroupCreateForm from "./SpecGroupCreateForm";
import SpecCreateForm from "./SpecCreateForm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

type Props = {
	className?: string;
};

export default function SpecsPanelHeader(props: Props) {
	const queryClient = useQueryClient();
	const [isCreateSpecFormVisible, setCreateSpecFormVisible] = useState(false);
	const [isCreateGroupFormVisible, setCreateGroupFormVisible] = useState(false);

	const doCreateSpec = async (title: string, description?: string) => {
		try {
			await createSpec(title, description);
			setCreateSpecFormVisible(false);
			queryClient.invalidateQueries({ queryKey: ["specs"] });
		} catch (error) {
			console.error(`Failed to create spec with title=${title} and description="${description}"`, error);
			window.alert(error); //TODO beautify
		}
	};

	return (
		<div className={`${props.className}`}>
			<div className="flex flex-row items-center justify-between">
				Характеристики
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="sm">
							<Plus />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuItem className="hover:cursor-pointer" onClick={() => setCreateSpecFormVisible(true)}>
							додати характеристику
						</DropdownMenuItem>
						<DropdownMenuItem className="hover:cursor-pointer" onClick={() => setCreateGroupFormVisible(true)}>
							додати групу характеристик
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Dialog open={isCreateSpecFormVisible} onOpenChange={() => setCreateSpecFormVisible(false)}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Нова характеристика</DialogTitle>
					</DialogHeader>
					<SpecCreateForm onCreate={doCreateSpec} onCancel={() => setCreateSpecFormVisible(false)} />
				</DialogContent>
			</Dialog>
			<Dialog open={isCreateGroupFormVisible} onOpenChange={() => setCreateGroupFormVisible(false)}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Нова група характеристик</DialogTitle>
					</DialogHeader>
					<SpecGroupCreateForm
						onSaved={() => setCreateGroupFormVisible(false)}
						onCanceled={() => setCreateGroupFormVisible(false)}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
