import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, ScrollView, Text, TextInput } from "react-native";

const WholeHomeSt2 = () => {
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

      {/* Additional Notes */}
      <Animated.View style={fadeSlideDown(notesAnim)}>
        <Text className="text-[#1F2937] text-base font-Inter_Bold mb-2.5">
          Additional notes (optional)
        </Text>
        <TextInput
          className="bg-white border mb-8 border-[#E5E7EB] rounded-xl p-3 text-sm font-Inter_Regular text-[#1F2937] h-28"
          placeholder="Any additional information you'd like to sh..."
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
        />
      </Animated.View>
    </ScrollView>
  );
};

export default WholeHomeSt2;
