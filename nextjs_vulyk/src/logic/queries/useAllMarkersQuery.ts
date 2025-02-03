import { useQuery } from "@tanstack/react-query";
import { listAllMarkers } from "../repo/markersRepo";

export const useAllMarkersQuery = () =>
	useQuery({
		queryKey: ["markers"],
		queryFn: async () => await listAllMarkers(),
	});
