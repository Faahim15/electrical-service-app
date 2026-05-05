import React from "react";
import { Text, View } from "react-native";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

const AuthHeading = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <View>
      <Text className="font-Inter_Bold text-3xl mt-[2%] text-[#0F172A] mb-2">
        {title}
      </Text>

      {/* Subheading */}
      {subtitle && (
        <Text className="font-Inter_Regular text-sm text-[#475569] mb-[5%] leading-5">
          {subtitle}
        </Text>
      )}
    </View>
  );
};

export default AuthHeading;
