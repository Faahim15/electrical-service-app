import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ABOVE_BELOW_OPTIONS = [
  "Attic above",
  "Occupied space above",
  "Crawlspace (unfinished)",
  "Crawlspace (finished)",
  "Basement (unfinished)",
  "Basement (finished)",
];

const DISTANCE_OPTIONS = [
  "Less than 25 ft",
  "25 – 50 ft",
  "50 – 100 ft",
  "More than 100 ft",
  "Unsure",
  "Other",
];

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ChipButton = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.08,
        useNativeDriver: true,
        speed: 40,
        bounciness: 10,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 40,
        bounciness: 10,
      }),
    ]).start();
    onPress();
  };

  return (
    <AnimatedTouchable
      activeOpacity={0.85}
      onPress={handlePress}
      style={{ transform: [{ scale: scaleAnim }] }}
      className={`rounded-full px-4 py-2 border mb-2 mr-2 ${
        selected
          ? "border-transparent bg-[#60A5FA]"
          : "border-gray-300 bg-white"
      }`}
    >
      <Text
        className={`text-sm font-Inter_Regular ${
          selected ? "text-white" : "text-gray-700"
        }`}
      >
        {label}
      </Text>
    </AnimatedTouchable>
  );
};

const DistanceCard = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    Animated.spring(translateX, {
      toValue: selected ? 0 : 6,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
    onPress();
  };

  return (
    <AnimatedTouchable
      activeOpacity={0.8}
      onPress={handlePress}
      style={{ transform: [{ translateX }] }}
      className={`w-full rounded-2xl px-4 py-4 mb-2.5 border flex-row items-center ${
        selected ? "bg-[#60A5FA] border-[#60A5FA]" : "border-gray-200 bg-white"
      }`}
    >
      <Text
        className={`text-[15px] font-Inter_Medium ${
          selected ? "text-white" : "text-gray-800"
        }`}
      >
        {label}
      </Text>
    </AnimatedTouchable>
  );
};

const DedicatedCircuitSt2 = () => {
  const [location, setLocation] = useState("");
  const [selectedAboveBelow, setSelectedAboveBelow] = useState<string[]>([]);
  const [selectedDistance, setSelectedDistance] = useState<string | null>(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [otherDistanceText, setOtherDistanceText] = useState("");

  const inputHeight = useRef(new Animated.Value(0)).current;
  const inputOpacity = useRef(new Animated.Value(0)).current;

  const toggleAboveBelow = (option: string) => {
    setSelectedAboveBelow((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option],
    );
  };

  const handleDistanceSelect = (opt: string) => {
    setSelectedDistance(opt);

    if (opt === "Other") {
      Animated.parallel([
        Animated.timing(inputHeight, {
          toValue: 120,
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(inputOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(inputHeight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(inputOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  return (
    <ScrollView
      className="flex-1 "
      contentContainerStyle={{
        paddingTop: 24,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Badge */}
      <View className="self-start bg-[#EFF6FF] rounded-full px-3 py-1 mb-5">
        <Text className="text-[#60A5FA] text-[11px] font-Inter_SemiBold tracking-wide">
          Dedicated Circuit
        </Text>
      </View>

      {/* Title */}
      <View className="pt-2 pb-4">
        <Text className="text-[#0F172A] text-2xl font-Inter_Bold">
          Panel and location
        </Text>
      </View>

      {/* Q1: Location */}
      <View className="mb-7">
        <Text className="text-[#0F172A] text-base mb-3 font-Inter_Medium">
          Where will the dedicated circuit be installed?
        </Text>
        <TextInput
          className={`bg-white rounded-2xl px-4 py-3.5 text-base font-Inter_Regular text-gray-800 border ${
            inputFocused ? "border-[#60A5FA]" : "border-gray-200"
          }`}
          placeholder="Kitchen, garage, bedroom, etc."
          placeholderTextColor="#9CA3AF"
          value={location}
          onChangeText={setLocation}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </View>

      {/* Q2: Above / Below */}
      <View className="mb-7">
        <Text className="text-[#0F172A] text-base mb-3 font-Inter_Medium">
          What is above / below the area?
        </Text>
        <View className="flex-row flex-wrap">
          {ABOVE_BELOW_OPTIONS.map((opt) => (
            <ChipButton
              key={opt}
              label={opt}
              selected={selectedAboveBelow.includes(opt)}
              onPress={() => toggleAboveBelow(opt)}
            />
          ))}
        </View>
      </View>

      {/* Q3: Distance */}
      <View className="mb-7">
        <Text className="text-[#0F172A] text-base mb-3 font-Inter_Medium">
          What is the approximate distance of the electrical panel from
          dedicated circuit install location?
        </Text>
        {DISTANCE_OPTIONS.map((opt) => (
          <DistanceCard
            key={opt}
            label={opt}
            selected={selectedDistance === opt}
            onPress={() => handleDistanceSelect(opt)}
          />
        ))}

        {/* Animated "Other" input */}
        <Animated.View
          style={{
            height: inputHeight,
            opacity: inputOpacity,
            overflow: "hidden",
          }}
        >
          <TextInput
            value={otherDistanceText}
            onChangeText={setOtherDistanceText}
            placeholder="Please describe the distance..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            className="bg-white rounded-2xl px-4 py-3 text-sm font-Inter_Regular text-gray-800 mt-2"
            style={{
              borderWidth: 2,
              borderColor: "#60A5FA",
              height: 112,
            }}
          />
        </Animated.View>
      </View>
    </ScrollView>
  );
};

export default DedicatedCircuitSt2;
