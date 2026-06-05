import AuthHeading from "@/src/components/auth/AuthHeading";
import SavedEditAction from "@/src/components/common/SavedButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
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
          <StepProgressBar currentStep={8} totalSteps={12} />
          <CategoryTag title="Accessory Building Power / Shed Power" />

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
            label="Please provide a general idea of the distance and route between the main electrical panel and the accessory building location"
            placeholder="E.g., Panel is in the basement, building is 50 ft away across the backyard"
            value={routeDistance}
            onChangeText={(text) =>
              dispatch(updateAccessoryBuildingDetails({ routeDistance: text }))
            }
            minHeight={100}
          />

          {/* <PhotoUploadSection
            label="Upload photos of the existing space"
            photos={existingSpacePhotos}
            onPhotosChange={(p) =>
              dispatch(
                updateAccessoryBuildingDetails({ existingSpacePhotos: p }),
              )
            }
          /> */}

          <GradientButton
            label="Continue"
            onPress={() =>
              router.push(
                "/(tabs)/quotes/quote/accessory-building/plans-permit",
              )
            }
          />
          <SavedEditAction />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
