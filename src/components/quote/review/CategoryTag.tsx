import React from "react";
import { Text, View } from "react-native";

export const CategoryTag = ({ title }: { title: string }) => (
  <View className="self-start mb-4">
    <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full min-w-32 mb-2">
      <Text className="text-sm font-Inter_Medium text-[#60A5FA]">{title}</Text>
    </View>
  </View>
);
