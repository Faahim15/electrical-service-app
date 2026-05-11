import { useImagePicker } from "@/src/hook/useImagePicker";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import UploadArea from "../share/UploadArea";

type YesNo = "yes" | "no" | null;

const CeilingFanSt2 = () => {
  const [providingFan, setProvidingFan] = useState<YesNo>(null);
  const [fanDescription, setFanDescription] = useState("");
  const [ceilingHeight, setCeilingHeight] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const CellingImages1 = useImagePicker();

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

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access photos is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
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
      <TouchableOpacity
        onPress={() => animatePress(animKey, onPress)}
        className={`w-full py-3 px-4 rounded-lg mb-2 border ${
          isSelected
            ? "bg-[#60A5FA] border-[#60A5FA]"
            : "bg-white border-gray-200"
        }`}
        activeOpacity={0.85}
      >
        <Text
          className={`text-sm text-center ${
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
        <View className=" ">
          <View className="self-start bg-blue-50 rounded-full px-3 py-1 mb-5 border border-blue-100">
            <Text className="font-Inter_SemiBold text-[11px] text-[#60A5FA] tracking-wide">
              Ceiling Fans
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text className="text-xl font-Inter_Bold text-gray-900 mb-1">
          Fan details
        </Text>
        <Text className="text-base text-[#1F2937] font-Inter_Medium mb-4">
          Will you be providing the new ceiling fan?
        </Text>

        <SelectButton
          label="Yes"
          isSelected={providingFan === "yes"}
          onPress={() => setProvidingFan("yes")}
          animKey="fan_yes"
        />
        <SelectButton
          label="No"
          isSelected={providingFan === "no"}
          onPress={() => setProvidingFan("no")}
          animKey="fan_no"
        />

        {/* Photo Upload */}
        {providingFan === "yes" && (
          <UploadArea
            tittle="Please upload a photo of your new ceiling fan"
            images={CellingImages1.images}
            pickImage={CellingImages1.pickImage}
            onRemove={CellingImages1.onRemove}
          />
        )}

        {/* Fan description */}
        {providingFan !== "yes" && (
          <View>
            <Text className="text-base text-[#1F2937] font-Inter_Medium  mt-4">
              Please describe the fan you want
            </Text>
            <TextInput
              value={fanDescription}
              onChangeText={setFanDescription}
              placeholder="Color, size, etc."
              placeholderTextColor="#9CA3AF"
              className="border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm text-gray-700 font-Inter_Regular mb-4 h-32"
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        )}

        {/* Ceiling height */}
        <Text className="text-base text-[#1F2937] font-Inter_Medium my-2">
          How tall is the ceiling where the fan will be installed?
        </Text>
        <TextInput
          value={ceilingHeight}
          onChangeText={setCeilingHeight}
          placeholder="E.g., 8 feet"
          placeholderTextColor="#9CA3AF"
          className="border border-gray-200 bg-white rounded-lg px-4 py-3 text-sm text-gray-700 font-Inter_Regular"
        />
      </ScrollView>
    </View>
  );
};

export default CeilingFanSt2;
