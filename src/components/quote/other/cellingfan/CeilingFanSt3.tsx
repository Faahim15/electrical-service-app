import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SwitchConnection = "new" | "existing" | "remote" | null;
type YesNo = "yes" | "no" | null;
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
const CHIP_ROWS: string[][] = [
  ["Standard (Toggle)"],
  ["Standard (Rocker/Decorator)"],
  ["Dimmer (Toggle)"],
  ["Dimmer (Rocker/Decorator)", "Smart"],
  ["Motion", "Timer", "I'll provide my own"],
];

type SwitchType =
  | "standard_toggle"
  | "smart"
  | "standard_rocker"
  | "dimmer_rocker"
  | "dimmer_toggle"
  | "motion"
  | "timer"
  | "provide_own"
  | null;

const CeilingFanSt3 = () => {
  const [switchConnection, setSwitchConnection] =
    useState<SwitchConnection>(null);
  const [upgradeSwitch, setUpgradeSwitch] = useState<YesNo>(null);
  const [switchType, setSwitchType] = useState<SwitchType>(null);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const scaleAnims = useRef<{ [key: string]: Animated.Value }>({}).current;
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

  const handleToggleType = (type: string) => {
    const index = SWITCH_TYPES.indexOf(type);
    if (index !== -1) animatePressIn(chipAnims[index]);
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const getAnim = (key: string) => {
    if (!scaleAnims[key]) {
      scaleAnims[key] = new Animated.Value(1);
    }
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
    flex,
  }: {
    label: string;
    isSelected: boolean;
    onPress: () => void;
    animKey: string;
    flex?: boolean;
  }) => (
    <Animated.View
      style={{
        transform: [{ scale: getAnim(animKey) }],
        flex: flex ? 1 : undefined,
        marginHorizontal: flex ? 2 : 0,
      }}
    >
      <TouchableOpacity
        onPress={() => animatePress(animKey, onPress)}
        className={`py-3 px-3 rounded-lg border ${
          isSelected
            ? "bg-[#60A5FA] border-[#60A5FA]"
            : "bg-white border-gray-200"
        }`}
        style={{ marginBottom: flex ? 0 : 8 }}
        activeOpacity={0.85}
      >
        <Text
          className={`text-sm text-center ${
            isSelected
              ? "text-white font-Inter_SemiBold"
              : "text-gray-700 font-Inter_Medium"
          }`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View className="flex-1 ">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Category tag */}
        <View className=" ">
          <View className="self-start bg-blue-50 rounded-full px-3 py-1 mb-5 border border-blue-100">
            <Text className="font-Inter_SemiBold text-[11px] text-[#60A5FA] tracking-wide">
              Ceiling Fans
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text className="text-xl font-Inter_Bold text-gray-900 mb-1">
          Switch details
        </Text>
        <Text className="text-base text-[#1F2937] font-Inter_Medium mb-4">
          Will the fan be connected to a new or existing switch?
        </Text>

        <SelectButton
          label="New"
          isSelected={switchConnection === "new"}
          onPress={() => setSwitchConnection("new")}
          animKey="sw_new"
        />
        <SelectButton
          label="Existing"
          isSelected={switchConnection === "existing"}
          onPress={() => setSwitchConnection("existing")}
          animKey="sw_existing"
        />
        <SelectButton
          label="My fan comes with a remote"
          isSelected={switchConnection === "remote"}
          onPress={() => setSwitchConnection("remote")}
          animKey="sw_remote"
        />

        {/* Switch type grid for "new" selection */}
        {switchConnection === "new" && (
          <View className="mt-4">
            <Text className="text-base text-[#1F2937] font-Inter_Medium mb-3">
              What kind of switch do you want installed?
            </Text>
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
          </View>
        )}

        {/* Upgrade switch for "existing" selection */}
        {switchConnection === "existing" && (
          <View className="mt-4">
            <Text className="text-base text-[#1F2937] font-Inter_Medium mb-3">
              Do you want to upgrade your switch?
            </Text>
            <SelectButton
              label="Yes"
              isSelected={upgradeSwitch === "yes"}
              onPress={() => setUpgradeSwitch("yes")}
              animKey="up_yes"
            />
            <SelectButton
              label="No"
              isSelected={upgradeSwitch === "no"}
              onPress={() => setUpgradeSwitch("no")}
              animKey="up_no"
            />
          </View>
        )}

        {/* Switch type grid when upgrading */}
        {switchConnection === "existing" && upgradeSwitch === "yes" && (
          <View className="mt-4">
            <Text className="text-base text-[#1F2937] font-Inter_Medium mb-3">
              What kind of switch do you want installed?
            </Text>

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
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CeilingFanSt3;
