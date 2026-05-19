import AuthHeading from "@/src/components/auth/AuthHeading";
import SavedEditAction from "@/src/components/common/SavedButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateEVChargerDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const PANEL_LOCATIONS = [
  "Basement (Finished)",
  "Basement (Unfinished)",
  "Garage (Finished)",
  "Garage (Unfinished)",
  "Other (please specify)",
];

const PANEL_DISTANCES = [
  "Less than 25 ft",
  "25–50 ft",
  "50–100 ft",
  "More than 100 ft",
  "Unsure",
];

export default function PanelLocation() {
  const dispatch = useDispatch();
  const panelLocation = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2") return data?.details?.panelLocation;
    return "" as const;
  });
  const panelDistance = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2") return data?.details?.panelDistance;
    return "" as const;
  });
  const panelLocationOther = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2") return data?.details?.panelLocationOther;
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
          <StepProgressBar currentStep={6} totalSteps={9} />

          {/* Category Tag */}

          <CategoryTag title="EV Charger Installation" />

          <AuthHeading
            title="Panel location"
            subtitle="Help us understand your electrical panel"
          />

          <OptionGrid
            label="Where is your electrical panel located?"
            options={PANEL_LOCATIONS}
            selected={panelLocation || ""}
            onSelect={(val) =>
              dispatch(updateEVChargerDetails({ panelLocation: val as any }))
            }
            numColumns={1}
          />
          {panelLocation === "Other (please specify)" && (
            <TextAreaInput
              label="Please specify"
              placeholder="Describe your panel location"
              value={panelLocationOther ?? ""}
              onChangeText={(text) =>
                dispatch(updateEVChargerDetails({ panelLocationOther: text }))
              }
            />
          )}

          <View className="mb-2">
            <OptionGrid
              label="What is the approximate distance of the electrical panel from charger install location?"
              sublabel={true}
              options={PANEL_DISTANCES}
              selected={panelDistance || ""}
              onSelect={(val) =>
                dispatch(updateEVChargerDetails({ panelDistance: val as any }))
              }
              numColumns={1}
            />
          </View>

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/ev-charger/photos-needed")}
          />
          <SavedEditAction />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
