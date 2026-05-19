import {
  addElectricalMeterPhotos,
  addPathPhotos,
} from "@/src/redux/slices/globalstore/dedicatedCircuitDataSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import React, { useRef } from "react";
import { Animated, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PhotoUploadSection from "../../PhotoUploadSection";

const DedicatedCircuitSt4 = () => {
  const dispatch = useDispatch<AppDispatch>();

  const electricalMeterPhotos = useSelector(
    (state: RootState) => state.dedicatedCircuitData.electricalMeterPhotos,
  );
  const pathPhotos = useSelector(
    (state: RootState) => state.dedicatedCircuitData.pathPhotos,
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
      contentContainerStyle={{ paddingTop: 24, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={{ opacity: titleAnim, transform: [{ translateY: titleY }] }}
      >
        <View className="self-start bg-[#EFF6FF] rounded-full px-3 py-1 mb-5">
          <Text className="text-[#60A5FA] text-[11px] font-Inter_SemiBold tracking-wide">
            Dedicated Circuit
          </Text>
        </View>
        <Text className="text-2xl font-Inter_Bold text-[#1F2937] mb-4">
          Photos Upload
        </Text>
      </Animated.View>

      <PhotoUploadSection
        label="Upload photos of your electrical meter (up close so we can see the numbers and about 10 ft away.)"
        photos={electricalMeterPhotos}
        onPhotosChange={(newPhotos) =>
          dispatch(
            addElectricalMeterPhotos(
              newPhotos.filter((p) => !electricalMeterPhotos.includes(p)),
            ),
          )
        }
      />

      <PhotoUploadSection
        label="Upload a photo showing path from panel to install location"
        photos={pathPhotos}
        onPhotosChange={(newPhotos) =>
          dispatch(
            addPathPhotos(newPhotos.filter((p) => !pathPhotos.includes(p))),
          )
        }
      />
    </ScrollView>
  );
};

export default DedicatedCircuitSt4;
