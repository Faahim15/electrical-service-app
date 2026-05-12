import { requestsuccess } from "@/assets/iocns/icon";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

const RequestReceived = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const iconScaleAnim = useRef(new Animated.Value(0.5)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const refAnim = useRef(new Animated.Value(0)).current;
  const btnAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(iconOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(iconScaleAnim, {
          toValue: 1,
          friction: 4,
          tension: 70,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(refAnim, {
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

  const infoRows = [
    { label: "Quote Type", value: "Service Call" },
    { label: "Submitted", value: "April 5, 2026" },
    { label: "Contact Method", value: "Phone Call" },
  ];

  return (
    <ScreenWrapper>
      <SafeAreaView className="flex-1">
        <View className="flex-1 pb-6 justify-between">
          {/* Top Section */}
          <View className="items-center pt-10 pb-4">
            {/* Icon with glow ring */}
            <Animated.View
              style={{
                opacity: iconOpacity,
                transform: [{ scale: iconScaleAnim }],
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: "rgba(20,184,166,0.12)",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View>
                  <SvgXml xml={requestsuccess} width={88} height={88} />
                </View>
              </View>
            </Animated.View>

            {/* Heading */}
            <Animated.Text
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
              className="font-Inter_Bold text-[#0F172A] text-2xl text-center mb-2"
            >
              Request received
            </Animated.Text>
            <Animated.Text
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
              className="font-Inter_Regular text-[#64748B] text-sm text-center px-6 leading-5"
            >
              Thanks! Our team will review your request and contact you soon.
            </Animated.Text>
          </View>

          {/* Info Card */}
          <Animated.View
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
              paddingVertical: 18,
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
                style={{ marginBottom: i < infoRows.length - 1 ? 16 : 14 }}
              >
                <Text className="font-Inter_Regular text-[#94A3B8] text-xs mb-0.5">
                  {row.label}
                </Text>
                <Text className="font-Inter_SemiBold text-[#0F172A] text-[15px]">
                  {row.value}
                </Text>
              </View>
            ))}

            {/* Reference ID Badge */}
            <Animated.View
              style={{
                opacity: refAnim,
                transform: [
                  {
                    scale: refAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.92, 1],
                    }),
                  },
                ],
              }}
            >
              <View
                className="self-start rounded-full px-4 py-1.5 mt-1"
                style={{ backgroundColor: "#FEF9C3" }}
              >
                <Text className="font-Inter_Medium text-[#92400E] text-sm">
                  Reference ID: #QT-3GB22Y
                </Text>
              </View>
            </Animated.View>
          </Animated.View>

          {/* Bottom Buttons */}
          <Animated.View style={{ opacity: btnAnim }}>
            {/* Return Home */}
            <GradientButton
              label="Return Home"
              onPress={() => router.push("/quote/choose-category")}
            />

            {/* New Quote + My Quotes */}
            <View className="flex-row gap-x-3">
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex-1 rounded-full py-3.5 items-center bg-white"
                style={{
                  shadowColor: "#0EA5E9",
                  shadowOpacity: 0.07,
                  shadowRadius: 6,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 1,
                }}
                onPress={() =>
                  router.replace("/(page)/(quote)/other-custom-service")
                }
              >
                <Text className="font-Inter_Medium text-[#0F172A] text-sm">
                  New Quote
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/(tabs)/quotes")}
                activeOpacity={0.8}
                className="flex-1 rounded-full py-3.5 items-center bg-white"
                style={{
                  shadowColor: "#0EA5E9",
                  shadowOpacity: 0.07,
                  shadowRadius: 6,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 1,
                }}
              >
                <Text className="font-Inter_Medium text-[#0F172A] text-sm">
                  My Quotes
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default RequestReceived;
