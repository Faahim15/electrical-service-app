import AuthHeading from "@/src/components/auth/AuthHeading";
import SavedEditAction from "@/src/components/common/SavedButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import OptionGrid from "@/src/components/quote/OptionGrid";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
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
  const currentAmperageOther = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "3" && data.details)
      return data.details.currentAmperageOther;
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
          <CategoryTag title="Panel Upgrade / Replacement" />

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
          {currentAmperage === "Other" && (
            <TextAreaInput
              label="Please specify"
              placeholder="Describe your current amperage"
              value={currentAmperageOther ?? ""}
              onChangeText={(text) =>
                dispatch(
                  updatePanelUpgradeDetails({ currentAmperageOther: text }),
                )
              }
            />
          )}
          {/* Power Type with description */}
          <View className="mb-[3%]">
            <Text className="text-[#1E293B] text-base font-Inter_SemiBold mb-1">
              Is your existing power overhead or underground to your electrical
              meter?
            </Text>
            <Text className="text-[#94A3B8] text-sm font-Inter_Regular mb-[1%]">
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
          <SavedEditAction />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
