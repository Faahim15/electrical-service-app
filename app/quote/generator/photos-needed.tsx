// src/app/quote/generator/photos-needed.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateGeneratorDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function GeneratorPhotosNeeded() {
  const dispatch = useDispatch();

  const panelPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "9" && data.details)
      return data.details.panelPhotos;
    return [];
  });

  const installLocationPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "9" && data.details)
      return data.details.installLocationPhotos;
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
          <StepProgressBar currentStep={6} totalSteps={7} />
          <CategoryTag title="Generator Installation" />

          <AuthHeading title="Photos needed" subtitle="" />

          <PhotoUploadSection
            label="Please upload clear photos of your electrical panel up close so we can see the breakers/panel label and about 10 ft away"
            photos={panelPhotos}
            onPhotosChange={(p) =>
              dispatch(updateGeneratorDetails({ panelPhotos: p }))
            }
          />

          <PhotoUploadSection
            label="Upload photo of where you would like the generator installed"
            photos={installLocationPhotos}
            onPhotosChange={(p) =>
              dispatch(updateGeneratorDetails({ installLocationPhotos: p }))
            }
          />

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/common/review-request" as any)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
