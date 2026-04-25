import {
    help,
    home,
    partners,
    profile,
    quotes,
} from "@/assets/images/svg/tabs-svg";
import { router, Tabs, usePathname } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";

const tabs = [
  { name: "home", route: "/(tabs)/home", icon: home, label: "Home" },
  { name: "quotes", route: "/(tabs)/quotes", icon: quotes, label: "Quotes" },
  { name: "help", route: "/(tabs)/help", icon: help, label: "Help" },
  {
    name: "partners",
    route: "/(tabs)/partners",
    icon: partners,
    label: "Partners",
  },
  {
    name: "profile",
    route: "/(tabs)/profile",
    icon: profile,
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
            <SvgXml
              xml={tab.icon}
              width={22}
              height={22}
              color={focused ? "#00ABB0" : "#9CA3AF"}
            />
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
  );
}
