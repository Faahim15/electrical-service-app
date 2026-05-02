import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updatePanelUpgradeDetails } from "@/src/redux/slices/serviceFormSlice";
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

const AMPERAGE_OPTIONS = ["50", "60", "100", "150", "200", "Unsure", "Other"];
const POWER_TYPE_OPTIONS = ["Overhead", "Underground", "Unsure"];

export default function CurrentPanelDetails() {
  const dispatch = useDispatch();

  const currentAmperage = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "3" && data.details)
      return data.details.currentAmperage;
    return "" as const;
  });

  const powerType = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "3" && data.details) return data.details.powerType;
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
          <StepProgressBar currentStep={5} />

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
                Panel Upgrade / Replacement
              </Text>
            </View>
          </View>

          <AuthHeading
            title="Current panel details"
            subtitle="Tell us about your existing setup"
          />

          <OptionGrid
            label="What is the amperage of your current panel?"
            options={AMPERAGE_OPTIONS}
            selected={currentAmperage}
            onSelect={(val) =>
              dispatch(
                updatePanelUpgradeDetails({ currentAmperage: val as any }),
              )
            }
            numColumns={1}
          />

          {/* Power Type with description */}
          <View className="mb-[3%]">
            <Text className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold mb-1">
              Is your existing power overhead or underground to your electrical
              meter?
            </Text>
            <Text className="text-[#94A3B8] text-[12px] font-Inter_Regular mb-3">
              Overhead = cable runs from utility pole to house in the air{"\n"}
              Underground = cable runs from utility pole/transformer to the
              house underground
            </Text>
            {POWER_TYPE_OPTIONS.map((option) => (
              <OptionGrid
                key={option}
                label=""
                options={[option]}
                selected={powerType}
                onSelect={(val) =>
                  dispatch(updatePanelUpgradeDetails({ powerType: val as any }))
                }
                numColumns={1}
              />
            ))}
          </View>

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/panel-upgrade/panel-location")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
