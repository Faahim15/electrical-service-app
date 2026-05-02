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

const OutletsSt3 = () => {
  const [installType, setInstallType] = useState("Replacement");
  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const installAnims = useRef(
    ["New install", "Replacement"].map(() => new Animated.Value(1)),
  ).current;
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

        {/* Photo Upload — current outlets */}
        <TouchableOpacity
          onPress={handlePickImage}
          activeOpacity={0.8}
          className="mt-4 mb-6 rounded-2xl border border-dashed border-gray-300 bg-gray-50 items-center justify-center py-6 px-4"
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
                Please upload photos of your current outlet(s)
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
      </ScrollView>
    </View>
  );
};

export default OutletsSt3;
