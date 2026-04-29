import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
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

const services = [
  {
    id: 1,
    icon: "zap",
    title: "Whole Home Surge Protection",
    subtitle: "Protect your entire electrical system",
  },
  {
    id: 2,
    icon: "wifi",
    title: "Starlink Installation",
    subtitle: "Satellite internet setup",
  },
  {
    id: 3,
    icon: "cpu",
    title: "Dedicated Circuit",
    subtitle: "For RV, and equipment",
  },
  {
    id: 4,
    icon: "wind",
    title: "Exhaust Fan",
    subtitle: "Kitchen, bathroom, or attic fans",
  },
  {
    id: 5,
    icon: "radio",
    title: "Outlets",
    subtitle: "Install or replace electrical outlets",
  },
  {
    id: 6,
    icon: "toggle-right",
    title: "Switches",
    subtitle: "Light switches and controls",
  },
  {
    id: 7,
    icon: "sun",
    title: "Lighting",
    subtitle: "Interior and exterior lighting",
  },
  {
    id: 8,
    icon: "rotate-cw",
    title: "Ceiling Fan",
    subtitle: "Interior and exterior Ceiling Fan",
  },
];

const ServiceCard = ({
  title,
  subtitle,
  icon,
  index,
}: {
  title: string;
  subtitle: string;
  icon: string;
  index: number;
}) => {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 70,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 70,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: opacityAnim,
        transform: [{ translateY: slideAnim }],
        marginBottom: 12,
      }}
    >
      <TouchableOpacity
        onPress={() => router.push("/other-start")}
        activeOpacity={0.75}
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          paddingHorizontal: 16,
          paddingVertical: 14,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        {/* Icon Box */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: "#EFF6FF",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 14,
          }}
        >
          <Feather name={icon as any} size={18} color="#06B6D4" />
        </View>

        {/* Text */}
        <View style={{ flex: 1 }}>
          <Text
            className="font-Inter_SemiBold"
            style={{ fontSize: 15, color: "#111827", marginBottom: 3 }}
          >
            {title}
          </Text>
          <Text
            className="font-Inter_Regular"
            style={{ fontSize: 13, color: "#9CA3AF" }}
          >
            {subtitle}
          </Text>
        </View>

        {/* Chevron */}
        <Feather name="chevron-right" size={18} color="#D1D5DB" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const OtherCustomService = () => {
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
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
  }, []);

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        <View style={{ flex: 1 }}>
          {/* Header */}
          <Animated.View
            style={{
              opacity: headerOpacity,
              transform: [{ translateY: headerSlide }],
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingTop: 12,
              paddingBottom: 16,
            }}
          >
            <TouchableOpacity
              style={{ marginRight: 12, padding: 4 }}
              activeOpacity={0.7}
            >
              <Feather name="arrow-left" size={22} color="#1F2937" />
            </TouchableOpacity>
            <Text
              className="font-Inter_Bold"
              style={{ fontSize: 20, color: "#111827" }}
            >
              Others
            </Text>
          </Animated.View>

          {/* List */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          >
            {services.map((item, index) => (
              <ServiceCard
                key={item.id}
                title={item.title}
                subtitle={item.subtitle}
                icon={item.icon}
                index={index}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default OtherCustomService;
