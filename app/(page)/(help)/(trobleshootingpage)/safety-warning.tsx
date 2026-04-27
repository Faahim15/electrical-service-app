import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WARNING_ITEMS = [
  "You smell burning",
  "You see sparks",
  "The outlet or panel feels hot",
  "Breakers keep tripping immediately",
  "There is visible damage",
  "Water is present near electrical components",
];

const Safetywarning = () => {
  const headerSlide = useRef(new Animated.Value(-30)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(30)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const buttonSlide = useRef(new Animated.Value(30)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      // header
      Animated.timing(headerSlide, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // warning card
      Animated.timing(cardSlide, {
        toValue: 0,
        duration: 500,
        delay: 180,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 500,
        delay: 180,
        useNativeDriver: true,
      }),
      // contact button
      Animated.timing(buttonSlide, {
        toValue: 0,
        duration: 480,
        delay: 350,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 480,
        delay: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* ── Header ── */}
        <Animated.View
          style={{
            transform: [{ translateY: headerSlide }],
            opacity: headerOpacity,
          }}
          className="flex-row justify-between items-center pb-2 px-4"
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-xl text-[#111827] font-Inter_Bold">
            Safety Warning
          </Text>
          <View />
        </Animated.View>

        {/* ── Body ── */}
        <View className="flex-1 px-4 pt-3 gap-4">
          {/* ── Red Warning Card ── */}
          <Animated.View
            style={{
              transform: [{ translateY: cardSlide }],
              opacity: cardOpacity,
            }}
          >
            <View
              className="bg-white rounded-2xl px-4 pt-4 pb-5"
              style={{
                borderWidth: 1.5,
                borderColor: "#EF4444",
                shadowColor: "#EF4444",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              {/* Title row */}
              <View className="flex-row items-start gap-2 mb-4">
                <Feather
                  name="alert-triangle"
                  size={20}
                  color="#EF4444"
                  style={{ marginTop: 2 }}
                />
                <Text className="text-[16px] font-Inter_Bold text-[#0F172A] flex-1 leading-6">
                  Stop and call our trained professionals if…
                </Text>
              </View>

              {/* Bullet list */}
              {WARNING_ITEMS.map((item, index) => (
                <View
                  key={index}
                  className="flex-row items-center gap-2.5 mb-3"
                >
                  <View
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#EF4444" }}
                  />
                  <Text className="text-[13px] font-Inter_Regular text-[#374151] flex-1 leading-5">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </Animated.View>

          {/* ── Contact Us Button ── */}
          <Animated.View
            style={{
              transform: [{ translateY: buttonSlide }],
              opacity: buttonOpacity,
            }}
          >
            <TouchableOpacity activeOpacity={0.85}>
              <LinearGradient
                colors={["#06B6D4", "#14B8A6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 14,
                  paddingVertical: 15,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text className="text-white font-Inter_Bold text-[15px]">
                  Contact Us
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Safetywarning;
