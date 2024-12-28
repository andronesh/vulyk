import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIconFA(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarIconFA6(props: { name: React.ComponentProps<typeof FontAwesome6>["name"]; color: string }) {
	return <FontAwesome6 size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
				// Disable the static render of the header on web
				// to prevent a hydration error in React Navigation v6.
				headerShown: useClientOnlyValue(false, true),
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Вибране",
					tabBarIcon: ({ color }) => <TabBarIconFA name="bookmark" color={color} />,
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="locations"
				options={{
					title: "Місця",
					tabBarIcon: ({ color }) => <TabBarIconFA6 name="location-dot" color={color} />,
					headerRight: () => (
						<Link href="/modal" asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name="plus"
										size={25}
										color={Colors[colorScheme ?? "light"].text}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
			<Tabs.Screen
				name="drones"
				options={{
					title: "Дрони",
					tabBarIcon: ({ color }) => <TabBarIconFA6 name="dove" color={color} />,
				}}
			/>
			<Tabs.Screen
				name="properties"
				options={{
					title: "Параметри",
					tabBarIcon: ({ color }) => <TabBarIconFA6 name="clipboard-list" color={color} />,
				}}
			/>
		</Tabs>
	);
}
