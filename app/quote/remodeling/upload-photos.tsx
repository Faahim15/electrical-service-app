// src/app/quote/remodeling/upload-photos.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateRemodelingDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function RemodelingUploadPhotos() {
  const dispatch = useDispatch();

  const existingSpacePhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "4" && data.details)
      return data.details.existingSpacePhotos;
    return [];
  });

  const panelPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "4" && data.details)
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
          <StepProgressBar currentStep={7} totalSteps={9} />

          {/* Category Tag */}
          <View className="self-start mb-4">
            <View
              className="px-3 py-[6px] rounded-full"
              style={{
                backgroundColor: "#EEF9FF",
                borderWidth: 1,
                borderColor: "#BAE6FD",
              }}
            >
              <Text className="text-[#0EA5E9] text-[12.5px] font-Inter_Medium">
                Remodel
              </Text>
            </View>
          </View>

          <AuthHeading
            title="Photos needed"
            subtitle="Please upload these photos"
          />

          <PhotoUploadSection
            label="Upload photo of existing space"
            photos={existingSpacePhotos}
            onPhotosChange={(p) =>
              dispatch(updateRemodelingDetails({ existingSpacePhotos: p }))
            }
          />

          <PhotoUploadSection
            label="Upload photos of your electrical panel up close so we can see the breakers/panel label and about 10 ft away"
            photos={panelPhotos}
            onPhotosChange={(p) =>
              dispatch(updateRemodelingDetails({ panelPhotos: p }))
            }
          />

          <GradientButton
            label="Submit Quote Request"
            onPress={() => router.push("/quote/remodeling/additional-info")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
