// src/app/quote/generator/backup-needs.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
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
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function BackupNeeds() {
  const dispatch = useDispatch();

  const backedUpCircuits = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "9" && data.details)
      return data.details.backedUpCircuits;
    return "";
  });

  const hasPropane = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "9" && data.details)
      return data.details.hasPropane;
    return "" as const;
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
          <StepProgressBar currentStep={5} totalSteps={7} />
          <CategoryTag title="Generator Installation" />

          <AuthHeading title="Backup needs" subtitle="" />

          <TextAreaInput
            label="What circuits would you like backed up?"
            placeholder=""
            value={backedUpCircuits}
            onChangeText={(text) =>
              dispatch(updateGeneratorDetails({ backedUpCircuits: text }))
            }
            minHeight={120}
          />

          <OptionGrid
            label="Do you have propane on the property already?"
            options={["Yes", "No"]}
            selected={hasPropane}
            onSelect={(val) =>
              dispatch(updateGeneratorDetails({ hasPropane: val as any }))
            }
            numColumns={1}
          />

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/generator/photos-needed")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
