import AuthHeading from "@/src/components/auth/AuthHeading";
import SavedEditAction from "@/src/components/common/SavedButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updatePanelUpgradeDetails } from "@/src/redux/slices/serviceFormSlice";
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

export default function PanelLocationScreen() {
  const dispatch = useDispatch();

  const panelLocation = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "3" && data.details)
      return data.details.panelLocation;
    return "" as const;
  });

  const panelLocationOther = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "3" && data.details)
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
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <StepProgressBar currentStep={6} totalSteps={9} />

          {/* Category Tag */}
          <CategoryTag title="Panel Upgrade / Replacement" />

          <AuthHeading
            title="Panel location"
            subtitle="Where is your electrical panel?"
          />

          <OptionGrid
            label="Where is your electrical panel located?"
            options={PANEL_LOCATIONS}
            selected={panelLocation}
            onSelect={(val) =>
              dispatch(updatePanelUpgradeDetails({ panelLocation: val as any }))
            }
            numColumns={1}
          />
          {panelLocation === "Other (please specify)" && (
            <TextAreaInput
              label="Please specify"
              placeholder="Describe your panel location"
              value={panelLocationOther ?? ""}
              onChangeText={(text) =>
                dispatch(
                  updatePanelUpgradeDetails({ panelLocationOther: text }),
                )
              }
            />
          )}

          {/* <TextAreaInput
            label="Additional Information"
            placeholder="Any additional information you feel we should know..."
            value={additionalInfo}
            onChangeText={(text) =>
              dispatch(updatePanelUpgradeDetails({ additionalInfo: text }))
            }
            minHeight={120}
          /> */}
          <View className="mt-[3%]">
            <GradientButton
              label="Continue"
              onPress={() => router.push("/quote/panel-upgrade/upload-photos")}
            />
          </View>
          <SavedEditAction />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
