import { forgotPasswordGuardIcon } from "@/assets/images/svg/auth-svg";
import { scale, verticalScale } from "@/src/utils/Scaling";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, Text, ViewStyle } from "react-native";
import CustomSvg from "../shared/CustomSvg";

interface AuthFooterProps {
  title?: string;
  subtitle?: string;

  start?: { x: number; y: number };
  end?: { x: number; y: number };

  // Container Style
  containerStyle?: StyleProp<ViewStyle>;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;

  // Spacing
  paddingHorizontal?: number;
  paddingVertical?: number;
  gap?: number;
  marginTop?: number;

  // Icon
  iconXml?: string;
  iconWidth?: number;
  iconHeight?: number;
}

export default function AuthFooter({
  title = "Please use the email linked to your account.",

  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },

  subtitle,
  // Border
  borderColor = "#CEFAFE",
  borderWidth = scale(1),
  borderRadius = scale(16),

  // Spacing
  paddingHorizontal = scale(17),
  paddingVertical = verticalScale(17),
  gap = verticalScale(12),
  marginTop = verticalScale(24),

  // Icon
  iconXml = forgotPasswordGuardIcon,
  iconWidth = scale(32),
  iconHeight = verticalScale(32),

  // Custom Style
  containerStyle,
}: AuthFooterProps) {
  return (
    <LinearGradient
      colors={["#EFF6FF", "#ECFEFF"]}
      start={start}
      end={end}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          columnGap: gap,
          borderWidth,
          borderColor,
          paddingHorizontal,
          paddingVertical,
          borderRadius,
          marginTop,
        },
        containerStyle,
      ]}
    >
      <CustomSvg xml={iconXml} width={iconWidth} height={iconHeight} />

      <Text className="font-Inter_Regular text-sm text-[#475569] flex-1">
        {title}{" "}
        {subtitle && (
          <Text className="font-Inter_SemiBold text-sm text-[#0d0d0d] ">
            {subtitle}
          </Text>
        )}
      </Text>
    </LinearGradient>
  );
}
