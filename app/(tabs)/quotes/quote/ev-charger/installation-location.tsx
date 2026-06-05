import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateEVChargerDetails } from "@/src/redux/slices/serviceFormSlice";

import SavedEditAction from "@/src/components/common/SavedButton";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
const LOCATIONS = ["Garage", "Carport", "Driveway", "Other"];

const SelectOption = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={{
      paddingVertical: 13,
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: selected ? "#0EA5E9" : "#FFFFFF",
      borderWidth: 1.5,
      borderColor: selected ? "#0EA5E9" : "#E2E8F0",
      marginBottom: 10,
      shadowColor: "#94A3B8",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: selected ? 0 : 0.07,
      shadowRadius: 3,
      elevation: selected ? 0 : 1,
    }}
  >
    <Text
      className="text-[13.5px] font-Inter_Medium"
      style={{ color: selected ? "#FFFFFF" : "#475569" }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default function InstallationLocation() {
  const dispatch = useDispatch();
  const installationLocation = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2") return data?.details?.installationLocation;
    return "" as const;
  });
  const installationLocationOther = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "2")
      return data?.details?.installationLocationOther;
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
          <StepProgressBar currentStep={5} totalSteps={9} />

          {/* Category Tag */}

          <CategoryTag title="EV Charger Installation" />

          <AuthHeading
            title="Installation location"
            subtitle="Tell us where you need the charger"
          />

          <View className="mb-4">
            <Text className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold mb-3">
              Where do you want the EV charger installed?
            </Text>
            {LOCATIONS.map((option) => (
              <SelectOption
                key={option}
                label={option}
                selected={installationLocation === option}
                onPress={() =>
                  dispatch(
                    updateEVChargerDetails({
                      installationLocation: option as any,
                    }),
                  )
                }
              />
            ))}
            {installationLocation === "Other" && (
              <TextAreaInput
                label="Please specify"
                placeholder="Describe your installation location"
                value={installationLocationOther ?? ""}
                onChangeText={(text) =>
                  dispatch(
                    updateEVChargerDetails({ installationLocationOther: text }),
                  )
                }
              />
            )}
          </View>

          <GradientButton
            label="Continue"
            onPress={() =>
              router.push("/(tabs)/quotes/quote/ev-charger/panel-location")
            }
          />
          <SavedEditAction />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
