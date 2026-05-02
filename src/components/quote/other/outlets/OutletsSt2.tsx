import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AMPS = ["15", "20", "30", "50"];
const VOLTS = ["110 or 120", "220 or 240", "110/220 or 120/240"];

const OutletsSt2 = () => {
  const [installType, setInstallType] = useState("New install");
  const [selectedAmp, setSelectedAmp] = useState("15");
  const [selectedVolt, setSelectedVolt] = useState("110 or 120");
  const [pickedImage, setPickedImage] = useState<string | null>(null);

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
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}
        <View className="mt-4 mb-2">
          <View
            className="self-start px-3 py-1 rounded-full border"
            style={{ borderColor: "#06B6D4" }}
          >
            <Text
              className="font-Inter_Medium text-xs"
              style={{ color: "#06B6D4" }}
            >
              Outlets
            </Text>
          </View>
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
                  backgroundColor: isSelected ? "#06B6D4" : "#ffffff",
                  borderColor: isSelected ? "#06B6D4" : "#E5E7EB",
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
        <TouchableOpacity
          onPress={handlePickImage}
          activeOpacity={0.8}
          className="mt-4 rounded-2xl border border-dashed border-gray-300 bg-gray-50 items-center justify-center py-6 px-4"
        >
          {pickedImage ? (
            <View className="items-center w-full">
              <Image
                source={{ uri: pickedImage }}
                className="w-full rounded-xl"
                style={{ height: 160, resizeMode: "cover" }}
              />
              <Text className="font-Inter_Medium text-cyan-500 text-sm mt-2">
                Tap to change photo
              </Text>
            </View>
          ) : (
            <>
              <Text className="text-2xl text-gray-400 mb-2">⬆</Text>
              <Text className="font-Inter_Regular text-gray-500 text-sm text-center">
                Please upload photos of where the outlet(s) will be installed
              </Text>
              <Text
                className="font-Inter_Medium text-sm mt-2"
                style={{ color: "#06B6D4" }}
              >
                Choose File
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Amps */}
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
                  backgroundColor: isSelected ? "#06B6D4" : "#ffffff",
                  borderColor: isSelected ? "#06B6D4" : "#E5E7EB",
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
                  backgroundColor: isSelected ? "#06B6D4" : "#ffffff",
                  borderColor: isSelected ? "#06B6D4" : "#E5E7EB",
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
        <Text className="font-Inter_SemiBold text-gray-800 text-sm mt-5 mb-4">
          What is the NEMA configuration for the receptacle (if there will be
          one)? <Text style={{ color: "#06B6D4" }}>ⓘ</Text>
        </Text>

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
};

export default OutletsSt2;
