import React from "react";
import { Text, TouchableOpacity } from "react-native";
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
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="flex-row items-center justify-center border border-gray-200 bg-white rounded-2xl"
      style={{ height: 52 }}
    >
      <CustomSvg xml={svgXml} width={20} height={20} />
      <Text className="ml-3 font-Inter_Medium text-sm text-gray-800">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default SocialButton;
