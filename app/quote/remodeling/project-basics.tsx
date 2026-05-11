// src/app/quote/remodeling/project-basics.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import BackButton from "@/src/components/shared/BackButton";
import CustomInput from "@/src/components/shared/CustomInput";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateRemodelingDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const PANEL_LOCATIONS = [
  "Basement (Finished)",
  "Basement (Unfinished)",
  "Garage (Finished)",
  "Garage (Unfinished)",
  "Other (please specify)",
];

export default function RemodelingProjectBasics() {
  const dispatch = useDispatch();

  const panelLocation = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "4" && data.details)
      return data.details.panelLocation;
    return "" as const;
  });

  const remodlingArea = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "4" && data.details)
      return data.details.remodlingArea;
    return "";
  });
  const panelLocationOther = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "4" && data.details)
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
          <StepProgressBar currentStep={4} totalSteps={9} />

          {/* Category Tag */}
          <View className="self-start mb-4">
            <View
              className="px-3 py-[6px] rounded-full"
              style={{
                backgroundColor: "#EEF9FF",
                borderWidth: 1,
                borderColor: "#BAE6FD",
              }}
            >
              <Text className="text-[#0EA5E9] text-[12.5px] font-Inter_Medium">
                Remodel
              </Text>
            </View>
          </View>

          <AuthHeading
            title="Project basics"
            subtitle="Tell us about your remodel"
          />

          <OptionGrid
            label="Where is your electrical panel located?"
            options={PANEL_LOCATIONS}
            selected={panelLocation}
            onSelect={(val) =>
              dispatch(updateRemodelingDetails({ panelLocation: val as any }))
            }
            numColumns={1}
          />
          {panelLocation === "Other (please specify)" && (
            <TextAreaInput
              label="Please specify"
              placeholder="Describe your panel location"
              value={panelLocationOther ?? ""}
              onChangeText={(text) =>
                dispatch(updateRemodelingDetails({ panelLocationOther: text }))
              }
            />
          )}
          <CustomInput
            label="What area are you remodeling?"
            textInputConfig={{
              placeholder: "E.g., Kitchen, Basement, Bathroom",
              value: remodlingArea,
              onChangeText: (text) =>
                dispatch(updateRemodelingDetails({ remodlingArea: text })),
            }}
          />

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/remodeling/plans-electrical")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
