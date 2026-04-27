import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { RootState } from "@/src/redux/store";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const Partnerdetails = () => {
  const headerSlide = useRef(new Animated.Value(-30)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(40)).current;
  const contactOpacity = useRef(new Animated.Value(0)).current;
  const contactSlide = useRef(new Animated.Value(40)).current;
  const reasonsOpacity = useRef(new Animated.Value(0)).current;
  const reasonsSlide = useRef(new Animated.Value(40)).current;
  const buttonsOpacity = useRef(new Animated.Value(0)).current;
  const buttonsSlide = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    Animated.sequence([
      // Header slides in first
      Animated.parallel([
        Animated.timing(headerSlide, {
          toValue: 0,
          duration: 380,
          useNativeDriver: true,
        }),
        Animated.timing(headerOpacity, {
          toValue: 1,
          duration: 380,
          useNativeDriver: true,
        }),
      ]),
      // Then stagger each card
      Animated.stagger(100, [
        Animated.parallel([
          Animated.timing(cardOpacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(cardSlide, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(contactOpacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(contactSlide, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(reasonsOpacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(reasonsSlide, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(buttonsOpacity, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
          }),
          Animated.timing(buttonsSlide, {
            toValue: 0,
            duration: 350,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();
  }, []);

  // ====================================
  // data
  // ====================================
  const category = useSelector(
    (state: RootState) => state.partners.selectedCategory,
  );
  const details = useSelector(
    (state: RootState) => state.partnerDetails.selectedDetail,
  );

  console.log("Selected Detail in PartnerDetails Screen:", details);
  const PARTNER = {
    name: details?.name || "",
    category: details?.category || "",
    description: "Natural gas services",
    badge: "Trusted partner verified by Four Elements Electric",
    phone: details?.phone || "",
    website: details?.website || "",
    reasons: [
      "Trusted partner with proven track record",
      "Licensed, insured, and verified",
      "Excellent customer service and support",
    ],
    emoji: category?.emoji,
  };

  const handleCall = () => {
    Linking.openURL(`tel:${PARTNER.phone.replace(/\D/g, "")}`);
  };

  const handleWebsite = () => {
    Linking.openURL(PARTNER.website);
  };

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1 ">
        {/* ── Header ── */}
        <Animated.View
          style={{
            transform: [{ translateY: headerSlide }],
            opacity: headerOpacity,
          }}
          className="flex-row justify-between items-center pb-2 px-4 pt-2"
        >
          <TouchableOpacity onPress={() => router.back()} className="p-1">
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-xl text-[#111827] font-Inter_Bold">
            Partner Details
          </Text>
          <View className="w-8" />
        </Animated.View>

        <ScrollView
          className="flex-1 px-4"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {/* ── Partner Card ── */}
          <Animated.View
            style={{
              opacity: cardOpacity,
              transform: [{ translateY: cardSlide }],
            }}
            className="bg-white rounded-2xl p-4 mt-3 shadow-sm border border-gray-100"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-14 h-14 rounded-2xl bg-[#00D5BE] items-center justify-center">
                  <Text className="text-2xl">{PARTNER.emoji}</Text>
                </View>
                <View>
                  <Text className="text-lg font-Inter_Bold text-[#111827]">
                    {PARTNER.name}
                  </Text>
                  <Text className="text-sm text-gray-500 font-Inter_Regular">
                    {PARTNER.category}
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="p-1">
                <Feather name="heart" size={22} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Description */}
            <Text className="text-sm text-gray-500 mt-3 font-Inter_Regular">
              {PARTNER.description}
            </Text>

            {/* Badge */}
            <View className="mt-3 bg-[#EFF6FF] rounded-xl px-3 py-2">
              <Text className="text-sm text-[#2563EB] font-Inter_Regular leading-5">
                {PARTNER.badge}
              </Text>
            </View>
          </Animated.View>

          {/* ── Contact Information ── */}
          <Animated.View
            style={{
              opacity: contactOpacity,
              transform: [{ translateY: contactSlide }],
            }}
            className="bg-white rounded-2xl p-4 mt-3 shadow-sm border border-gray-100"
          >
            <Text className="text-base font-Inter_Bold text-[#111827] mb-3">
              Contact Information
            </Text>

            {/* Phone row */}
            <View className="flex-row items-center gap-3 mb-3">
              <View className="w-9 h-9 rounded-full bg-[#F0FDFA] items-center justify-center">
                <Feather name="phone" size={16} color="#0D9488" />
              </View>
              <View>
                <Text className="text-xs text-gray-400 font-Inter_Regular">
                  Phone
                </Text>
                <Text className="text-sm text-[#111827] font-Inter_SemiBold">
                  {PARTNER.phone}
                </Text>
              </View>
            </View>

            {PARTNER.website && (
              <View>
                <View className="h-px bg-gray-100 mb-3" />
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-full bg-[#F0FDFA] items-center justify-center">
                    <Feather name="globe" size={16} color="#0D9488" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-gray-400 font-Inter_Regular">
                      Website
                    </Text>
                    <Text
                      className="text-sm text-[#111827] font-Inter_SemiBold"
                      numberOfLines={1}
                    >
                      {PARTNER.website}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </Animated.View>

          {/* ── Why We Recommend Them ── */}
          <Animated.View
            style={{
              opacity: reasonsOpacity,
              transform: [{ translateY: reasonsSlide }],
            }}
            className="bg-[#F0FDFA] rounded-2xl p-4 mt-3 border border-[#CCFBF1]"
          >
            <Text className="text-base font-Inter_Bold text-[#111827] mb-3">
              Why We Recommend Them
            </Text>
            {PARTNER.reasons.map((reason, index) => (
              <View key={index} className="flex-row items-start gap-2 mb-2">
                <Feather
                  name="check"
                  size={16}
                  color="#0D9488"
                  style={{ marginTop: 2 }}
                />
                <Text className="text-sm text-[#374151] font-Inter_Regular flex-1">
                  {reason}
                </Text>
              </View>
            ))}
          </Animated.View>

          {/* ── Action Buttons ── */}
          <Animated.View
            style={{
              opacity: buttonsOpacity,
              transform: [{ translateY: buttonsSlide }],
            }}
            className="mt-4 gap-3"
          >
            <TouchableOpacity
              onPress={handleCall}
              activeOpacity={0.85}
              className="bg-[#2ED4BF] rounded-2xl py-4 flex-row items-center justify-center gap-2"
            >
              <Feather name="phone-call" size={18} color="white" />
              <Text className="text-white font-Inter_Bold text-base">
                Call Now
              </Text>
            </TouchableOpacity>

            {/* Visit Website — outlined */}
            {PARTNER.website && (
              <TouchableOpacity
                onPress={handleWebsite}
                activeOpacity={0.85}
                className="border border-gray-200 rounded-2xl py-4 flex-row items-center justify-center gap-2 bg-white"
              >
                <Feather name="globe" size={18} color="#374151" />
                <Text className="text-[#374151] font-Inter_SemiBold text-base">
                  Visit Website
                </Text>
              </TouchableOpacity>
            )}

            {/* Save Partner — outlined */}
            <TouchableOpacity
              activeOpacity={0.85}
              className="border border-gray-200 rounded-2xl py-4 flex-row items-center justify-center gap-2 bg-white"
            >
              <Feather name="heart" size={18} color="#374151" />
              <Text className="text-[#374151] font-Inter_SemiBold text-base">
                Save Partner
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Partnerdetails;
