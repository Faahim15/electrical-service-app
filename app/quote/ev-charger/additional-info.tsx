// src/app/quote/ev-charger/additional-info.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateEVChargerDetails } from "@/src/redux/slices/serviceFormSlice";
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

export default function AdditionalInfo() {
  const dispatch = useDispatch();
  // selector replace করো
  const additionalInfo = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2") return data?.details?.additionalInfo;
    return "";
  });
  const chargerAreaPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2") return data?.details?.chargerAreaPhotos;
    return [];
  });
  const panelPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2") return data?.details?.panelPhotos;
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
          <StepProgressBar currentStep={7} />

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
                EV Charger Installation
              </Text>
            </View>
          </View>

          <AuthHeading
            title="Additional information"
            subtitle="Any other details we should know"
          />

          {/* Text Area */}
          <TextAreaInput
            label=""
            placeholder="Any additional information you feel we should know..."
            value={additionalInfo}
            onChangeText={(text) =>
              dispatch(updateEVChargerDetails({ additionalInfo: text }))
            }
            minHeight={120}
          />

          {/* Photos Needed */}
          <Text className="text-[#1E293B] text-[15px] font-Inter_Bold mb-3">
            Photos needed
          </Text>

          <PhotoUploadSection
            label="Upload photo of area you want EV charger installed"
            photos={chargerAreaPhotos || []}
            onPhotosChange={(p) =>
              dispatch(updateEVChargerDetails({ chargerAreaPhotos: p }))
            }
          />

          <PhotoUploadSection
            label="Upload photos of your electrical panel up close so we can see the breakers/panel label and about 10 ft away"
            photos={panelPhotos || []}
            onPhotosChange={(p) =>
              dispatch(updateEVChargerDetails({ panelPhotos: p }))
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
