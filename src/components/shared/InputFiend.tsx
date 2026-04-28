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
const InputField: React.FC<InputFieldProps> = ({
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
      <Text className="text-[13px] font-Inter_SemiBold text-[#111827] mb-[6px] tracking-[0.1px]">
        {label}
      </Text>

      <TextInput
        className={`h-[50px] font-Inter_Regular rounded-xl border-[1.5px] px-[14px] text-[15px] text-[#111827] bg-[#F9FAFB] ${
          isFocused
            ? "border-cyan-500 bg-[#F9FAFB] shadow-sm"
            : "border-[#D9E6EE]"
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

export default InputField;
