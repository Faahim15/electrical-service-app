import { scale, verticalScale } from "@/src/utils/Scaling";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View
      className="flex-row border-2 border-[#E2E8F0] items-center bg-white rounded-2xl"
      style={{
        paddingHorizontal: scale(20),
        height: verticalScale(52),
      }}
    >
      <Ionicons name="search-outline" size={18} color="#9CA3AF" />
      <TextInput
        style={{ flex: 1, marginLeft: 8, fontSize: 14, color: "#1F2937" }}
        placeholder="Search services, activity, actions..."
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
    </View>
  );
}
