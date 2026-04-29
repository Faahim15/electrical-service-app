import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import InfoBanner from "@/src/components/quote/InfoBanner";
import QuickTags from "@/src/components/quote/QuickTags";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import {
    setAdditionalNotes,
    toggleQuickTag,
} from "@/src/redux/slices/servicDetailSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const QUICK_TAGS = [
  "Limited access",
  "Existing damage",
  "Urgent issue",
  "Need estimate first",
];

export default function AdditionalNotes() {
  const dispatch = useDispatch();
  const { additionalNotes, quickTags } = useSelector(
    (state: RootState) => state.serviceDetails,
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
          <StepProgressBar currentStep={7} />

          <AuthHeading
            title="Additional notes"
            subtitle="Anything else we should know?"
          />

          <TextAreaInput
            label="Your notes (optional)"
            placeholder="Add any additional details, concerns, or special requirements..."
            value={additionalNotes}
            onChangeText={(text) => dispatch(setAdditionalNotes(text))}
            minHeight={160}
          />

          <QuickTags
            tags={QUICK_TAGS}
            selected={quickTags}
            onToggle={(tag) => dispatch(toggleQuickTag(tag))}
          />

          <InfoBanner message="The more details you provide, the more accurate your quote will be." />

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/common/review-request")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
