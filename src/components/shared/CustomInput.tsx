import { verticalScale } from "@/src/utils/Scaling";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

type CustomInputProps = {
  label?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  textInputConfig?: TextInputProps;
  labelColor?: string;
  error?: string;
};

export default function CustomInput({
  label,
  leftIcon,
  labelColor = "#0F172A",
  textInputConfig = {},
  error,
}: CustomInputProps) {
  const isPassword = textInputConfig.secureTextEntry;
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Updated border logic to use #E2E8F0
  const borderColor = error
    ? "border-red-500"
    : isFocused
      ? "border-[#12B7AB]"
      : "border-[#E2E8F0]";

  return (
    <View className="mb-2">
      {/* Label */}
      {label ? (
        <Text
          style={{ color: labelColor }}
          className="font-Inter_Regular text-sm mb-1"
        >
          {label.replace(" *", "")}
          {label.includes(" *") && <Text style={{ color: "#EF4444" }}> *</Text>}
        </Text>
      ) : null}

      {/* Input Wrapper - Background changed to bg-white */}
      <View
        className={`flex-row items-center border ${borderColor} bg-white rounded-2xl px-3`}
        style={{ minHeight: verticalScale(58) }}
      >
        {/* Left Icon */}
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={18}
            color="#6C6C70"
            style={{ marginRight: 8 }}
          />
        )}

        {/* Text Input */}
        <TextInput
          {...textInputConfig}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor="#898989"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 font-Inter_Regular text-sm text-black"
        />

        {/* Eye Icon */}
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={18}
              color="#6C6C70"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text className="text-red-500 font-Inter_Regular text-xs mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}
