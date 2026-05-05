import { successfull } from "@/assets/iocns/icon";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { SERVICE_CATEGORIES } from "@/src/constants/tabs.home.constant";
import { RootState } from "@/src/redux/store";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

const SubmitQuoteRequest = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const iconScaleAnim = useRef(new Animated.Value(0.6)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const checkboxAnim = useRef(new Animated.Value(0)).current;
  const btnAnim = useRef(new Animated.Value(0)).current;

  const [checked, setChecked] = useState(false);
  const checkScale = useRef(new Animated.Value(0)).current;

  // ── Slice data ──────────────────────────────────────────
  const selectedCategoryId = useSelector(
    (state: RootState) => state.serviceForm.selectedCategoryId,
  );
  const contactDetails = useSelector(
    (state: RootState) => state.serviceForm.contactDetails,
  );

  const selectedCategory = SERVICE_CATEGORIES.find(
    (c) => c.id === selectedCategoryId,
  );

  const preferredContactMap: Record<string, string> = {
    Call: "Phone Call",
    Text: "Text Message",
    Email: "Email",
  };

  const infoRows = [
    {
      label: "Selected Service",
      value: selectedCategory?.title ?? "—",
    },
    {
      label: "Expected Response",
      value: "Within 24-48 hours",
    },
    {
      label: "Best Contact Method",
      value:
        preferredContactMap[contactDetails.preferredContact] ??
        contactDetails.preferredContact ??
        "—",
    },
  ];
  // ────────────────────────────────────────────────────────

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

  return (
    <ScreenWrapper>
      <View className="mt-[1%]">
        <BackButton />
      </View>
      <SafeAreaView className="flex-1">
        <View className="flex-1 pb-6 justify-between">
          {/* Top Section */}
          <View className="items-center pt-10 pb-4">
            <Animated.View
              className="rounded-full bg-[#06B6D4] items-center justify-center mb-5 shadow-md"
              style={{
                opacity: fadeAnim,
                transform: [{ scale: iconScaleAnim }],
              }}
            >
              <SvgXml xml={successfull} width={88} height={88} />
            </Animated.View>

            <Animated.Text
              className="text-[#0F172A] text-2xl text-center mb-1 font-Inter_Bold"
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              Submit quote request
            </Animated.Text>
            <Animated.Text
              className="text-[#64748B] text-sm text-center font-Inter_Regular"
              style={{
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              }}
            >
              {`You're almost done`}
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
                <Text className="text-[#94A3B8] text-xs mb-[2px] font-Inter_Bold">
                  {row.label}
                </Text>
                <Text className="text-[#0F172A] text-[15px] font-Inter_SemiBold">
                  {row.value}
                </Text>
              </View>
            ))}
          </Animated.View>

          {/* Checkbox Row */}
          <Animated.View
            className="flex-row items-start p-6 bg-white rounded-lg"
            style={{ opacity: checkboxAnim }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCheck}
              className="mt-[2px] mr-3 items-center justify-center"
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                borderWidth: 2,
                borderColor: checked ? "#14B8A6" : "#CBD5E1",
                backgroundColor: checked ? "#14B8A6" : "white",
              }}
            >
              <Animated.Text
                className="text-white text-[12px] font-Inter_Bold"
                style={{ transform: [{ scale: checkScale }] }}
              >
                ✓
              </Animated.Text>
            </TouchableOpacity>
            <Text className="text-[#334155] font-Inter_Regular text-[13px] flex-1 leading-5">
              I confirm the information is correct and authorize Four Elements
              Electric to contact me about this request
            </Text>
          </Animated.View>

          {/* Bottom Buttons */}
          <Animated.View style={{ opacity: btnAnim }}>
            <TouchableOpacity
              onPress={() => router.push("/quote/common/request-received")}
              activeOpacity={0.85}
              className="rounded-full py-4 items-center mb-4"
              style={{
                backgroundColor: "#06B6D4",
                shadowColor: "#06B6D4",
                shadowOpacity: 0.3,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 4,
              }}
            >
              <Text className="text-white text-base font-Inter_SemiBold">
                Submit Request
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              className="items-center py-1"
              onPress={() => router.back()}
            >
              <Text className="text-[#334155] font-Inter_Medium text-sm">
                Back to Review
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default SubmitQuoteRequest;
