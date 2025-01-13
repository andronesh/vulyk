import { create } from "zustand";
import { deleteLocation, getLocations, insertLocation } from "../repo/locationsRepo";

export type Location = {
	id: number;
	title: string;
};

interface LocationState {
	locations: Location[];
	loadLocations: () => void;
	addLocation: (title: string) => void;
	removeLocation: (id: number) => void;
}

export const useLocationStore = create<LocationState>((set, get) => ({
	locations: [],

	loadLocations: async () => {
		const data = await getLocations();
		set({ locations: data });
	},

	addLocation: async (title: string) => {
		const result = await insertLocation(title);
		if (result.changes > 0) {
			const insertedLocation = {
				id: result.lastInsertRowId,
				title,
			};
			set((state) => ({
				locations: [...state.locations, insertedLocation],
			}));
		} else {
			// TODO should error be thrown?
		}
	},

	removeLocation: async (id: number) => {
		deleteLocation(id);
		await getLocations();
		set((state) => ({
			locations: state.locations.filter((location) => location.id !== id),
		}));
	},
}));
