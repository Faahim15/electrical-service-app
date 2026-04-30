import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ampOptions = [15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150];
const voltOptions = ["110 or 120", "220 or 240", "110/220 or 120/240"];

const DedicatedCircuitSt3 = () => {
  const [selectedAmp, setSelectedAmp] = useState<number | null>(null);
  const [selectedVolt, setSelectedVolt] = useState<string | null>(null);
  const [nemaConfig, setNemaConfig] = useState("");
  const [nemaFocused, setNemaFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const totalItems = ampOptions.length + voltOptions.length + 1;
  const itemAnims = useRef(
    Array.from({ length: totalItems }, () => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(14),
    })),
  ).current;

  const pressScales = useRef(
    Array.from({ length: totalItems }, () => new Animated.Value(1)),
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 380,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 380,
        useNativeDriver: true,
      }),
    ]).start();

    itemAnims.forEach((anim, i) => {
      Animated.parallel([
        Animated.timing(anim.opacity, {
          toValue: 1,
          duration: 300,
          delay: 80 + i * 40,
          useNativeDriver: true,
        }),
        Animated.timing(anim.translateY, {
          toValue: 0,
          duration: 300,
          delay: 80 + i * 40,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  const animatePressIn = (index: number) => {
    Animated.spring(pressScales[index], {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const animatePressOut = (index: number) => {
    Animated.spring(pressScales[index], {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const renderOptionCard = (
    label: string,
    index: number,
    isSelected: boolean,
    onPress: () => void,
  ) => {
    const anim = itemAnims[index];
    const scale = pressScales[index];

    return (
      <Animated.View
        key={label}
        style={{
          opacity: anim.opacity,
          transform: [{ translateY: anim.translateY }, { scale }],
          marginBottom: 8,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={() => animatePressIn(index)}
          onPressOut={() => animatePressOut(index)}
          onPress={onPress}
          style={{
            backgroundColor: isSelected ? "#F0FDFE" : "#FFFFFF",
            borderRadius: 14,
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderWidth: isSelected ? 1.5 : 1,
            borderColor: isSelected ? "#06B6D4" : "transparent",
            shadowColor: isSelected ? "#06B6D4" : "#0EA5E9",
            shadowOpacity: isSelected ? 0.12 : 0.05,
            shadowRadius: isSelected ? 8 : 5,
            shadowOffset: { width: 0, height: 2 },
            elevation: isSelected ? 3 : 2,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_Regular",
              fontSize: 15,
              color: isSelected ? "#06B6D4" : "#334155",
            }}
          >
            {label}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-[#EFF6FF]">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Tag */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="pt-5 pb-1"
          >
            <Text
              style={{
                fontFamily: "Inter_Medium",
                color: "#06B6D4",
                fontSize: 13,
              }}
            >
              Dedicated Circuit
            </Text>
          </Animated.View>

          {/* Title */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="pt-2 pb-5"
          >
            <Text
              style={{
                fontFamily: "Inter_Bold",
                fontSize: 24,
                color: "#0F172A",
                lineHeight: 30,
              }}
            >
              Electrical specifications
            </Text>
          </Animated.View>

          {/* Amps Section */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="mb-3"
          >
            <Text
              style={{
                fontFamily: "Inter_SemiBold",
                fontSize: 15,
                color: "#0F172A",
                marginBottom: 12,
              }}
            >
              How many amps do you need?
            </Text>
          </Animated.View>

          {ampOptions.map((amp, index) =>
            renderOptionCard(String(amp), index, selectedAmp === amp, () =>
              setSelectedAmp(selectedAmp === amp ? null : amp),
            ),
          )}

          {/* Volts Section */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="mt-4 mb-3"
          >
            <Text
              style={{
                fontFamily: "Inter_SemiBold",
                fontSize: 15,
                color: "#0F172A",
                marginBottom: 12,
              }}
            >
              How many volts do you need?
            </Text>
          </Animated.View>

          {voltOptions.map((volt, index) =>
            renderOptionCard(
              volt,
              ampOptions.length + index,
              selectedVolt === volt,
              () => setSelectedVolt(selectedVolt === volt ? null : volt),
            ),
          )}

          {/* NEMA Section */}
          {(() => {
            const nemaIndex = ampOptions.length + voltOptions.length;
            const anim = itemAnims[nemaIndex];
            return (
              <Animated.View
                style={{
                  opacity: anim.opacity,
                  transform: [{ translateY: anim.translateY }],
                  marginTop: 20,
                }}
              >
                <View className="flex-row items-center mb-1">
                  <Text
                    style={{
                      fontFamily: "Inter_SemiBold",
                      fontSize: 15,
                      color: "#0F172A",
                      marginRight: 4,
                    }}
                  >
                    What is the NEMA configuration?
                  </Text>
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: "#E0F2FE",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Inter_Bold",
                        fontSize: 10,
                        color: "#06B6D4",
                      }}
                    >
                      i
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    fontFamily: "Inter_Regular",
                    fontSize: 12,
                    color: "#94A3B8",
                    marginBottom: 10,
                  }}
                >
                  If there will be one
                </Text>

                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 14,
                    borderWidth: nemaFocused ? 1.5 : 1,
                    borderColor: nemaFocused ? "#06B6D4" : "transparent",
                    shadowColor: nemaFocused ? "#06B6D4" : "#0EA5E9",
                    shadowOpacity: nemaFocused ? 0.12 : 0.05,
                    shadowRadius: nemaFocused ? 8 : 5,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 2,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                  }}
                >
                  <TextInput
                    value={nemaConfig}
                    onChangeText={setNemaConfig}
                    onFocus={() => setNemaFocused(true)}
                    onBlur={() => setNemaFocused(false)}
                    placeholder=""
                    placeholderTextColor="#CBD5E1"
                    style={{
                      fontFamily: "Inter_Regular",
                      fontSize: 15,
                      color: "#334155",
                      padding: 0,
                      margin: 0,
                    }}
                  />
                </View>
              </Animated.View>
            );
          })()}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DedicatedCircuitSt3;
