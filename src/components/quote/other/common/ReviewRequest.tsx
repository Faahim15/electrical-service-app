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
import { RootState } from "@/src/redux/store";
import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function ReviewRequest() {
  // ── Common contract data from shared slice ──────────────────────────────────
  const contactDetails = useSelector(
    (state: RootState) => state.commonContractDetails.contactDetails,
  );
  const serviceAddress = useSelector(
    (state: RootState) => state.commonContractDetails.serviceAddress,
  );
  const projectBasics = useSelector(
    (state: RootState) => state.commonContractDetails.projectBasics,
  );

  // ── Category-specific data ──────────────────────────────────────────────────
  const selectedCategory = useSelector(
    (state: RootState) => state.categoryRoute.selectedCategory,
  );
  const categoryData = useSelector(
    (state: RootState) => state.serviceForm.categoryData,
  );

  console.log(contactDetails);
  return (
    <View>
      {selectedCategory && <CategoryTag title={selectedCategory.title} />}

      <Text className="text-[#1E293B] text-[22px] font-Inter_Bold mb-1">
        Review your request
      </Text>
      <Text className="text-[#64748B] text-[13.5px] font-Inter_Regular mb-5">
        Check your answers before sending
      </Text>

      {/* ── Contact Details ─────────────────────────────────────────────────── */}
      <ReviewSectionTitle title="Contact Details" />
      <ReviewRow label="Full Name" value={contactDetails.fullName} />
      <ReviewRow label="Email Address" value={contactDetails.email} />
      <ReviewRow label="Phone Number" value={contactDetails.phoneNumber} />
      <ReviewRow
        label="Preferred Contact"
        value={contactDetails.preferredContact}
      />

      {/* ── Service Address ─────────────────────────────────────────────────── */}
      <ReviewSectionTitle title="Service Address" />
      <ReviewRow label="Street Address" value={serviceAddress.streetAddress} />
      <ReviewRow label="Apartment / Unit" value={serviceAddress.apartment} />
      <ReviewRow label="City" value={serviceAddress.city} />
      <ReviewRow label="State" value={serviceAddress.state} />
      <ReviewRow label="Zip Code" value={serviceAddress.zip} />
      <ReviewRow
        label="Home Address"
        value={serviceAddress.isHomeAddress ? "Yes" : "No"}
      />

      {/* ── Project Basics ──────────────────────────────────────────────────── */}
      <ReviewSectionTitle title="Project Basics" />
      <ReviewRow label="Property Type" value={projectBasics.propertyType} />
      <ReviewRow
        label="Ownership Status"
        value={projectBasics.ownershipStatus}
      />
      {projectBasics.ownershipStatus === "Other" && (
        <ReviewRow
          label="Ownership Detail"
          value={projectBasics.ownershipStatusOther}
        />
      )}
      <ReviewRow label="Timeline / Urgency" value={projectBasics.timeline} />

      {/* ── Category-Specific Sections ──────────────────────────────────────── */}
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
    </View>
  );
}
