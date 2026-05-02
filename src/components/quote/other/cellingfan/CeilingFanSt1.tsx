import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type InstallationType = "replacement" | "new_install" | null;
type SpaceType =
  | "attic_above"
  | "occupied_above"
  | "crawlspace_unfinished"
  | "crawlspace_encapsulated"
  | "basement_unfinished"
  | "basement_finished"
  | null;
type YesNo = "yes" | "no" | null;
type YesNoUnsure = "yes" | "no" | "unsure" | null;

const CeilingFanSt1 = () => {
  const [installationType, setInstallationType] =
    useState<InstallationType>(null);
  const [spaceType, setSpaceType] = useState<SpaceType>(null);
  const [hasLightFixture, setHasLightFixture] = useState<YesNo>(null);
  const [preWired, setPreWired] = useState<YesNoUnsure>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const scaleAnims = useRef<{ [key: string]: Animated.Value }>({}).current;

  const getAnim = (key: string) => {
    if (!scaleAnims[key]) {
      scaleAnims[key] = new Animated.Value(1);
    }
    return scaleAnims[key];
  };

  const animatePress = (key: string, callback?: () => void) => {
    const anim = getAnim(key);
    Animated.sequence([
      Animated.timing(anim, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(anim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access photos is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const SelectButton = ({
    label,
    isSelected,
    onPress,
    animKey,
  }: {
    label: string;
    isSelected: boolean;
    onPress: () => void;
    animKey: string;
  }) => (
    <Animated.View style={{ transform: [{ scale: getAnim(animKey) }] }}>
      <TouchableOpacity
        onPress={() => {
          animatePress(animKey, onPress);
        }}
        className={`w-full py-3 px-4 rounded-lg mb-2 border ${
          isSelected
            ? "bg-cyan-500 border-cyan-500"
            : "bg-white border-gray-200"
        }`}
        activeOpacity={0.85}
      >
        <Text
          className={`text-sm text-center ${
            isSelected
              ? "text-white font-Inter_SemiBold"
              : "text-gray-700 font-Inter_Regular"
          }`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View className="flex-1 ">
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Category tag */}
        <View className="mt-3 mb-4">
          <Text className="text-xs text-cyan-500 font-Inter_Medium">
            Ceiling Fans
          </Text>
        </View>

        {/* Title */}
        <Text className="text-xl font-Inter_Bold text-gray-900 mb-1">
          Installation type
        </Text>
        <Text className="text-sm text-gray-500 font-Inter_Regular mb-4">
          Is this a replacement or new install?
        </Text>

        <SelectButton
          label="Replacement"
          isSelected={installationType === "replacement"}
          onPress={() => setInstallationType("replacement")}
          animKey="replacement"
        />
        <SelectButton
          label="New install"
          isSelected={installationType === "new_install"}
          onPress={() => setInstallationType("new_install")}
          animKey="new_install"
        />

        {/* Photo Upload */}
        <View className="mt-5 mb-4 items-center">
          <TouchableOpacity
            onPress={pickImage}
            className="items-center"
            activeOpacity={0.8}
          >
            {photoUri ? (
              <Image
                source={{ uri: photoUri }}
                className="w-28 h-28 rounded-xl mb-2"
                resizeMode="cover"
              />
            ) : (
              <View className="w-16 h-16 items-center justify-center mb-2">
                <Text className="text-4xl text-gray-300">⬆</Text>
              </View>
            )}
            <Text className="text-xs text-gray-400 font-Inter_Regular text-center mb-3">
              Please upload a photo of your{"\n"}current ceiling fan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pickImage}
            className="border border-gray-300 rounded-lg px-6 py-2"
            activeOpacity={0.8}
          >
            <Text className="text-sm text-gray-600 font-Inter_Medium">
              Choose File
            </Text>
          </TouchableOpacity>
        </View>

        {/* Space above */}
        <Text className="text-sm text-gray-500 font-Inter_Regular mb-3 mt-2">
          What is above / below the area the ceiling fan will be installed?
        </Text>

        {(
          [
            { key: "attic_above", label: "Attic above" },
            { key: "occupied_above", label: "Occupied space above" },
            { key: "crawlspace_unfinished", label: "Crawlspace (unfinished)" },
            {
              key: "crawlspace_encapsulated",
              label: "Crawlspace (encapsulated)",
            },
            { key: "basement_unfinished", label: "Basement (unfinished)" },
            { key: "basement_finished", label: "Basement (finished)" },
          ] as { key: SpaceType; label: string }[]
        ).map((item) => (
          <SelectButton
            key={item.key!}
            label={item.label}
            isSelected={spaceType === item.key}
            onPress={() => setSpaceType(item.key)}
            animKey={`space_${item.key}`}
          />
        ))}

        {/* Light fixture */}
        <Text className="text-sm text-gray-500 font-Inter_Regular mb-3 mt-4">
          Is there a current light fixture where you want the fan installed?
        </Text>
        <SelectButton
          label="Yes"
          isSelected={hasLightFixture === "yes"}
          onPress={() => setHasLightFixture("yes")}
          animKey="light_yes"
        />
        <SelectButton
          label="No"
          isSelected={hasLightFixture === "no"}
          onPress={() => setHasLightFixture("no")}
          animKey="light_no"
        />

        {/* Pre-wired */}
        <Text className="text-sm text-gray-500 font-Inter_Regular mb-3 mt-4">
          Was the area prewired for a ceiling fan?
        </Text>
        <SelectButton
          label="Yes"
          isSelected={preWired === "yes"}
          onPress={() => setPreWired("yes")}
          animKey="pre_yes"
        />
        <SelectButton
          label="No"
          isSelected={preWired === "no"}
          onPress={() => setPreWired("no")}
          animKey="pre_no"
        />
        <SelectButton
          label="I'm not sure"
          isSelected={preWired === "unsure"}
          onPress={() => setPreWired("unsure")}
          animKey="pre_unsure"
        />
      </ScrollView>
    </View>
  );
};

export default CeilingFanSt1;
