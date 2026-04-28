import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import Feather from "@expo/vector-icons/build/Feather";
import { router } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ----------- Types -------------------------------------------------------------------------

type FilterType = "All" | "Submitted" | "Drafts" | "Closed";

interface Quote {
  id: string;
  title: string;
  date: string;
  description: string;
  status: "Submitted" | "Draft" | "Closed";
}

// ----------- Data -------------------------------------------------------------------------

const QUOTES: Quote[] = [
  {
    id: "1",
    title: "EV Charger Installation",
    date: "March 25, 2026",
    description: "Level 2 charger for Tesla Model 3",
    status: "Submitted",
  },
  {
    id: "2",
    title: "Panel Upgrade",
    date: "March 18, 2026",
    description: "200A panel replacement needed",
    status: "Submitted",
  },
  {
    id: "3",
    title: "Remodel Quote",
    date: "March 10, 2026",
    description: "Kitchen remodel electrical work",
    status: "Closed",
  },
  {
    id: "4",
    title: "Dedicated Circuit Quote",
    date: "February 28, 2026",
    description: "New circuit for home office",
    status: "Draft",
  },
];

const FILTERS: FilterType[] = ["All", "Submitted", "Drafts", "Closed"];

// ----------- Status Badge -------------------------------------------------------------------------

const STATUS_CONFIG: Record<Quote["status"], { bg: string; text: string }> = {
  Submitted: {
    bg: "#06B6D415",
    text: "#06B6D4",
  },
  Draft: {
    bg: "#F59E0B15",
    text: "#F59E0B",
  },
  Closed: {
    bg: "#F3F4F6",
    text: "#6B7280",
  },
};

function StatusBadge({ status }: { status: Quote["status"] }) {
  const config = STATUS_CONFIG[status];
  return (
    <View
      className="flex-row items-center rounded-[20px] px-2.5 py-1"
      style={{ backgroundColor: config.bg }}
    >
      <Text className="text-xs font-semibold" style={{ color: config.text }}>
        {status}
      </Text>
    </View>
  );
}

// -------------- Quote Card-------------------------------------------------------------

function QuoteCard({ item, index }: { item: Quote; index: number }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
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

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.975,
      useNativeDriver: true,
      speed: 30,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
      className="mb-3"
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => router.push("/my-quotedetais")}
          className="bg-white rounded-2xl p-4 shadow-md"
          style={{
            shadowColor: "#0000000D",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          {/* Top row */}
          <View className="flex-row justify-between items-start mb-1.5">
            <Text className="text-[15px] font-Inter_Bold text-[#111827] flex-1 mr-2">
              {item.title}
            </Text>

            <StatusBadge status={item.status} />
          </View>

          {/* Date */}
          <Text className="text-xs text-[#6B7280] font-Inter_Regular mb-2">
            {item.date}
          </Text>

          {/* Bottom row */}
          <View className="flex-row justify-between items-center">
            <Text className="text-[13px] text-[#6B7280] font-Inter_Regular flex-1">
              {item.description}
            </Text>

            <View className="w-7 h-7 rounded-full  items-center justify-center ml-2">
              <Feather name="chevron-right" size={16} color="#6B7280" />
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

//--------------- Filter Pill -----------------------------------------------------------

function FilterPill({
  label,
  active,
  onPress,
}: {
  label: FilterType;
  active: boolean;
  onPress: () => void;
}) {
  const bgAnim = useRef(new Animated.Value(active ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: active ? 1 : 0,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [active]);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#F3F4F6", "#2563EB"],
  });

  const textColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#6B7280", "#FFFFFF"],
  });

  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
      <Animated.View
        className="rounded-full px-4 py-2 mr-2"
        style={{ backgroundColor }}
      >
        <Animated.Text
          className={`text-[13px] ${active ? "font-semibold" : "font-normal"}`}
          style={{ color: textColor }}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

// -------------- Empty State-------------------------------------------------------------------------
function EmptyState({ filter }: { filter: FilterType }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
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
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
      className="items-center justify-center pt-16"
    >
      {/* Icon container */}
      <View className="w-16 h-16 rounded-full bg-blue-50 items-center justify-center mb-1">
        <Feather name="file-text" size={28} color="#2563EB" />
      </View>

      {/* Title */}
      <Text className="text-base font-semibold text-gray-700 mb-1">
        No {filter === "All" ? "" : filter} Quotes
      </Text>

      {/* Description */}
      <Text className="text-[13px] text-gray-400 text-center max-w-[220px]">
        {`You don't have any`} {filter === "All" ? "" : filter.toLowerCase()}{" "}
        quotes yet.
      </Text>
    </Animated.View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

const MyQuotes = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  const headerFade = useRef(new Animated.Value(0)).current;
  const headerSlide = useRef(new Animated.Value(-10)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFade, {
        toValue: 1,
        duration: 450,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(headerSlide, {
        toValue: 0,
        duration: 450,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const filteredQuotes = QUOTES.filter((q) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Submitted") return q.status === "Submitted";
    if (activeFilter === "Drafts") return q.status === "Draft";
    if (activeFilter === "Closed") return q.status === "Closed";
    return true;
  });

  const handleFilterChange = useCallback((filter: FilterType) => {
    setActiveFilter(filter);
  }, []);

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        {/* Header */}
        <Animated.View
          style={{
            opacity: headerFade,
            transform: [{ translateY: headerSlide }],
          }}
          className="flex-row justify-between items-center   pb-4"
        >
          <TouchableOpacity onPress={() => router.back()} className="">
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-2xl text-[#111827] font-Inter_Bold">
            My Quotes
          </Text>
          <View />
        </Animated.View>

        {/* Filter Pills */}
        <Animated.View
          style={{
            opacity: headerFade,
            paddingBottom: 16,
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {FILTERS.map((filter) => (
              <FilterPill
                key={filter}
                label={filter}
                active={activeFilter === filter}
                onPress={() => handleFilterChange(filter)}
              />
            ))}
          </ScrollView>
        </Animated.View>

        {/* Quote List */}
        <FlatList
          data={filteredQuotes}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 32,
            flexGrow: 1,
          }}
          ListEmptyComponent={<EmptyState filter={activeFilter} />}
          renderItem={({ item, index }) => (
            <QuoteCard item={item} index={index} />
          )}
        />
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default MyQuotes;
