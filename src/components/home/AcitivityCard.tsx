import { ActivityItem } from "@/src/types/tabs.home.types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function ActivityCard({ item }: { item: ActivityItem }) {
  return (
    <Pressable
      className="bg-white rounded-2xl px-4 py-3 mb-3 flex-row items-center"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
      }}
      onPress={() =>
        router.push({
          pathname: "/recent-activity/details",
          params: {
            id: item.id,
            icon: item.icon,
            title: item.title,
            subtitle: item.subtitle,
            badge: item.badge ?? "",
            badgeColor: item.badgeColor ?? "",
          },
        })
      }
    >
      <View className="w-9 h-9 rounded-full bg-[#E0F2FE] items-center justify-center mr-3">
        <Ionicons name={item.icon} size={18} color="#00ABB0" />
      </View>
      <View className="flex-1">
        <Text className="font-Inter_SemiBold text-sm text-gray-800">
          {item.title}
        </Text>
        <Text className="font-Inter_Regular text-xs text-gray-400 mt-0.5">
          {item.subtitle}
        </Text>
      </View>
      {item.badge && (
        <View
          className="px-2 py-0.5 rounded-full mr-2"
          style={{ backgroundColor: item.badgeColor + "20" }}
        >
          <Text
            className="font-Inter_Medium text-xs"
            style={{ color: item.badgeColor }}
          >
            {item.badge}
          </Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
    </Pressable>
  );
}
