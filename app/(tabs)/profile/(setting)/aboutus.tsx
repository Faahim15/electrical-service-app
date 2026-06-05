import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import Feather from "@expo/vector-icons/build/Feather";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Aboutus = () => {
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-16)).current;

  const card1Anim = useRef(new Animated.Value(0)).current;
  const card2Anim = useRef(new Animated.Value(0)).current;
  const card3Anim = useRef(new Animated.Value(0)).current;
  const card4Anim = useRef(new Animated.Value(0)).current;

  const logoScale = useRef(new Animated.Value(0.7)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  const makeSlide = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [22, 0],
        }),
      },
    ],
  });

  useEffect(() => {
    // Header
    Animated.parallel([
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(headerSlide, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();

    // Logo pop
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        delay: 150,
        damping: 14,
        stiffness: 220,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 300,
        delay: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Cards staggered
    Animated.stagger(100, [
      Animated.timing(card1Anim, {
        toValue: 1,
        duration: 380,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(card2Anim, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }),
      Animated.timing(card3Anim, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }),
      Animated.timing(card4Anim, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* header */}
        <Animated.View
          style={{
            opacity: headerFade,
            transform: [{ translateY: headerSlide }],
          }}
          className="flex-row justify-between items-center pb-2"
        >
          <Pressable onPress={() => router.back()} className="">
            <Feather name="arrow-left" size={24} color="#111827" />
          </Pressable>
          <Text className="text-2xl text-[#111827] font-Inter_Bold">
            About Us
          </Text>
          <View />
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32, paddingTop: 8, gap: 12 }}
        >
          {/* ── Brand Card ── */}
          <Animated.View
            style={makeSlide(card1Anim)}
            className="bg-white rounded-2xl px-5 py-6 items-center"
          >
            {/* Logo */}
            <Animated.View
              style={{
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              }}
              className="w-20 h-20 rounded-2xl bg-teal-500 items-center justify-center mb-4"
            >
              <Text className="text-white text-2xl font-Inter_Bold">FE</Text>
            </Animated.View>

            <Text className="text-xl text-[#111827] font-Inter_Bold mb-1 text-center">
              Four Elements Electric
            </Text>
            <Text className="text-sm text-gray-400 font-Inter_Regular text-center">
              Your trusted partner for all electrical services
            </Text>
          </Animated.View>

          {/* ── About Our Company ── */}
          <Animated.View
            style={makeSlide(card2Anim)}
            className="bg-white rounded-2xl px-5 py-5"
          >
            <Text className="text-base text-[#111827] font-Inter_Bold mb-3">
              About Our Company
            </Text>
            <Text className="text-sm text-gray-500 font-Inter_Regular leading-5">
              Four Elements Electric has been serving the community with
              professional electrical services for over 20 years. Our commitment
              to safety, quality, and customer satisfaction sets us apart.
            </Text>
            <Text className="text-sm text-gray-500 font-Inter_Regular leading-5 mt-1">
              We specialize in residential and commercial electrical
              installations, repairs, maintenance, and emergency services. Our
              licensed electricians are here to help with all your electrical
              needs.
            </Text>
          </Animated.View>

          {/* ── App Information ── */}
          <Animated.View
            style={makeSlide(card3Anim)}
            className="bg-white rounded-2xl px-5 py-5"
          >
            <Text className="text-base text-[#111827] font-Inter_Bold mb-3">
              App Information
            </Text>

            {/* Version row */}
            <View className="flex-row justify-between items-center py-2 border-b border-gray-100">
              <Text className="text-sm text-gray-500 font-Inter_Regular">
                Version
              </Text>
              <Text className="text-sm text-[#111827] font-Inter_SemiBold">
                1.0.0
              </Text>
            </View>

            {/* Build row */}
            <View className="flex-row justify-between items-center pt-2">
              <Text className="text-sm text-gray-500 font-Inter_Regular">
                Build
              </Text>
              <Text className="text-sm text-[#111827] font-Inter_SemiBold">
                2026.04.06
              </Text>
            </View>
          </Animated.View>

          {/* ── Contact Information ── */}
          <Animated.View
            style={makeSlide(card4Anim)}
            className="bg-white rounded-2xl px-5 py-5"
          >
            <Text className="text-base text-[#111827] font-Inter_Bold mb-3">
              Contact Information
            </Text>

            <Text className="text-sm text-gray-500 font-Inter_Regular mb-1.5">
              Email: theAteam@feecva.com
            </Text>
            <Text className="text-sm text-gray-500 font-Inter_Regular mb-1.5">
              Phone: 540-623-7599
            </Text>
            <Text className="text-sm text-gray-500 font-Inter_Regular">
              Website: www.feecva.com
            </Text>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Aboutus;
