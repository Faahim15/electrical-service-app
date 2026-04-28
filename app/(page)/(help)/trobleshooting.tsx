import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
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

// ── Troubleshooting items data ──
interface TroubleshootingItem {
  id: string;
  icon: "zap" | "shield";
  title: string;
  description: string;
}

const TROUBLESHOOTING_ITEMS: TroubleshootingItem[] = [
  {
    id: "1",
    icon: "zap" as const,
    title: "Reset GFCI Outlets",
    description: "Guide to reset a tripped GFCI outlet",
  },
  {
    id: "2",
    icon: "zap" as const,
    title: "Reset Circuit Breaker",
    description: "Step-by-step breaker reset instructions",
  },
  {
    id: "3",
    icon: "zap" as const,
    title: "Outlet Not Working",
    description: "Diagnose and fix outlet issues",
  },
];

// ── Animated Troubleshooting Card ──
const TroubleshootingCard = ({
  item,
  index,
}: {
  item: (typeof TROUBLESHOOTING_ITEMS)[0];
  index: number;
}) => {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 480,
        delay: 200 + index * 110,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 480,
        delay: 200 + index * 110,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{ translateY: slideAnim }],
        opacity: opacityAnim,
      }}
      className="mb-3"
    >
      <TouchableOpacity
        activeOpacity={0.82}
        // onPress={() => router.push(item.route as any)}
      >
        <View
          className="bg-white rounded-2xl px-4 py-4 flex-row items-center gap-4"
          style={{
            shadowColor: "#06B6D4",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.07,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          {/* Icon with gradient background */}
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
            <Feather name={item.icon} size={20} color="white" />
          </LinearGradient>

          {/* Text */}
          <View className="flex-1">
            <Text className="text-[15px] font-Inter_Bold text-[#0F172A] mb-0.5">
              {item.title}
            </Text>
            <Text className="text-[13px] font-Inter_Regular text-[#64748B] leading-5">
              {item.description}
            </Text>
          </View>

          {/* Chevron */}
          <Feather name="chevron-right" size={18} color="#CBD5E1" />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ───────────────────────────────────────────────────────────────────────────────
// ── Troubleshooting Screen ─────────────────────────────────────────────────────
// ───────────────────────────────────────────────────────────────────────────────
const Trobleshooting = () => {
  const headerSlide = useRef(new Animated.Value(-30)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const heroBannerSlide = useRef(new Animated.Value(20)).current;
  const heroBannerOpacity = useRef(new Animated.Value(0)).current;
  const safetySlide = useRef(new Animated.Value(30)).current;
  const safetyOpacity = useRef(new Animated.Value(0)).current;
  const footerSlide = useRef(new Animated.Value(30)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      // header
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
      // hero banner
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
      // safety card
      Animated.timing(safetySlide, {
        toValue: 0,
        duration: 480,
        delay: 260,
        useNativeDriver: true,
      }),
      Animated.timing(safetyOpacity, {
        toValue: 1,
        duration: 480,
        delay: 260,
        useNativeDriver: true,
      }),
      // footer
      Animated.timing(footerSlide, {
        toValue: 0,
        duration: 480,
        delay: 200 + TROUBLESHOOTING_ITEMS.length * 110 + 100,
        useNativeDriver: true,
      }),
      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 480,
        delay: 200 + TROUBLESHOOTING_ITEMS.length * 110 + 100,
        useNativeDriver: true,
      }),
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
            Troubleshooting
          </Text>
          <View />
        </Animated.View>

        {/* ── main ── */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32, paddingHorizontal: 16 }}
        >
          {/* ── Hero Banner ── */}
          <Animated.View
            style={{
              transform: [{ translateY: heroBannerSlide }],
              opacity: heroBannerOpacity,
            }}
            className="mt-3 mb-3"
          >
            <View
              className="bg-white rounded-2xl px-4 py-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text className="text-[17px] font-Inter_Bold text-[#0F172A] mb-1">
                Troubleshooting Guides
              </Text>
              <Text className="text-[13px] font-Inter_Regular text-[#64748B] leading-5">
                Step-by-step help for common electrical issues, with
                safety-first instructions.
              </Text>
            </View>
          </Animated.View>

          {/* ── Safety First Card ── */}
          <Animated.View
            style={{
              transform: [{ translateY: safetySlide }],
              opacity: safetyOpacity,
            }}
            className="mb-3"
          >
            <View
              className="bg-white rounded-2xl px-4 py-4"
              style={{
                borderWidth: 1.5,
                borderColor: "#F59E0B",
                shadowColor: "#F59E0B",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              {/* Title row */}
              <View className="flex-row items-center gap-2 mb-1.5">
                <Feather name="alert-triangle" size={18} color="#F59E0B" />
                <Text className="text-[15px] font-Inter_Bold text-[#0F172A]">
                  Safety First
                </Text>
              </View>
              {/* Body */}
              <Text className="text-[13px] font-Inter_Regular text-[#64748B] leading-5 mb-3">
                Stop and call a professional if you notice sparks, burning
                smells, heat, or visible damage.
              </Text>
              {/* CTA */}
              <TouchableOpacity
                onPress={() => router.push("/safety-warning")}
                activeOpacity={0.7}
              >
                <Text className="text-[13px] font-Inter_SemiBold text-[#F59E0B]">
                  View Safety Warning
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* ── Troubleshooting Cards ── */}
          {TROUBLESHOOTING_ITEMS.map((item, index) => (
            <TroubleshootingCard key={item.id} item={item} index={index} />
          ))}

          {/* ── Still Need Help Footer ── */}
          <Animated.View
            style={{
              transform: [{ translateY: footerSlide }],
              opacity: footerOpacity,
            }}
            className="mt-1"
          >
            <View
              className="bg-white rounded-2xl px-4 py-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text className="text-[16px] font-Inter_Bold text-[#0F172A] mb-1">
                Still need help?
              </Text>
              <Text className="text-[13px] font-Inter_Regular text-[#64748B] leading-5 mb-4">
                Contact us or request service if your issue is not resolved.
              </Text>

              {/* Contact Us button */}
              <TouchableOpacity activeOpacity={0.85}>
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
            </View>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Trobleshooting;
