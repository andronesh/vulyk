import { useQuery } from "@tanstack/react-query";
import { listAllSpecGroups } from "../repo/specsRepo";

export const useAllSpecGroupsQuery = () =>
	useQuery({
		queryKey: ["spec_groups"],
		queryFn: async () => await listAllSpecGroups(),
	});
