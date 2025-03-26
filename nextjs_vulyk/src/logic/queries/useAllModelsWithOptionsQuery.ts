import { useQuery } from "@tanstack/react-query";
import { listAllModelsWithOptions } from "../repo/modelsRepo";

export const useAllModelsWithOptionsQuery = () =>
	useQuery({
		queryKey: ["models"],
		queryFn: async () => await listAllModelsWithOptions(),
	});
