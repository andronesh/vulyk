import { create } from "zustand";

export type Location = {
	id: number;
	title: string;
};

interface LocationState {
	locations: Location[];
	addLocation: (location: Location) => void;
	removeLocation: (id: number) => void;
}

export const useLocationStore = create<LocationState>((set, get) => ({
	locations: [],

	addLocation: (location: Location) =>
		set((state) => ({
			locations: [...state.locations, location],
		})),

	removeLocation: (id: number) =>
		set((state) => ({
			locations: state.locations.filter((location) => location.id !== id),
		})),
}));
