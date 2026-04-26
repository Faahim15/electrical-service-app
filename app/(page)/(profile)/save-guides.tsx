import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import Feather from "@expo/vector-icons/build/Feather";
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

const guides = [
  {
    id: 1,
    category: "Safety",
    categoryColor: "#06B6D4",
    title: "Reset GFCI Outlet",
    description: "Step-by-step guide to reset a tripped GFCI outlet",
  },
  {
    id: 2,
    category: "Maintenance",
    categoryColor: "#10B981",
    title: "Reset Circuit Breaker",
    description: "How to safely reset a tripped circuit breaker",
  },
  {
    id: 3,
    category: "Troubleshooting",
    categoryColor: "#06B6D4",
    title: "Outlet Not Working",
    description: "Troubleshooting guide for non-functional outlets",
  },
  {
    id: 4,
    category: "Safety",
    categoryColor: "#06B6D4",
    title: "Electrical Safety Warning",
    description: "Important electrical safety tips for homeowners",
  },
  {
    id: 5,
    category: "Maintenance",
    categoryColor: "#10B981",
    title: "Maintenance Checklist",
    description: "Monthly electrical maintenance checklist",
  },
];

const GuideCard = ({
  item,
  index,
}: {
  item: (typeof guides)[0];
  index: number;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay: index * 100,
        useNativeDriver: true,
        tension: 60,
        friction: 8,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      tension: 100,
      friction: 5,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 5,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY }, { scale: scaleAnim }],
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => {}}
        className="bg-white rounded-2xl px-4 py-4 mb-3 flex-row items-center justify-between"
        style={{
          shadowColor: "#000000bd",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        {/* Left: bookmark icon + text */}
        <View className="flex-row items-start  flex-1">
          {/* Bookmark icon */}
          <View className="mr-3 mt-1">
            <Feather name="bookmark" size={20} color="#93C5FD" />
          </View>

          {/* Text content */}
          <View className="flex-1">
            {/* Category badge */}
            <Text
              className="text-xs font-Inter_Medium mb-0.5"
              style={{ color: item.categoryColor }}
            >
              {item.category}
            </Text>
            {/* Title */}
            <Text className="text-[15px] font-Inter_Bold text-[#111827] mb-0.5">
              {item.title}
            </Text>
            {/* Description */}
            <Text className="text-[13px] text-[#6B7280] font-Inter_Regular leading-[18px]">
              {item.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const saveguides = () => {
  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* header */}
        <View className="flex-row justify-between items-center pb-2 ">
          <TouchableOpacity onPress={() => router.back()} className="">
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-2xl text-[#111827] font-Inter_Bold">
            Saved Guides
          </Text>
          <View />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 "
          contentContainerStyle={{ paddingBottom: 32, paddingTop: 8 }}
        >
          {/* content  */}
          {guides.map((item, index) => (
            <GuideCard key={item.id} item={item} index={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default saveguides;
