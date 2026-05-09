import LinearButton from "@/src/components/shared/LinearButton";
import ScreenWrapper from "@/src/components/shared/ScreenWrapper";
import Feather from "@expo/vector-icons/build/Feather";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notificationItems = [
  {
    id: 1,
    title: "Reminder Alerts",
    description: "Get notified about upcoming maintenance reminders",
    defaultValue: true,
  },
  // {
  //   id: 2,
  //   title: "Maintenance Notices",
  //   description: "Safety and maintenance",
  //   defaultValue: false,
  // },
  {
    id: 3,
    title: "App Notifications",
    description: "General app notifications and updates",
    defaultValue: true,
  },
];

const NotificationCard = ({
  item,
  index,
  value,
  onToggle,
}: {
  item: (typeof notificationItems)[0];
  index: number;
  value: boolean;
  onToggle: (id: number, val: boolean) => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 110,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        delay: index * 110,
        useNativeDriver: true,
        tension: 60,
        friction: 8,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{ opacity: fadeAnim, transform: [{ translateY }] }}
      className="mb-3"
    >
      <View
        className="bg-white rounded-2xl px-4 py-4 flex-row items-center justify-between"
        style={{
          shadowColor: "#06B6D4",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        {/* Text */}
        <View className="flex-1 mr-4">
          <Text className="text-[15px] font-Inter_Bold text-[#111827] mb-0.5">
            {item.title}
          </Text>
          <Text className="text-[13px] text-[#6B7280] font-Inter_Regular leading-[18px]">
            {item.description}
          </Text>
        </View>

        {/* Toggle */}
        <Switch
          value={value}
          onValueChange={(val) => onToggle(item.id, val)}
          trackColor={{ false: "#D1D5DB", true: "#06B6D4" }}
          thumbColor="#ffffff"
          ios_backgroundColor="#D1D5DB"
        />
      </View>
    </Animated.View>
  );
};

const Notificationsetting = () => {
  const [settings, setSettings] = useState<Record<number, boolean>>(
    Object.fromEntries(notificationItems.map((n) => [n.id, n.defaultValue])),
  );

  const buttonAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(buttonAnim, {
      toValue: 1,
      duration: 500,
      delay: notificationItems.length * 110 + 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleToggle = (id: number, val: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: val }));
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.97,
      useNativeDriver: true,
      tension: 100,
      friction: 5,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 5,
    }).start();
  };

  return (
    <ScreenWrapper>
      <SafeAreaView edges={["top"]} className="flex-1">
        {/* header */}
        <View className="flex-row justify-between items-center pb-2 ">
          <TouchableOpacity onPress={() => router.back()} className="">
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-2xl text-[#111827] font-Inter_Bold">
            Notification Settings
          </Text>
          <View />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 "
          contentContainerStyle={{ paddingBottom: 32, paddingTop: 8 }}
        >
          {/* content  */}
          {notificationItems.map((item, index) => (
            <NotificationCard
              key={item.id}
              item={item}
              index={index}
              value={settings[item.id]}
              onToggle={handleToggle}
            />
          ))}
        </ScrollView>

        {/* Save Button */}
        <Animated.View
          style={{ opacity: buttonAnim, transform: [{ scale: buttonScale }] }}
          className="px-4 pb-6"
        >
          <LinearButton
            title="Save Preferences"
            onPress={() => console.log("Saved")}
            variant="primary"
          />
        </Animated.View>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default Notificationsetting;
