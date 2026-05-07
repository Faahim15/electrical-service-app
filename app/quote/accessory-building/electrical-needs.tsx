import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateAccessoryBuildingDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ElectricalNeeds() {
  const dispatch = useDispatch();

  const electricalNeeds = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
      return data.details.electricalNeeds;
    return "";
  });

  const hasHeatingCooling = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "5" && data.details)
      return data.details.hasHeatingCooling;
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
          <StepProgressBar currentStep={6} totalSteps={11} />
          <CategoryTag title="Accessory Building Power" />

          <AuthHeading title="Electrical needs" subtitle="" />

          <TextAreaInput
            label="What are the electrical needs for the accessory building?"
            placeholder="Describe lighting, outlets, equipment, etc."
            value={electricalNeeds}
            onChangeText={(text) =>
              dispatch(
                updateAccessoryBuildingDetails({ electricalNeeds: text }),
              )
            }
            minHeight={120}
          />

          <OptionGrid
            label="Will there be any heating or cooling equipment in the accessory building?"
            options={["Yes", "No"]}
            selected={hasHeatingCooling}
            onSelect={(val) =>
              dispatch(
                updateAccessoryBuildingDetails({
                  hasHeatingCooling: val as any,
                }),
              )
            }
            numColumns={1}
          />
          <View className="mt-[3%]">
            <GradientButton
              label="Continue"
              onPress={() =>
                router.push("/quote/accessory-building/service-type")
              }
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
