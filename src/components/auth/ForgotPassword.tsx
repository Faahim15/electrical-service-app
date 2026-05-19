import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface ForgotPasswordProps {
  title: string;
  subtitle: string;
  onPress?: () => void;
}

const ForgotPassword = ({ title, subtitle, onPress }: ForgotPasswordProps) => {
  const [rememberMe, setRememberMe] = useState(false);
  return (
    <View className="flex-row items-center justify-between mb-[5%] mt-1">
      <Pressable
        onPress={() => setRememberMe((prev) => !prev)}
        className="flex-row items-center gap-2"
      >
        <View
          className={`w-4 h-4 rounded border ${
            rememberMe
              ? "bg-[#00ABB0] border-[#00ABB0]"
              : "border-gray-400 bg-white"
          } items-center justify-center`}
        >
          {rememberMe && <Ionicons name="checkmark" size={10} color="white" />}
        </View>
        <Text className="font-Inter_Regular text-sm text-gray-600">
          {title}
        </Text>
      </Pressable>

      <Pressable onPress={onPress}>
        <Text className="font-Inter_Medium text-sm text-[#00ABB0]">
          {subtitle}
        </Text>
      </Pressable>
    </View>
  );
};

export default ForgotPassword;
