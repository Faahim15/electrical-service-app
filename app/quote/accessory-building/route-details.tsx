import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import PhotoUploadSection from "@/src/components/quote/PhotoUploadSection";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateAccessoryBuildingDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function RouteDetails() {
  const dispatch = useDispatch();

  const privateUtilities = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
      return data.details.privateUtilities;
    return "";
  });

  const routeDistance = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
      return data.details.routeDistance;
    return "";
  });

  const existingSpacePhotos = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
      return data.details.existingSpacePhotos;
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
          <StepProgressBar currentStep={8} />
          <CategoryTag title="Accessory Building Power" />

          <AuthHeading title="Route Details" subtitle="" />

          <TextAreaInput
            label="Please list any known private utilities between the house and accessory building"
            placeholder="Irrigation, private sewer/well, water, propane, etc."
            value={privateUtilities}
            onChangeText={(text) =>
              dispatch(
                updateAccessoryBuildingDetails({ privateUtilities: text }),
              )
            }
            minHeight={100}
          />

          <TextAreaInput
            label=""
            placeholder="Please provide a general idea of the distance and route between the main electrical panel and the accessory building location"
            value={routeDistance}
            onChangeText={(text) =>
              dispatch(updateAccessoryBuildingDetails({ routeDistance: text }))
            }
            minHeight={100}
          />

          <PhotoUploadSection
            label="Upload photos of the existing space"
            photos={existingSpacePhotos}
            onPhotosChange={(p) =>
              dispatch(
                updateAccessoryBuildingDetails({ existingSpacePhotos: p }),
              )
            }
          />

          <GradientButton
            label="Continue"
            onPress={() =>
              router.push("/quote/accessory-building/plans-permit")
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
