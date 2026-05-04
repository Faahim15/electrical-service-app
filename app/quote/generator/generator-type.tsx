// src/app/quote/generator/generator-type.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateGeneratorDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const GENERATOR_TYPES = ["Portable", "Whole Home Standby"];

export default function GeneratorType() {
  const dispatch = useDispatch();

  const generatorType = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "9" && data.details)
      return data.details.generatorType;
    return "" as const;
  });

  const handleContinue = () => {
    if (generatorType === "Portable") {
      router.push("/quote/generator/generator-ownership" as any);
    } else if (generatorType === "Whole Home Standby") {
      router.push("/quote/generator/backup-needs" as any);
    }
  };

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
          <StepProgressBar currentStep={4} totalSteps={7} />
          <CategoryTag title="Generator Installation" />

          <AuthHeading title="Generator type" subtitle="" />

          <OptionGrid
            label="Choose your generator type"
            options={GENERATOR_TYPES}
            selected={generatorType}
            onSelect={(val) =>
              dispatch(
                updateGeneratorDetails({
                  generatorType: val as any,
                  // reset fields
                  hasGenerator: "",
                  kwOutput: "",
                  backupInstallation: "",
                  generatorPhotos: [],
                  panelDistance: "",
                  panelLocation: "",
                  purchaseSize: "",
                  backedUpCircuits: "",
                  hasPropane: "",
                }),
              )
            }
            numColumns={1}
          />

          <GradientButton
            label="Continue"
            onPress={handleContinue}
            // generatorType select না করলে disabled
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
