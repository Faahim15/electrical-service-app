import { GradientButton } from "@/src/components/onboarding/GradientButton";
import { AccessoryBuildingReview } from "@/src/components/quote/review/AccessoryBuildingReview";
import { CategoryTag } from "@/src/components/quote/review/CategoryTag";
import { DockPowerReview } from "@/src/components/quote/review/DockPowerReview";
import { ElectricalInspectionReview } from "@/src/components/quote/review/ElectricalInspectionReview";
import { EVChargerReview } from "@/src/components/quote/review/EVChargerRow";
import { GeneratorReview } from "@/src/components/quote/review/GeneratorReview";
import { HotTubReview } from "@/src/components/quote/review/HotTubReview";
import { NewConstructionReview } from "@/src/components/quote/review/NewConstructionReview";
import { PanelUpgradeReview } from "@/src/components/quote/review/PanelUpgradeReview";
import { RemodelingReview } from "@/src/components/quote/review/RemodelingReview";
import { ReviewRow } from "@/src/components/quote/review/ReviewRow";
import { ReviewSectionTitle } from "@/src/components/quote/review/ReviewSectionTitle";
import { ServiceCallReview } from "@/src/components/quote/review/ServiceCallReview";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { SERVICE_CATEGORIES } from "@/src/constants/tabs.home.constant";
import { RootState } from "@/src/redux/store";
import { CATEGORY_TOTAL_STEPS } from "@/src/utils/CategorySteps";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";
import { useSelector } from "react-redux";

export default function ReviewRequest() {
  const selectedCategoryId = useSelector(
    (state: RootState) => state.serviceForm.selectedCategoryId,
  );
  const contactDetails = useSelector(
    (state: RootState) => state.serviceForm.contactDetails,
  );
  const serviceAddress = useSelector(
    (state: RootState) => state.serviceForm.serviceAddress,
  );
  const projectBasics = useSelector(
    (state: RootState) => state.serviceForm.projectBasics,
  );
  const categoryData = useSelector(
    (state: RootState) => state.serviceForm.categoryData,
  );

  const selectedCategory = SERVICE_CATEGORIES.find(
    (c) => c.id === selectedCategoryId,
  );

  const totalSteps = CATEGORY_TOTAL_STEPS[selectedCategory?.id ?? ""] ?? 8;

  return (
    <ScreenWrapper paddingHorizontal={20}>
      <BackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <StepProgressBar currentStep={totalSteps} totalSteps={totalSteps} />

          {selectedCategory && <CategoryTag title={selectedCategory.title} />}

          <Text className="text-[#1E293B] text-[22px] font-Inter_Bold mb-1">
            Review your request
          </Text>
          <Text className="text-[#64748B] text-[13.5px] font-Inter_Regular mb-5">
            Check your answers before sending
          </Text>

          {/* Common — সব category */}
          <ReviewSectionTitle title="Contact Details" />
          <ReviewRow label="Full Name" value={contactDetails.fullName} />
          <ReviewRow label="Email Address" value={contactDetails.email} />
          <ReviewRow label="Phone Number" value={contactDetails.phone} />
          <ReviewRow
            label="Preferred Contact"
            value={contactDetails.preferredContact}
          />

          <ReviewSectionTitle title="Service Address" />
          <ReviewRow
            label="Street Address"
            value={serviceAddress.streetAddress}
          />
          <ReviewRow
            label="Apartment / Unit"
            value={serviceAddress.apartment}
          />
          <ReviewRow label="City" value={serviceAddress.city} />
          <ReviewRow label="State" value={serviceAddress.state} />
          <ReviewRow label="Zip Code" value={serviceAddress.zipCode} />
          <ReviewRow
            label="Home Address"
            value={serviceAddress.isHomeAddress ? "Yes" : "No"}
          />

          <ReviewSectionTitle title="Project Basics" />
          <ReviewRow label="Property Type" value={projectBasics.propertyType} />
          <ReviewRow
            label="Ownership Status"
            value={projectBasics.ownershipStatus}
          />
          <ReviewRow
            label="Timeline / Urgency"
            value={projectBasics.timeline}
          />

          {/* Category Specific */}
          {categoryData?.categoryId === "1" && categoryData.details && (
            <ServiceCallReview details={categoryData.details} />
          )}
          {categoryData?.categoryId === "2" && categoryData.details && (
            <EVChargerReview details={categoryData.details} />
          )}
          {categoryData?.categoryId === "3" && categoryData.details && (
            <PanelUpgradeReview details={categoryData.details} />
          )}
          {categoryData?.categoryId === "4" && categoryData.details && (
            <RemodelingReview details={categoryData.details} />
          )}

          {categoryData?.categoryId === "5" && categoryData.details && (
            <AccessoryBuildingReview details={categoryData.details} />
          )}
          {categoryData?.categoryId === "6" && categoryData.details && (
            <HotTubReview details={categoryData.details} />
          )}
          {categoryData?.categoryId === "7" && categoryData.details && (
            <DockPowerReview details={categoryData.details} />
          )}
          {categoryData?.categoryId === "8" && categoryData.details && (
            <ElectricalInspectionReview details={categoryData.details} />
          )}
          {categoryData?.categoryId === "9" && categoryData.details && (
            <GeneratorReview details={categoryData.details} />
          )}
          {categoryData?.categoryId === "10" && categoryData.details && (
            <NewConstructionReview details={categoryData.details} />
          )}
          <GradientButton
            label="Submit"
            onPress={() => router.push("/submit-success" as any)}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
