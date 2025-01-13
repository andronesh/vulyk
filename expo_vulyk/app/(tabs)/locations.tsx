import { Button, FlatList, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";

import { useLocationStore } from "@/logic/store/useLocationStore";
import { useEffect, useState } from "react";
import InputTextThemed from "@/components/common/InputTextThemed";

export default function LocationsScreen() {
	const { locations, loadLocations, addLocation, removeLocation } = useLocationStore();

	const [newLocationTitle, setNewLocationTitle] = useState<string>("");

	useEffect(() => {
		loadLocations();
	}, []);

	const handleAddLocation = () => {
		if (newLocationTitle) {
			addLocation(newLocationTitle);
			setNewLocationTitle("");
		}
	};

	const handleRemoveLocation = (id: number) => {
		removeLocation(id);
	};

	return (
		<View style={styles.container}>
			<View style={styles.editForm}>
				<InputTextThemed style={styles.input} onChangeText={setNewLocationTitle} value={newLocationTitle} />
				<Button title="Зберегти" onPress={handleAddLocation} />
			</View>
			<FlatList
				data={locations}
				renderItem={({ item }) => (
					<View style={styles.listItem}>
						<Text style={styles.listItemTitle}>{item.title}</Text>
						<Button title="Видалити" onPress={() => handleRemoveLocation(item.id)} />
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	editForm: {
		display: "flex",
		flexDirection: "row",
	},
	input: {
		width: "70%",
	},
	listItem: {
		flexDirection: "row",
		alignItems: "center",
	},
	listItemTitle: {
		fontSize: 18,
	},
});
