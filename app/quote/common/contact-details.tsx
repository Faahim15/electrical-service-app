import AuthHeading from "@/src/components/auth/AuthHeading";
import TermsAndPolicy from "@/src/components/auth/TermsAndPolicy";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import PreferredContactSelector from "@/src/components/quote/PreferredContactSelector";
import CustomInput from "@/src/components/shared/CustomInput";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import {
    setEmail,
    setFullName,
    setPhone,
} from "@/src/redux/slices/servicDetailSlice";
import { RootState } from "@/src/redux/store";
import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ContactDetails() {
  const dispatch = useDispatch();
  const { fullName, email, phone } = useSelector(
    (state: RootState) => state.serviceDetails,
  );

  return (
    <ScreenWrapper paddingHorizontal={20}>
      <View>
        <StepProgressBar currentStep={1} />
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
            value: fullName,
            onChangeText: (text) => dispatch(setFullName(text)),
          }}
        />

        <CustomInput
          label="Email Address"
          leftIcon="mail-outline"
          textInputConfig={{
            placeholder: "Enter your email",
            keyboardType: "email-address",
            autoCapitalize: "none",
            value: email,
            onChangeText: (text) => dispatch(setEmail(text)),
          }}
        />

        <CustomInput
          label="Phone Number"
          leftIcon="call-outline"
          textInputConfig={{
            placeholder: "Enter your phone number",
            keyboardType: "phone-pad",
            value: phone,
            onChangeText: (text) => dispatch(setPhone(text)),
          }}
        />

        <PreferredContactSelector />

        <TermsAndPolicy
          title="I agree to be"
          subtitle="contacted about this request"
        />

        <GradientButton label="Continue" />
      </View>
    </ScreenWrapper>
  );
}
