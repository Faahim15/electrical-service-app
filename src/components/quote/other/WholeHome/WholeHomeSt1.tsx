import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const WholeHomeSt1 = () => {
  const breadcrumbAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const notesAnim = useRef(new Animated.Value(0)).current;

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const animate = (ref: Animated.Value, delay: number) =>
      Animated.timing(ref, {
        toValue: 1,
        duration: 500,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      });

    Animated.stagger(100, [
      animate(breadcrumbAnim, 0),
      animate(titleAnim, 0),
      animate(subtitleAnim, 0),
      animate(cardAnim, 0),
      animate(notesAnim, 0),
    ]).start();
  }, []);

  const fadeSlideDown = (anim: Animated.Value, offset = -14) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [offset, 0],
        }),
      },
    ],
  });

  const fadeSlideUp = (anim: Animated.Value) => ({
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [14, 0],
        }),
      },
    ],
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map((a) => a.uri);
      setImages((prev) => [...prev, ...uris]);
    }
  };

  const removeImage = (uri: string) => {
    setImages((prev) => prev.filter((img) => img !== uri));
  };

  return (
    <ScrollView
      className="flex-1 "
      contentContainerStyle={{ paddingTop: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Breadcrumb */}
      <Animated.View
        style={fadeSlideDown(breadcrumbAnim)}
        className="self-start bg-[#EFF6FF] px-3 py-2 rounded-full mb-4"
      >
        <Text className="text-[#60A5FA] text-sm font-Inter_Medium">
          Whole Home Surge Protection
        </Text>
      </Animated.View>

      {/* Title */}
      <Animated.Text
        style={fadeSlideDown(titleAnim)}
        className="text-[#1F2937] text-2xl font-Inter_Bold leading-tight mb-2"
      >
        Whole Home Surge{"\n"}Protection
      </Animated.Text>

      {/* Subtitle */}
      <Animated.Text
        style={fadeSlideDown(subtitleAnim)}
        className="text-[#6B7280] text-base font-Inter_Regular mb-5"
      >
        Protect your home from power surges
      </Animated.Text>

      {/* Upload Card */}
      <Animated.View
        style={fadeSlideUp(cardAnim)}
        className="bg-white rounded-2xl p-6 mb-5 shadow-sm"
      >
        {/* Upload prompt area */}
        <View className="items-center mb-4">
          <View className="w-12 h-12 bg-[#EFF6FF] rounded-full items-center justify-center mb-4">
            <Feather name="upload" size={22} color="#60A5FA" />
          </View>
          <Text className="text-[#1F2937] text-sm font-Inter_Regular text-center leading-5 mb-4">
            Upload photos of your electrical panel up close so we can see the
            breakers/panel label and about 10 ft away
          </Text>
          <TouchableOpacity activeOpacity={0.85} onPress={pickImage}>
            <LinearGradient
              colors={["#EFF6FF", "#EFF6FF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ borderRadius: 16 }}
              className="rounded-full px-7 py-2.5"
            >
              <Text className="text-[#60A5FA] text-sm font-Inter_SemiBold">
                Choose File
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Image Preview Grid */}
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
                  onPress={() => removeImage(uri)}
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
    </ScrollView>
  );
};

export default WholeHomeSt1;
