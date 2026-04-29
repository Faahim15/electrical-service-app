import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface TermsAndPolicyProps {
  title?: string;
  subtitle?: string;
  onPressTerms?: () => void;
}

const TermsAndPolicy = ({
  title = "I agree to the",
  subtitle = "Terms & Privacy Policy",
  onPressTerms,
}: TermsAndPolicyProps) => {
  const [agreed, setAgreed] = useState(false);

  return (
    <View className="flex-row items-center mb-4">
      {/* Checkbox */}
      <Pressable
        onPress={() => setAgreed((prev) => !prev)}
        className={`w-5 h-5 rounded border items-center justify-center mr-2 ${
          agreed ? "bg-[#0EA5E9] border-[#0EA5E9]" : "bg-white border-gray-400"
        }`}
      >
        {agreed && <Ionicons name="checkmark" size={13} color="white" />}
      </Pressable>

      {/* Text */}
      <Text className="font-Inter_Regular text-sm text-gray-500">{title} </Text>
      <Pressable onPress={onPressTerms}>
        <Text className="font-Inter_Medium text-sm text-[#0EA5E9]">
          {subtitle}
        </Text>
      </Pressable>
    </View>
  );
};

export default TermsAndPolicy;
