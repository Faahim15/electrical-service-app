import AuthHeading from "@/src/components/auth/AuthHeading";
import SavedEditAction from "@/src/components/common/SavedButton";
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
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function GeneratorPhotosNeeded() {
  const dispatch = useDispatch();

  const existingSpacePhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
      return data.details.existingSpacePhotos;
    return [];
  });
  const panelPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
      return data.details.panelPhotos;
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
          <StepProgressBar currentStep={10} totalSteps={12} />
          <CategoryTag title="Accessory Building Power / Shed Power" />

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
          <View className="mt-1">
            <PhotoUploadSection
              label="Please upload clear photo of electrical panel up close so we can see the numbers and about 10 ft away."
              photos={panelPhotos}
              onPhotosChange={(p) =>
                dispatch(updateAccessoryBuildingDetails({ panelPhotos: p }))
              }
            />
          </View>
          <GradientButton
            label="Continue"
            onPress={() =>
              router.push("/quote/accessory-building/additional-info")
            }
          />
          <SavedEditAction />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
