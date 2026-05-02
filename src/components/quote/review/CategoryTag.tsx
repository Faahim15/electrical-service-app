import React from "react";
import { Text, View } from "react-native";

export const CategoryTag = ({ title }: { title: string }) => (
  <View className="self-start mb-4">
    <View
      className="px-3 py-[6px] rounded-full"
      style={{
        backgroundColor: "#EEF9FF",
        borderWidth: 1,
        borderColor: "#BAE6FD",
      }}
    >
      <Text className="text-[#0EA5E9] text-[12.5px] font-Inter_Medium">
        {title}
      </Text>
    </View>
  </View>
);
