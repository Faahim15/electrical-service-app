import AuthHeading from "@/src/components/auth/AuthHeading";
import SavedEditAction from "@/src/components/common/SavedButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateAccessoryBuildingDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function AdditionalInfo() {
  const dispatch = useDispatch();

  const additionalInfo = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
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
          <StepProgressBar currentStep={11} totalSteps={12} />

          {/* Category Tag */}

          <CategoryTag title="Accessory Building Power / Shed Power" />

          <AuthHeading
            title="Additional information"
            subtitle="Any other details we should know"
          />

          {/* Text Area */}
          <TextAreaInput
            label="Additional Information"
            placeholder="any additional information you feel we should know for your quote"
            value={additionalInfo}
            onChangeText={(text) =>
              dispatch(updateAccessoryBuildingDetails({ additionalInfo: text }))
            }
            minHeight={100}
          />

          <GradientButton
            label="Continue"
            onPress={() =>
              router.push("/(tabs)/quotes/quote/common/review-request")
            }
          />
          <SavedEditAction />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
