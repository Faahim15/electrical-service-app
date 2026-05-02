// src/app/quote/accessory-building/building-basics.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import CustomInput from "@/src/components/shared/CustomInput";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateAccessoryBuildingDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function BuildingBasics() {
  const dispatch = useDispatch();

  const squareFootage = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
      return data.details.squareFootage;
    return "";
  });

  const intendedUse = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
      return data.details.intendedUse;
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
          <StepProgressBar currentStep={4} totalSteps={10} />
          <CategoryTag title="Accessory Building Power" />

          <AuthHeading title="Building basics" subtitle="" />

          <CustomInput
            label="Enter square footage of your accessory building"
            textInputConfig={{
              placeholder: "e.g. 400",
              keyboardType: "number-pad",
              value: squareFootage,
              onChangeText: (text) =>
                dispatch(
                  updateAccessoryBuildingDetails({ squareFootage: text }),
                ),
            }}
          />

          <TextAreaInput
            label="Intended Use"
            placeholder=""
            value={intendedUse}
            onChangeText={(text) =>
              dispatch(updateAccessoryBuildingDetails({ intendedUse: text }))
            }
            minHeight={120}
          />

          <GradientButton
            label="Continue"
            onPress={() =>
              router.push(
                "/quote/accessory-building/construction-details" as any,
              )
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
