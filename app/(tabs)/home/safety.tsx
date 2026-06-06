import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { setSelectedItem } from "@/src/redux/slices/seftymaintanceSlice";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  Switch,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

const safetyItems = [
  {
    id: "1",
    icon: "clock",
    title: "Smoke Detector\nBatteries",
    description: "Replace batteries annually.",
    enabled: true,
  },
  {
    id: "2",
    icon: "zap",
    title: "Test GFCI Outlets",
    description: "Ensure outlets are working properly",
    enabled: true,
  },
  {
    id: "3",
    icon: "clock",
    title: "Carbon Monoxide\nDetector",
    description: "Replace batteries annually",
    enabled: true,
  },
  {
    id: "4",
    icon: "home",
    title: "Septic System \n Alarm",
    description: "Check alarm battery and function",
    enabled: true,
  },
  {
    id: "5",
    icon: "wind",
    title: "Clean Dryer\nVent",
    description: "Prevent fire hazards",
    enabled: true,
  },
  {
    id: "6",
    icon: "zap",
    title: "Inspect Electrical\n Cords",
    description: "Check for damage or wear",
    enabled: true,
  },
  {
    id: "7",
    icon: "shield",
    title: "Test AFCI\nBreakers",
    description: "Test arc-fault circuit interrupters",
    enabled: true,
  },
];

const SafetyCard = ({
  item,
  index,
}: {
  item: (typeof safetyItems)[0];
  index: number;
}) => {
  const [enabled, setEnabled] = useState(item.enabled);
  const slideAnim = useRef(new Animated.Value(40)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 450,
        delay: 300 + index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 450,
        delay: 300 + index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  const dispatch = useDispatch();
  const handleroute = () => {
    dispatch(setSelectedItem(item.id));
    router.push("/(tabs)/home/maintenance-details");
  };
  return (
    <Pressable onPress={handleroute}>
      <Animated.View
        style={{
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
          backgroundColor: "#fff",
          borderRadius: 16,

          marginBottom: 12,
          paddingHorizontal: 16,
          paddingVertical: 16,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#06B6D4",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 4,
          elevation: 2,
        }}
        className="bg-white rounded-2xl  mb-3 px-4 py-4 flex-row items-center shadow-sm"
      >
        {/* Icon */}
        <LinearGradient
          colors={["#06B6D4", "#14B8A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name={item.icon as any} size={20} color="#fff" />
        </LinearGradient>

        {/* Text */}
        <View style={{ flex: 1 }} className="ml-1.5">
          <Text
            className="text-base font-Inter_SemiBold text-[#1F2937]"
            style={{
              lineHeight: 21,
              marginBottom: 1,
            }}
          >
            {item.title}
          </Text>
          <Text
            className="font-Inter_Regular text-sm text-[#6B7280]"
            style={{
              lineHeight: 17,
            }}
          >
            {item.description}
          </Text>
        </View>

        {/* Toggle */}
        <Switch
          value={enabled}
          onValueChange={setEnabled}
          trackColor={{ false: "#E5E7EB", true: "#14B8A6" }}
          thumbColor="#fff"
          ios_backgroundColor="#E5E7EB"
        />
      </Animated.View>
    </Pressable>
  );
};

const Safety = () => {
  const headerSlide = useRef(new Animated.Value(-30)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const heroBannerSlide = useRef(new Animated.Value(20)).current;
  const heroBannerOpacity = useRef(new Animated.Value(0)).current;
  const heroBannerTextSlide = useRef(new Animated.Value(10)).current;
  const heroBannerTextOpacity = useRef(new Animated.Value(0)).current;

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
    ]).start();
  }, []);

  return (
    <ScreenWrapper paddingHorizontal={20}>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* ── Header ── */}
        <Animated.View
          style={{
            transform: [{ translateY: headerSlide }],
            opacity: headerOpacity,
          }}
          className="flex-row justify-between items-center pb-2 px-4"
        >
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#111827" />
          </Pressable>
          <Text className="text-xl text-[#111827] font-Inter_Bold">
            Safety & Maintenance
          </Text>
          <View />
        </Animated.View>

        {/* ── Main List ── */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <Animated.View
            className={"mt-3 mb-2 bg-white px-4"}
            style={{
              transform: [{ translateY: heroBannerTextSlide }],
              opacity: heroBannerTextOpacity,
              backgroundColor: "#fff",
              borderRadius: 16,

              marginBottom: 12,
              paddingHorizontal: 16,
              paddingVertical: 16,

              shadowColor: "#06B6D4",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.06,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text
              className="text-base font-Inter_SemiBold text-[#1F2937]"
              style={{
                marginBottom: 4,
              }}
            >
              Safety & Maintenance
            </Text>
            <Text
              className="font-Inter_Regular text-sm text-[#6B7280]"
              style={{ lineHeight: 19 }}
            >
              Keep your home safe and your electrical system running
              efficiently. Toggle any item ON to set an automatic reminder - you
              will receive a notification alert when it is time for maintenance
            </Text>
          </Animated.View>
          {safetyItems.map((item, index) => (
            <SafetyCard key={item.id} item={item} index={index} />
          ))}
          <View className="h-40" />
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Safety;
