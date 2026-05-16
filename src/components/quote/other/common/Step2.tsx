import AuthHeading from "@/src/components/auth/AuthHeading";
import TermsAndPolicy from "@/src/components/auth/TermsAndPolicy";
import CustomInput from "@/src/components/shared/CustomInput";

import { updateServiceAddress } from "@/src/redux/slices/globalstore/commonContractdetailsStoreSlice";
import { RootState } from "@/src/redux/store";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import InfoBanner from "../../InfoBanner";

const Step2 = () => {
  const dispatch = useDispatch();
  const { streetAddress, apartment, city, state, zip, isHomeAddress } =
    useSelector(
      (state: RootState) => state.commonContractDetails.serviceAddress,
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
            onChangeText: (text: string) =>
              dispatch(updateServiceAddress({ streetAddress: text })),
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
            onChangeText: (text: string) =>
              dispatch(updateServiceAddress({ apartment: text })),
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
            onChangeText: (text: string) =>
              dispatch(updateServiceAddress({ city: text })),
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
            onChangeText: (text: string) =>
              dispatch(updateServiceAddress({ state: text })),
          }}
        />

        <CustomInput
          label="Zip Code *"
          leftIcon="mail-open-outline"
          textInputConfig={{
            placeholder: "Enter your zip code",
            keyboardType: "number-pad",
            autoCapitalize: "none",
            value: zip,
            onChangeText: (text: string) =>
              dispatch(updateServiceAddress({ zip: text })),
          }}
        />

        <TermsAndPolicy
          shouldShowTitle={false}
          subtitle="This is my home address"
          subtitleColor="#6b7280"
          // wire if TermsAndPolicy supports it:
          // checked={isHomeAddress}
          // onToggle={(val) => dispatch(updateServiceAddress({ isHomeAddress: val }))}
        />

        <InfoBanner />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Step2;
