import AuthHeading from "@/src/components/auth/AuthHeading";
import TermsAndPolicy from "@/src/components/auth/TermsAndPolicy";
import CustomInput from "@/src/components/shared/CustomInput";
import React, { useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import InfoBanner from "../../InfoBanner";

const AnimatedTextInput = ({
  label,
  placeholder,
  required,
  value,
  onChangeText,
  keyboardType,
  maxLength,
  style,
}: {
  label: string;
  placeholder: string;
  required?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
  maxLength?: number;
  style?: any;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {};

  const handleBlur = () => {};

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E5E7EB", "#06B6D4"],
  });

  return (
    <View style={style}>
      <Text className="text-sm font-Inter_Medium text-[#374151] mb-1">
        {label}
        {required && <Text className="text-red-500"> *</Text>}
      </Text>
      <Animated.View
        style={{
          borderColor,
          transform: [{ scale: scaleAnim }],
          borderWidth: 1,
          borderRadius: 12,
          backgroundColor: "white",
          shadowColor: isFocused ? "#06B6D4" : "transparent",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isFocused ? 0.15 : 0,
          shadowRadius: 4,
          elevation: isFocused ? 3 : 0,
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="px-4 py-3 text-[#111827] font-Inter_Regular text-sm"
          style={{ outline: "none" } as any}
        />
      </Animated.View>
    </View>
  );
};

const Step2 = () => {
  const [streetAddress, setStreetAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [isHomeAddress, setIsHomeAddress] = useState(false);

  const checkAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  const checkScale = checkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const checkOpacity = checkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const toggleHomeAddress = () => {
    const toValue = isHomeAddress ? 0 : 1;
    setIsHomeAddress(!isHomeAddress);
    Animated.spring(checkAnim, {
      toValue,
      useNativeDriver: true,
      friction: 6,
      tension: 120,
    }).start();
  };

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
          }}
        />

        <CustomInput
          label="Apartment / Unit"
          leftIcon="business-outline"
          textInputConfig={{
            placeholder: "Apt, suite, unit (optional)",
            keyboardType: "default",
            autoCapitalize: "none",
          }}
        />

        <CustomInput
          label="City *"
          leftIcon="map-outline"
          textInputConfig={{
            placeholder: "Enter your city",
            keyboardType: "default",
            autoCapitalize: "words",
          }}
        />

        <CustomInput
          label="State *"
          leftIcon="flag-outline"
          textInputConfig={{
            placeholder: "Enter your state",
            keyboardType: "default",
            autoCapitalize: "characters",
          }}
        />

        <CustomInput
          label="Zip Code *"
          leftIcon="mail-open-outline"
          textInputConfig={{
            placeholder: "Enter your zip code",
            keyboardType: "number-pad",
            autoCapitalize: "none",
          }}
        />

        <TermsAndPolicy
          shouldShowTitle={false}
          subtitle="This is my home address"
          subtitleColor="#6b7280"
        />
        <InfoBanner />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Step2;
