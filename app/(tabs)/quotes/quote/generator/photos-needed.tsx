// src/app/quote/generator/photos-needed.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import SavedEditAction from "@/src/components/common/SavedButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateGeneratorDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { verticalScale } from "@/src/utils/Scaling";
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
  const generatorPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "9" && data.details)
      return data.details.generatorPhotos;
    return [];
  });
  const hasGenerator = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "9" && data.details)
      return data.details.hasGenerator;
    return "" as const;
  });
  const generatorDetails = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;

    if (data?.categoryId === "9" && data.details) {
      return data.details;
    }

    return null;
  });
  const hasExisting = hasGenerator === "Yes";
  const generatorType = generatorDetails?.generatorType || "";

  const isWholeHomeStandby = generatorType === "Whole Home Standby";
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
          contentContainerStyle={{ paddingBottom: verticalScale(120) }}
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

          {hasExisting && (
            <PhotoUploadSection
              label="Upload photo of the receptacle on the generator"
              photos={generatorPhotos}
              onPhotosChange={(p) =>
                dispatch(updateGeneratorDetails({ generatorPhotos: p }))
              }
            />
          )}

          {!isWholeHomeStandby && (
            <PhotoUploadSection
              label="Upload photo of where your generator inlet will be"
              photos={generatorPhotos}
              onPhotosChange={(p) =>
                dispatch(updateGeneratorDetails({ generatorPhotos: p }))
              }
            />
          )}
          {isWholeHomeStandby && (
            <PhotoUploadSection
              label="Upload photo of your electrical meter"
              photos={generatorDetails?.meterPhotos || []}
              onPhotosChange={(p) =>
                dispatch(updateGeneratorDetails({ meterPhotos: p }))
              }
            />
          )}

          <PhotoUploadSection
            label="Upload photo of where you would like the generator installed"
            photos={installLocationPhotos}
            onPhotosChange={(p) =>
              dispatch(updateGeneratorDetails({ installLocationPhotos: p }))
            }
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
