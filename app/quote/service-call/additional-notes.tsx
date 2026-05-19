import AuthHeading from "@/src/components/auth/AuthHeading";
import SavedEditAction from "@/src/components/common/SavedButton";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import InfoBanner from "@/src/components/quote/InfoBanner";
import QuickTags from "@/src/components/quote/QuickTags";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import {
  toggleServiceCallTag,
  updateServiceCallDetails,
} from "@/src/redux/slices/serviceFormSlice";
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
  const additionalNotes = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "1") return data?.details?.additionalNotes;
    return "";
  });

  const quickTags = useSelector((state: RootState) => {
    const data = state.serviceForm.categoryData;
    if (data?.categoryId === "1") return data?.details?.quickTags;
    return [];
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
          <StepProgressBar currentStep={7} />
          {/* Category Tag */}
          <CategoryTag title="Service Call" />
          <AuthHeading
            title="Additional notes"
            subtitle="Anything else we should know?"
          />

          <TextAreaInput
            label="Your notes (optional)"
            placeholder="Add any additional details, concerns, or special requirements..."
            value={additionalNotes}
            onChangeText={(text) =>
              dispatch(updateServiceCallDetails({ additionalNotes: text }))
            }
            minHeight={160}
          />

          <QuickTags
            tags={QUICK_TAGS}
            selected={quickTags || []}
            onToggle={(tag) => dispatch(toggleServiceCallTag(tag))}
          />

          <InfoBanner message="The more details you provide, the more accurate your quote will be." />

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/common/review-request")}
          />
          <SavedEditAction />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
