// src/app/quote/hot-tub/photos-needed.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import SavedEditAction from "@/src/components/common/SavedButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateHotTubDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function PhotosNeeded() {
  const dispatch = useDispatch();

  const panelPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "6" && data.details)
      return data.details.panelPhotos;
    return [];
  });

  const installLocationPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "6" && data.details)
      return data.details.installLocationPhotos;
    return [];
  });

  const receptaclePhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "6" && data.details)
      return data.details.receptaclePhotos;
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
          <StepProgressBar currentStep={7} totalSteps={9} />
          <CategoryTag title="Hot Tub Installation" />

          <AuthHeading title="Photos needed" subtitle="" />

          <PhotoUploadSection
            label="Upload photos of your electrical panel"
            photos={panelPhotos}
            onPhotosChange={(p) =>
              dispatch(updateHotTubDetails({ panelPhotos: p }))
            }
          />

          <PhotoUploadSection
            label="Upload a photo of where your hot tub will be installed"
            photos={installLocationPhotos}
            onPhotosChange={(p) =>
              dispatch(updateHotTubDetails({ installLocationPhotos: p }))
            }
          />

          <PhotoUploadSection
            label="Upload a photo of where the receptacle or disconnect might be installed"
            photos={receptaclePhotos}
            onPhotosChange={(p) =>
              dispatch(updateHotTubDetails({ receptaclePhotos: p }))
            }
          />

          <GradientButton
            label="Submit"
            onPress={() => router.push("/quote/hot-tub/additional-info")}
          />
          <SavedEditAction />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
