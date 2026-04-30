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
        selected ? "border-transparent bg-cyan-500" : "border-gray-300 bg-white"
      }`}
    >
      <Text
        className={`text-sm font-Inter_Medium ${
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
        selected ? "border-cyan-400 bg-cyan-50" : "border-gray-200 bg-white"
      }`}
    >
      <View
        className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
          selected ? "border-cyan-500 bg-cyan-500" : "border-gray-300"
        }`}
      >
        {selected && <View className="w-2 h-2 rounded-full bg-white" />}
      </View>
      <Text
        className={`text-[15px] font-Inter_Medium ${
          selected ? "text-cyan-700" : "text-gray-800"
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

  const btnScale = useRef(new Animated.Value(1)).current;

  const toggleAboveBelow = (option: string) => {
    setSelectedAboveBelow((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option],
    );
  };

  return (
    <ScrollView
      className="flex-1 "
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Badge */}
      <View className="self-start bg-cyan-500 rounded-full px-3 py-1 mb-5">
        <Text className="text-white text-[11px] font-Inter_SemiBold tracking-wide uppercase">
          Dedicated Circuit
        </Text>
      </View>

      {/* Title */}
      <Text className="text-[26px] font-Inter_Bold text-gray-900 mb-6">
        Panel and location
      </Text>

      {/* Q1: Location */}
      <View className="mb-7">
        <Text className="text-[15px] font-Inter_Bold text-gray-900 mb-3 leading-5">
          Where will the dedicated circuit be installed?
        </Text>
        <TextInput
          className={`bg-white rounded-2xl px-4 py-3.5 text-[15px] font-Inter_Regular text-gray-800 border ${
            inputFocused ? "border-cyan-400" : "border-gray-200"
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
        <Text className="text-[15px] font-Inter_Bold text-gray-900 mb-3">
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
        <Text className="text-[15px] font-Inter_Bold text-gray-900 mb-3 leading-5">
          What is the approximate distance of the electrical panel from
          dedicated circuit install location?
        </Text>
        {DISTANCE_OPTIONS.map((opt) => (
          <DistanceCard
            key={opt}
            label={opt}
            selected={selectedDistance === opt}
            onPress={() => setSelectedDistance(opt)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default DedicatedCircuitSt2;
