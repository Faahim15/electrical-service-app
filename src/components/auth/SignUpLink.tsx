import React from "react";
import { Pressable, Text, View } from "react-native";

interface SignUpLinkProps {
  title?: string;
  subtitle?: string;
  onPress?: () => void;
}

const SignUpLink = ({ title, subtitle, onPress }: SignUpLinkProps) => {
  return (
    <View className="flex-row justify-center mt-8">
      <Text className="font-Inter_Regular text-sm text-gray-500">{title} </Text>
      <Pressable onPress={onPress}>
        <Text className="font-Inter_SemiBold text-sm text-[#00ABB0]">
          {subtitle}
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUpLink;
