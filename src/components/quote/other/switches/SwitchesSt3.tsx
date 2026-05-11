import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SWITCH_TYPES = [
  "Standard (Toggle)",
  "Standard (Rocker/Decorator)",
  "Dimmer (Toggle)",
  "Dimmer (Rocker/Decorator)",
  "Smart",
  "Motion",
  "Timer",
  "I'll provide my own",
];

// Row layout matching the image
const CHIP_ROWS: string[][] = [
  ["Standard (Toggle)"],
  ["Standard (Rocker/Decorator)"],
  ["Dimmer (Toggle)"],
  ["Dimmer (Rocker/Decorator)", "Smart"],
  ["Motion", "Timer", "I'll provide my own"],
];

const SwitchesSt3 = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const chipAnims = useRef(
    SWITCH_TYPES.map(() => new Animated.Value(1)),
  ).current;
  const submitAnim = useRef(new Animated.Value(1)).current;

  const animatePressIn = (anim: Animated.Value) => {
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 0.93,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleToggleType = (type: string) => {
    const index = SWITCH_TYPES.indexOf(type);
    if (index !== -1) animatePressIn(chipAnims[index]);
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  return (
    <View className="flex-1 ">
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}
        <View className="mt-4 mb-3">
          <View className="self-start bg-blue-50 rounded-full px-3 py-1 mb-5 border border-blue-100">
            <Text className="font-Inter_SemiBold text-[11px] text-[#60A5FA] tracking-wide">
              Switches
            </Text>
          </View>
        </View>

        <Text className="font-Inter_Bold text-2xl text-gray-900 mb-5">
          Switch type and timeline
        </Text>

        <Text className="font-Inter_SemiBold text-gray-800 text-sm mb-4">
          What type of switch(es) do you need?
        </Text>

        {/* Chips — row layout */}
        <View className="mb-6">
          {CHIP_ROWS.map((row, rowIdx) => (
            <View key={rowIdx} className="flex-row flex-wrap mb-2">
              {row.map((chip) => {
                const index = SWITCH_TYPES.indexOf(chip);
                const isSelected = selectedTypes.includes(chip);
                return (
                  <Animated.View
                    key={chip}
                    style={{
                      transform: [{ scale: chipAnims[index] }],
                      marginRight: 8,
                      marginBottom: 4,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleToggleType(chip)}
                      activeOpacity={0.8}
                      className="px-4 py-2 rounded-full border"
                      style={{
                        backgroundColor: isSelected ? "#60A5FA" : "#ffffff",
                        borderColor: isSelected ? "#60A5FA" : "#D1D5DB",
                      }}
                    >
                      <Text
                        className={`font-Inter_Medium text-sm ${
                          isSelected ? "text-white" : "text-gray-700"
                        }`}
                      >
                        {chip}
                      </Text>
                    </TouchableOpacity>
                  </Animated.View>
                );
              })}
            </View>
          ))}
        </View>

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
};

export default SwitchesSt3;
