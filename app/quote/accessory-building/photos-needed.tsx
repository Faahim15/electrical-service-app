import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateAccessoryBuildingDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function GeneratorPhotosNeeded() {
  const dispatch = useDispatch();

  const existingSpacePhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
      return data.details.existingSpacePhotos;
    return [];
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
          <StepProgressBar currentStep={10} totalSteps={11} />
          <CategoryTag title="Accessory Building Power" />

          <AuthHeading title="Photos needed" subtitle="" />

          <PhotoUploadSection
            label="Upload photos of route"
            photos={existingSpacePhotos}
            onPhotosChange={(p) =>
              dispatch(
                updateAccessoryBuildingDetails({ existingSpacePhotos: p }),
              )
            }
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
