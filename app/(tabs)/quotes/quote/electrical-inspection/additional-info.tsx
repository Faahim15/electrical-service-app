// src/app/quote/electrical-inspection/additional-info.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import SavedEditAction from "@/src/components/common/SavedButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateElectricalInspectionDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function AdditionalInformation() {
  const dispatch = useDispatch();

  const additionalInfo = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "8" && data.details)
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
          <StepProgressBar currentStep={5} totalSteps={6} />
          <CategoryTag title="Electrical Systems inspection" />

          <AuthHeading title="Additional information" subtitle="" />

          <TextAreaInput
            label=""
            placeholder="Type addition info here"
            value={additionalInfo}
            onChangeText={(text) =>
              dispatch(
                updateElectricalInspectionDetails({ additionalInfo: text }),
              )
            }
            minHeight={160}
          />
          <View className="mt-[0%]">
            <GradientButton
              label="Continue"
              onPress={() =>
                router.push("/(tabs)/quotes/quote/common/review-request")
              }
            />
          </View>
          <SavedEditAction />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
