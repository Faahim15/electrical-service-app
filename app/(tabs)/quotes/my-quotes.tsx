import SearchBar from "@/src/components/common/SearchBar";
import BackButton from "@/src/components/shared/BackButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import {
  badgeColorMap,
  FILTER_TABS,
  FilterTab,
  Quote,
  QUOTES,
  statusStyles,
} from "@/src/types/quotes.myQuote.types";
import { scale, verticalScale } from "@/src/utils/Scaling";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";

import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

// ── Icon map per quote title keyword ───────────────────────────────────────

const TITLE_ICON_MAP: {
  keyword: string;
  icon: string;
  iconColor: string;
  iconBg: string;
}[] = [
  {
    keyword: "ev charger",
    icon: "flash-outline",
    iconColor: "#3B82F6",
    iconBg: "#EFF6FF",
  },
  {
    keyword: "panel",
    icon: "hardware-chip-outline",
    iconColor: "#8B5CF6",
    iconBg: "#F3F0FF",
  },
  {
    keyword: "service call",
    icon: "construct-outline",
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
  },
  {
    keyword: "circuit",
    icon: "git-branch-outline",
    iconColor: "#8B5CF6",
    iconBg: "#F3F0FF",
  },
  {
    keyword: "smoke",
    icon: "alert-circle-outline",
    iconColor: "#EF4444",
    iconBg: "#FEE2E2",
  },
  {
    keyword: "light",
    icon: "bulb-outline",
    iconColor: "#F59E0B",
    iconBg: "#FEF3C7",
  },
  {
    keyword: "outlet",
    icon: "power-outline",
    iconColor: "#10B981",
    iconBg: "#D1FAE5",
  },
];

const DEFAULT_ICON_META = {
  icon: "document-text-outline",
  iconColor: "#3B82F6",
  iconBg: "#EFF6FF",
};

function getIconMeta(title: string) {
  const lower = title.toLowerCase();
  return (
    TITLE_ICON_MAP.find((m) => lower.includes(m.keyword)) ?? DEFAULT_ICON_META
  );
}

// ── QuoteCard ──────────────────────────────────────────────────────────────

const QuoteCard = ({ item }: { item: Quote }) => {
  const style = statusStyles[item.status];
  const iconMeta = getIconMeta(item.title);

  return (
    <Pressable
      className="bg-white mb-3 rounded-2xl px-[5%] py-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
      }}
      onPress={() =>
        router.push({
          pathname: "/(tabs)/home/details",
          params: {
            id: item.id,
            title: item.title,
            subtitle: item.description,
            badge: style.label,
            badgeColor: badgeColorMap[item.status],
            type: "Quote",
            icon: iconMeta.icon,
            iconColor: iconMeta.iconColor,
            iconBg: iconMeta.iconBg,
          },
        })
      }
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-2">
          <Text className="font-Inter_Bold text-lg text-[#0F172A] mb-0.5">
            {item.title}
          </Text>
          <Text className="font-Inter_Medium text-sm text-[#64748B] mb-2">
            Submitted {item.submittedDate}
          </Text>
          <Text className="font-Inter_Medium text-sm text-[#475569] mb-3">
            {item.description}
          </Text>
          <View className="flex-row items-center justify-between">
            <View className={`${style.bg} px-3 py-1 rounded-full self-start`}>
              <Text className={`${style.text} font-Inter_Medium text-[12px]`}>
                {style.label}
              </Text>
            </View>
            <Text className="font-Inter_Regular text-xs text-[#94A3B8]">
              {item.refCode}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
      </View>
    </Pressable>
  );
};

// ── Screen ─────────────────────────────────────────────────────────────────

export default function MyQuotesScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");
  const [searchText, setSearchText] = useState("");
  const { width } = useWindowDimensions();
  const isSmall = width < 360;

  const filteredQuotes = QUOTES.filter((q) => {
    const matchesFilter = activeFilter === "All" || q.status === activeFilter;
    const matchesSearch =
      q.title.toLowerCase().includes(searchText.toLowerCase()) ||
      q.description.toLowerCase().includes(searchText.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <ScreenWrapper paddingHorizontal={20}>
        <View className="flex-1 ">
          {/* Header */}
          <View className="flex-row gap-3 items-center pt-4 pb-2">
            <BackButton />
            <Text className="font-Inter_Bold  text-xl text-[#0F172A]">
              My Quotes
            </Text>
          </View>

          {/* Subtitle */}
          <Text className="font-Inter_Regular text-base text-[#475569]  mb-4">
            Track your submitted requests
          </Text>

          {/* Search Bar */}
          <SearchBar value={searchText} onChangeText={setSearchText} />

          {/* Filter Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 0, flexShrink: 0 }}
            contentContainerStyle={{
              paddingVertical: isSmall ? 5 : 7,
              gap: isSmall ? 6 : 8,
              alignItems: "center",
              flexGrow: 0,
            }}
            className="mb-4"
          >
            {FILTER_TABS.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <Pressable
                  key={tab}
                  onPress={() => setActiveFilter(tab)}
                  style={[
                    {
                      paddingHorizontal: isSmall ? 12 : 16,
                      paddingVertical: isSmall ? 5 : 7,
                      borderRadius: 999,
                      backgroundColor: isActive ? "#0EA5E9" : "#FFFFFF",
                      borderWidth: scale(2),
                      borderColor: isActive ? "#0EA5E9" : "#E2E8F0",
                    },
                    !isActive && {
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.06,
                      shadowRadius: 2,
                      elevation: 1,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: isSmall ? 12 : 13,
                      color: isActive ? "#FFFFFF" : "#475569",
                    }}
                    className="font-Inter_SemiBold"
                  >
                    {tab}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Quotes List */}
          <FlatList
            data={filteredQuotes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <QuoteCard item={item} />}
            contentContainerStyle={{ paddingBottom: verticalScale(30) }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View className="items-center mt-16">
                <Ionicons
                  name="document-text-outline"
                  size={48}
                  color="#C7C7CC"
                />
                <Text className="font-Inter_Regular text-[14px] text-gray-400 mt-3">
                  No quotes found
                </Text>
              </View>
            }
          />
        </View>
      </ScreenWrapper>
    </>
  );
}
