import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updatePanelUpgradeDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function AdditionalInfo() {
  const dispatch = useDispatch();

  const additionalInfo = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "3" && data.details)
      return data.details.additionalInfo;
    return "";
  });
  return (
    <ScreenWrapper paddingHorizontal={20}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <BackButton />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <StepProgressBar currentStep={8} totalSteps={9} />

          {/* Category Tag */}

          <CategoryTag title="Panel Upgrade / Replacement" />

          <AuthHeading
            title="Additional information"
            subtitle="Any other details we should know"
          />

          {/* Text Area */}
          <TextAreaInput
            label="Additional Information"
            placeholder="Any additional information you feel we should know..."
            value={additionalInfo}
            onChangeText={(text) =>
              dispatch(updatePanelUpgradeDetails({ additionalInfo: text }))
            }
            minHeight={120}
          />

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/common/review-request")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
