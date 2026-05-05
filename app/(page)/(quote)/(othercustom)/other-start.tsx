import { GradientButton } from "@/src/components/onboarding/GradientButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { RootState } from "@/src/redux/store";
import { Feather } from "@expo/vector-icons";
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

const bestForItems = [
  "Whole-home surge devices",
  "Panel-based surge protection",
  "Extra protection for electronics and appliances",
];

const provideItems = ["Panel photos", "Basic project notes"];

const steps = [
  { id: 1, label: "Upload panel photos" },
  { id: 2, label: "Add notes" },
  { id: 3, label: "Review & submit" },
];

const OtherStart = () => {
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

  const oipencategory = useSelector(
    (state: RootState) => state.openCategoryRoute.selectedOtherCategory,
  );
  console.log("Selected Other Category:", oipencategory);
  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Back Button */}
            <View
              style={{
                paddingTop: 12,
                paddingBottom: 4,
              }}
            >
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
                style={{ padding: 4, alignSelf: "flex-start" }}
              >
                <Feather name="arrow-left" size={22} color="#1F2937" />
              </TouchableOpacity>
            </View>
            {/* Shield Icon */}
            <Animated.View
              style={{
                transform: [{ scale: iconScale }],
                alignItems: "center",
                marginTop: 12,
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  backgroundColor: "#DBEAFE",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather
                  name={
                    oipencategory?.icon as React.ComponentProps<
                      typeof Feather
                    >["name"]
                  }
                  size={32}
                  color="#06B6D4"
                />
              </View>
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
                {oipencategory?.title}
              </Text>
              <Text
                className="font-Inter_Regular"
                style={{
                  fontSize: 13,
                  color: "#6B7280",
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                {oipencategory?.subtitle}
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
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text
                className="font-Inter_SemiBold"
                style={{ fontSize: 14, color: "#111827", marginBottom: 12 }}
              >
                Best for
              </Text>
              {bestForItems.map((item, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginBottom: i < bestForItems.length - 1 ? 10 : 0,
                  }}
                >
                  <Feather
                    name="check"
                    size={15}
                    color="#06B6D4"
                    style={{ marginTop: 1, marginRight: 10 }}
                  />
                  <Text
                    className="font-Inter_Regular"
                    style={{
                      fontSize: 13,
                      color: "#374151",
                      flex: 1,
                      lineHeight: 19,
                    }}
                  >
                    {item}
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
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text
                className="font-Inter_SemiBold"
                style={{ fontSize: 14, color: "#111827", marginBottom: 12 }}
              >
                What you may need to provide
              </Text>
              {provideItems.map((item, i) => (
                <View
                  key={i}
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
                      backgroundColor: "#06B6D4",
                      marginRight: 10,
                    }}
                  />
                  <Text
                    className="font-Inter_Regular"
                    style={{ fontSize: 13, color: "#374151" }}
                  >
                    {item}
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
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  className="font-Inter_SemiBold"
                  style={{ fontSize: 13, color: "#111827", marginBottom: 3 }}
                >
                  Takes about 1–2 minutes
                </Text>
                <Text
                  className="font-Inter_Regular"
                  style={{ fontSize: 12, color: "#9CA3AF" }}
                >
                  Simple and quick protection request
                </Text>
              </View>
              <Feather name="clock" size={20} color="#06B6D4" />
            </Animated.View>

            {/* Simple 3-Step Card */}
            <Animated.View
              style={{
                opacity: card4Opacity,
                transform: [{ translateY: card4Slide }],
                backgroundColor: "#FFFFFF",
                borderRadius: 16,
                padding: 16,
                marginBottom: 24,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text
                className="font-Inter_SemiBold"
                style={{ fontSize: 14, color: "#111827", marginBottom: 14 }}
              >
                Simple 3-step process
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
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      backgroundColor: "#06B6D4",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <Text
                      className="font-Inter_Bold"
                      style={{ fontSize: 12, color: "#FFFFFF" }}
                    >
                      {step.id}
                    </Text>
                  </View>
                  <Text
                    className="font-Inter_Regular"
                    style={{ fontSize: 13, color: "#374151" }}
                  >
                    {step.label}
                  </Text>
                </View>
              ))}
            </Animated.View>

            {/* Bottom Buttons */}
            <Animated.View
              style={{
                opacity: card4Opacity,
                transform: [{ translateY: card4Slide }],

                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <GradientButton
                label="Start Quote"
                onPress={() => router.push("/other-form-progress")}
              />
              {/* <TouchableOpacity
                onPress={() => router.push("/other-form-progress")}
                activeOpacity={0.85}
                style={{
                  height: 52,
                  borderRadius: 14,
                  backgroundColor: "#06B6D4",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 14,
                  shadowColor: "#06B6D4",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.35,
                  shadowRadius: 10,
                  elevation: 6,
                }}
              >
                <Text
                  className="font-Inter_SemiBold"
                  style={{ fontSize: 15, color: "#FFFFFF", letterSpacing: 0.3 }}
                >
                  Start Quote
                </Text>
              </TouchableOpacity> */}
            </Animated.View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default OtherStart;
