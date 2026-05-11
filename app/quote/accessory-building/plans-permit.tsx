import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import CustomInput from "@/src/components/shared/CustomInput";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateAccessoryBuildingDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function PlansPermit() {
  const dispatch = useDispatch();

  const hasPlans = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details) return data.details.hasPlans;
    return "" as const;
  });

  const planDrawingPhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
      return data.details.planDrawingPhotos;
    return [];
  });

  const hasPermit = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details) return data.details.hasPermit;
    return "" as const;
  });

  const permitNumber = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
      return data.details.permitNumber;
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
          <StepProgressBar currentStep={9} totalSteps={12} />
          <CategoryTag title="Accessory Building Power" />

          <AuthHeading title="Plans, Permit & Timeline" subtitle="" />

          {/* Has Plans */}
          <OptionGrid
            label="Do you have any plans/drawings for the accessory building?"
            options={["Yes", "No"]}
            selected={hasPlans}
            onSelect={(val) => {
              dispatch(
                updateAccessoryBuildingDetails({
                  hasPlans: val as any,
                  planDrawingPhotos: [],
                }),
              );
            }}
            numColumns={1}
          />

          {/* Plans upload — শুধু Yes */}
          {hasPlans === "Yes" && (
            <PhotoUploadSection
              label="Please Upload the plans Drawing"
              photos={planDrawingPhotos}
              onPhotosChange={(p) =>
                dispatch(
                  updateAccessoryBuildingDetails({ planDrawingPhotos: p }),
                )
              }
            />
          )}

          {/* Has Permit */}
          <OptionGrid
            label="Has a permit been applied for?"
            options={["Yes", "No"]}
            selected={hasPermit}
            onSelect={(val) => {
              dispatch(
                updateAccessoryBuildingDetails({
                  hasPermit: val as any,
                  permitNumber: "",
                }),
              );
            }}
            numColumns={1}
          />

          {/* Permit number — শুধু Yes */}
          {hasPermit === "Yes" && (
            <CustomInput
              label="What is your permit number?"
              textInputConfig={{
                placeholder: "Permit number",
                value: permitNumber,
                onChangeText: (text) =>
                  dispatch(
                    updateAccessoryBuildingDetails({ permitNumber: text }),
                  ),
              }}
            />
          )}

          <GradientButton
            label="Submit"
            onPress={() =>
              router.push("/quote/accessory-building/photos-needed")
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
