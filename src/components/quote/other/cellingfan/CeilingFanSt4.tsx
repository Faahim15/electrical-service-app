import { MaterialCommunityIcons } from "@expo/vector-icons";
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

const CeilingFanSt4 = () => {
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

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Badge */}
      <Animated.View
        style={{ opacity: titleAnim, transform: [{ translateY: titleY }] }}
      >
        <View className="mt-4 mb-3">
          <View className="self-start bg-blue-50 rounded-full px-3 py-1 mb-5 border border-blue-100">
            <Text className="font-Inter_SemiBold text-[11px] text-[#60A5FA] tracking-wide">
              Cilling Fans
            </Text>
          </View>
        </View>
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
          placeholder="Any additional information you feel we should know for your quote"
          placeholderTextColor={"#9CA3AF"}
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
    </ScrollView>
  );
};

export default CeilingFanSt4;
