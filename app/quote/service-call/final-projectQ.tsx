import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import InfoBanner from "@/src/components/quote/InfoBanner";
import MultiSelectList from "@/src/components/quote/MultiSelectList";
import OptionGrid from "@/src/components/quote/OptionGrid";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import {
    setPreferredTime,
    toggleSchedulingDay,
} from "@/src/redux/slices/servicDetailSlice";
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

const DAYS = ["Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays"];

export default function FinalProjectQuestions() {
  const dispatch = useDispatch();
  const { preferredTime, schedulingDays } = useSelector(
    (state: RootState) => state.serviceDetails,
  );

  const selectedCategory = useSelector(
    (state: RootState) => state.categoryRoute.selectedCategory,
  );

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

          {selectedCategory && (
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
                  {selectedCategory.title}
                </Text>
              </View>
            </View>
          )}

          <AuthHeading
            title="Final project questions"
            subtitle="Step 3 of your service questions"
          />

          <OptionGrid
            label="Preferred time for Service"
            options={["AM (8-11)", "PM (12-2)"]}
            selected={preferredTime}
            onSelect={(val) => dispatch(setPreferredTime(val as any))}
            numColumns={1}
          />

          <MultiSelectList
            label="Scheduling preference"
            options={DAYS}
            selected={schedulingDays}
            onToggle={(val) => dispatch(toggleSchedulingDay(val))}
          />

          <InfoBanner message="You can add extra details and photos next." />

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/service-call/upload-photos")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
