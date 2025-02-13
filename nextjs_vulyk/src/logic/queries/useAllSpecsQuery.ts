import { useQuery } from "@tanstack/react-query";
import { listAllSpecs } from "../repo/specsRepo";

export const useAllSpecsQuery = () =>
	useQuery({
		queryKey: ["specs"],
		queryFn: async () => await listAllSpecs(),
	});
