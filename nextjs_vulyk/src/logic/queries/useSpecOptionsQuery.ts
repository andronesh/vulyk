import { useQuery } from "@tanstack/react-query";
import { listAllSpecOptions } from "../repo/specsRepo";

export const useSpecOptionsQuery = (specId: number) =>
	useQuery({
		queryKey: ["specs", specId, "options"],
		queryFn: async () => await listAllSpecOptions(specId),
	});
