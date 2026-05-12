// src/app/quote/hot-tub/location-details.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateHotTubDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { verticalScale } from "@/src/utils/Scaling";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const PLACEMENT_OPTIONS = [
  "Ground",
  "Concrete pad",
  "Concrete patio",
  "Deck (wood)",
  "Deck (composite)",
  "Other",
];
const PANEL_LOCATIONS = [
  "Basement (Finished)",
  "Basement (Unfinished)",
  "Garage (Finished)",
  "Garage (Unfinished)",
  "Other (please specify)",
];
const PANEL_DISTANCES = [
  "Less than 25 ft",
  "25 - 50 ft",
  "50 - 100 ft",
  "More than 100 ft",
  "Unsure",
];

export default function LocationDetails() {
  const dispatch = useDispatch();

  const placement = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "6" && data.details) return data.details.placement;
    return "" as const;
  });

  const panelLocation = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "6" && data.details)
      return data.details.panelLocation;
    return "" as const;
  });

  const panelDistance = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "6" && data.details)
      return data.details.panelDistance;
    return "" as const;
  });

  // selectors add করো
  const placementOther = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "6" && data.details)
      return data.details.placementOther;
    return "";
  });

  const panelLocationOther = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "6" && data.details)
      return data.details.panelLocationOther;
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
          contentContainerStyle={{ paddingBottom: verticalScale(70) }}
        >
          <StepProgressBar currentStep={6} totalSteps={9} />
          <CategoryTag title="Hot Tub Installation" />

          <AuthHeading title="Location details" subtitle="" />
          <View className=" mt-[2%] ">
            <OptionGrid
              label="What will the hot tub be placed on?"
              options={PLACEMENT_OPTIONS}
              selected={placement}
              onSelect={(val) =>
                dispatch(updateHotTubDetails({ placement: val as any }))
              }
              numColumns={1}
            />
            {placement === "Other" && (
              <TextAreaInput
                label="Please specify"
                placeholder="Describe where the hot tub will be placed"
                value={placementOther ?? ""}
                onChangeText={(text) =>
                  dispatch(updateHotTubDetails({ placementOther: text }))
                }
              />
            )}
            <View className="my-[2%]">
              <OptionGrid
                label="Where is your electrical panel located?"
                options={PANEL_LOCATIONS}
                selected={panelLocation}
                onSelect={(val) =>
                  dispatch(updateHotTubDetails({ panelLocation: val as any }))
                }
                numColumns={1}
              />
            </View>
            {panelLocation === "Other (please specify)" && (
              <TextAreaInput
                label="Please specify"
                placeholder="Describe your panel location"
                value={panelLocationOther ?? ""}
                onChangeText={(text) =>
                  dispatch(updateHotTubDetails({ panelLocationOther: text }))
                }
              />
            )}
            <OptionGrid
              label="What is the approximate distance of the electrical panel from hot tub location?"
              options={PANEL_DISTANCES}
              selected={panelDistance}
              onSelect={(val) =>
                dispatch(updateHotTubDetails({ panelDistance: val as any }))
              }
              numColumns={1}
            />
            <View className="mt-[2%]">
              <GradientButton
                label="Continue"
                onPress={() => router.push("/quote/hot-tub/photos-needed")}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
