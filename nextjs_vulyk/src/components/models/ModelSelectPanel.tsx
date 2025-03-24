"use client";

import { SpecEntity } from "@/utils/db/schema";
import { useEffect, useState } from "react";
import Spinner from "../common/Spinner";
import { useAllSpecsQuery } from "@/logic/queries/useAllSpecsQuery";
import SpecsListElement from "../specs/SpecsListElement";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type Props = {
	className?: string;
};

export default function ModelSelectPanel(props: Props) {
	const { data: allSpecs, isFetching, isError } = useAllSpecsQuery();
	const [selectedSpecs, setSelectedSpecs] = useState<SpecEntity[]>([]);
	const [availableToSelectSpecs, setAvailableToSelectSpecs] = useState<SpecEntity[]>([]);

	useEffect(() => {
		if (allSpecs) {
			setAvailableToSelectSpecs(
				allSpecs.filter((spec) => selectedSpecs.findIndex((sp) => sp.id === spec.id) < 0),
			);
		}
	}, [allSpecs]);

	const selectSpec = (selectedSpec: SpecEntity) => {
		setSelectedSpecs((prev) => [...prev, selectedSpec]);
		setAvailableToSelectSpecs((prev) => prev.filter((spec) => spec.id !== selectedSpec.id));
	};

	const unselectSpec = (spec: SpecEntity) => {
		setSelectedSpecs((prev) => prev.filter((element) => element.id !== spec.id));
		setAvailableToSelectSpecs((prev) => [...prev, spec]);
	};

	return (
		<div className={`${props.className}`}>
			<span className="">Пошук моделі:</span>
			<div className="flex flex-col">
				{selectedSpecs.map((spec) => (
					<SpecsListElement key={spec.id} spec={spec} isSelected={false} onClick={unselectSpec} />
				))}
				<div className="flex w-full justify-center pt-1">
					{isError && (
						<div className="rounded-sm bg-red-700 p-2 text-lg text-white">
							Не вдалось завантажити список характеристик з бази данних
						</div>
					)}
					{isFetching && <Spinner />}
					{!isFetching && !isError && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="secondary" disabled={availableToSelectSpecs.length === 0}>
									вибрати характеристику
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								{availableToSelectSpecs?.map((spec) => (
									<DropdownMenuItem
										key={spec.id}
										className="hover:cursor-pointer"
										onClick={() => selectSpec(spec)}
									>
										<span>
											<b>{spec.title}</b>
											{spec.description && (
												<span className="pt-0 text-xs italic">{"  (" + spec.description + ")"}</span>
											)}
										</span>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
			</div>
		</div>
	);
}
