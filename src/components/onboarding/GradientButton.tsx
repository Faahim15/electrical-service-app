import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, Text } from "react-native";

interface GradientButtonProps {
  label: string;
  onPress?: () => void;
}

export const GradientButton = ({ label, onPress }: GradientButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-2xl overflow-hidden mb-3"
      style={{
        shadowColor: "#0EA5E9",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 6,
      }}
    >
      <LinearGradient
        colors={["#0EA5E9", "#14B8A6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="py-4 items-center"
      >
        <Text
          className="font-Inter_SemiBold text-white"
          style={{ fontSize: 16 }}
        >
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};
