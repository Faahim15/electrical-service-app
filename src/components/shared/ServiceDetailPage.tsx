import { GradientButton } from "@/src/components/onboarding/GradientButton";
import { Feather, Ionicons } from "@expo/vector-icons";
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
import ScreenWrapper from "./ScreenWrapper";

type BestForItem = { id: string; text: string };
type ProvideItem = { id: string; text: string };
type StepItem = { id: string; step: number; label: string };

type ServiceDetailPageProps = {
  iconName: string;
  iconColor?: string;
  iconBg?: string;
  title: string;
  subtitle: string;
  bestForItems: BestForItem[];
  provideItems: ProvideItem[];
  estimatedTime: string;
  estimatedTimeSubtitle: string;
  steps: StepItem[];
  onStartQuote?: () => void;
  onBackToCategories?: () => void;
};

export default function ServiceDetailPage({
  iconName = "flash-outline",
  title = "Service Call",
  subtitle = "Fast response for electrical repairs, troubleshooting, and emergency fixes.",
  bestForItems = [],
  provideItems = [],
  estimatedTime = "Takes about 2–3 minutes",
  estimatedTimeSubtitle = "Quick and easy process",
  steps = [],
  onStartQuote,
  onBackToCategories,
}: ServiceDetailPageProps) {
  // ── Animated values — exact same as OtherStart ──────────────────────────
  const iconScale = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(16)).current;
  const card1Opacity = useRef(new Animated.Value(0)).current;
  const card1Slide = useRef(new Animated.Value(30)).current;
  const card2Opacity = useRef(new Animated.Value(0)).current;
  const card2Slide = useRef(new Animated.Value(30)).current;
  const card3Opacity = useRef(new Animated.Value(0)).current;
  const card3Slide = useRef(new Animated.Value(30)).current;
  const card4Opacity = useRef(new Animated.Value(0)).current;
  const card4Slide = useRef(new Animated.Value(30)).current;
  const btnOpacity = useRef(new Animated.Value(0)).current;
  const btnSlide = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(iconScale, {
        toValue: 1,
        tension: 60,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(titleSlide, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(card1Opacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(card1Slide, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(card2Opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(card2Slide, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(card3Opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(card3Slide, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(card4Opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(card4Slide, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(btnOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(btnSlide, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const cardShadow = {
    shadowColor: "#06B6D4",
    shadowOffset: { width: 0, height: 1 } as const,
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  };

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Back Button */}
            <View style={{ paddingTop: 12, paddingBottom: 4 }}>
              <TouchableOpacity
                onPress={onBackToCategories ?? (() => router.back())}
                activeOpacity={0.7}
                style={{ padding: 4, alignSelf: "flex-start" }}
              >
                <Feather name="arrow-left" size={22} color="#1F2937" />
              </TouchableOpacity>
            </View>

            {/* Icon — same spring scale as OtherStart */}
            <Animated.View
              style={{
                transform: [{ scale: iconScale }],
                alignItems: "center",
                marginTop: 12,
                marginBottom: 16,
              }}
            >
              <LinearGradient
                colors={["#DBEAFE", "#CEFAFE"]}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  alignItems: "center",
                  justifyContent: "center",
                  ...cardShadow,
                }}
              >
                <Ionicons name={iconName as any} size={32} color="#155DFC" />
              </LinearGradient>
            </Animated.View>

            {/* Title & Subtitle */}
            <Animated.View
              style={{
                opacity: titleOpacity,
                transform: [{ translateY: titleSlide }],
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                className="font-Inter_Bold"
                style={{
                  fontSize: 22,
                  color: "#111827",
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                {title}
              </Text>
              <Text
                className="font-Inter_Regular"
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  textAlign: "justify",

                  lineHeight: 20,
                }}
              >
                {subtitle}
              </Text>
            </Animated.View>

            {/* Best For Card */}
            <Animated.View
              style={{
                opacity: card1Opacity,
                transform: [{ translateY: card1Slide }],
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                ...cardShadow,
              }}
            >
              <Text
                className="font-Inter_SemiBold"
                style={{ fontSize: 16, color: "#111827", marginBottom: 12 }}
              >
                Best for
              </Text>
              {bestForItems.map((item, i) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginBottom: i < bestForItems.length - 1 ? 10 : 0,
                  }}
                >
                  <View className="h-6 w-6 mr-1 rounded-full justify-center items-center bg-[#EFF6FF]">
                    <Feather name="check" size={12} color="#155DFC" />
                  </View>
                  <Text
                    className="font-Inter_Regular"
                    style={{
                      fontSize: 14,
                      color: "#374151",
                      flex: 1,
                      lineHeight: 19,
                    }}
                  >
                    {item.text}
                  </Text>
                </View>
              ))}
            </Animated.View>

            {/* What You May Need Card */}
            <Animated.View
              style={{
                opacity: card2Opacity,
                transform: [{ translateY: card2Slide }],
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                ...cardShadow,
              }}
            >
              <Text
                className="font-Inter_SemiBold"
                style={{ fontSize: 16, color: "#111827", marginBottom: 12 }}
              >
                What you may need to provide
              </Text>
              {provideItems.map((item, i) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: i < provideItems.length - 1 ? 10 : 0,
                  }}
                >
                  <View
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: 4,
                      backgroundColor: "#2B7FFF",
                      marginRight: 10,
                    }}
                  />
                  <Text
                    className="font-Inter_Regular"
                    style={{ fontSize: 14, color: "#374151" }}
                  >
                    {item.text}
                  </Text>
                </View>
              ))}
            </Animated.View>

            {/* Time Estimate Card */}
            <Animated.View
              style={{
                opacity: card3Opacity,
                transform: [{ translateY: card3Slide }],
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 14,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                ...cardShadow,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  className="font-Inter_SemiBold"
                  style={{ fontSize: 14, color: "#111827", marginBottom: 3 }}
                >
                  {estimatedTime}
                </Text>
                <Text
                  className="font-Inter_Regular"
                  style={{ fontSize: 12, color: "#4A5565" }}
                >
                  {estimatedTimeSubtitle}
                </Text>
              </View>
              <Feather name="clock" size={20} color="#155DFC" />
            </Animated.View>

            {/* Steps Card */}
            <Animated.View
              style={{
                opacity: card4Opacity,
                transform: [{ translateY: card4Slide }],
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                marginBottom: 24,
                ...cardShadow,
              }}
            >
              <Text
                className="font-Inter_SemiBold"
                style={{ fontSize: 16, color: "#111827", marginBottom: 14 }}
              >
                Simple {steps.length}-step process
              </Text>
              {steps.map((step, i) => (
                <View
                  key={step.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: i < steps.length - 1 ? 12 : 0,
                  }}
                >
                  <LinearGradient
                    colors={["#2B7FFF", "#00B8DB"]}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <Text
                      className="font-Inter_Bold"
                      style={{ fontSize: 13, color: "#FFFFFF" }}
                    >
                      {step.step}
                    </Text>
                  </LinearGradient>
                  <Text
                    className="font-Inter_Regular"
                    style={{ fontSize: 14, color: "#374151" }}
                  >
                    {step.label}
                  </Text>
                </View>
              ))}
            </Animated.View>

            {/* Button — same animated wrapper as OtherStart */}
            <Animated.View
              style={{
                opacity: btnOpacity,
                transform: [{ translateY: btnSlide }],
                ...cardShadow,
              }}
            >
              <GradientButton
                label="Start Quote"
                onPress={
                  onStartQuote ??
                  (() => router.push("/quote/common/contact-details"))
                }
              />
            </Animated.View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  );
}
