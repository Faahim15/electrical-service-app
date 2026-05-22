// src/app/quote/generator/backup-needs.tsx

import AuthHeading from "@/src/components/auth/AuthHeading";
import SavedEditAction from "@/src/components/common/SavedButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateGeneratorDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function BackupNeeds() {
  const dispatch = useDispatch();

  const generatorDetails = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;

    if (data?.categoryId === "9" && data.details) {
      return data.details;
    }

    return null;
  });

  const backedUpCircuits = generatorDetails?.backedUpCircuits || "";
  const hasPropane = generatorDetails?.hasPropane || "";
  const panelLocation = generatorDetails?.panelLocation || "";
  const panelLocationOther = generatorDetails?.panelLocationOther || "";
  const generatorType = generatorDetails?.generatorType || "";

  const isWholeHomeStandby = generatorType === "Whole Home Standby";

  const PANEL_LOCATION_OPTIONS = [
    "Basement (Finished)",
    "Basement (Unfinished)",
    "Garage (Finished)",
    "Garage (Unfinished)",
    "Other (please specify)",
  ] as const;

  const isOtherSelected = panelLocation === "Other (please specify)";

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
          <StepProgressBar currentStep={5} totalSteps={7} />

          <CategoryTag title="Generator Installation" />

          <AuthHeading title="Backup needs" subtitle="" />

          {/* CIRCUITS */}
          <TextAreaInput
            label="What circuits would you like backed up?"
            placeholder="Type here"
            value={backedUpCircuits}
            onChangeText={(text) =>
              dispatch(updateGeneratorDetails({ backedUpCircuits: text }))
            }
            minHeight={120}
          />
          {/* PROPANE */}
          <OptionGrid
            label="Do you have propane on the property already?"
            options={["Yes", "No"]}
            selected={hasPropane}
            onSelect={(val) =>
              dispatch(
                updateGeneratorDetails({
                  hasPropane: val as any,
                }),
              )
            }
            numColumns={1}
          />
          {/* PANEL LOCATION */}
          {isWholeHomeStandby && (
            <View className="mt-[4%]">
              <OptionGrid
                label="Where is your electrical panel located?"
                options={[...PANEL_LOCATION_OPTIONS]}
                selected={
                  PANEL_LOCATION_OPTIONS.includes(panelLocation as any)
                    ? panelLocation
                    : ""
                }
                onSelect={(val) => {
                  dispatch(
                    updateGeneratorDetails({
                      panelLocation: val as any,
                    }),
                  );
                }}
                numColumns={1}
              />

              {panelLocation === "Other (please specify)" && (
                <View className="mt-[3%]">
                  <TextAreaInput
                    label="Please specify panel location"
                    value={panelLocationOther}
                    placeholder="Type here"
                    onChangeText={(text) =>
                      dispatch(
                        updateGeneratorDetails({
                          panelLocationOther: text,
                        }),
                      )
                    }
                  />
                </View>
              )}
            </View>
          )}

          {/* CONTINUE */}
          <View className="mt-[3%]">
            <GradientButton
              label="Continue"
              onPress={() => router.push("/quote/generator/photos-needed")}
            />
          </View>

          <SavedEditAction />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
