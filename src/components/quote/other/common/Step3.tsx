import AuthHeading from "@/src/components/auth/AuthHeading";
import InfoBanner from "@/src/components/quote/InfoBanner";
import OptionGrid from "@/src/components/quote/OptionGrid";
import TimelineOption from "@/src/components/quote/TimelineOption";
import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { updateProjectBasicsCommon } from "@/src/redux/slices/globalstore/commonContractdetailsStoreSlice";

import { RootState } from "@/src/redux/store";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ProjectBasics() {
  const dispatch = useDispatch();
  const { propertyType, ownershipStatus, ownershipStatusOther, timeline } =
    useSelector(
      (state: RootState) => state.commonContractDetails.projectBasics,
    );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
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
            dispatch(updateProjectBasicsCommon({ propertyType: val as any }))
          }
          numColumns={2}
        />

        <OptionGrid
          label="Ownership Status"
          required
          options={["Owner", "Tenant", "Property Manager", "Other"]}
          selected={ownershipStatus}
          onSelect={(val) =>
            dispatch(updateProjectBasicsCommon({ ownershipStatus: val as any }))
          }
          numColumns={1}
        />

        {ownershipStatus === "Other" && (
          <TextAreaInput
            label="Please specify"
            placeholder="Describe your ownership status"
            value={ownershipStatusOther ?? ""}
            onChangeText={(text) =>
              dispatch(
                updateProjectBasicsCommon({ ownershipStatusOther: text }),
              )
            }
          />
        )}

        <TimelineOption
          selected={timeline}
          onSelect={(val) =>
            dispatch(updateProjectBasicsCommon({ timeline: val as any }))
          }
        />

        <InfoBanner message="The more accurate your details, the faster we can respond with a quote." />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
