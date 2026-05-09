import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface TermsAndPolicyProps {
  title?: string;
  subtitle?: string;
  onPressTerms?: () => void;
  shouldShowTitle?: boolean;
  value?: boolean;
  onToggle?: (val: boolean) => void;
  subtitleColor?: string;
}

const TermsAndPolicy = ({
  title = "I agree to the",
  subtitle = "Terms & Privacy Policy",
  shouldShowTitle = true,
  onPressTerms,
  value,
  onToggle,
  subtitleColor = "#0EA5E9",
}: TermsAndPolicyProps) => {
  const [internalAgreed, setInternalAgreed] = useState(false);

  const isControlled = value !== undefined;
  const agreed = isControlled ? value : internalAgreed;

  const handleToggle = () => {
    const next = !agreed;
    if (isControlled) {
      onToggle?.(next);
    } else {
      setInternalAgreed(next);
    }
  };

  return (
    <View className="flex-row items-center mb-4">
      {/* Checkbox */}
      <Pressable
        onPress={handleToggle}
        className={`w-5 h-5 rounded border items-center justify-center mr-2 ${
          agreed ? "bg-[#0EA5E9] border-[#0EA5E9]" : "bg-white border-gray-400"
        }`}
      >
        {agreed && <Ionicons name="checkmark" size={13} color="white" />}
      </Pressable>

      {/* Text */}
      {shouldShowTitle && (
        <Text className="font-Inter_Regular text-sm text-gray-500">
          {title}{" "}
        </Text>
      )}
      <Pressable onPress={onPressTerms}>
        <Text
          style={{ color: subtitleColor }}
          className="font-Inter_Medium text-sm"
        >
          {subtitle}
        </Text>
      </Pressable>
    </View>
  );
};

export default TermsAndPolicy;
