import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}
const InputField2: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "",
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-3">
      <Text className="text-base font-Inter_SemiBold text-[#111827] mb-2 tracking-[0.1px]">
        {label}
      </Text>

      <TextInput
        className={`h-[50px] font-Inter_Regular rounded-xl border px-4 text-sm text-[#111827] bg-[#FFFFFF] ${
          isFocused ? "border-cyan-500 bg-[#FFFFFF]" : "border-[#E2E8F0]"
        }`}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#11182780"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default InputField2;
