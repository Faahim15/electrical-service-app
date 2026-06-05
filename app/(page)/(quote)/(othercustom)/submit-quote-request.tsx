import { successfull } from "@/assets/iocns/icon";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

const SubmitQuoteRequest = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const iconScaleAnim = useRef(new Animated.Value(0.6)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const checkboxAnim = useRef(new Animated.Value(0)).current;
  const btnAnim = useRef(new Animated.Value(0)).current;

  const [checked, setChecked] = useState(false);
  const checkScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(iconScaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 350,
        delay: 80,
        useNativeDriver: true,
      }),
      Animated.timing(checkboxAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(btnAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCheck = () => {
    setChecked((prev) => {
      const next = !prev;
      Animated.spring(checkScale, {
        toValue: next ? 1 : 0,
        friction: 4,
        tension: 120,
        useNativeDriver: true,
      }).start();
      return next;
    });
  };

  const infoRows = [
    { label: "Selected Service", value: "Service Call" },
    { label: "Expected Response", value: "Within 24-48 hours" },
    { label: "Best Contact Method", value: "Phone Call" },
  ];

  return (
    <ScreenWrapper>
      <SafeAreaView className="flex-1">
        <View className="flex-1   pb-6 justify-between">
          {/* Top Section */}
          <View className="items-center pt-10 pb-4">
            {/* Icon */}
            <Animated.View
              className=" rounded-full bg-[#06B6D4] items-center justify-center mb-5 shadow-md"
              style={{
                opacity: fadeAnim,
                transform: [{ scale: iconScaleAnim }],
              }}
            >
              <SvgXml xml={successfull} width={88} height={88} />
            </Animated.View>

            {/* Heading */}
            <Animated.Text
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
              className="font-Inter_Bold text-[#0F172A] text-2xl text-center mb-1"
            >
              Submit quote request
            </Animated.Text>
            <Animated.Text
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
              className="font-Inter_Regular text-[#64748B] text-sm text-center"
            >
              {` You're almost done`}
            </Animated.Text>
          </View>

          {/* Info Card */}
          <Animated.View
            className="bg-white rounded-2xl px-5 py-4 mb-4"
            style={{
              opacity: cardAnim,
              transform: [
                {
                  translateY: cardAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
              backgroundColor: "white",
              borderRadius: 20,
              paddingHorizontal: 20,
              paddingVertical: 16,
              marginBottom: 14,
              shadowColor: "#0EA5E9",
              shadowOpacity: 0.07,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            {infoRows.map((row, i) => (
              <View
                key={row.label}
                className={i < infoRows.length - 1 ? "mb-4" : ""}
              >
                <Text className="font-Inter_Regular text-[#94A3B8] text-xs mb-0.5">
                  {row.label}
                </Text>
                <Text className="font-Inter_SemiBold text-[#0F172A] text-[15px]">
                  {row.value}
                </Text>
              </View>
            ))}
          </Animated.View>

          {/* Checkbox Row */}
          <Animated.View
            style={{ opacity: checkboxAnim }}
            className="flex-row items-start p-6 bg-white rounded-lg"
          >
            <Pressable
              onPress={handleCheck}
              className="mt-0.5 mr-3"
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: checked ? "#14B8A6" : "#CBD5E1",
                backgroundColor: checked ? "#14B8A6" : "white",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Animated.Text
                className="font-Inter_Bold"
                style={{
                  transform: [{ scale: checkScale }],
                  color: "white",
                  fontSize: 12,
                  lineHeight: 14,
                }}
              >
                ✓
              </Animated.Text>
            </Pressable>
            <Text className="font-Inter_Regular text-[#334155] text-[13px] flex-1 leading-5">
              I confirm the information is correct and authorize Four Elements
              Electric to contact me about this request
            </Text>
          </Animated.View>

          {/* Bottom Buttons */}
          <Animated.View style={{ opacity: btnAnim }}>
            <GradientButton
              label="Submit Request"
              onPress={() => router.push("/request-received")}
            />

            <Pressable
              onPress={() => router.back()}
              className="items-center py-1"
            >
              <Text className="font-Inter_Medium text-[#334155] text-sm">
                Back to Review
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default SubmitQuoteRequest;
