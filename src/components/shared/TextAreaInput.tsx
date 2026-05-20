import { scale } from "@/src/utils/Scaling";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface TextAreaInputProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChangeText: (text: string) => void;
  numberOfLines?: number;
  minHeight?: number;
  textInputProps?: Omit<
    TextInputProps,
    "value" | "onChangeText" | "placeholder" | "multiline" | "numberOfLines"
  >;
}

const TextAreaInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  numberOfLines = 6,
  minHeight = 140,
  textInputProps,
}: TextAreaInputProps) => {
  return (
    <View className="mb-5">
      <Text className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold mb-2">
        {label}
      </Text>
      <TextInput
        multiline
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        placeholder={placeholder}
        placeholderTextColor="#AABCD0"
        value={value}
        onChangeText={onChangeText}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: scale(12),
          borderWidth: 1.5,
          borderColor: "#E2E8F0",
          padding: 14,
          minHeight,
          fontFamily: "Inter-Regular",
          fontSize: 13.5,
          color: "#1E293B",
          shadowColor: "#94A3B8",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.07,
          shadowRadius: 4,
          elevation: 1,
        }}
        {...textInputProps}
      />
    </View>
  );
};

export default TextAreaInput;
