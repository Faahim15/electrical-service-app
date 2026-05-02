import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const OUTLET_TYPES = [
  "Standard (Rounded)",
  "Decorator (Rectangle)",
  "GFI",
  "Surge protected",
  "Floor",
  "Smart",
  "Night light",
  "I'll provide my own",
];

const OutletsSt4 = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const chipAnims = useRef(
    OUTLET_TYPES.map(() => new Animated.Value(1)),
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

  const handleToggleType = (type: string, index: number) => {
    animatePressIn(chipAnims[index]);
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  // Group chips into rows matching the design layout
  const rows: string[][] = [
    ["Standard (Rounded)"],
    ["Decorator (Rectangle)", "GFI"],
    ["Surge protected", "Floor", "Smart"],
    ["Night light", "I'll provide my own"],
  ];

  // Flatten to get index
  const flatChips = rows.flat();

  return (
    <View className="flex-1 ">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}
        <View className="mt-4 mb-2">
          <View
            className="self-start px-3 py-1 rounded-full border"
            style={{ borderColor: "#06B6D4" }}
          >
            <Text
              className="font-Inter_Medium text-xs"
              style={{ color: "#06B6D4" }}
            >
              Outlets
            </Text>
          </View>
        </View>

        <Text className="font-Inter_Bold text-2xl text-gray-900 mb-5">
          Outlet type
        </Text>

        <Text className="font-Inter_SemiBold text-gray-800 text-sm mb-4">
          What type of outlet(s) do you need?
        </Text>

        {/* Chips */}
        <View className="flex-row flex-wrap gap-2 mb-6">
          {rows.map((row, rowIndex) =>
            row.map((chip) => {
              const flatIndex = flatChips.indexOf(chip);
              const isSelected = selectedTypes.includes(chip);
              return (
                <Animated.View
                  key={chip}
                  style={{ transform: [{ scale: chipAnims[flatIndex] }] }}
                >
                  <TouchableOpacity
                    onPress={() => handleToggleType(chip, flatIndex)}
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
            }),
          )}
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
          numberOfLines={4}
          textAlignVertical="top"
          style={{ minHeight: 100 }}
          placeholder=""
          placeholderTextColor="#9CA3AF"
        />

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
};

export default OutletsSt4;
