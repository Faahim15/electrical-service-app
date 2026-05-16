import AuthHeading from "@/src/components/auth/AuthHeading";
import TermsAndPolicy from "@/src/components/auth/TermsAndPolicy";
import CustomInput from "@/src/components/shared/CustomInput";
import { updateContactDetails } from "@/src/redux/slices/globalstore/commonContractdetailsStoreSlice";
import { RootState } from "@/src/redux/store";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// ─── Constants ─────────────────────────────────────────────────────────────────
const CONTACT_OPTIONS = ["Call", "Text", "Email"] as const;

// ─── Inline: Preferred Contact Section ────────────────────────────────────────
const PreferredContactSection = () => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) =>
      state.commonContractDetails.contactDetails.preferredContact,
  );

  return (
    <View className="mb-[4%] mt-[2%]">
      <View className="flex-row items-center mb-2">
        <Text className="text-[#1E293B] text-[13.5px] font-Inter_SemiBold">
          Preferred contact method
        </Text>
        <Text className="text-red-500 ml-1 text-[13.5px]">*</Text>
      </View>

      <View className="flex-row gap-3">
        {CONTACT_OPTIONS.map((option) => {
          const isSelected = selected === option;
          return (
            <TouchableOpacity
              key={option}
              activeOpacity={0.8}
              onPress={() =>
                dispatch(updateContactDetails({ preferredContact: option }))
              }
              style={{
                paddingHorizontal: 24,
                paddingVertical: 11,
                borderRadius: 12,
                backgroundColor: isSelected ? "#0EA5E9" : "#FFFFFF",
                borderWidth: isSelected ? 0 : 1,
                borderColor: "#E2E8F0",
                shadowColor: "#94A3B8",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: isSelected ? 0 : 0.08,
                shadowRadius: 4,
                elevation: isSelected ? 0 : 2,
              }}
            >
              <Text
                className="text-[14px] font-Inter_SemiBold"
                style={{ color: isSelected ? "#FFFFFF" : "#64748B" }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

// ─── Step 1 ────────────────────────────────────────────────────────────────────
const Step1 = ({ onContinue }: { onContinue?: () => void }) => {
  const dispatch = useDispatch();
  const { fullName, email, phoneNumber, agreedToContact } = useSelector(
    (state: RootState) => state.commonContractDetails.contactDetails,
  );

  return (
    <View className="flex-1">
      <AuthHeading
        title="Your contact details"
        subtitle="We'll use this to follow up on your request"
      />

      <CustomInput
        label="Full Name *"
        leftIcon="person-outline"
        textInputConfig={{
          placeholder: "Enter your full name",
          autoCapitalize: "words",
          value: fullName,
          onChangeText: (text: string) =>
            dispatch(updateContactDetails({ fullName: text })),
        }}
      />

      <CustomInput
        label="Email Address *"
        leftIcon="mail-outline"
        textInputConfig={{
          placeholder: "Enter your email",
          keyboardType: "email-address",
          autoCapitalize: "none",
          value: email,
          onChangeText: (text: string) =>
            dispatch(updateContactDetails({ email: text })),
        }}
      />

      <CustomInput
        label="Phone Number *"
        leftIcon="call-outline"
        textInputConfig={{
          placeholder: "Enter your phone number",
          keyboardType: "phone-pad",
          value: phoneNumber,
          onChangeText: (text: string) =>
            dispatch(updateContactDetails({ phoneNumber: text })),
        }}
      />

      {/* Preferred Contact — inline, reads & writes Redux directly */}
      <PreferredContactSection />

      <TermsAndPolicy
        title="I agree to be"
        subtitle="contacted about this request"
        subtitleColor="#6b7280"
        // wire if TermsAndPolicy supports it:
        // checked={agreedToContact}
        // onToggle={(val) => dispatch(updateContactDetails({ agreedToContact: val }))}
      />
    </View>
  );
};

export default Step1;
