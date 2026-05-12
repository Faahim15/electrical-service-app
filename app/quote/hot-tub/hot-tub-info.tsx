// src/app/quote/hot-tub/hot-tub-info.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import CustomInput from "@/src/components/shared/CustomInput";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateHotTubDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HotTubInfo() {
  const dispatch = useDispatch();

  const hasUserManual = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "6" && data.details)
      return data.details.hasUserManual;
    return "" as const;
  });

  const userManualPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "6" && data.details)
      return data.details.userManualPhotos;
    return [];
  });

  const manufacturer = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "6" && data.details)
      return data.details.manufacturer;
    return "";
  });

  const modelNumber = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "6" && data.details)
      return data.details.modelNumber;
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
          <StepProgressBar currentStep={4} totalSteps={9} />
          <CategoryTag title="Hot Tub Installation" />

          <AuthHeading title="Hot tub information" subtitle="" />

          <OptionGrid
            label="Do you have a digital copy of the user manual?"
            options={["Yes", "No"]}
            selected={hasUserManual}
            onSelect={(val) =>
              dispatch(
                updateHotTubDetails({
                  hasUserManual: val as any,
                  userManualPhotos: [],
                  manufacturer: "",
                  modelNumber: "",
                }),
              )
            }
            numColumns={1}
          />

          {/* Yes — upload manual */}
          {hasUserManual === "Yes" && (
            <PhotoUploadSection
              label="upload the document."
              photos={userManualPhotos}
              onPhotosChange={(p) =>
                dispatch(updateHotTubDetails({ userManualPhotos: p }))
              }
            />
          )}

          {/* No — manufacturer + model */}
          {hasUserManual === "No" && (
            <>
              <CustomInput
                label="Hot tub manufacturer"
                textInputConfig={{
                  placeholder: "Type here",
                  value: manufacturer,
                  onChangeText: (text) =>
                    dispatch(updateHotTubDetails({ manufacturer: text })),
                }}
              />
              <CustomInput
                label="Hot tub model number"
                textInputConfig={{
                  placeholder: "Type here",
                  value: modelNumber,
                  onChangeText: (text) =>
                    dispatch(updateHotTubDetails({ modelNumber: text })),
                }}
              />
            </>
          )}
          <View className="mt-[3%]">
            <GradientButton
              label="Continue"
              onPress={() =>
                router.push("/quote/hot-tub/electrical-requirements" as any)
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
