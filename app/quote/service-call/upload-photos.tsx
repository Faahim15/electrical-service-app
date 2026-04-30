import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateServiceCallDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import * as ImagePicker from "expo-image-picker";
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

export default function UploadPhotos() {
  const dispatch = useDispatch();
  const panelPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "1") return data?.details?.panelPhotos;
    return [];
  });

  const workAreaPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "1") return data?.details?.workAreaPhotos;
    return [];
  });

  const referencePhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "1") return data?.details?.referencePhotos;
    return [];
  });

  const pickFromCamera = async (
    setter: (photos: string[]) => void,
    current: string[],
  ) => {
    const result = await ImagePicker.launchCameraAsync({ quality: 0.8 });
    if (!result.canceled) {
      setter([...current, result.assets[0].uri]);
    }
  };

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
          <StepProgressBar currentStep={6} />

          <AuthHeading
            title="Upload photos"
            subtitle="Photos help us understand your request faster"
          />

          {/* Helpful tips card */}
          <View
            className="bg-white rounded-2xl px-4 py-4 mb-5"
            style={{
              shadowColor: "#94A3B8",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <Text className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold mb-2">
              Helpful photos include:
            </Text>
            {[
              "Electrical panel",
              "Outlet or work area",
              "Installation location",
              "Any visible issues",
            ].map((tip) => (
              <View key={tip} className="flex-row items-center mb-1">
                <View
                  className="w-[6px] h-[6px] rounded-full mr-2"
                  style={{ backgroundColor: "#0EA5E9" }}
                />
                <Text className="text-[#475569] text-[13px] font-Inter_Regular">
                  {tip}
                </Text>
              </View>
            ))}
          </View>

          {/* Camera / Gallery buttons */}

          <PhotoUploadSection
            label="Panel Photos"
            photos={panelPhotos || []}
            onPhotosChange={(p) =>
              dispatch(updateServiceCallDetails({ panelPhotos: p }))
            }
          />

          <PhotoUploadSection
            label="Work Area Photos"
            photos={workAreaPhotos || []}
            onPhotosChange={(p) =>
              dispatch(updateServiceCallDetails({ workAreaPhotos: p }))
            }
          />

          <PhotoUploadSection
            label="Extra Reference Photos"
            photos={referencePhotos || []}
            onPhotosChange={(p) =>
              dispatch(updateServiceCallDetails({ referencePhotos: p }))
            }
          />

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/service-call/additional-notes")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
