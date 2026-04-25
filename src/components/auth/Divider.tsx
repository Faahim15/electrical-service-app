import React from "react";
import { Text, View } from "react-native";

const Divider = ({ title }: { title: string }) => {
  return (
    <View className="flex-row items-center my-5">
      <View className="flex-1 h-[1px] bg-gray-300" />
      <Text className="mx-3 font-Inter_Regular text-xs text-gray-400">
        {title}
      </Text>
      <View className="flex-1 h-[1px] bg-gray-300" />
    </View>
  );
};

export default Divider;
