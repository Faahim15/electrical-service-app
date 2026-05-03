import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type SwitchConnection = "new" | "existing" | "remote" | null;
type YesNo = "yes" | "no" | null;
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

  const scaleAnims = useRef<{ [key: string]: Animated.Value }>({}).current;

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
            ? "bg-cyan-500 border-cyan-500"
            : "bg-white border-gray-200"
        }`}
        style={{ marginBottom: flex ? 0 : 8 }}
        activeOpacity={0.85}
      >
        <Text
          className={`text-xs text-center ${
            isSelected
              ? "text-white font-Inter_SemiBold"
              : "text-gray-700 font-Inter_Regular"
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
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Category tag */}
        <View className="mt-3 mb-4">
          <Text className="text-xs text-cyan-500 font-Inter_Medium">
            Ceiling Fans
          </Text>
        </View>

        {/* Title */}
        <Text className="text-xl font-Inter_Bold text-gray-900 mb-1">
          Switch details
        </Text>
        <Text className="text-sm text-gray-500 font-Inter_Regular mb-4">
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
            <Text className="text-sm text-gray-500 font-Inter_Regular mb-3">
              What kind of switch do you want installed?
            </Text>
            <View className="flex-row mb-2">
              <SelectButton
                label="Standard (Toggle)"
                isSelected={switchType === "standard_toggle"}
                onPress={() => setSwitchType("standard_toggle")}
                animKey="st_toggle"
                flex
              />
              <SelectButton
                label="Smart"
                isSelected={switchType === "smart"}
                onPress={() => setSwitchType("smart")}
                animKey="st_smart"
                flex
              />
            </View>
            <View className="flex-row mb-2">
              <SelectButton
                label={"Standard (Rocker/\nDecorator)"}
                isSelected={switchType === "standard_rocker"}
                onPress={() => setSwitchType("standard_rocker")}
                animKey="st_rocker"
                flex
              />
              <SelectButton
                label={"Dimmer\n(Rocker/Decorator)"}
                isSelected={switchType === "dimmer_rocker"}
                onPress={() => setSwitchType("dimmer_rocker")}
                animKey="st_drock"
                flex
              />
            </View>
            <View className="flex-row mb-2">
              <SelectButton
                label="Dimmer (Toggle)"
                isSelected={switchType === "dimmer_toggle"}
                onPress={() => setSwitchType("dimmer_toggle")}
                animKey="st_dtog"
                flex
              />
              <SelectButton
                label="Motion"
                isSelected={switchType === "motion"}
                onPress={() => setSwitchType("motion")}
                animKey="st_motion"
                flex
              />
            </View>
            <View className="flex-row mb-4">
              <SelectButton
                label="Timer"
                isSelected={switchType === "timer"}
                onPress={() => setSwitchType("timer")}
                animKey="st_timer"
                flex
              />
              <SelectButton
                label="I'll provide my own"
                isSelected={switchType === "provide_own"}
                onPress={() => setSwitchType("provide_own")}
                animKey="st_own"
                flex
              />
            </View>
          </View>
        )}

        {/* Upgrade switch for "existing" selection */}
        {switchConnection === "existing" && (
          <View className="mt-4">
            <Text className="text-sm text-gray-500 font-Inter_Regular mb-3">
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
            <Text className="text-sm text-gray-500 font-Inter_Regular mb-3">
              What kind of switch do you want installed?
            </Text>
            <SelectButton
              label="Standard (Toggle)"
              isSelected={switchType === "standard_toggle"}
              onPress={() => setSwitchType("standard_toggle")}
              animKey="up_st_toggle"
            />
            <SelectButton
              label="Standard (Rocker/Decorator)"
              isSelected={switchType === "standard_rocker"}
              onPress={() => setSwitchType("standard_rocker")}
              animKey="up_st_rocker"
            />
            <SelectButton
              label="Dimmer (Toggle)"
              isSelected={switchType === "dimmer_toggle"}
              onPress={() => setSwitchType("dimmer_toggle")}
              animKey="up_st_dtog"
            />
            <View className="flex-row mb-2">
              <SelectButton
                label="Dimmer (Rocker/Decorator)"
                isSelected={switchType === "dimmer_rocker"}
                onPress={() => setSwitchType("dimmer_rocker")}
                animKey="up_st_drock"
                flex
              />
              <SelectButton
                label="Smart"
                isSelected={switchType === "smart"}
                onPress={() => setSwitchType("smart")}
                animKey="up_st_smart"
                flex
              />
            </View>
            <View className="flex-row mb-4">
              <SelectButton
                label="Motion"
                isSelected={switchType === "motion"}
                onPress={() => setSwitchType("motion")}
                animKey="up_st_motion"
                flex
              />
              <SelectButton
                label="Timer"
                isSelected={switchType === "timer"}
                onPress={() => setSwitchType("timer")}
                animKey="up_st_timer"
                flex
              />
              <SelectButton
                label="I'll provide my own"
                isSelected={switchType === "provide_own"}
                onPress={() => setSwitchType("provide_own")}
                animKey="up_st_own"
                flex
              />
            </View>
          </View>
        )}

        {/* Additional Information */}
        <Text className="text-sm text-gray-500 font-Inter_Regular mb-2 mt-2">
          Additional Information
        </Text>
        <TextInput
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          placeholder=""
          placeholderTextColor="#9CA3AF"
          className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 font-Inter_Regular"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          style={{ minHeight: 80 }}
        />
      </ScrollView>
    </View>
  );
};

export default CeilingFanSt3;
