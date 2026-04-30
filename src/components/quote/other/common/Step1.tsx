import React, { useRef, useState } from "react";
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ─── Animated Contact Method Pill ─────────────────────────────────────────────
const ContactPill = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.92,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.85}
        style={{
          paddingHorizontal: 24,
          paddingVertical: 10,
          borderRadius: 999,
          borderWidth: 1.5,
          backgroundColor: selected ? "#06B6D4" : "#ffffff",
          borderColor: selected ? "#06B6D4" : "#E5E7EB",
        }}
      >
        <Text
          className={`text-sm font-Inter_SemiBold ${
            selected ? "text-white" : "text-[#374151]"
          }`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── Animated Text Input Field ────────────────────────────────────────────────
const AnimatedField = ({
  label,
  placeholder,
  keyboardType,
  value,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  keyboardType?: any;
  value: string;
  onChangeText: (v: string) => void;
}) => {
  const [focused, setFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setFocused(true);
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 180,
      useNativeDriver: false,
    }).start();
  };
  const handleBlur = () => {
    setFocused(false);
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E5E7EB", "#06B6D4"],
  });

  return (
    <View className="mb-4">
      <Text className="text-sm font-Inter_Medium text-[#374151] mb-1">
        {label} <Text className="text-red-500">*</Text>
      </Text>
      <Animated.View
        style={{
          borderWidth: 1.5,
          borderColor,
          borderRadius: 12,
          backgroundColor: "#ffffff",
          paddingHorizontal: 16,
          paddingVertical: 14,
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="text-sm text-[#111827] font-Inter_Regular p-0 m-0"
          style={{ height: 20 }}
        />
      </Animated.View>
    </View>
  );
};

// ─── Step 1 ───────────────────────────────────────────────────────────────────
const Step1 = ({ onContinue }: { onContinue?: () => void }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [contactMethod, setContactMethod] = useState<string>("Call");

  return (
    <View className="flex-1">
      {/* Title */}
      <Text className="text-2xl font-Inter_Bold text-[#111827] mb-1">
        Your contact details
      </Text>
      <Text className="text-sm text-[#6B7280] font-Inter_Regular mb-6">
        {`We'll use this to follow up on your request`}
      </Text>

      {/* Full Name */}
      <AnimatedField
        label="Full Name"
        placeholder="John Smith"
        value={fullName}
        onChangeText={setFullName}
      />

      {/* Phone */}
      <AnimatedField
        label="Phone Number"
        placeholder="(555) 123-4567"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      {/* Email */}
      <AnimatedField
        label="Email Address"
        placeholder="john@example.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Preferred Contact Method */}
      <Text className="text-sm font-Inter_Medium text-[#374151] mb-2">
        Preferred contact method <Text className="text-red-500">*</Text>
      </Text>
      <View className="flex-row gap-2 mb-5">
        {["Call", "Text", "Email"].map((method) => (
          <ContactPill
            key={method}
            label={method}
            selected={contactMethod === method}
            onPress={() => setContactMethod(method)}
          />
        ))}
      </View>
    </View>
  );
};

export default Step1;
