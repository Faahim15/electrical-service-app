import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { selectSelectedItem } from "@/src/redux/slices/seftymaintanceSlice";

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

const MaintenanceDetails = () => {
  const selectedItem = useSelector(selectSelectedItem);

  const headerSlide = useRef(new Animated.Value(-30)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const heroBannerSlide = useRef(new Animated.Value(20)).current;
  const heroBannerOpacity = useRef(new Animated.Value(0)).current;
  const heroBannerTextSlide = useRef(new Animated.Value(10)).current;
  const heroBannerTextOpacity = useRef(new Animated.Value(0)).current;

  // Card animations — always 4 detail cards
  const cardAnims = useRef(
    Array.from({ length: 4 }, () => ({
      slide: new Animated.Value(30),
      opacity: new Animated.Value(0),
    })),
  ).current;

  useEffect(() => {
    // Reset card anims on new item
    cardAnims.forEach((anim) => {
      anim.slide.setValue(30);
      anim.opacity.setValue(0);
    });

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
      Animated.timing(heroBannerSlide, {
        toValue: 0,
        duration: 500,
        delay: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heroBannerOpacity, {
        toValue: 1,
        duration: 500,
        delay: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heroBannerTextSlide, {
        toValue: 0,
        duration: 500,
        delay: 220,
        useNativeDriver: true,
      }),
      Animated.timing(heroBannerTextOpacity, {
        toValue: 1,
        duration: 500,
        delay: 220,
        useNativeDriver: true,
      }),
      // Staggered card animations
      ...cardAnims.flatMap((anim, i) => [
        Animated.timing(anim.slide, {
          toValue: 0,
          duration: 450,
          delay: 300 + i * 100,
          useNativeDriver: true,
        }),
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 450,
          delay: 300 + i * 100,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, [selectedItem?.id]);

  // Fallback if no item selected
  if (!selectedItem) {
    return (
      <ScreenWrapper>
        <SafeAreaView
          edges={["top"]}
          className="flex-1 items-center justify-center"
        >
          <Text className="text-[#6B7280] text-sm">No item selected.</Text>
          <TouchableOpacity onPress={() => router.back()} className="mt-4">
            <Text className="text-[#155DFC] font-Inter_SemiBold">Go Back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* ── Header ── */}
        <Animated.View
          style={{
            transform: [{ translateY: headerSlide }],
            opacity: headerOpacity,
          }}
          className="flex-row justify-between items-center pb-2 "
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-xl text-[#111827] font-Inter_Bold">
            Maintenance Details
          </Text>
          <View />
        </Animated.View>

        {/* main contain */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32, paddingTop: 4 }}
        >
          {/* ── Page Title ── */}
          <Animated.View
            style={{
              transform: [{ translateY: heroBannerSlide }],
              opacity: heroBannerOpacity,
            }}
            className=" pt-2 pb-4"
          >
            <Text className="text-xl font-Inter_Bold text-[#111827]">
              {selectedItem.pageTitle}
            </Text>
          </Animated.View>

          {/* ── Detail Cards ── */}
          <View className="gap-y-3">
            {selectedItem.details.map((detail, index) => (
              <Animated.View
                key={detail.title}
                style={{
                  transform: [{ translateY: cardAnims[index].slide }],
                  opacity: cardAnims[index].opacity,
                }}
                className="bg-white rounded-2xl p-4 shadow-sm"
              >
                <View className="flex-row items-center gap-x-2 mb-1">
                  <Feather
                    name={detail.icon as any}
                    size={20}
                    color="#06B6D4"
                  />
                  <Text className="text-[15px] font-Inter_SemiBold text-[#111827]">
                    {detail.title}
                  </Text>
                </View>
                <Text className="text-[13px] text-[#6B7280] font-Inter_Regular leading-5 pl-6">
                  {detail.body}
                </Text>
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default MaintenanceDetails;
