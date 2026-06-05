// src/components/shared/GradientPressable.tsx
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, Text } from "react-native";

const GRADIENT_COLORS = [
  "#0EA5E9",
  "#0CA7E4",
  "#0AA8E0",
  "#09AADB",
  "#08ABD7",
  "#07ADD2",
  "#07AECD",
  "#08AFC9",
  "#08B1C4",
  "#0AB2BF",
  "#0BB3BA",
  "#0DB5B5",
  "#10B6B0",
  "#12B7AB",
  "#14B8A6",
] as const;

interface GradientPressableProps {
  label: string;
  onPress?: () => void;
  style?: object;
}

export const GradientPressable = ({
  label,
  onPress,
  style,
}: GradientPressableProps) => (
  <Pressable
    onPress={onPress}
    style={[{ borderRadius: 12, overflow: "hidden" }, style]}
  >
    <LinearGradient
      colors={GRADIENT_COLORS}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        paddingVertical: 12,
        alignItems: "center",
      }}
    >
      <Text className="text-white text-[13.5px] font-Inter_SemiBold">
        {label}
      </Text>
    </LinearGradient>
  </Pressable>
);
