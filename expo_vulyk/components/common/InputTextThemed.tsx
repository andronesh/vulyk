import Colors from "@/constants/Colors";
import { useColorScheme } from "../useColorScheme";
import { TextInput, StyleSheet, StyleProp, TextStyle } from "react-native";

interface Props {
	value: string | undefined;
	onChangeText: (newValue: string) => void;
	style?: StyleProp<TextStyle> | undefined;
}

export default function InputTextThemed(props: Props) {
	const colorScheme = useColorScheme();

	return (
		<TextInput
			style={[
				styles.input,
				props.style,
				{
					backgroundColor: Colors[colorScheme ?? "light"].inputBackground,
					borderColor: Colors[colorScheme ?? "light"].inputBorder,
				},
			]}
			onChangeText={props.onChangeText}
			value={props.value}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		margin: 3,
		paddingHorizontal: 6,
		borderWidth: 1,
		borderRadius: 6,
	},
});
