import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";

const ElectricalHelpCard = () => {
  const cardScale = useRef(new Animated.Value(0.88)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(cardScale, {
        toValue: 1,
        tension: 60,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View className="flex-1 mb-[2%] items-center justify-center">
      <Animated.View
        style={{ transform: [{ scale: cardScale }], opacity: cardOpacity }}
        className="w-full"
      >
        <LinearGradient
          colors={["#0EA5E9", "#14B8A6"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 24,
            padding: 22,
            paddingBottom: 18,
            overflow: "hidden",
            shadowColor: "#0EA5E9",
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.35,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          {/* Top circles */}
          <View className="absolute -right-7 -top-7 w-[120px] h-[120px] rounded-full bg-[#FFFFFF1A]" />
          <View className="absolute right-[30px] top-[38px] w-[72px] h-[72px] rounded-full bg-[#FFFFFF1A]" />

          {/* Bottom corner circles */}
          <View className="absolute -left-7 -bottom-7 w-[120px] h-[120px] rounded-full bg-[#FFFFFF1A]" />
          <View className="absolute left-[30px] bottom-[38px] w-[72px] h-[72px] rounded-full bg-[#FFFFFF1A]" />

          {/* Main content */}
          <View className="mb-[18px]">
            {/* Lightning bolt icon */}
            <View className="w-[46px] h-[46px] bg-[#FFFFFF26] rounded-[14px] items-center justify-center mb-[14px]">
              <Feather name="zap" size={24} color="white" />
            </View>

            <Text className="text-white text-[20px] font-Inter_Bold leading-[26px] mb-[6px]">
              Need electrical help fast?
            </Text>
            <Text className="text-[#FFFFFFE5] text-[13.5px] font-Inter_Medium leading-[19px]">
              Request a quote or get guided help in minutes.
            </Text>
          </View>

          {/* Action buttons */}
          <View className="flex-row gap-[10px]">
            <Pressable
              onPress={() =>
                router.push("/(tabs)/quotes/quote/choose-category")
              }
              className="flex-1 bg-white rounded-[18px] py-[13px] items-center justify-center"
            >
              <Text className="text-sky-500 text-[15px] font-Inter_Bold">
                Start a Quote
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/(tabs)/help/contact-details")}
              className="flex-1 bg-[#FFFFFF26] rounded-[18px] py-[13px] items-center justify-center"
            >
              <Text className="text-white text-[15px] font-Inter_Bold">
                Get Help
              </Text>
            </Pressable>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default ElectricalHelpCard;
