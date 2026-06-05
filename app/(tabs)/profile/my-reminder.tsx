import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import { setSelectedReminder } from "@/src/redux/slices/myReminderSlice";
import Feather from "@expo/vector-icons/build/Feather";
import { router } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

// ─── Types ────────────────────────────────────────────────────────────────────

type ReminderStatus = "Active" | "Completed";
type FilterType = "Active" | "Completed";

interface Reminder {
  id: string;
  title: string;
  frequency: string;
  date: string;
  status: ReminderStatus;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const REMINDERS: Reminder[] = [
  {
    id: "1",
    title: "Smoke Detector Check",
    frequency: "Monthly",
    date: "April 15, 2026",
    status: "Active",
  },
  {
    id: "2",
    title: "GFCI Testing",
    frequency: "Quarterly",
    date: "May 1, 2026",
    status: "Active",
  },
  {
    id: "3",
    title: "Carbon Monoxide Detector",
    frequency: "Monthly",
    date: "April 10, 2026",
    status: "Active",
  },
  {
    id: "4",
    title: "Dryer Vent Cleaning",
    frequency: "Annually",
    date: "June 15, 2026",
    status: "Active",
  },
  {
    id: "5",
    title: "Panel Inspection",
    frequency: "Annually",
    date: "January 20, 2026",
    status: "Completed",
  },
  {
    id: "6",
    title: "Outlet Safety Check",
    frequency: "Monthly",
    date: "March 5, 2026",
    status: "Completed",
  },
];

const FILTERS: FilterType[] = ["Active", "Completed"];

// ─── Filter Tab ───────────────────────────────────────────────────────────────

function FilterTab({
  label,
  active,
  onPress,
}: {
  label: FilterType;
  active: boolean;
  onPress: () => void;
}) {
  // JS-driven only — color interpolation cannot use useNativeDriver
  const bgAnim = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: active ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [active]);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#F3F4F6", "#1DA1F2"],
  });

  const textColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#6B7280", "#FFFFFF"],
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={{ backgroundColor }}
        className="rounded-full px-5 py-2 mr-2"
      >
        <Animated.Text
          style={{ color: textColor }}
          className="text-sm font-Inter_SemiBold"
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

// ─── Reminder Card ────────────────────────────────────────────────────────────

function ReminderCard({ item, index }: { item: Reminder; index: number }) {
  // Entrance animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(28)).current;

  // Press scale
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 80,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const dispatch = useDispatch();
  const handleTheRiminder = () => {
    dispatch(setSelectedReminder(item));
    router.push("/(tabs)/profile/reminder-details");
  };

  return (
    // Outer: fade + slide entrance
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
      className="mb-3"
    >
      {/* Inner: scale on press */}
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          // onPressIn={handlePressIn}
          // onPressOut={handlePressOut}
          onPress={handleTheRiminder}
          style={{
            shadowColor: "#94A3B8",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 2,
          }}
          className="bg-white rounded-2xl p-4"
        >
          {/* Top row: title + chevron */}
          <View className="flex-row justify-between items-center mb-1.5">
            <Text className="text-[15px] font-Inter_Bold text-gray-900 flex-1 mr-2">
              {item.title}
            </Text>
            <Feather name="chevron-right" size={18} color="#9CA3AF" />
          </View>

          {/* Frequency · Date */}
          <Text className="text-[13px] text-gray-400 font-Inter_Regular mb-2.5">
            {item.frequency}
            {"  ·  "}
            {item.date}
          </Text>

          {/* Status badge */}
          <View
            className={`self-start rounded-full px-3 py-1 ${
              item.status === "Active" ? "bg-sky-50" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-xs font-Inter_SemiBold ${
                item.status === "Active" ? "text-[#1DA1F2]" : "text-gray-500"
              }`}
            >
              {item.status}
            </Text>
          </View>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ filter }: { filter: FilterType }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(20);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [filter, fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
      className="items-center justify-center pt-16 gap-3"
    >
      <View className="w-16 h-16 rounded-full bg-sky-50 items-center justify-center mb-1">
        <Feather name="bell-off" size={28} color="#0EA5E9" />
      </View>
      <Text className="text-base font-Inter_SemiBold text-gray-700">
        No {filter} Reminders
      </Text>
      <Text className="text-[13px] font-Inter_Regular text-gray-400 text-center max-w-[220px]">
        {`You don't have any`} {filter.toLowerCase()} reminders yet.
      </Text>
    </Animated.View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

const Myreminder = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Active");

  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(headerSlide, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const filteredReminders = REMINDERS.filter((r) => r.status === activeFilter);

  const handleFilter = useCallback((f: FilterType) => setActiveFilter(f), []);

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* header */}
        <View className="flex-row justify-between items-center pb-2 ">
          <Pressable onPress={() => router.back()} className="">
            <Feather name="arrow-left" size={24} color="#111827" />
          </Pressable>
          <Text className="text-2xl text-[#111827] font-Inter_Bold">
            My Reminders
          </Text>
          <View />
        </View>

        {/* Filter tabs */}
        <Animated.View
          style={{
            opacity: headerFade,
            transform: [{ translateY: headerSlide }],
          }}
          className="pb-3"
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 0 }}
          >
            {FILTERS.map((f) => (
              <FilterTab
                key={f}
                label={f}
                active={activeFilter === f}
                onPress={() => handleFilter(f)}
              />
            ))}
          </ScrollView>
        </Animated.View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 "
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {/* content  */}
          {filteredReminders.length === 0 ? (
            <EmptyState filter={activeFilter} />
          ) : (
            filteredReminders.map((item, index) => (
              <ReminderCard key={item.id} item={item} index={index} />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Myreminder;
