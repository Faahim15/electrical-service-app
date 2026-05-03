import { MaterialCommunityIcons } from "@expo/vector-icons";
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

const SwitchesSt2 = () => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
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
    <View className="flex-1 ">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}
        <View className="mt-4 mb-3">
          <View
            className="self-start px-3 py-1 rounded-full border"
            style={{ borderColor: "#06B6D4" }}
          >
            <Text
              className="font-Inter_Medium text-xs"
              style={{ color: "#06B6D4" }}
            >
              Switches
            </Text>
          </View>
        </View>

        <Text className="font-Inter_Bold text-2xl text-gray-900 mb-5">
          Photos
        </Text>

        {/* Photo Upload */}
        <TouchableOpacity
          onPress={handlePickImage}
          activeOpacity={0.8}
          className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 items-center justify-center py-10 px-4"
        >
          {pickedImage ? (
            <View className="items-center w-full">
              <Image
                source={{ uri: pickedImage }}
                className="w-full rounded-xl"
                style={{ height: 180, resizeMode: "cover" }}
              />
              <Text
                className="font-Inter_Medium text-sm mt-3"
                style={{ color: "#06B6D4" }}
              >
                Tap to change photo
              </Text>
            </View>
          ) : (
            <>
              <MaterialCommunityIcons
                name="file-image-plus-outline"
                size={24}
                color="#06B6D4"
              />

              <Text className="font-Inter_Regular text-gray-500 text-sm text-center mb-2">
                Please upload a photo of where the switch(es) will be installed
              </Text>
              <Text
                className="font-Inter_Medium text-sm"
                style={{ color: "#06B6D4" }}
              >
                Choose File
              </Text>
            </>
          )}
        </TouchableOpacity>

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
};

export default SwitchesSt2;
