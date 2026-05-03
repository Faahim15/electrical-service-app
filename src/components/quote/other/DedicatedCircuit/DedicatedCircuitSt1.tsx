import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DedicatedCircuitSt1 = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [selectedPanel, setSelectedPanel] = useState(null);

  const circuitOptions = [
    "EV charger",
    "Freezer",
    "RV",
    "Tools / Equipment",
    "Accessory Building",
    "Dock Power",
    "Other",
  ];

  const panelLocations = [
    "Basement (Finished)",
    "Basement (Unfinished)",
    "Garage (Finished)",
    "Garage (Unfinished)",
    "Other (please specify)",
  ];

  const itemAnims = useRef(
    [...circuitOptions, ...panelLocations].map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(16),
    })),
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    const animations = itemAnims.map((anim, i) =>
      Animated.parallel([
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 350,
          delay: 100 + i * 55,
          useNativeDriver: true,
        }),
        Animated.timing(anim.translateY, {
          toValue: 0,
          duration: 350,
          delay: 100 + i * 55,
          useNativeDriver: true,
        }),
      ]),
    );
    Animated.stagger(0, animations).start();
  }, []);

  const renderOption = (
    label: any,
    index: any,
    isSelected: any,
    onPress: any,
  ) => {
    const anim = itemAnims[index];
    return (
      <Animated.View
        key={label}
        style={{
          opacity: anim.opacity,
          transform: [{ translateY: anim.translateY }],
        }}
      >
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={onPress}
          className={`rounded-2xl px-4 py-4 mb-2 ${isSelected ? "bg-[#14B8A6]" : "bg-white"}`}
          style={{
            shadowColor: isSelected ? "#14B8A6" : "#0EA5E9",
            shadowOpacity: isSelected ? 0.25 : 0.06,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
            borderWidth: 2,
            borderColor: isSelected ? "#0d9488" : "transparent",
          }}
        >
          <Text
            className={`text-[15px] ${isSelected ? "text-white" : "text-[#334155]"}`}
            style={{
              fontFamily: isSelected ? "Inter_SemiBold" : "Inter_Regular",
            }}
          >
            {label}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 bg-[#EFF6FF]">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header tag */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
          className="px-4 pt-5 pb-1"
        >
          <Text
            className="text-[#06B6D4] text-sm"
            style={{ fontFamily: "Inter_Medium" }}
          >
            Dedicated Circuit
          </Text>
        </Animated.View>

        {/* Heading */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
          className="px-4 pt-2 pb-4"
        >
          <Text
            className="text-[#0F172A] text-2xl"
            style={{ fontFamily: "Inter_Bold" }}
          >
            Intended use
          </Text>
        </Animated.View>

        {/* Section 1 */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
          className="px-4 pb-3"
        >
          <Text
            className="text-[#0F172A] text-[15px] mb-3"
            style={{ fontFamily: "Inter_SemiBold" }}
          >
            What do you need a dedicated circuit for?
          </Text>
          {circuitOptions.map((option, index) =>
            renderOption(option, index, selectedCircuit === option, () =>
              setSelectedCircuit(option),
            ),
          )}
        </Animated.View>

        {/* Section 2 */}
        <Animated.View
          style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
          className="px-4 pt-4 pb-3"
        >
          <Text
            className="text-[#0F172A] text-[15px] mb-3"
            style={{ fontFamily: "Inter_SemiBold" }}
          >
            Where is your electrical panel located?
          </Text>
          {panelLocations.map((location, index) =>
            renderOption(
              location,
              circuitOptions.length + index,
              selectedPanel === location,
              () => setSelectedPanel(location),
            ),
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default DedicatedCircuitSt1;
