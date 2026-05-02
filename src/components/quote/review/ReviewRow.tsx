import React from "react";
import { Text, View } from "react-native";

export const ReviewRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <View
    className="bg-white rounded-2xl px-4 py-4 mb-3"
    style={{
      shadowColor: "#94A3B8",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.07,
      shadowRadius: 4,
      elevation: 1,
    }}
  >
    <Text className="text-[#94A3B8] text-[11.5px] font-Inter_Medium mb-1">
      {label}
    </Text>
    <Text className="text-[#1E293B] text-[14px] font-Inter_SemiBold">
      {value || "None provided"}
    </Text>
  </View>
);
