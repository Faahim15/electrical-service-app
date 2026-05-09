// src/app/quote/dock-power/plans-permit.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import CustomInput from "@/src/components/shared/CustomInput";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateDockPowerDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function DockPlansPermit() {
  const dispatch = useDispatch();

  const hasPlans = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details) return data.details.hasPlans;
    return "" as const;
  });

  const planDrawingPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details)
      return data.details.planDrawingPhotos;
    return [];
  });

  const hasPermit = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details) return data.details.hasPermit;
    return "" as const;
  });

  const permitNumber = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details)
      return data.details.permitNumber;
    return "";
  });

  const additionalInfo = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details)
      return data.details.additionalInfo;
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
          <StepProgressBar currentStep={7} totalSteps={9} />
          <CategoryTag title="Dock Power" />

          <AuthHeading title="Plans, Permit & Timeline" subtitle="" />

          <OptionGrid
            label="Do you have any plans/drawings for the Dock power?"
            options={["Yes", "No"]}
            selected={hasPlans}
            onSelect={(val) =>
              dispatch(
                updateDockPowerDetails({
                  hasPlans: val as any,
                  planDrawingPhotos: [],
                }),
              )
            }
            numColumns={1}
          />

          {hasPlans === "Yes" && (
            <PhotoUploadSection
              label="Please Upload the plans Drawing"
              photos={planDrawingPhotos}
              onPhotosChange={(p) =>
                dispatch(updateDockPowerDetails({ planDrawingPhotos: p }))
              }
            />
          )}

          <OptionGrid
            label="Has a permit been applied for?"
            options={["Yes", "No"]}
            selected={hasPermit}
            onSelect={(val) =>
              dispatch(
                updateDockPowerDetails({
                  hasPermit: val as any,
                  permitNumber: "",
                }),
              )
            }
            numColumns={1}
          />

          {hasPermit === "Yes" && (
            <CustomInput
              label="What is your permit number?"
              textInputConfig={{
                placeholder: "Permit number",
                value: permitNumber,
                onChangeText: (text) =>
                  dispatch(updateDockPowerDetails({ permitNumber: text })),
              }}
            />
          )}

          <TextAreaInput
            label="Additional Information"
            placeholder="any additional information you feel we should know for your quote"
            value={additionalInfo}
            onChangeText={(text) =>
              dispatch(updateDockPowerDetails({ additionalInfo: text }))
            }
            minHeight={100}
          />

          <GradientButton
            label="Submit"
            onPress={() => router.push("/quote/dock-power/photos-needed")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
