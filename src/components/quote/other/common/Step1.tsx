import AuthHeading from "@/src/components/auth/AuthHeading";
import TermsAndPolicy from "@/src/components/auth/TermsAndPolicy";
import CustomInput from "@/src/components/shared/CustomInput";
import React, { useState } from "react";
import { View } from "react-native";
import PreferredContactSelector from "../../PreferredContactSelector";

// ─── Step 1 ───────────────────────────────────────────────────────────────────
const Step1 = ({ onContinue }: { onContinue?: () => void }) => {
  const [email, setEmail] = useState("");

  return (
    <View className="flex-1">
      <AuthHeading
        title="Your contact details"
        subtitle="We'll use this to follow up on your request"
      />

      <CustomInput
        label="Full Name"
        leftIcon="person-outline"
        textInputConfig={{
          placeholder: "Enter your full name",
          autoCapitalize: "words",
        }}
      />

      <CustomInput
        label="Email Address"
        leftIcon="mail-outline"
        textInputConfig={{
          placeholder: "Enter your email",
          keyboardType: "email-address",
          autoCapitalize: "none",
        }}
      />

      <CustomInput
        label="Phone Number"
        leftIcon="call-outline"
        textInputConfig={{
          placeholder: "Enter your phone number",
          keyboardType: "phone-pad",
        }}
      />

      <PreferredContactSelector />

      <TermsAndPolicy
        title="I agree to be"
        subtitle="contacted about this request"
        subtitleColor="#6b7280"
      />
    </View>
  );
};

export default Step1;
