import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

type StepProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export default function StepProgressBar({
  currentStep,
  totalSteps = 8,
}: StepProgressBarProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View className="px-[4%] py-[3%] mt-[1%] ">
      {/* Labels */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-[#64748B] text-[13px] font-Inter_Medium">
          Step {currentStep} of {totalSteps}
        </Text>
        <Text className="text-[#0EA5E9] text-[13px] font-Inter_SemiBold">
          {percentage}%
        </Text>
      </View>

      {/* Track */}
      <View className="w-full h-[6px] bg-[#E2E8F0] rounded-full overflow-hidden">
        <Animated.View style={{ width: widthInterpolated, height: "100%" }}>
          <LinearGradient
            colors={["#0EA5E9", "#14B8A6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1, borderRadius: 999 }}
          />
        </Animated.View>
      </View>
    </View>
  );
}
