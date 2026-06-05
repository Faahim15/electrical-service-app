import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import Feather from "@expo/vector-icons/build/Feather";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const permissionItems = [
  {
    id: "1",
    icon: "bell",
    title: "Notifications",
    subtitle: "Receive alerts and reminders",
    enabled: true,
  },
  {
    id: "2",
    icon: "image",
    title: "Photos",
    subtitle: "Access photo library for uploads",
    enabled: true,
  },
  {
    id: "3",
    icon: "camera",
    title: "Camera",
    subtitle: "Take photos for quote requests",
    enabled: false,
  },
  {
    id: "4",
    icon: "map-pin",
    title: "Location",
    subtitle: "Find nearby service providers",
    enabled: false,
  },
];

const CustomToggle = ({
  value,
  onToggle,
}: {
  value: boolean;
  onToggle: () => void;
}) => {
  const translateX = useRef(new Animated.Value(value ? 22 : 2)).current;
  const bgAnim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: value ? 22 : 2,
        useNativeDriver: true,
        damping: 15,
        stiffness: 250,
      }),
      Animated.timing(bgAnim, {
        toValue: value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [value]);

  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#D1D5DB", "#06B6D4"],
  });

  return (
    <Pressable onPress={onToggle}>
      <Animated.View
        style={{ backgroundColor: bgColor }}
        className="w-14 h-8 rounded-full justify-center"
      >
        <Animated.View
          style={{ transform: [{ translateX }] }}
          className="w-6 h-6 rounded-full bg-white shadow-sm"
        />
      </Animated.View>
    </Pressable>
  );
};

const PermissionRow = ({
  item,
  index,
}: {
  item: (typeof permissionItems)[0];
  index: number;
}) => {
  const [enabled, setEnabled] = useState(item.enabled);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 380,
        delay: index * 90,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 380,
        delay: index * 90,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      toValue: 0.98,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 80,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
      }}
      className="mb-3"
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="bg-white rounded-2xl px-4 py-4 flex-row items-center justify-between"
      >
        {/* Left: icon + text */}
        <View className="flex-row items-center gap-3 flex-1">
          <View className="w-11 h-11 rounded-xl bg-cyan-50 items-center justify-center">
            <Feather name={item.icon as any} size={20} color="#06B6D4" />
          </View>
          <View className="flex-1">
            <Text className="text-sm text-[#111827] font-Inter_SemiBold">
              {item.title}
            </Text>
            <Text className="text-xs text-gray-400 font-Inter_Regular mt-0.5">
              {item.subtitle}
            </Text>
          </View>
        </View>

        {/* Toggle */}
        <CustomToggle value={enabled} onToggle={() => setEnabled((v) => !v)} />
      </Pressable>
    </Animated.View>
  );
};

const Permissions = () => {
  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-16)).current;

  useEffect(() => {
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
            Permissions
          </Text>
          <View />
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 32, paddingTop: 8 }}
        >
          {/* content */}
          {permissionItems.map((item, index) => (
            <PermissionRow key={item.id} item={item} index={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Permissions;
