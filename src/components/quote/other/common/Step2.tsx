import React, { useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
      className="flex-1"
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 pb-6">
          <Text className="text-2xl font-Inter_Bold text-[#111827] mb-1">
            Service address
          </Text>
          <Text className="text-sm text-[#6B7280] mb-6 font-Inter_Regular">
            Where is the work needed?
          </Text>

          <AnimatedTextInput
            label="Street Address"
            placeholder="123 Main Street"
            required
            value={streetAddress}
            onChangeText={setStreetAddress}
            style={{ marginBottom: 16 }}
          />

          <AnimatedTextInput
            label="Apartment / Unit"
            placeholder="Apt 4B (optional)"
            value={apartment}
            onChangeText={setApartment}
            style={{ marginBottom: 16 }}
          />

          <AnimatedTextInput
            label="City"
            placeholder="San Francisco"
            required
            value={city}
            onChangeText={setCity}
            style={{ marginBottom: 16 }}
          />

          <View className="flex-row gap-3 mb-4">
            <AnimatedTextInput
              label="State"
              placeholder="CA"
              required
              value={state}
              onChangeText={(t) => setState(t.toUpperCase().slice(0, 2))}
              maxLength={2}
              style={{ flex: 1 }}
            />
            <AnimatedTextInput
              label="ZIP Code"
              placeholder="94102"
              required
              value={zip}
              onChangeText={setZip}
              keyboardType="numeric"
              maxLength={5}
              style={{ flex: 1 }}
            />
          </View>

          {/* Checkbox row */}
          <TouchableOpacity
            onPress={toggleHomeAddress}
            activeOpacity={0.8}
            className="flex-row items-center gap-2 mb-4"
          >
            <View
              style={{
                width: 18,
                height: 18,
                borderRadius: 4,
                borderWidth: 1.5,
                borderColor: isHomeAddress ? "#06B6D4" : "#D1D5DB",
                backgroundColor: isHomeAddress ? "#06B6D4" : "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Animated.Text
                style={{
                  color: "white",
                  fontSize: 11,
                  fontWeight: "bold",
                  transform: [{ scale: checkScale }],
                  opacity: checkOpacity,
                }}
              >
                ✓
              </Animated.Text>
            </View>
            <Text className="text-sm text-[#374151] font-Inter_Regular">
              This is my home address
            </Text>
          </TouchableOpacity>

          {/* Info banner */}
          <View className="bg-[#EFF6FF] rounded-xl py-3 mb-6 flex-row items-start gap-2">
            <Text style={{ fontSize: 13 }}>📍</Text>
            <Text className="text-xs text-[#3B82F6] font-Inter_Regular flex-1">
              {`We'll use this address to schedule your service and provide accurate estimates`}
            </Text>
          </View>

          {/* Continue Button */}
          <Animated.View
            style={{ transform: [{ scale: buttonScaleAnim }] }}
          ></Animated.View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Step2;
