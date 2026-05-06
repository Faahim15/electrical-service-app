import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { RootState } from "@/src/redux/store";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const Troubleshootingguides = () => {
  const category = useSelector(
    (state: RootState) => state.troubleshootRoute.selectedCategory,
  );
  // console.log("Selected Category in Guides:", category?.title);

  const steps = category?.steps ?? [];
  const safetyWarning = category?.safetyWarning ?? "";
  const pageTitle = category?.title ?? "Troubleshooting";
  const stillHavingIssues = category?.stillHavingIssues ?? {
    title: "Still Having Issues?",
    subtitle: "Contact us for professional service.",
  };

  // ── Animations ──
  const headerSlide = useRef(new Animated.Value(-30)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const warningAnim = useRef(new Animated.Value(0)).current;
  const stepsLabelAnim = useRef(new Animated.Value(0)).current;
  const stepAnims = useRef(
    Array.from({ length: 7 }, () => new Animated.Value(0)),
  ).current;
  const bottomCardAnim = useRef(new Animated.Value(0)).current;
  const btn1Anim = useRef(new Animated.Value(0)).current;
  const btn2Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
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
    ]).start();

    Animated.sequence([
      Animated.delay(200),
      Animated.timing(warningAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(stepsLabelAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.stagger(
        80,
        stepAnims.map((anim) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
        ),
      ),
      Animated.timing(bottomCardAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(btn1Anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(btn2Anim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
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
            {pageTitle}
          </Text>
          <View />
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {/* ── Safety Warning Card ── */}
          <Animated.View
            style={{
              opacity: warningAnim,
              transform: [
                {
                  translateY: warningAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            }}
            className="mx-4 mt-3 border border-[#EF4444] rounded-xl p-4 bg-white"
          >
            <View className="flex-row items-center gap-2 mb-1">
              <Feather name="alert-triangle" size={18} color="#EF4444" />
              <Text className="text-[#EF4444] font-Inter_Bold text-base">
                Safety Warnings
              </Text>
            </View>
            <Text className="text-gray-600 text-sm leading-5">
              {safetyWarning}
            </Text>
          </Animated.View>

          {/* ── Steps Label ── */}
          <Animated.View
            style={{ opacity: stepsLabelAnim }}
            className="px-4 mt-5 mb-2"
          >
            <Text className="text-[#111827] font-Inter_Bold text-lg">
              Steps to Follow
            </Text>
          </Animated.View>

          {/* ── Steps List ── */}
          <View className="px-4 gap-3">
            {steps.map((step, index) => (
              <Animated.View
                key={step.id}
                style={{
                  opacity: stepAnims[index] ?? new Animated.Value(1),
                  transform: [
                    {
                      translateX: (
                        stepAnims[index] ?? new Animated.Value(1)
                      ).interpolate({
                        inputRange: [0, 1],
                        outputRange: [-24, 0],
                      }),
                    },
                  ],
                  shadowColor: "#06B6D4",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.07,
                  shadowRadius: 8,
                  elevation: 3,
                }}
                className="items-center bg-white rounded-2xl px-4 py-4 flex-row gap-4"
              >
                <View className="w-8 h-8 rounded-lg border border-gray-200 bg-white items-center justify-center">
                  <Text className="text-[#111827] font-Inter_Bold text-base">
                    {step.id}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-[#111827] font-Inter_SemiBold text-base mb-0.5">
                    {step.title}
                  </Text>
                  <Text className="text-gray-500 text-sm leading-4">
                    {step.description}
                  </Text>
                </View>
              </Animated.View>
            ))}
          </View>

          {/* ── Still Having Issues Card + Buttons ── */}
          <Animated.View
            style={{
              opacity: bottomCardAnim,
              transform: [
                {
                  translateY: bottomCardAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
              shadowColor: "#06B6D4",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.07,
              shadowRadius: 8,
              elevation: 3,
            }}
            className="mx-4 mt-5 bg-white rounded-2xl px-4 py-4 flex-col gap-3"
          >
            <Text className="text-[16px] font-Inter_Bold text-[#0F172A]">
              {stillHavingIssues.title}
            </Text>
            <Text className="text-[13px] font-Inter_Regular text-[#64748B] leading-5">
              {stillHavingIssues.subtitle}
            </Text>

            {/* Contact Us */}
            <TouchableOpacity
              onPress={() => router.push("/shared/help")}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={["#06B6D4", "#14B8A6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 14,
                  paddingVertical: 14,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text className="text-white font-Inter_Bold text-[15px]">
                  Contact Us
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Request Service */}
            {category?.title === "Outlet Not Working" && (
              <TouchableOpacity
                onPress={() => router.replace("/trobleshooting")}
                activeOpacity={0.85}
                className="rounded-2xl py-4 items-center border border-[#14B8A6]"
              >
                <Text
                  className="font-Inter_Bold text-base"
                  style={{ color: "#14B8A6" }}
                >
                  Request Service
                </Text>
              </TouchableOpacity>
            )}
          </Animated.View>
          <View className="h-40" />
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Troubleshootingguides;
