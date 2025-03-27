import { useQuery } from "@tanstack/react-query";
import { listAllDroneGroups } from "../repo/droneGroupsRepo";

export const useAllDroneGroupsQuery = () =>
	useQuery({
		queryKey: ["droneGroups"],
		queryFn: async () => await listAllDroneGroups(),
	});
