import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import React from "react";
import { View } from "react-native";

export default function ContactDetails() {
  return (
    <ScreenWrapper paddingHorizontal={20}>
      <View>
        <StepProgressBar currentStep={1} totalSteps={8} />
      </View>
    </ScreenWrapper>
  );
}
