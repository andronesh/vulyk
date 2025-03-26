"use client";

import { SpecEntity, SpecOptionEntity } from "@/utils/db/schema";
import { useSpecOptionsQuery } from "@/logic/queries/useSpecOptionsQuery";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type Props = {
	spec: SpecEntity;
	onOptionSelected: (option: SpecOptionEntity) => void;
	className?: string;
};

export default function SpecOptionSelector(props: Props) {
	const { data: options } = useSpecOptionsQuery(props.spec.id!);

	const showDescription = () => {
		window.alert(props.spec.description);
	};

	const onSelectorValueChange = (optionId: string) => {
		const selectedOption = options?.find((option) => option.id?.toString() === optionId);
		if (selectedOption) {
			props.onOptionSelected(selectedOption);
		}
	};

	return (
		<div className={`flex w-full items-center justify-between p-1 ${props.className}`}>
			<span className="flex flex-row">
				{props.spec.title}
				{props.spec.description && (
					<svg
						className="text-military-200 hover:text-meadow-800 mt-1 ml-2 h-4 w-4 shrink-0 transition duration-75 hover:cursor-pointer"
						onClick={showDescription}
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM10.3027 13.3942C10.2316 13.7147 10.5038 14 10.8479 14H13.0406C13.2979 14 13.5151 13.8351 13.6064 13.6061C13.697 13.3789 14.0117 12.9674 14.254 12.7518C14.4827 12.5112 14.7213 12.2848 14.9563 12.0618C15.8824 11.183 16.754 10.356 16.754 8.91047C16.754 6.40301 14.582 5 12.2707 5C10.5038 5 8.06416 5.80604 7.58396 8.50363C7.48716 9.04737 7.94773 9.5 8.50002 9.5H9.91229C10.4388 9.5 10.8312 9.07642 11.0121 8.582C11.1863 8.10604 11.5379 7.7551 12.2707 7.7551C13.6066 7.7551 13.6064 9.22371 12.8346 10.1843C12.5434 10.5467 12.2023 10.8677 11.8648 11.1853C11.1798 11.8298 10.5098 12.4602 10.3027 13.3942ZM13.9999 17C13.9999 18.1046 13.1045 19 11.9999 19C10.8954 19 9.99994 18.1046 9.99994 17C9.99994 15.8954 10.8954 15 11.9999 15C13.1045 15 13.9999 15.8954 13.9999 17Z" />
					</svg>
				)}
			</span>
			<Select onValueChange={onSelectorValueChange}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="вибрати варіант" />
				</SelectTrigger>
				<SelectContent>
					{options?.map((option) => (
						<SelectItem key={option.id} value={option.id!.toString()}>
							{option.title}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
