import { ReviewRow } from "@/src/components/quote/review/ReviewRow";
import { ReviewSectionTitle } from "@/src/components/quote/review/ReviewSectionTitle";
import { RootState } from "@/src/redux/store";
import React from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import ExhaustFunData from "./ReviewDataShow/ExhaustFunData";
import StarlinkData from "./ReviewDataShow/StarlinkData";
import SwitchesData from "./ReviewDataShow/SwitchesData";
import WholeHomeData from "./ReviewDataShow/WholeHomeData";

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
      {selectedCategory && (
        <View className="self-start bg-[#EFF6FF] px-3 py-2 rounded-full mb-4">
          <Text className="text-[#60A5FA] text-sm font-Inter_Medium">
            {selectedCategory.title}
          </Text>
        </View>
      )}

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

      {/* ── each wise data show ──────────────────────────────────────────────────── */}

      {selectedCategory &&
        selectedCategory.title === "Whole Home Surge Protection" && (
          <WholeHomeData />
        )}
      {selectedCategory &&
        selectedCategory.title === "Starlink Installation" && <StarlinkData />}

      {selectedCategory && selectedCategory.title === "Exhaust Fan" && (
        <ExhaustFunData />
      )}

      {selectedCategory && selectedCategory.title === "Switches" && (
        <SwitchesData />
      )}
    </View>
  );
}
