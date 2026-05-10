// StarlinkSt2.tsx
import {
  addImages,
  DishLocation,
  MountingAnswer,
  removeImage,
  setDishLocation,
  setHasMounting,
} from "@/src/redux/slices/starlinkTheRouteSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

// ─── OptionRow ────────────────────────────────────────────────────────────────

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
    outputRange: ["#374151", "#ffffff"],
  });

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
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
          style={{
            color: textColor,
            fontFamily: "Inter_Medium",
            fontSize: 15,
          }}
        >
          {label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

// ─── UploadArea ───────────────────────────────────────────────────────────────

const UploadArea = ({
  images,
  pickImage,
  onRemove,
}: {
  images: string[];
  pickImage: () => void;
  onRemove: (uri: string) => void;
}) => (
  <View className="bg-white rounded-2xl p-6 mb-5 shadow-sm">
    <View className="items-center mb-4">
      <View className="w-12 h-12 bg-[#EFF6FF] rounded-full items-center justify-center mb-4">
        <Feather name="upload" size={22} color="#60A5FA" />
      </View>
      <Text className="text-[#1F2937] text-sm font-Inter_Regular text-center leading-5 mb-4">
        Upload photo from ground of area to install user terminal / dish
      </Text>
      <TouchableOpacity activeOpacity={0.85} onPress={pickImage}>
        <LinearGradient
          colors={["#EFF6FF", "#EFF6FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            borderRadius: 16,
            paddingHorizontal: 28,
            paddingVertical: 10,
          }}
        >
          <Text className="text-[#60A5FA] text-sm font-Inter_SemiBold">
            Choose File
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>

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
  </View>
);

// ─── Dish location options ────────────────────────────────────────────────────

const LOCATION_OPTIONS: { label: string; value: DishLocation }[] = [
  { label: "Roof", value: "roof" },
  { label: "Eave", value: "eave" },
  { label: "Ground", value: "ground" },
];

// ─── StarlinkSt2 ─────────────────────────────────────────────────────────────

const StarlinkSt2 = () => {
  const dispatch = useDispatch<AppDispatch>();

  // ✅ Read all values from Redux
  const dishLocation = useSelector(
    (state: RootState) => state.starlinkRoute.dishLocation,
  );
  const hasMounting = useSelector(
    (state: RootState) => state.starlinkRoute.hasMounting,
  );
  const images = useSelector((state: RootState) => state.starlinkRoute.images);

  // ✅ Dispatch location — also resets mounting & images automatically (see slice)
  const handleLocationSelect = (value: DishLocation) => {
    dispatch(setDishLocation(value));
  };

  // ✅ Dispatch mounting answer
  const handleMountingSelect = (value: MountingAnswer) => {
    dispatch(setHasMounting(value));
  };

  // ✅ Pick images and dispatch to Redux
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      const uris = result.assets.map((a) => a.uri);
      dispatch(addImages(uris));
    }
  };

  // ✅ Remove single image from Redux
  const handleRemoveImage = (uri: string) => {
    dispatch(removeImage(uri));
  };

  const showUpload = dishLocation === "roof" || dishLocation === "eave";

  return (
    <View className="flex-1">
      <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full w-24">
        <Text className="text-sm font-Inter_Medium text-[#60A5FA]">
          Starlink
        </Text>
      </View>

      <Text className="text-2xl font-Inter_Bold text-gray-900 mb-2">
        Dish location
      </Text>
      <Text className="text-sm font-Inter_Regular text-gray-600 mb-5">
        Where would you like the user terminal / dish installed?
      </Text>

      {/* ✅ Location options — Roof | Eave | Ground */}
      {LOCATION_OPTIONS.map(({ label, value }) => (
        <OptionRow
          key={value}
          label={label}
          selected={dishLocation === value}
          onPress={() => handleLocationSelect(value)}
        />
      ))}

      {/* ✅ Mounting question — shown once a location is selected */}
      {dishLocation !== "ground" && (
        <Animated.View>
          <Text className="text-sm font-Inter_Medium text-gray-700 mt-4 mb-3">
            Do you have the mounting equipment?
          </Text>
          <OptionRow
            label="Yes"
            selected={hasMounting === "yes"}
            onPress={() => handleMountingSelect("yes")}
          />
          <OptionRow
            label="No"
            selected={hasMounting === "no"}
            onPress={() => handleMountingSelect("no")}
          />
        </Animated.View>
      )}

      {/* ✅ Upload — shown only for Roof or Eave */}
      {showUpload && (
        <UploadArea
          images={images}
          pickImage={pickImage}
          onRemove={handleRemoveImage}
        />
      )}
    </View>
  );
};

export default StarlinkSt2;
