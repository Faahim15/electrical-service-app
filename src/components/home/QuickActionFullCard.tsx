import { QuickAction } from "@/src/types/tabs.home.types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Linking, Pressable, Text, View } from "react-native";

export default function QuickActionFullCard({ item }: { item: QuickAction }) {
  const handlePress = () => {
    const url = item.route as string;
    if (url.startsWith("http")) {
      Linking.openURL(url);
    } else {
      router.push(item.route);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      className="bg-white rounded-2xl p-4 mb-3 flex-row items-center gap-3"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View className="w-9 h-9 rounded-full bg-[#E0F2FE] items-center justify-center">
        <Ionicons name={item.icon} size={18} color="#00ABB0" />
      </View>
      <View className="flex-1">
        <Text className="font-Inter_SemiBold text-sm text-gray-800">
          {item.title}
        </Text>
        <Text className="font-Inter_Regular text-xs text-gray-400">
          {item.subtitle}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
    </Pressable>
  );
}
