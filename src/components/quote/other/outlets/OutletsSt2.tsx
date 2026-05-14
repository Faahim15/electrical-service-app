import { nemaChart } from "@/assets/images/svg/tabs-svg";
import CustomSvg from "@/src/components/shared/CustomSvg";
import { useImagePicker } from "@/src/hook/useImagePicker";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import UploadArea from "../share/UploadArea";

const AMPS = ["15", "20", "30", "50"];
const VOLTS = ["110 or 120", "220 or 240", "110/220 or 120/240"];

const OutletsSt2 = () => {
  const { width: screenWidth } = useWindowDimensions();
  const outletImages = useImagePicker();
  const [installType, setInstallType] = useState("New install");
  const [selectedAmp, setSelectedAmp] = useState("15");
  const [selectedVolt, setSelectedVolt] = useState("110 or 120");
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [isvisiable, setIsVisiable] = useState(false);
  const installAnims = useRef(
    ["New install", "Replacement"].map(() => new Animated.Value(1)),
  ).current;
  const ampAnims = useRef(AMPS.map(() => new Animated.Value(1))).current;
  const voltAnims = useRef(VOLTS.map(() => new Animated.Value(1))).current;
  const continueAnim = useRef(new Animated.Value(1)).current;

  const animatePressIn = (anim: Animated.Value) => {
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 0.95,
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

  const handlePickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please allow access to your photo library.",
        );
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPickedImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 " showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}

        <View className="self-start bg-[#EFF6FF] rounded-full px-3 py-1 mb-5">
          <Text className="text-[#60A5FA] text-[11px] font-Inter_SemiBold tracking-wide">
            Outlets
          </Text>
        </View>

        <Text className="font-Inter_Bold text-2xl text-gray-900 mb-5">
          Installation type
        </Text>

        <Text className="font-Inter_SemiBold text-gray-800 text-sm mb-3">
          Is this a new install or replacement?
        </Text>

        {/* Install Type */}
        {["New install", "Replacement"].map((item, index) => {
          const isSelected = installType === item;
          return (
            <Animated.View
              key={item}
              style={{ transform: [{ scale: installAnims[index] }] }}
            >
              <TouchableOpacity
                onPress={() => {
                  animatePressIn(installAnims[index]);
                  setInstallType(item);
                }}
                activeOpacity={0.85}
                className="mb-2 rounded-xl border px-4 py-4"
                style={{
                  backgroundColor: isSelected ? "#60A5FA" : "#ffffff",
                  borderColor: isSelected ? "#60A5FA" : "#E5E7EB",
                }}
              >
                <Text
                  className={`font-Inter_Medium text-sm ${
                    isSelected ? "text-white" : "text-gray-700"
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        {/* Photo Upload */}
        <UploadArea
          tittle="Please upload photos of where the outlet(s) will be installed."
          images={outletImages.images}
          pickImage={outletImages.pickImage}
          onRemove={outletImages.onRemove}
        />

        {/* Amps */}
        {installType === "New install" && (
          <>
            <Text className="font-Inter_SemiBold text-gray-800 text-sm mt-5 mb-3">
              How many Amps?
            </Text>
            {AMPS.map((amp, index) => {
              const isSelected = selectedAmp === amp;
              return (
                <Animated.View
                  key={amp}
                  style={{ transform: [{ scale: ampAnims[index] }] }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      animatePressIn(ampAnims[index]);
                      setSelectedAmp(amp);
                    }}
                    activeOpacity={0.85}
                    className="mb-2 rounded-xl border px-4 py-4"
                    style={{
                      backgroundColor: isSelected ? "#60A5FA" : "#ffffff",
                      borderColor: isSelected ? "#60A5FA" : "#E5E7EB",
                    }}
                  >
                    <Text
                      className={`font-Inter_Medium text-sm ${
                        isSelected ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {amp}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}

            {/* Volts */}
            <Text className="font-Inter_SemiBold text-gray-800 text-sm mt-5 mb-3">
              How many amps/volts do you need?
            </Text>
            {VOLTS.map((volt, index) => {
              const isSelected = selectedVolt === volt;
              return (
                <Animated.View
                  key={volt}
                  style={{ transform: [{ scale: voltAnims[index] }] }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      animatePressIn(voltAnims[index]);
                      setSelectedVolt(volt);
                    }}
                    activeOpacity={0.85}
                    className="mb-2 rounded-xl border px-4 py-4"
                    style={{
                      backgroundColor: isSelected ? "#60A5FA" : "#ffffff",
                      borderColor: isSelected ? "#60A5FA" : "#E5E7EB",
                    }}
                  >
                    <Text
                      className={`font-Inter_Medium text-sm ${
                        isSelected ? "text-white" : "text-gray-700"
                      }`}
                    >
                      {volt}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}

            {/* NEMA */}

            <Pressable onPress={() => setIsVisiable(true)}>
              <Text className="font-Inter_SemiBold text-gray-800 text-sm mt-5 mb-4">
                What is the NEMA configuration for the receptacle (if there will
                be one)? <Text style={{ color: "#60A5FA" }}>ⓘ</Text>
              </Text>
            </Pressable>

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
                {/* Header */}
                <View
                  className="flex-row items-center justify-between px-4 py-3"
                  style={{ backgroundColor: "#EEF9FF" }}
                >
                  <Text className="text-lg font-Inter_SemiBold text-[#0369A1]">
                    {/* NEMA Configuration Chart */}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsVisiable(false)}
                    className="w-[26px] h-[26px] rounded-full items-center justify-center"
                    style={{ backgroundColor: "#BAE6FD" }}
                  >
                    <Ionicons name="close" size={14} color="#0369A1" />
                  </TouchableOpacity>
                </View>

                {/* SVG — full width, scrollable vertically */}
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  style={{ backgroundColor: "#F0F9FF", maxHeight: 900 }}
                >
                  <CustomSvg
                    xml={nemaChart}
                    width={screenWidth - 48}
                    height={800}
                  />
                </ScrollView>
              </View>
            )}
          </>
        )}

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
};

export default OutletsSt2;
