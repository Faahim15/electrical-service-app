import {
  addDishPhotos,
  setDishLocationp,
  setHasMounting,
} from "@/src/redux/slices/globalstore/StarlinkDataSlice";
import { setDishLocation } from "@/src/redux/slices/starlinkTheRouteSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PhotoUploadSection from "../../PhotoUploadSection";

const OptionRow = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const bgAnim = useRef(new Animated.Value(selected ? 1 : 0)).current;
  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: selected ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [selected]);
  const bg = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ffffff", "#60A5FA"],
  });
  const textColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#1F2937", "#ffffff"],
  });
  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={{
          backgroundColor: bg,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: selected ? "#60A5FA" : "#E5E7EB",
          paddingVertical: 14,
          paddingHorizontal: 16,
          marginBottom: 10,
        }}
      >
        <Animated.Text
          style={{ color: textColor }}
          className="text-base font-Inter_Regular"
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};

const LOCATION_OPTIONS = [
  { label: "Roof", value: "roof" as const },
  { label: "Eave", value: "eave" as const },
  { label: "Ground", value: "ground" as const },
];

const StarlinkSt2 = () => {
  const dispatch = useDispatch<AppDispatch>();

  const dishLocation = useSelector(
    (state: RootState) => state.starlinkData.dishLocation,
  );
  const hasMounting = useSelector(
    (state: RootState) => state.starlinkData.hasMounting,
  );
  const dishPhotos = useSelector(
    (state: RootState) => state.starlinkData.dishPhotos,
  );

  const showUpload = dishLocation === "roof" || dishLocation === "eave";

  return (
    <View className="flex-1">
      <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full w-24">
        <Text className="text-sm font-Inter_Medium text-[#60A5FA]">
          Starlink
        </Text>
      </View>

      <Text className="text-2xl font-Inter_Bold text-[#1F2937] mb-2">
        Dish location
      </Text>
      <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-5">
        Where would you like the user terminal / dish installed?
      </Text>

      {LOCATION_OPTIONS.map(({ label, value }) => (
        <OptionRow
          key={value}
          label={label}
          selected={dishLocation === value}
          onPress={() => {
            dispatch(setDishLocation(value));
            dispatch(setDishLocationp(value));
          }}
        />
      ))}

      {dishLocation !== "ground" && dishLocation !== null && (
        <Animated.View>
          <Text className="text-base font-Inter_SemiBold text-[#1F2937] mt-4 mb-3">
            Do you have the mounting equipment?
          </Text>
          <OptionRow
            label="Yes"
            selected={hasMounting === "yes"}
            onPress={() => dispatch(setHasMounting("yes"))}
          />
          <OptionRow
            label="No"
            selected={hasMounting === "no"}
            onPress={() => dispatch(setHasMounting("no"))}
          />
        </Animated.View>
      )}

      {showUpload && (
        <PhotoUploadSection
          label="Upload photo from ground of area to install user terminal / dish"
          photos={dishPhotos}
          onPhotosChange={(newPhotos) =>
            dispatch(
              addDishPhotos(newPhotos.filter((p) => !dishPhotos.includes(p))),
            )
          }
        />
      )}
    </View>
  );
};

export default StarlinkSt2;
