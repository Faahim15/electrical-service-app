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
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const UploadCard = ({
  description,
  image,
  onPickImage,
  delay = 0,
}: {
  description: string;
  image: string | null;
  onPickImage: () => void;
  delay?: number;
}) => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

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

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(btnScale, {
        toValue: 0.94,
        useNativeDriver: true,
        speed: 50,
        bounciness: 0,
      }),
      Animated.spring(btnScale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 30,
        bounciness: 8,
      }),
    ]).start();
    onPickImage();
  };

  return (
    <Animated.View
      className="bg-white rounded-2xl p-4 mb-3 border border-gray-100"
      style={{
        opacity: opacityAnim,
        transform: [{ scale: scaleAnim }],
        shadowColor: "#06B6D4",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
        backgroundColor: "white",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
      }}
    >
      {image ? (
        <View className="items-center">
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 12,
              marginBottom: 12,
            }}
            resizeMode="cover"
          />
          <Text
            className="text-center text-gray-600 text-sm font-Inter_Regular mb-3"
            style={{ paddingHorizontal: 8 }}
          >
            {description}
          </Text>
          <AnimatedTouchable
            activeOpacity={0.8}
            onPress={handlePress}
            style={{ transform: [{ scale: btnScale }] }}
          >
            <View
              style={{
                backgroundColor: "#EFF6FF",
                borderRadius: 999,
                paddingHorizontal: 24,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor: "#06B6D4",
              }}
            >
              <Text
                style={{ color: "#06B6D4", fontSize: 14 }}
                className="font-Inter_Medium"
              >
                Change File
              </Text>
            </View>
          </AnimatedTouchable>
        </View>
      ) : (
        <View className="items-center py-4">
          {/* Upload icon */}
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 999,
              backgroundColor: "#EFF6FF",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 12,
            }}
          >
            <MaterialCommunityIcons
              name="file-image-plus-outline"
              size={24}
              color="#4b5563"
            />
          </View>

          <Text
            className="text-center text-gray-700 text-sm font-Inter_Regular mb-4"
            style={{ paddingHorizontal: 12, lineHeight: 20 }}
          >
            {description}
          </Text>

          <AnimatedTouchable
            activeOpacity={0.8}
            onPress={handlePress}
            style={{ transform: [{ scale: btnScale }] }}
          >
            <View
              style={{
                backgroundColor: "#EFF6FF",
                borderRadius: 999,
                paddingHorizontal: 24,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor: "#BAE6FD",
              }}
            >
              <Text
                style={{ color: "#06B6D4", fontSize: 14 }}
                className="font-Inter_Medium"
              >
                Choose File
              </Text>
            </View>
          </AnimatedTouchable>
        </View>
      )}
    </Animated.View>
  );
};

const DedicatedCircuitSt4 = () => {
  const [notes, setNotes] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [meterImage, setMeterImage] = useState<string | null>(null);
  const [pathImage, setPathImage] = useState<string | null>(null);

  const titleAnim = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(-12)).current;
  const btnScale = useRef(new Animated.Value(1)).current;

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

  const pickImage = async (setter: (uri: string | null) => void) => {
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
      allowsEditing: true,
      quality: 0.85,
    });

    if (!result.canceled && result.assets.length > 0) {
      setter(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#EFF6FF" }}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Badge */}
      <Animated.View
        style={{ opacity: titleAnim, transform: [{ translateY: titleY }] }}
      >
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: "#E0F2FE",
            borderRadius: 999,
            paddingHorizontal: 12,
            paddingVertical: 4,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: "#BAE6FD",
          }}
        >
          <Text
            style={{ color: "#06B6D4", fontSize: 12 }}
            className="font-Inter_Medium"
          >
            Dedicated Circuit
          </Text>
        </View>

        {/* Title */}
        <Text
          style={{ fontSize: 26, color: "#111827", marginBottom: 24 }}
          className="font-Inter_Bold"
        >
          Photos and notes
        </Text>
      </Animated.View>

      {/* Additional Information */}
      <Animated.View style={{ opacity: titleAnim }}>
        <Text
          style={{ fontSize: 15, color: "#111827", marginBottom: 10 }}
          className="font-Inter_Bold"
        >
          Additional Information
        </Text>

        <TextInput
          multiline
          numberOfLines={5}
          value={notes}
          onChangeText={setNotes}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 14,
            minHeight: 110,
            textAlignVertical: "top",
            fontSize: 15,
            color: "#1F2937",
            borderWidth: 1.5,
            borderColor: inputFocused ? "#06B6D4" : "#E5E7EB",
            marginBottom: 16,
            shadowColor: "#06B6D4",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: inputFocused ? 0.1 : 0.04,
            shadowRadius: 6,
            elevation: inputFocused ? 2 : 1,
          }}
          className="font-Inter_Regular"
        />
      </Animated.View>

      {/* Upload Card 1 – Meter */}
      <UploadCard
        description="Upload photos of your electrical meter (up close so we can see the numbers and about 10 ft away.)"
        image={meterImage}
        onPickImage={() => pickImage(setMeterImage)}
        delay={150}
      />

      {/* Upload Card 2 – Path */}
      <UploadCard
        description="Upload a photo showing path from panel to install location"
        image={pathImage}
        onPickImage={() => pickImage(setPathImage)}
        delay={260}
      />
    </ScrollView>
  );
};

export default DedicatedCircuitSt4;
