import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
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
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}
        <View className="mt-4 mb-3">
          <View
            className="self-start px-3 py-1 rounded-full border"
            style={{ borderColor: "#06B6D4" }}
          >
            <Text
              className="font-Inter_Medium text-xs"
              style={{ color: "#06B6D4" }}
            >
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
                        backgroundColor: isSelected ? "#06B6D4" : "#ffffff",
                        borderColor: isSelected ? "#06B6D4" : "#D1D5DB",
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

        {/* Additional Info */}
        <Text className="font-Inter_SemiBold text-gray-800 text-sm mb-2">
          Additional Information
        </Text>
        <TextInput
          className="border border-gray-200 rounded-xl px-4 py-3 font-Inter_Regular text-gray-800 text-sm bg-white"
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          style={{ minHeight: 110 }}
          placeholderTextColor="#9CA3AF"
        />

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
};

export default SwitchesSt3;
