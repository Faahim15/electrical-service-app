// src/app/quote/remodeling/permit-info.tsx
import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import BackButton from "@/src/components/shared/BackButton";
import CustomInput from "@/src/components/shared/CustomInput";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
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

export default function PermitInfo() {
  const dispatch = useDispatch();

  const hasPermit = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "4" && data.details) return data.details.hasPermit;
    return "" as const;
  });

  const permitNumber = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "4" && data.details)
      return data.details.permitNumber;
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

          <AuthHeading title="Permit" subtitle="Final details" />

          <OptionGrid
            label="Has a permit been applied for?"
            options={["Yes", "No"]}
            selected={hasPermit}
            onSelect={(val) =>
              dispatch(updateRemodelingDetails({ hasPermit: val as any }))
            }
            numColumns={1}
          />

          {/* Permit number — শুধু Yes select হলে */}
          {hasPermit === "Yes" && (
            <CustomInput
              label="Enter permit number"
              textInputConfig={{
                placeholder: "Permit number",
                value: permitNumber,
                onChangeText: (text) =>
                  dispatch(updateRemodelingDetails({ permitNumber: text })),
              }}
            />
          )}

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/remodeling/upload-photos")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
