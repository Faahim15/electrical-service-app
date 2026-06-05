import React from "react";
import { Pressable, Text } from "react-native";
import CustomSvg from "../shared/CustomSvg";

const SocialButton = ({
  onPress,
  label,
  svgXml,
}: {
  onPress: () => void;
  label: string;
  svgXml: string;
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-center border border-gray-200 bg-white rounded-2xl"
      style={{ height: 52 }}
    >
      <CustomSvg xml={svgXml} width={20} height={20} />
      <Text className="ml-3 font-Inter_Medium text-sm text-gray-800">
        {label}
      </Text>
    </Pressable>
  );
};

export default SocialButton;
