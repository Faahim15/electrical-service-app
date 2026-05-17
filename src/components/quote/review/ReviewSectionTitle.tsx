import React from "react";
import { Text } from "react-native";

export const ReviewSectionTitle = ({ title }: { title: string }) => (
  <Text className="text-[#60A5FA] text-[12px] font-Inter_SemiBold uppercase tracking-widest mb-2 mt-2">
    {title}
  </Text>
);
