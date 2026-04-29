import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import InfoBanner from "@/src/components/quote/InfoBanner";
import OptionGrid from "@/src/components/quote/OptionGrid";
import TimelineOption from "@/src/components/quote/TimelineOption";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import {
    setOwnershipStatus,
    setPropertyType,
    setTimeline,
} from "@/src/redux/slices/servicDetailSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ProjectBasics() {
  const dispatch = useDispatch();
  const { propertyType, ownershipStatus, timeline } = useSelector(
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
          <StepProgressBar currentStep={3} />
          <AuthHeading
            title="Project basics"
            subtitle="A few details to help us understand the job"
          />

          <OptionGrid
            label="Property Type"
            required
            options={["House", "Condo", "Apartment", "Commercial"]}
            selected={propertyType}
            onSelect={(val) => dispatch(setPropertyType(val as any))}
            numColumns={2}
          />

          <OptionGrid
            label="Ownership Status"
            required
            options={["Owner", "Tenant", "Property Manager", "Other"]}
            selected={ownershipStatus}
            onSelect={(val) => dispatch(setOwnershipStatus(val as any))}
            numColumns={1}
          />

          <TimelineOption
            selected={timeline}
            onSelect={(val) => dispatch(setTimeline(val as any))}
          />

          <InfoBanner message="The more accurate your details, the faster we can respond with a quote." />

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/common/project-details")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
