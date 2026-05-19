import {
  selectDedicatedCircuitSt4,
  setElectricalMeterPhotos,
  setPathPhotos,
} from "@/src/redux/slices/globalstore/outletsDataSlice";
import React, { useRef } from "react";
import { Animated, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PhotoUploadSection from "../../PhotoUploadSection";

const OutletsDedicatedCircuitSt4 = () => {
  const dispatch = useDispatch();
  const { electricalMeterPhotos, pathPhotos } = useSelector(
    selectDedicatedCircuitSt4,
  );

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

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
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
          <Text className="text-[#60A5FA] text-[11px] font-Inter_SemiBold tracking-wide">
            Outlets
          </Text>
        </View>

        <Text className="text-2xl font-Inter_Bold text-[#1F2937] mb-4">
          Photos Upload
        </Text>
      </Animated.View>

      {/* Meter photos */}
      <PhotoUploadSection
        label="Upload photos of your electrical meter (up close so we can see the numbers and about 10 ft away.)"
        photos={electricalMeterPhotos}
        onPhotosChange={(p) => dispatch(setElectricalMeterPhotos(p))}
      />

      {/* Path photos */}
      <PhotoUploadSection
        label="Upload a photo showing path from panel to install location"
        photos={pathPhotos}
        onPhotosChange={(p) => dispatch(setPathPhotos(p))}
      />
    </ScrollView>
  );
};

export default OutletsDedicatedCircuitSt4;
