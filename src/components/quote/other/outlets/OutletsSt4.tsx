// import {

// } from "@/src/store/outletsDataSlice";
import {
  OutletType,
  selectOutletsSt4,
  toggleOutletType,
} from "@/src/redux/slices/globalstore/outletsDataSlice";
import React, { useRef } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const OUTLET_TYPES: OutletType[] = [
  "Standard (Rounded)",
  "Decorator (Rectangle)",
  "GFI",
  "Surge protected",
  "Floor",
  "Smart",
  "Night light",
  "I'll provide my own",
];

const rows: OutletType[][] = [
  ["Standard (Rounded)"],
  ["Decorator (Rectangle)", "GFI"],
  ["Surge protected", "Floor", "Smart"],
  ["Night light", "I'll provide my own"],
];

const flatChips = rows.flat();

const OutletsSt4 = () => {
  const dispatch = useDispatch();
  const { selectedTypes } = useSelector(selectOutletsSt4);

  const chipAnims = useRef(
    OUTLET_TYPES.map(() => new Animated.Value(1)),
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

  const handleToggleType = (type: OutletType, index: number) => {
    animatePressIn(chipAnims[index]);
    dispatch(toggleOutletType(type));
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Badge */}
        <View className="self-start bg-[#EFF6FF] rounded-full px-3 py-1 mb-5">
          <Text className="text-[#60A5FA] text-[11px] font-Inter_SemiBold tracking-wide">
            Outlets
          </Text>
        </View>

        <Text className="text-2xl font-Inter_Bold text-[#1F2937] mb-5">
          Outlet type
        </Text>

        <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-4">
          What type of outlet(s) do you need?
        </Text>

        {/* Chips */}
        <View className="flex-row flex-wrap gap-2 mb-6">
          {rows.map((row) =>
            row.map((chip) => {
              const flatIndex = flatChips.indexOf(chip);
              const isSelected = selectedTypes.includes(chip);
              return (
                <Animated.View
                  key={chip}
                  style={{ transform: [{ scale: chipAnims[flatIndex] }] }}
                >
                  <Pressable
                    onPress={() => handleToggleType(chip, flatIndex)}
                    className="px-4 py-2 rounded-full border"
                    style={{
                      backgroundColor: isSelected ? "#60A5FA" : "#ffffff",
                      borderColor: isSelected ? "#60A5FA" : "#D1D5DB",
                    }}
                  >
                    <Text
                      className={`font-Inter_Medium text-sm ${
                        isSelected ? "text-white" : "text-[#1F2937]"
                      }`}
                    >
                      {chip}
                    </Text>
                  </Pressable>
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
