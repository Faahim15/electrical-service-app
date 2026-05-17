import {
  selectSwitchesSelectedTypes,
  SwitchType,
  toggleSwitchType,
} from "@/src/redux/slices/globalstore/switchesDataSlice";
import React, { useRef } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
// import {

// } from "./switchesDataSlice";

const SWITCH_TYPES: SwitchType[] = [
  "Standard (Toggle)",
  "Standard (Rocker/Decorator)",
  "Dimmer (Toggle)",
  "Dimmer (Rocker/Decorator)",
  "Smart",
  "Motion",
  "Timer",
  "I'll provide my own",
];

const CHIP_ROWS: SwitchType[][] = [
  ["Standard (Toggle)"],
  ["Standard (Rocker/Decorator)"],
  ["Dimmer (Toggle)"],
  ["Dimmer (Rocker/Decorator)", "Smart"],
  ["Motion", "Timer", "I'll provide my own"],
];

const SwitchesSt3 = () => {
  const dispatch = useDispatch();
  const selectedTypes = useSelector(selectSwitchesSelectedTypes);

  const chipAnims = useRef(
    SWITCH_TYPES.map(() => new Animated.Value(1)),
  ).current;

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

  const handleToggleType = (type: SwitchType) => {
    const index = SWITCH_TYPES.indexOf(type);
    if (index !== -1) animatePressIn(chipAnims[index]);
    dispatch(toggleSwitchType(type));
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}
        <View className="mt-4 mb-3">
          <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full w-24">
            <Text className="text-sm font-Inter_Medium text-[#60A5FA]">
              Switches
            </Text>
          </View>
        </View>

        <Text className="text-2xl font-Inter_Bold text-[#1F2937] mb-5">
          Switch type
        </Text>

        <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-4">
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
                        borderColor: isSelected ? "#60A5FA" : "#E5E7EB",
                      }}
                    >
                      <Text
                        className={`font-Inter_Medium text-sm ${
                          isSelected ? "text-white" : "text-[#1F2937]"
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
