import { nemaChart } from "@/assets/images/svg/tabs-svg";
import CustomSvg from "@/src/components/shared/CustomSvg";
import {
  selectDedicatedCircuitSt3,
  setDedicatedAmp,
  setDedicatedNemaConfig,
  setDedicatedVolt,
  VoltOption,
} from "@/src/redux/slices/globalstore/outletsDataSlice";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ampOptions = [15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150];
const voltOptions: VoltOption[] = [
  "110 or 120",
  "220 or 240",
  "110/220 or 120/240",
];

const OutletsDedicatedCircuitSt3 = () => {
  const dispatch = useDispatch();
  const { selectedAmp, selectedVolt, nemaConfig } = useSelector(
    selectDedicatedCircuitSt3,
  );

  const { width: screenWidth } = useWindowDimensions();
  const [nemaFocused, setNemaFocused] = useState(false);
  const [isvisiable, setIsVisiable] = useState(false);

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
    const scale = pressScales[index];

    return (
      <View key={label} style={{ marginBottom: 8 }}>
        <Pressable
          onPressIn={() => animatePressIn(index)}
          onPressOut={() => animatePressOut(index)}
          onPress={onPress}
          style={{
            backgroundColor: isSelected ? "#60A5FA" : "#FFFFFF",
            borderRadius: 14,
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderWidth: isSelected ? 1.5 : 1,
            borderColor: isSelected ? "#60A5FA" : "transparent",
            shadowColor: isSelected ? "#06B6D4" : "#0EA5E9",
            shadowOpacity: isSelected ? 0.12 : 0.05,
            shadowRadius: isSelected ? 8 : 5,
            shadowOffset: { width: 0, height: 2 },
            elevation: isSelected ? 3 : 2,
          }}
        >
          <Text
            className={`text-base font-Inter_Medium ${
              isSelected ? "text-white" : "text-[#1F2937]"
            }`}
          >
            {label}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Badge */}
          <View className="self-start bg-[#EFF6FF] rounded-full px-3 py-1 mb-5">
            <Text className="text-[#60A5FA] text-[11px] font-Inter_SemiBold tracking-wide">
              Outlets
            </Text>
          </View>

          {/* Title */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="pt-2 pb-5"
          >
            <Text className="text-2xl font-Inter_Bold text-[#1F2937]">
              Electrical specifications
            </Text>
          </Animated.View>

          {/* Amps */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="mb-3"
          >
            <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
              How many amps do you need?
            </Text>
          </Animated.View>

          {ampOptions.map((amp, index) =>
            renderOptionCard(String(amp), index, selectedAmp === amp, () =>
              dispatch(setDedicatedAmp(selectedAmp === amp ? null : amp)),
            ),
          )}

          {/* Volts */}
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="mt-4 mb-3"
          >
            <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
              How many volts do you need?
            </Text>
          </Animated.View>

          {voltOptions.map((volt, index) =>
            renderOptionCard(
              volt,
              ampOptions.length + index,
              selectedVolt === volt,
              () =>
                dispatch(setDedicatedVolt(selectedVolt === volt ? null : volt)),
            ),
          )}

          {/* NEMA */}
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
                  <Text className="text-base font-Inter_SemiBold text-[#1F2937]">
                    What is the NEMA configuration?
                  </Text>
                  <Pressable
                    onPress={() => setIsVisiable(true)}
                    className="h-4 w-4 rounded-full border border-[#60A5FA] justify-center items-center"
                  >
                    <Text className="text-[#60A5FA] font-Inter_Bold">i</Text>
                  </Pressable>
                </View>

                <Text
                  className="font-Inter_Regular"
                  style={{ fontSize: 12, color: "#94A3B8", marginBottom: 10 }}
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
                    onChangeText={(v) => dispatch(setDedicatedNemaConfig(v))}
                    onFocus={() => setNemaFocused(true)}
                    onBlur={() => setNemaFocused(false)}
                    placeholder="14-50, 6-50, 14-30, unsure, etc."
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

                {isvisiable && (
                  <View
                    className="mt-3 rounded-2xl overflow-hidden"
                    style={{
                      borderWidth: 1,
                      borderColor: "#BAE6FD",
                      shadowColor: "#0EA5E9",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 8,
                      elevation: 3,
                    }}
                  >
                    <View
                      className="flex-row items-center justify-between px-4 py-3"
                      style={{ backgroundColor: "#EEF9FF" }}
                    >
                      <Text className="text-lg font-Inter_SemiBold text-[#0369A1]" />
                      <Pressable
                        onPress={() => setIsVisiable(false)}
                        className="w-[26px] h-[26px] rounded-full items-center justify-center"
                        style={{ backgroundColor: "#BAE6FD" }}
                      >
                        <Ionicons name="close" size={14} color="#0369A1" />
                      </Pressable>
                    </View>

                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      bounces={false}
                      style={{ backgroundColor: "#F0F9FF", maxHeight: 900 }}
                    >
                      <CustomSvg
                        xml={nemaChart}
                        width={screenWidth - 78}
                        height={800}
                      />
                    </ScrollView>
                  </View>
                )}
              </Animated.View>
            );
          })()}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OutletsDedicatedCircuitSt3;
