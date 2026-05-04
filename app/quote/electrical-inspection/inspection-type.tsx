// src/app/quote/electrical-inspection/inspection-type.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import CustomInput from "@/src/components/shared/CustomInput";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateElectricalInspectionDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const INSPECTION_TYPES = [
  "Whole House",
  "Accessory Building",
  "Partial House",
  "Electrical Service only",
];

export default function InspectionType() {
  const dispatch = useDispatch();

  const inspectionType = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "8" && data.details)
      return data.details.inspectionType;
    return "" as const;
  });

  const squareFootage = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "8" && data.details)
      return data.details.squareFootage;
    return "";
  });

  const panelCount = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "8" && data.details)
      return data.details.panelCount;
    return "";
  });

  const panelPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "8" && data.details)
      return data.details.panelPhotos;
    return [];
  });

  // Whole House, Accessory Building, Partial House — square footage দেখাবে
  const showSquareFootage =
    inspectionType === "Whole House" ||
    inspectionType === "Accessory Building" ||
    inspectionType === "Partial House";

  // Electrical Service only — panel count + photos দেখাবে
  const showPanelSection = inspectionType === "Electrical Service only";

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
          <StepProgressBar currentStep={4} totalSteps={6} />
          <CategoryTag title="Electrical Systems Inspection" />

          <AuthHeading title="Inspection type" subtitle="" />

          <OptionGrid
            label="What do you need inspected?"
            options={INSPECTION_TYPES}
            selected={inspectionType}
            onSelect={(val) =>
              dispatch(
                updateElectricalInspectionDetails({
                  inspectionType: val as any,
                  squareFootage: "",
                  panelCount: "",
                  panelPhotos: [],
                }),
              )
            }
            numColumns={1}
          />

          {/* Whole House / Accessory Building / Partial House */}
          {showSquareFootage && (
            <CustomInput
              label="What is the square footage of the building?"
              textInputConfig={{
                placeholder: "",
                keyboardType: "number-pad",
                value: squareFootage,
                onChangeText: (text) =>
                  dispatch(
                    updateElectricalInspectionDetails({ squareFootage: text }),
                  ),
              }}
            />
          )}

          {/* Electrical Service only */}
          {showPanelSection && (
            <>
              <CustomInput
                label="How many panels will be inspected?"
                textInputConfig={{
                  placeholder: "",
                  keyboardType: "number-pad",
                  value: panelCount,
                  onChangeText: (text) =>
                    dispatch(
                      updateElectricalInspectionDetails({ panelCount: text }),
                    ),
                }}
              />
              <PhotoUploadSection
                label="Upload photos of electrical panels"
                photos={panelPhotos}
                onPhotosChange={(p) =>
                  dispatch(
                    updateElectricalInspectionDetails({ panelPhotos: p }),
                  )
                }
              />
            </>
          )}

          <GradientButton
            label="Continue"
            onPress={() =>
              router.push("/quote/electrical-inspection/additional-info" as any)
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
