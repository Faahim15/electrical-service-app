import AuthHeading from "@/src/components/auth/AuthHeading";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import InfoBanner from "@/src/components/quote/InfoBanner";
import OptionGrid from "@/src/components/quote/OptionGrid";
import TimelineOption from "@/src/components/quote/TimelineOption";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";

import {
  selectCategory,
  updateProjectBasics,
} from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ProjectBasics() {
  const dispatch = useDispatch();
  const { propertyType, ownershipStatus, timeline } = useSelector(
    (state: RootState) => state.serviceForm.projectBasics,
  );

  const selectedCategory = useSelector(
    (state: RootState) => state.categoryRoute.selectedCategory,
  );

  console.log("selectedCategory:", selectedCategory?.id);

  const handleContinue = () => {
    if (selectedCategory?.id === "1") {
      dispatch(selectCategory("1"));
      router.push("/quote/service-call/project-details");
    } else if (selectedCategory?.id === "2") {
      dispatch(selectCategory("2"));
      router.push("/quote/ev-charger/ev-projectDetails");
    } else if (selectedCategory?.id === "3") {
      dispatch(selectCategory("3"));
      router.push("/quote/panel-upgrade/service-type");
    } else if (selectedCategory?.id === "4") {
      dispatch(selectCategory("4"));
      router.push("/quote/remodeling/project-basics");
    } else if (selectedCategory?.id === "5") {
      dispatch(selectCategory("5"));
      router.push("/quote/accessory-building/building-basics");
    } else if (selectedCategory?.id === "6") {
      dispatch(selectCategory("6"));
      router.push("/quote/hot-tub/hot-tub-info");
    } else if (selectedCategory?.id === "7") {
      dispatch(selectCategory("7"));
      router.push("/quote/dock-power/dock-basics");
    } else if (selectedCategory?.id === "8") {
      dispatch(selectCategory("8"));
      router.push("/quote/electrical-inspection/inspection-type");
    } else if (selectedCategory?.id === "9") {
      dispatch(selectCategory("9"));
      router.push("/quote/generator/generator-type");
    } else if (selectedCategory?.id === "10") {
      dispatch(selectCategory("10"));
      router.push("/quote/new-construction/project-status");
    }
  };

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
          <StepProgressBar
            currentStep={3}
            totalSteps={selectedCategory?.id === "5" ? 10 : 8}
          />
          <AuthHeading
            title="Project basics"
            subtitle="A few details to help us understand the job"
          />

          <OptionGrid
            label="Property Type"
            required
            options={["House", "Condo", "Apartment", "Commercial"]}
            selected={propertyType}
            onSelect={(val) =>
              dispatch(updateProjectBasics({ propertyType: val as any }))
            }
            numColumns={2}
          />

          <OptionGrid
            label="Ownership Status"
            required
            options={["Owner", "Tenant", "Property Manager", "Other"]}
            selected={ownershipStatus}
            onSelect={(val) =>
              dispatch(updateProjectBasics({ ownershipStatus: val as any }))
            }
            numColumns={1}
          />

          <TimelineOption
            selected={timeline}
            onSelect={(val) =>
              dispatch(updateProjectBasics({ timeline: val as any }))
            }
          />

          <InfoBanner message="The more accurate your details, the faster we can respond with a quote." />

          <GradientButton label="Continue" onPress={handleContinue} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
