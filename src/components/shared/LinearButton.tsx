import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}
const LinearButton = ({ title, onPress, variant = "primary" }: ButtonProps) => {
  const [pressed, setPressed] = useState(false);

  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      className={`h-[54px] rounded-2xl items-center justify-center `}
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      activeOpacity={1}
    >
      {isPrimary ? (
        <LinearGradient
          colors={["#0EA5E9", "#14B8A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 14,
            paddingHorizontal: 18,
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            className={`text-[16px] font-Inter_Medium tracking-[0.2px] text-white`}
          >
            {title}
          </Text>
        </LinearGradient>
      ) : (
        <View className="bg-slate-100 border-[1.5px] border-[#DDE8EE]  w-full h-full rounded-2xl items-center justify-center">
          <Text
            className={`text-[16px] tracking-[0.2px] text-[#6B7280] font-Inter_Medium`}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default LinearButton;
