import { Feather } from "@expo/vector-icons";
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

// ─── Upload Card ───────────────────────────────────────────────────────────────
const UploadCard = ({
  description,
  images,
  onPickImage,
  onRemove,
  delay = 0,
}: {
  description: string;
  images: string[];
  onPickImage: () => void;
  onRemove: (uri: string) => void;
  delay?: number;
}) => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        delay,
        speed: 20,
        bounciness: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{ opacity: opacityAnim, transform: [{ scale: scaleAnim }] }}
      className="bg-white rounded-2xl p-6 mb-5 shadow-sm"
    >
      <View className="items-center mb-4">
        {/* Icon */}
        <View className="w-12 h-12 bg-[#EFF6FF] rounded-full items-center justify-center mb-4">
          <Feather name="upload" size={22} color="#60A5FA" />
        </View>

        {/* Description */}
        <Text className="text-[#1F2937] text-sm font-Inter_Regular text-center leading-5 mb-4">
          {description}
        </Text>

        {/* Choose File Button */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPickImage}
          className="bg-[#EFF6FF] rounded-2xl px-7 py-2.5"
        >
          <Text className="text-[#60A5FA] text-sm font-Inter_SemiBold">
            Choose File
          </Text>
        </TouchableOpacity>
      </View>

      {/* Preview Grid */}
      {images.length > 0 && (
        <View className="flex-row flex-wrap gap-2 mt-2">
          {images.map((uri) => (
            <View
              key={uri}
              className="relative w-[88px] h-[88px] rounded-xl overflow-hidden"
            >
              <Image
                source={{ uri }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <TouchableOpacity
                onPress={() => onRemove(uri)}
                activeOpacity={0.8}
                className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full items-center justify-center"
              >
                <Feather name="x" size={11} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

// ─── Main Screen ───────────────────────────────────────────────────────────────
const DedicatedCircuitSt4 = () => {
  const [notes, setNotes] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [meterImages, setMeterImages] = useState<string[]>([]);
  const [pathImages, setPathImages] = useState<string[]>([]);

  const titleAnim = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(-12)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.spring(titleY, {
        toValue: 0,
        speed: 20,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const pickImage = async (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please allow access to your photo library.",
        );
        return;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.85,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uris = result.assets.map((a) => a.uri);
      setter((prev) => [...prev, ...uris]);
    }
  };

  const removeImage = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    uri: string,
  ) => {
    setter((prev) => prev.filter((u) => u !== uri));
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Badge + Title */}
      <Animated.View
        style={{ opacity: titleAnim, transform: [{ translateY: titleY }] }}
      >
        <View className="self-start bg-[#EFF6FF] rounded-full px-3 py-1 mb-5">
          <Text className="text-[#60A5FA] text-[11px] font-Inter_SemiBold tracking-wide ">
            Dedicated Circuit
          </Text>
        </View>

        <Text
          style={{ fontSize: 26, color: "#111827", marginBottom: 24 }}
          className="font-Inter_Bold"
        >
          Photos Upload
        </Text>
      </Animated.View>

      {/* Upload Card 1 – Meter */}
      <UploadCard
        description="Upload photos of your electrical meter (up close so we can see the numbers and about 10 ft away.)"
        images={meterImages}
        onPickImage={() => pickImage(setMeterImages)}
        onRemove={(uri) => removeImage(setMeterImages, uri)}
        delay={150}
      />

      {/* Upload Card 2 – Path */}
      <UploadCard
        description="Upload a photo showing path from panel to install location"
        images={pathImages}
        onPickImage={() => pickImage(setPathImages)}
        onRemove={(uri) => removeImage(setPathImages, uri)}
        delay={260}
      />
    </ScrollView>
  );
};

export default DedicatedCircuitSt4;
