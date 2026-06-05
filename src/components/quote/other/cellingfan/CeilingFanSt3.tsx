import {
  setSelectedSwitchKind,
  setSwitchConnection,
  setUpgradeSwitch,
} from "@/src/redux/slices/globalstore/cellingfanDataSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import React, { useRef } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const switchKinds = [
  "Standard (Toggle)",
  "Smart",
  "Standard (Rocker/Decorator)",
  "Dimmer (Rocker/Decorator)",
  "Dimmer (Toggle)",
  "Motion",
  "Timer",
  "I'll provide my own",
];

const CeilingFanSt3 = () => {
  const dispatch = useDispatch<AppDispatch>();

  const switchConnection = useSelector(
    (state: RootState) => state.ceilingFanData.switchConnection,
  );
  const selectedSwitchKind = useSelector(
    (state: RootState) => state.ceilingFanData.selectedSwitchKind,
  );
  const upgradeSwitch = useSelector(
    (state: RootState) => state.ceilingFanData.upgradeSwitch,
  );

  const scaleAnims = useRef<{ [key: string]: Animated.Value }>({}).current;

  const getAnim = (key: string) => {
    if (!scaleAnims[key]) scaleAnims[key] = new Animated.Value(1);
    return scaleAnims[key];
  };

  const animatePress = (key: string, callback?: () => void) => {
    const anim = getAnim(key);
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  const SelectButton = ({
    label,
    isSelected,
    onPress,
    animKey,
  }: {
    label: string;
    isSelected: boolean;
    onPress: () => void;
    animKey: string;
  }) => (
    <Animated.View style={{ transform: [{ scale: getAnim(animKey) }] }}>
      <Pressable
        onPress={() => animatePress(animKey, onPress)}
        className={`py-3 px-3 rounded-lg border mb-2 ${
          isSelected
            ? "bg-[#60A5FA] border-[#60A5FA]"
            : "bg-white border-gray-200"
        }`}
      >
        <Text
          className={`text-base font-Inter_Medium ${
            isSelected ? "text-white" : "text-[#1F2937]"
          }`}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full w-32 mb-2">
          <Text className="text-sm font-Inter_Medium text-[#60A5FA]">
            Ceiling Fans
          </Text>
        </View>

        <Text className="text-2xl font-Inter_Bold text-[#1F2937] mb-1">
          Switch details
        </Text>
        <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-4">
          Will the fan be connected to a new or existing switch?
        </Text>

        <SelectButton
          label="New"
          isSelected={switchConnection === "new"}
          onPress={() => dispatch(setSwitchConnection("new"))}
          animKey="sw_new"
        />
        <SelectButton
          label="Existing"
          isSelected={switchConnection === "existing"}
          onPress={() => dispatch(setSwitchConnection("existing"))}
          animKey="sw_existing"
        />
        <SelectButton
          label="My fan comes with a remote"
          isSelected={switchConnection === "remote"}
          onPress={() => dispatch(setSwitchConnection("remote"))}
          animKey="sw_remote"
        />

        {switchConnection === "new" && (
          <View className="mt-4">
            <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
              What kind of switch do you want installed?
            </Text>
            <TwoColGrid
              items={switchKinds}
              selected={selectedSwitchKind}
              onSelect={(v) => dispatch(setSelectedSwitchKind(v))}
            />
          </View>
        )}

        {switchConnection === "existing" && (
          <View className="mt-4">
            <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
              Do you want to upgrade your switch?
            </Text>
            <SelectButton
              label="Yes"
              isSelected={upgradeSwitch === "yes"}
              onPress={() => dispatch(setUpgradeSwitch("yes"))}
              animKey="up_yes"
            />
            <SelectButton
              label="No"
              isSelected={upgradeSwitch === "no"}
              onPress={() => dispatch(setUpgradeSwitch("no"))}
              animKey="up_no"
            />
          </View>
        )}

        {switchConnection === "existing" && upgradeSwitch === "yes" && (
          <View className="mt-4">
            <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
              What kind of switch do you want installed?
            </Text>
            <TwoColGrid
              items={switchKinds}
              selected={selectedSwitchKind}
              onSelect={(v) => dispatch(setSelectedSwitchKind(v))}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CeilingFanSt3;

const TwoColGrid = ({
  items,
  selected,
  onSelect,
}: {
  items: string[];
  selected: string | null;
  onSelect: (v: string) => void;
}) => (
  <View className="flex-row flex-wrap gap-2">
    {items.map((item) => (
      <View key={item} style={{ width: "48%" }}>
        <Pressable onPress={() => onSelect(item)}>
          <View
            className={`rounded-xl border py-3 px-3 items-center justify-center ${
              selected === item
                ? "bg-[#4AA9F5] border-[#4AA9F5]"
                : "bg-white border-gray-200"
            }`}
            style={{ minHeight: 48 }}
          >
            <Text
              className={`text-sm font-Inter_SemiBold text-center ${
                selected === item ? "text-white" : "text-[#1F2937]"
              }`}
            >
              {item}
            </Text>
          </View>
        </Pressable>
      </View>
    ))}
  </View>
);
