import { Ionicons } from "@expo/vector-icons";
import { router, Tabs, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const tabs = [
  { name: "home", route: "/(tabs)/home", icon: "home", label: "Home" },
  {
    name: "quotes",
    route: "/(tabs)/quotes",
    icon: "document-text",
    label: "Quotes",
  },
  { name: "help", route: "/(tabs)/help", icon: "build", label: "Help" },
  {
    name: "partners",
    route: "/(tabs)/partners",
    icon: "people",
    label: "Partners",
  },
  {
    name: "profile",
    route: "/(tabs)/profile",
    icon: "person",
    label: "Profile",
  },
];

function CustomTabBar() {
  const pathname = usePathname();

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 72,
        backgroundColor: "#ffffff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        borderTopWidth: 1,
        borderTopColor: "#F0F0F0",
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        paddingHorizontal: 8,
        paddingBottom: 8,
      }}
    >
      {tabs.map((tab) => {
        const focused = pathname.includes(tab.name);
        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.push(tab.route as any)}
            activeOpacity={0.8}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <View
              style={{
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                width: 46,
                height: 30,
                borderRadius: 15,
                backgroundColor: focused ? "#E0F7F7" : "transparent",
              }}
            >
              {focused && (
                <View
                  style={{
                    position: "absolute",
                    top: -10,
                    width: 18,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: "#00ABB0",
                  }}
                />
              )}
              <Ionicons
                name={(focused ? tab.icon : `${tab.icon}-outline`) as any}
                size={22}
                color={focused ? "#00ABB0" : "#9CA3AF"}
              />
            </View>

            <Text
              style={{
                fontSize: 10,
                fontFamily: focused ? "Inter-SemiBold" : "Inter-Regular",
                color: focused ? "#00ABB0" : "#9CA3AF",
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function Layout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <Tabs
        tabBar={() => <CustomTabBar />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="home" />
        <Tabs.Screen name="quotes" />
        <Tabs.Screen name="help" />
        <Tabs.Screen name="partners" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </>
  );
}
