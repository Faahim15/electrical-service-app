import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { Feather, Fontisto } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SolarInstallation = () => {
  const sunScale = useRef(new Animated.Value(0)).current;
  const sunRotate = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(40)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleSlide = useRef(new Animated.Value(20)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Sun entrance
    Animated.spring(sunScale, {
      toValue: 1,
      tension: 60,
      friction: 7,
      useNativeDriver: true,
    }).start();

    // Sun slow rotation
    Animated.loop(
      Animated.timing(sunRotate, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      }),
    ).start();

    // Title fade in
    Animated.sequence([
      Animated.delay(200),
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(titleSlide, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Card slide up
    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(cardSlide, {
          toValue: 0,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Pulse animation for the partner circle
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.08,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const spinInterpolate = sunRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* Background gradient feel */}
        <View className="flex-1 ">
          {/* Back Button */}
          <View className="px-4 pt-2">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 rounded-full bg-white items-center justify-center shadow-sm"
              style={{ elevation: 2 }}
            >
              <Fontisto name="arrow-left-l" size={16} color="#4b5563" />
            </TouchableOpacity>
          </View>

          {/* Header Section */}
          <View className="items-center px-6 pt-6 pb-4">
            {/* Sun Icon */}
            <Animated.View
              style={{
                transform: [{ scale: sunScale }, { rotate: spinInterpolate }],
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#FBBF24",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                shadowColor: "#F59E0B",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
                elevation: 8,
              }}
              className="w-16 h-16 rounded-full items-center justify-center mb-5"
            >
              {/* Sun rays representation */}
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,

                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Feather name="sun" size={24} color="#fff" />
              </View>
            </Animated.View>

            {/* Title */}
            <Animated.View
              style={{
                opacity: titleOpacity,
                transform: [{ translateY: titleSlide }],
                alignItems: "center",
              }}
            >
              <Text
                className="text-2xl font-bold text-gray-900 mb-2"
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: 8,
                }}
              >
                Solar Installation
              </Text>
              <Text
                className="text-center text-gray-500 "
                style={{
                  fontSize: 14,
                  color: "#6B7280",
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                For a quote on Solar installation, contact{"\n"}our trusted
                partner
              </Text>
            </Animated.View>
          </View>

          {/* Partner Card */}
          <Animated.View
            style={{
              opacity: cardOpacity,
              transform: [{ translateY: cardSlide }],
              marginHorizontal: 20,
              marginTop: 8,
            }}
          >
            <View
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 20,
                padding: 28,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.08,
                shadowRadius: 20,
                elevation: 6,
              }}
            >
              {/* Partner Logo Circle */}
              <Animated.View
                style={{
                  transform: [{ scale: pulseAnim }],
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  backgroundColor: "#EFF6FF",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: "#DBEAFE",
                }}
              >
                <Text
                  style={{ fontSize: 22, fontWeight: "700", color: "#3B82F6" }}
                >
                  O
                </Text>
              </Animated.View>

              {/* Partner Name */}
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: 6,
                }}
              >
                Ovanova
              </Text>

              <Text
                style={{
                  fontSize: 13,
                  color: "#9CA3AF",
                  marginBottom: 28,
                }}
              >
                Your trusted solar installation partner
              </Text>

              {/* Contact Partner Button */}
              <TouchableOpacity activeOpacity={0.85} className="w-full">
                <LinearGradient
                  colors={["#06B6D4", "#14B8A6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: "100%",
                    height: 52,
                    borderRadius: 14,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 16,
                    backgroundColor: "#06B6D4",
                    shadowColor: "#06B6D4",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.35,
                    shadowRadius: 12,
                    elevation: 6,
                    // Simulate gradient with a slight teal shift
                    backgroundImage: "linear-gradient(90deg, #06B6D4, #14B8A6)",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: "#FFFFFF",
                      letterSpacing: 0.3,
                    }}
                  >
                    Contact Partner
                  </Text>
                </LinearGradient>
                {/* Since RN doesn't support backgroundImage on View, use two-tone approach */}
              </TouchableOpacity>

              {/* Visit Support */}
              <TouchableOpacity activeOpacity={0.7}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#06B6D4",
                  }}
                >
                  Visit Support
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Back to Quote Categories */}
          <Animated.View
            style={{
              opacity: cardOpacity,
              alignItems: "center",
              marginTop: 28,
            }}
          >
            <TouchableOpacity activeOpacity={0.7}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Back to Quote Categories
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default SolarInstallation;
