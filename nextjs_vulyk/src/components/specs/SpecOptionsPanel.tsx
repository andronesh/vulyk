"use client";

import { SpecEntity, SpecOptionEntity } from "@/utils/db/schema";
import Spinner from "../common/Spinner";
import { useSpecOptionsQuery } from "@/logic/queries/useSpecOptionsQuery";
import SpecOptionCreateForm from "./SpecOptionCreateForm";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import ConfirmationDialog from "../common/ConfirmationDialog";
import { deleteOption } from "@/logic/repo/specsRepo";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
	spec: SpecEntity;
	className?: string;
};

export default function SpecOptionsPanel(props: Props) {
	const queryClient = useQueryClient();
	const { data: options, isFetching, isError } = useSpecOptionsQuery(props.spec.id!);
	const [optionForDeletion, setOptionForDeletion] = useState<SpecOptionEntity | undefined>();
	const [isCreateOptionDialogOpen, setCreateOptionDialogOpen] = useState(false);

	const doDeleteOption = () => {
		deleteOption(optionForDeletion!.id)
			.then(() => {
				queryClient.invalidateQueries({ queryKey: ["specs", props.spec.id, "options"] });
				setOptionForDeletion(undefined);
			})
			.catch((error) => {
				console.error(
					`Не вдалось видалити варіант ${optionForDeletion?.title} з id=${optionForDeletion?.id}`,
					error,
				);
				window.alert(error);
			});
	};

	return (
		<div className={`${props.className}`}>
			<h2>{props.spec.title} варіанти:</h2>
			<div className="flex flex-col">
				{isError && (
					<div className="rounded-sm bg-red-700 p-2 text-lg text-white">
						Не вдалось завантажити варіанти характеристик з бази данних
					</div>
				)}
				{isFetching && <Spinner />}

				{!isFetching &&
					!isError &&
					options?.map((option) => (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<div
									key={option.id}
									className={`bg-military-500 hover:bg-meadow-600 hover:text-military-600 m-1 flex flex-col rounded-sm px-2 pt-2 pb-1 text-white duration-300 hover:cursor-pointer hover:font-bold`}
								>
									{option.title}
									{option.description && (
										<span className="truncate text-sm italic">{props.spec.description}</span>
									)}
								</div>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuItem className="hover:cursor-pointer">редагувати</DropdownMenuItem>
								<DropdownMenuItem
									className="hover:cursor-pointer"
									onClick={() => setOptionForDeletion(option as SpecOptionEntity)}
								>
									видалити
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					))}
			</div>
			<div className="flex w-full flex-row justify-center pt-2">
				<Button variant="secondary" onClick={() => setCreateOptionDialogOpen(true)}>
					додати варіант
				</Button>
			</div>
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
			<ConfirmationDialog
				isOpen={optionForDeletion !== undefined}
				title={`Точно видалити "${optionForDeletion?.title}"?`}
				onConfirm={doDeleteOption}
				onCancel={() => setOptionForDeletion(undefined)}
			/>
		</div>
	);
}
