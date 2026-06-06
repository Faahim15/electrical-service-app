import { getCategoryData } from "@/data/otherCategoryData";
import { GradientButton } from "@/src/components/onboarding/GradientButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { RootState } from "@/src/redux/store";
import { verticalScale } from "@/src/utils/Scaling";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

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
    (state: RootState) => state.otherCategoryRoute.selectedOtherCategory,
  );

  // ✅ Fetch dynamic data based on selected category title
  const categoryData = getCategoryData(oipencategory?.title);
  const { titleofSub, bestForItems, provideItems, timeEstimate, steps } =
    categoryData;

  console.log("Selected Other Categorysss:", oipencategory);
  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: verticalScale(120) }}
            showsVerticalScrollIndicator={false}
          >
            {/* Back Button */}
            <View
              style={{
                paddingTop: 12,
                paddingBottom: 4,
              }}
            >
              <Pressable
                onPress={() => router.back()}
                style={{ padding: 4, alignSelf: "flex-start" }}
              >
                <Feather name="arrow-left" size={22} color="#1F2937" />
              </Pressable>
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
              <LinearGradient
                colors={["#DBEAFE", "#CEFAFE"]}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  backgroundColor: "#DBEAFE",
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#06B6D4",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.06,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >
                {oipencategory?.title === "Ceiling Fan" ? (
                  <FontAwesome5 name="fan" size={32} color="#155DFC" />
                ) : (
                  <Ionicons
                    name={oipencategory?.iconName}
                    size={32}
                    color="#155DFC"
                  />
                )}
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
                {oipencategory?.title}
              </Text>
              <Text
                className="font-Inter_Regular w-[80%]"
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                {titleofSub}
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
                shadowColor: "#06B6D4",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
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
                  key={i}
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
                shadowColor: "#06B6D4",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
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
                      backgroundColor: "#2B7FFF",
                      marginRight: 10,
                    }}
                  />
                  <Text
                    className="font-Inter_Regular"
                    style={{ fontSize: 14, color: "#374151" }}
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
                shadowColor: "#06B6D4",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  className="font-Inter_SemiBold"
                  style={{ fontSize: 14, color: "#111827", marginBottom: 3 }}
                >
                  {timeEstimate.label}
                </Text>
                <Text
                  className="font-Inter_Regular"
                  style={{ fontSize: 12, color: "#9CA3AF" }}
                >
                  {timeEstimate.sublabel}
                </Text>
              </View>
              <Feather name="clock" size={20} color="#155DFC" />
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
                shadowColor: "#06B6D4",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.06,
                shadowRadius: 6,
                elevation: 2,
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
                      backgroundColor: "#06B6D4",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <Text
                      className="font-Inter_Bold"
                      style={{ fontSize: 13, color: "#FFFFFF" }}
                    >
                      {step.id}
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
                onPress={() =>
                  router.push("/(tabs)/quotes/quote/other/other-form-progress")
                }
              />
            </Animated.View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default OtherStart;
