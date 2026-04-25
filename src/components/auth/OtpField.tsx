import React, { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    View,
} from "react-native";

interface OtpFieldProps {
  onOtpChange?: (otp: string[]) => void;
  error?: string;
}

export default function OtpField({ onOtpChange, error }: OtpFieldProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    // ✅ Paste handle
    if (text.length > 1) {
      const cleaned = text.replace(/[^0-9]/g, "").slice(0, 6);
      const newOtp = [...otp];

      cleaned.split("").forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });

      setOtp(newOtp);
      onOtpChange?.(newOtp);

      const lastIndex = Math.min(cleaned.length - 1, 5);
      inputRefs.current[lastIndex]?.focus();
      return;
    }

    // Single character typing
    if (text && !/^\d+$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onOtpChange?.(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (otp[index]) {
        // ✅ Current field এ value আছে → শুধু সেটা clear করো, focus এখানেই থাকুক
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onOtpChange?.(newOtp);
      } else if (index > 0) {
        // ✅ Current field খালি → আগের field clear করে সেখানে যাও
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        onOtpChange?.(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleInputFocus = (index: number) => {
    inputRefs.current[index]?.setNativeProps({
      selection: { start: 0, end: otp[index].length },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      //   className="bg-transparent"
    >
      <View className=" mt-2">
        <View className="flex-row justify-between w-[100%] mb-6">
          {otp.map((digit, index) => (
            <View key={index} className="w-[14%] mt-[3%] aspect-square">
              <TextInput
                ref={(ref: TextInput | null) => {
                  inputRefs.current[index] = ref;
                }}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => handleInputFocus(index)}
                keyboardType="number-pad"
                maxLength={6}
                className={`border-b-2 text-center text-2xl pt-[3%] font-Inter_SemiBold ${
                  error
                    ? "border-red-500 text-red-500"
                    : "border-[#07ADD2] text-[#0EA5E9]"
                }`}
                style={{ textAlignVertical: "center" }}
              />
            </View>
          ))}
        </View>

        {error && (
          <Text className="text-red-500 font-Inter_Regular text-xs -mt-4 mb-2">
            {error}
          </Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
