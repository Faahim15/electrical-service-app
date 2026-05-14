import AuthHeading from "@/src/components/auth/AuthHeading";
import TermsAndPolicy from "@/src/components/auth/TermsAndPolicy";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import PreferredContactSelector from "@/src/components/quote/PreferredContactSelector";
import BackButton from "@/src/components/shared/BackButton";
import CustomInput from "@/src/components/shared/CustomInput";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import { updateContactDetails } from "@/src/redux/slices/serviceFormSlice";
import { RootState } from "@/src/redux/store";
import { CATEGORY_TOTAL_STEPS } from "@/src/utils/CategorySteps";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ContactDetails() {
  const dispatch = useDispatch();
  const { fullName, email, phone } = useSelector(
    (state: RootState) => state.serviceForm.contactDetails,
  );
  const selectedCategory = useSelector(
    (state: RootState) => state.categoryRoute.selectedCategory,
  );
  const totalSteps = CATEGORY_TOTAL_STEPS[selectedCategory?.id ?? ""] ?? 8;
  return (
    <ScreenWrapper paddingHorizontal={20}>
      <BackButton />
      <View>
        <StepProgressBar currentStep={1} totalSteps={totalSteps} />
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
            onChangeText: (text) =>
              dispatch(updateContactDetails({ fullName: text })),
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
            onChangeText: (text) =>
              dispatch(updateContactDetails({ email: text })),
          }}
        />

        <CustomInput
          label="Phone Number"
          leftIcon="call-outline"
          textInputConfig={{
            placeholder: "Enter your phone number",
            keyboardType: "phone-pad",
            value: phone,
            onChangeText: (text) =>
              dispatch(updateContactDetails({ phone: text })),
          }}
        />

        <PreferredContactSelector />

        <TermsAndPolicy
          title="I agree to be"
          subtitle="contacted about this request"
          subtitleColor="#6b7280"
        />

        <GradientButton
          label="Continue"
          onPress={() => router.push("/quote/common/service-address")}
        />
      </View>
    </ScreenWrapper>
  );
}
