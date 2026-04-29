import AuthHeading from "@/src/components/auth/AuthHeading";
import TermsAndPolicy from "@/src/components/auth/TermsAndPolicy";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import InfoBanner from "@/src/components/quote/InfoBanner";
import BackButton from "@/src/components/shared/BackButton";
import CustomInput from "@/src/components/shared/CustomInput";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import StepProgressBar from "@/src/components/shared/StepProgressBar";
import {
    setApartment,
    setCity,
    setIsHomeAddress,
    setState,
    setStreetAddress,
    setZipCode,
} from "@/src/redux/slices/servicDetailSlice";

import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function ServiceAddress() {
  const dispatch = useDispatch();
  const { streetAddress, apartment, city, state, zipCode, isHomeAddress } =
    useSelector((state: RootState) => state.serviceDetails);

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
          <StepProgressBar currentStep={2} />
          <AuthHeading
            title="Your service address"
            subtitle="Where is the work needed?"
          />

          <CustomInput
            label="Street Address *"
            leftIcon="location-outline"
            textInputConfig={{
              placeholder: "Enter your street address",
              autoCapitalize: "words",
              value: streetAddress,
              onChangeText: (text) => dispatch(setStreetAddress(text)),
            }}
          />

          <CustomInput
            label="Apartment / Unit"
            leftIcon="business-outline"
            textInputConfig={{
              placeholder: "Apt, suite, unit (optional)",
              keyboardType: "default",
              autoCapitalize: "none",
              value: apartment,
              onChangeText: (text) => dispatch(setApartment(text)),
            }}
          />

          <CustomInput
            label="City *"
            leftIcon="map-outline"
            textInputConfig={{
              placeholder: "Enter your city",
              keyboardType: "default",
              autoCapitalize: "words",
              value: city,
              onChangeText: (text) => dispatch(setCity(text)),
            }}
          />

          <CustomInput
            label="State *"
            leftIcon="flag-outline"
            textInputConfig={{
              placeholder: "Enter your state",
              keyboardType: "default",
              autoCapitalize: "characters",
              value: state,
              onChangeText: (text) => dispatch(setState(text)),
            }}
          />

          <CustomInput
            label="Zip Code *"
            leftIcon="mail-open-outline"
            textInputConfig={{
              placeholder: "Enter your zip code",
              keyboardType: "number-pad",
              autoCapitalize: "none",
              value: zipCode,
              onChangeText: (text) => dispatch(setZipCode(text)),
            }}
          />

          <TermsAndPolicy
            shouldShowTitle={false}
            subtitle="This is my home address"
            value={isHomeAddress}
            onToggle={(val) => dispatch(setIsHomeAddress(val))}
          />
          <InfoBanner />

          <GradientButton
            label="Continue"
            onPress={() => router.push("/quote/common/project-basics")}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
