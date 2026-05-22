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

const SWITCH_TYPES: SwitchType[] = [
  "Standard (Toggle)",
  "Smart",
  "Standard (Rocker/Decorator)",
  "Dimmer (Rocker/Decorator)",
  "Dimmer (Toggle)",
  "Motion",
  "Timer",
  "I'll provide my own",
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

        {/* Two-column grid — same as CeilingFanSt3 TwoColGrid */}
        <View className="flex-row flex-wrap gap-2 mb-6">
          {SWITCH_TYPES.map((item, index) => {
            const isSelected = selectedTypes.includes(item);
            return (
              <Animated.View
                key={item}
                style={{
                  transform: [{ scale: chipAnims[index] }],
                  width: "48%",
                }}
              >
                <TouchableOpacity
                  onPress={() => handleToggleType(item)}
                  activeOpacity={0.85}
                >
                  <View
                    className={`rounded-xl border py-3 px-3 items-center justify-center ${
                      isSelected
                        ? "bg-[#4AA9F5] border-[#4AA9F5]"
                        : "bg-white border-gray-200"
                    }`}
                    style={{ minHeight: 48 }}
                  >
                    <Text
                      className={`text-sm font-Inter_SemiBold text-center ${
                        isSelected ? "text-white" : "text-[#1F2937]"
                      }`}
                    >
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SwitchesSt3;
