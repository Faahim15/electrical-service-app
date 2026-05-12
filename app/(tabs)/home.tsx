import ElectricalHelpCard from "@/src/components/profile/ElectricalHelpCard";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import {
  quickActions,
  recentActivity,
} from "@/src/constants/tabs.home.constant";
import { ActivityItem, QuickAction } from "@/src/types/tabs.home.types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Linking,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// ─── Sub-components ───────────────────────────────────────

function QuickActionCard({ item }: { item: QuickAction }) {
  const handlePress = () => {
    const url = item.route as string;
    if (url.startsWith("http")) {
      Linking.openURL(url);
    } else {
      router.push(item.route);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      className="bg-white rounded-2xl p-4 mb-3"
      style={{
        width: "48%",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View className="w-9 h-9 rounded-full bg-[#E0F2FE] items-center justify-center mb-3">
        <Ionicons name={item.icon} size={18} color="#00ABB0" />
      </View>
      <Text className="font-Inter_SemiBold text-sm text-gray-800 mb-1">
        {item.title}
      </Text>
      <Text className="font-Inter_Regular text-xs text-gray-400">
        {item.subtitle}
      </Text>
    </TouchableOpacity>
  );
}

function QuickActionFullCard({ item }: { item: QuickAction }) {
  const handlePress = () => {
    const url = item.route as string;
    if (url.startsWith("http")) {
      Linking.openURL(url);
    } else {
      router.push(item.route);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handlePress}
      className="bg-white rounded-2xl p-4 mb-3 flex-row items-center gap-3"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View className="w-9 h-9 rounded-full bg-[#E0F2FE] items-center justify-center">
        <Ionicons name={item.icon} size={18} color="#00ABB0" />
      </View>
      <View className="flex-1">
        <Text className="font-Inter_SemiBold text-sm text-gray-800">
          {item.title}
        </Text>
        <Text className="font-Inter_Regular text-xs text-gray-400">
          {item.subtitle}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
    </TouchableOpacity>
  );
}
function ActivityCard({ item }: { item: ActivityItem }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="bg-white rounded-2xl px-4 py-3 mb-3 flex-row items-center"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
      }}
      onPress={() => router.push("/recent-activity/details")}
    >
      <View className="w-9 h-9 rounded-full bg-[#E0F2FE] items-center justify-center mr-3">
        <Ionicons name={item.icon} size={18} color="#00ABB0" />
      </View>
      <View className="flex-1">
        <Text className="font-Inter_SemiBold text-sm text-gray-800">
          {item.title}
        </Text>
        <Text className="font-Inter_Regular text-xs text-gray-400 mt-0.5">
          {item.subtitle}
        </Text>
      </View>
      {item.badge && (
        <View
          className="px-2 py-0.5 rounded-full mr-2"
          style={{ backgroundColor: item.badgeColor + "20" }}
        >
          <Text
            className="font-Inter_Medium text-xs"
            style={{ color: item.badgeColor }}
          >
            {item.badge}
          </Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
    </TouchableOpacity>
  );
}

// ─── Main Screen ──────────────────────────────────────────
export default function HomeScreen() {
  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="pt-[14%]">
          <View className="flex-row items-center justify-between mb-1">
            <View>
              <Text className="font-Inter_Bold text-2xl text-gray-900">
                Good morning,
              </Text>
              <Text className="font-Inter_Bold text-2xl text-gray-900">
                Ashley
              </Text>
            </View>
            <View className="flex-row items-center gap-3">
              <TouchableOpacity
                className="w-10 h-10 rounded-full bg-white items-center justify-center"
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.06,
                  shadowRadius: 4,
                  elevation: 2,
                }}
                onPress={() => router.push("/shared/notifications")}
              >
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="#374151"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push("/(page)/(profile)/editprofile")}
              >
                <View className="w-10 h-10 rounded-full bg-[#00ABB0] items-center justify-center">
                  <Text className="font-Inter_Bold text-sm text-white">AM</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <Text className="font-Inter_Regular text-sm text-gray-400 mb-5">
            How can we help today?
          </Text>

          {/* ── Search Bar ── */}
          <View
            className="flex-row items-center bg-white rounded-2xl px-4 mb-6"
            style={{
              height: 46,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <Ionicons name="search-outline" size={18} color="#9CA3AF" />
            <Text className="font-Inter_Regular text-sm text-gray-400 ml-2">
              Search quotes, guides, or partners
            </Text>
          </View>

          {/* ── Hero Banner ── */}

          <ElectricalHelpCard />

          {/* ── Quick Actions ── */}
          <Text className="font-Inter_Bold text-base text-gray-900 mb-3">
            Quick Actions
          </Text>

          {/* প্রথম ৪টা grid-এ */}
          <View className="flex-row flex-wrap justify-between">
            {quickActions.slice(0, 4).map((item) => (
              <QuickActionCard key={item.id} item={item} />
            ))}
          </View>

          {/* ৫ম টা full-width */}
          {quickActions[4] && <QuickActionFullCard item={quickActions[4]} />}

          {/* ── Recent Activity ── */}
          <View className="flex-row items-center justify-between mb-3 mt-1">
            <Text className="font-Inter_Bold text-base text-gray-900">
              Recent Activity
            </Text>
            <Pressable onPress={() => router.push("/recent-activity")}>
              <Text className="font-Inter_Medium text-sm text-[#00ABB0]">
                View All &rsaquo;
              </Text>
            </Pressable>
          </View>

          {recentActivity.map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}

          {/* ── Emergency Banner ── */}
          <View className="bg-red-50 border border-red-100 rounded-2xl p-4 mt-2">
            <View className="flex-row items-center mb-2">
              <View className="w-8 h-8 rounded-full bg-red-100 items-center justify-center mr-3">
                <Ionicons name="warning-outline" size={16} color="#EF4444" />
              </View>
              <Text className="font-Inter_SemiBold text-sm text-gray-800">
                Power issue or urgent{"\n"}concern?
              </Text>
            </View>
            <Text className="font-Inter_Regular text-xs text-gray-500 mb-4 ml-11">
              Get immediate help from our team.{"\n"}If you're dealing with an
              electrical emergency.
            </Text>
            <View className="flex-row items-center gap-3 ml-11">
              <TouchableOpacity
                activeOpacity={0.85}
                className="bg-red-500 rounded-xl px-4 py-2.5"
                onPress={() => router.push("/shared/help")}
              >
                <Text className="font-Inter_SemiBold text-sm text-white">
                  Call Now
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  router.push(
                    "/(page)/(help)/(trobleshootingpage)/safety-warning",
                  )
                }
                activeOpacity={0.8}
              >
                <Text className="font-Inter_Medium text-sm text-gray-600">
                  View Safety Tips
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
