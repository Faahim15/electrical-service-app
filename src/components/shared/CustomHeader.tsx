import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CustomHeaderProps {
  title: string;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
  backgroundColor?: string;
  tintColor?: string;
  safeArea?: boolean;
}

export default function CustomHeader({
  title,
  rightAction,
  backgroundColor = "#FFFFFF",
  tintColor = "#1A1A1A",
  safeArea = false,
}: CustomHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor,
        paddingTop: safeArea && Platform.OS === "android" ? insets.top : 0,
      }}
      className="w-full"
    >
      <View className="flex-row items-center h-[56px] px-[2%]">
        {/* Left — Back Button */}
        <View className="w-12 items-start justify-center">
          <Pressable
            onPress={() => router.back()}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className="w-10 h-10 items-center justify-center rounded-full"
          >
            <Ionicons
              name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
              size={Platform.OS === "ios" ? 28 : 24}
              color={tintColor}
            />
          </Pressable>
        </View>

        {/* Center — Title */}
        <Text
          className="flex-1 text-center font-Inter_SemiBold text-[17px]"
          style={{ color: tintColor }}
          numberOfLines={1}
        >
          {title}
        </Text>

        {/* Right — Optional Action */}
        <View className="w-12 items-end justify-center">
          {rightAction && (
            <Pressable
              onPress={rightAction.onPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              className="w-10 h-10 items-center justify-center rounded-full"
            >
              <Ionicons name={rightAction.icon} size={22} color={tintColor} />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}
