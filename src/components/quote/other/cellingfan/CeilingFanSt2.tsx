import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type YesNo = "yes" | "no" | null;

const CeilingFanSt2 = () => {
  const [providingFan, setProvidingFan] = useState<YesNo>(null);
  const [fanDescription, setFanDescription] = useState("");
  const [ceilingHeight, setCeilingHeight] = useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);

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
            ? "bg-cyan-500 border-cyan-500"
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
        <View className="mt-3 mb-4">
          <Text className="text-xs text-cyan-500 font-Inter_Medium">
            Ceiling Fans
          </Text>
        </View>

        {/* Title */}
        <Text className="text-xl font-Inter_Bold text-gray-900 mb-1">
          Fan details
        </Text>
        <Text className="text-sm text-gray-500 font-Inter_Regular mb-4">
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
          <View className=" p-6 rounded-xl border border-gray-100 items-center bg-white justify-center items-center">
            <TouchableOpacity
              onPress={pickImage}
              activeOpacity={0.8}
              className=" justify-center items-center"
            >
              {photoUri ? (
                <Image
                  source={{ uri: photoUri }}
                  className="w-28 h-28 rounded-xl mb-2"
                  resizeMode="cover"
                />
              ) : (
                <View className=" items-center justify-center">
                  <MaterialCommunityIcons
                    name="file-image-plus-outline"
                    size={24}
                    color="#4b5563"
                  />
                </View>
              )}
              <Text className="text-xs text-gray-400 font-Inter_Regular text-center mb-3">
                Please upload a photo of your new{"\n"}ceiling fan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={pickImage}
              className="border border-gray-300 rounded-lg px-6 py-2"
              activeOpacity={0.8}
            >
              <Text className="text-sm text-gray-600 font-Inter_Medium">
                Choose File
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Fan description */}
        {providingFan !== "yes" && (
          <View>
            <Text className="text-sm text-gray-500 font-Inter_Regular  mt-4">
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
        <Text className="text-sm text-gray-500 font-Inter_Regular my-2">
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
