import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

const TermsAndPolicy = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <View className="flex-row items-center mb-4">
      {/* Checkbox */}
      <Pressable
        onPress={() => setAgreed((prev) => !prev)}
        className={`w-5 h-5 rounded border items-center justify-center mr-2 ${
          agreed ? "bg-[#00ABB0] border-[#00ABB0]" : "bg-white border-gray-400"
        }`}
      >
        {agreed && <Ionicons name="checkmark" size={13} color="white" />}
      </Pressable>

      {/* Text */}
      <Text className="font-Inter_Regular text-sm text-gray-500">
        I agree to the{" "}
      </Text>
      <Pressable>
        <Text className="font-Inter_Medium text-sm text-[#00ABB0]">
          Terms & Privacy Policy
        </Text>
      </Pressable>
    </View>
  );
};

export default TermsAndPolicy;
