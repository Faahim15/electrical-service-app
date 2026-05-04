// src/app/quote/dock-power/dock-basics.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import CustomInput from "@/src/components/shared/CustomInput";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateDockPowerDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function DockBasics() {
  const dispatch = useDispatch();

  const dockBuilt = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details) return data.details.dockBuilt;
    return "" as const;
  });

  const electricalNeeds = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details)
      return data.details.electricalNeeds;
    return "";
  });

  const receptacleCount = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "7" && data.details)
      return data.details.receptacleCount;
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
          <StepProgressBar currentStep={4} />
          <CategoryTag title="Dock Power" />

          <AuthHeading title="Dock basics" subtitle="" />

          <OptionGrid
            label="Is your dock already built?"
            options={["Yes", "No"]}
            selected={dockBuilt}
            onSelect={(val) =>
              dispatch(updateDockPowerDetails({ dockBuilt: val as any }))
            }
            numColumns={1}
          />

          <TextAreaInput
            label="Please provide details about your electrical need at the dock power"
            placeholder="Describe boat lift and how many, jet ski lift and how many, lighting, etc."
            value={electricalNeeds}
            onChangeText={(text) =>
              dispatch(updateDockPowerDetails({ electricalNeeds: text }))
            }
            minHeight={120}
          />

          <CustomInput
            label="How many receptacles do you need at the dock?"
            textInputConfig={{
              placeholder: "",
              keyboardType: "number-pad",
              value: receptacleCount,
              onChangeText: (text) =>
                dispatch(updateDockPowerDetails({ receptacleCount: text })),
            }}
          />

          <GradientButton
            label="Continue"
            onPress={() =>
              router.push("/quote/dock-power/power-requirements" as any)
            }
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
