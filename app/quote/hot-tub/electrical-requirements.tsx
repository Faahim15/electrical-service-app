// src/app/quote/hot-tub/electrical-requirements.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateHotTubDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const AMPERAGE_OPTIONS = [
  "20 amps",
  "30 amps",
  "40 amps",
  "50 amps",
  "60 amps",
  "I'm not sure",
];

export default function ElectricalRequirements() {
  const dispatch = useDispatch();

  const amperage = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "6" && data.details) return data.details.amperage;
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
          <StepProgressBar currentStep={5} totalSteps={9} />
          <CategoryTag title="Hot Tub Installation" />

          <AuthHeading title="Electrical requirements" subtitle="" />

          <OptionGrid
            label="What amperage do you need for your hot tub?"
            options={AMPERAGE_OPTIONS}
            selected={amperage}
            onSelect={(val) =>
              dispatch(updateHotTubDetails({ amperage: val as any }))
            }
            numColumns={1}
          />
          <View className="mt-[3%]">
            <GradientButton
              label="Continue"
              onPress={() =>
                router.push("/quote/hot-tub/location-details" as any)
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
