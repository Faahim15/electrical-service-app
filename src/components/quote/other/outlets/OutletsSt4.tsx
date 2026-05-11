import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
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
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}
        <View className="self-start bg-[#EFF6FF] rounded-full px-3 py-1 mb-5">
          <Text className="text-[#60A5FA] text-[11px] font-Inter_SemiBold tracking-wide">
            Outlets
          </Text>
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
            }),
          )}
        </View>

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
};

export default OutletsSt4;
