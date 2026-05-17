import { setPhotos } from "@/src/redux/slices/globalstore/wholeHomeDataSlice";
import { RootState } from "@/src/redux/store";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PhotoUploadSection from "../../PhotoUploadSection";

const WholeHomeSt1 = () => {
  const dispatch = useDispatch();
  const photos = useSelector((state: RootState) => state.wholeHomeData.photos);

  const breadcrumbAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(0)).current;
  const notesAnim = useRef(new Animated.Value(0)).current;

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
        <PhotoUploadSection
          label="Upload photos of your electrical panel up close so we can see the breakers/panel label and about 10 ft away"
          photos={photos}
          onPhotosChange={(newPhotos) => dispatch(setPhotos(newPhotos))}
        />
      </Animated.View>
    </ScrollView>
  );
};

export default WholeHomeSt1;
