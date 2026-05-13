import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────
type InstallType = "New Installation" | "Replacement";
type FanLocation = "Attic" | "Kitchen" | "Bathroom";
type AtticFanType = "Roof fan" | "Gable (wall) fan";
type Stories = "1" | "2";
type PanelLocation =
  | "Basement (Finished)"
  | "Basement (Unfinished)"
  | "Garage (Finished)"
  | "Garage (Unfinished)"
  | "Other";
type YesNo = "Yes" | "No";
type AreaOption =
  | "Attic above"
  | "Occupied space above"
  | "Crawlspace (unfinished)"
  | "Crawlspace (finished)"
  | "Basement (unfinished)"
  | "Basement (finished)"
  | "Other";
type Distance =
  | "Less than 25 ft"
  | "25 – 50 ft"
  | "50 – 100 ft"
  | "More than 100 ft"
  | "Unsure";
type BathroomFanType =
  | "Standard"
  | "Quiet operation"
  | "Bluetooth speaker"
  | "Light/fan combo"
  | "Heater/light fan combo"
  | "Heater/fan (no light) combo";
type SpecialtyControl =
  | "No specialty control"
  | "Speed control"
  | "Humidity sensor"
  | "Timer";
type KitchenFanType =
  | "Hood fan over range / stove"
  | "Over the range microwave"
  | "Through the wall vent"
  | "Through the ceiling (commonly over an Island)";

// ─── Image Picker Hook ────────────────────────────────────────────────────────
const useImagePicker = () => {
  const pickImage = async (onPicked: (uri: string) => void) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photo library.",
        [{ text: "OK" }],
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.85,
      allowsMultipleSelection: false,
    });
    if (!result.canceled && result.assets.length > 0)
      onPicked(result.assets[0].uri);
  };

  const takePhoto = async (onPicked: (uri: string) => void) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow camera access to take photos.",
        [{ text: "OK" }],
      );
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      quality: 0.85,
    });
    if (!result.canceled && result.assets.length > 0)
      onPicked(result.assets[0].uri);
  };

  const showOptions = (onPicked: (uri: string) => void) => {
    Alert.alert("Upload Photo", "Choose a source", [
      { text: "Camera", onPress: () => takePhoto(onPicked) },
      { text: "Photo Library", onPress: () => pickImage(onPicked) },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  return { showOptions };
};

// ─── UploadButton ─────────────────────────────────────────────────────────────
const UploadButton = ({
  label,
  imageUri,
  onImagePicked,
}: {
  label: string;
  imageUri: string | null;
  onImagePicked: (uri: string) => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { showOptions } = useImagePicker();

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        useNativeDriver: true,
        speed: 50,
        bounciness: 0,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 0,
      }),
    ]).start();
    showOptions(onImagePicked);
  };

  if (imageUri) {
    return (
      <Pressable onPress={handlePress} className="mb-3">
        <Animated.View
          style={{ transform: [{ scale: scaleAnim }] }}
          className="rounded-xl overflow-hidden border-[1.5px] border-[#60A5FA] bg-blue-50"
        >
          <Image
            source={{ uri: imageUri }}
            style={{ width: "100%", height: 160 }}
            resizeMode="cover"
          />
          <View className="absolute bottom-0 left-0 right-0 bg-[#60A5FA] py-2 flex-row items-center justify-center gap-1.5">
            <Text className="text-white text-sm">🔄</Text>
            <Text className="font-Inter_SemiBold text-xs text-white">
              Tap to replace
            </Text>
          </View>
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={handlePress} className="mb-3">
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          borderWidth: 1.5,
          borderColor: "#0000001A",
        }}
        className="rounded-xl py-3.5 px-4 flex-row items-center justify-center gap-2 bg-[#ECECF04D]"
      >
        <Feather name="upload" size={13} color="#717182" />
        <Text className="font-Inter_Medium text-[13px] text-[#717182]">
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

// ─── AnimatedOption ───────────────────────────────────────────────────────────
const AnimatedOption = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(bgAnim, {
      toValue: selected ? 1 : 0,
      useNativeDriver: false,
      speed: 20,
      bounciness: 6,
    }).start();
  }, [selected]);

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
        speed: 50,
        bounciness: 0,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 0,
      }),
    ]).start();
    onPress();
  };

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#60A5FA"],
  });
  const borderColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E2E8F0", "#60A5FA"],
  });

  return (
    <Pressable onPress={handlePress} style={{ flex: 1 }}>
      <Animated.View
        style={{
          backgroundColor,
          borderColor,
          borderWidth: 1.5,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{ transform: [{ scale: scaleAnim }] }}
          className="py-3 px-4 items-center justify-center"
        >
          <Text
            className={`text-[13px] text-center ${selected ? "font-Inter_SemiBold text-white" : "font-Inter_Medium text-gray-700"}`}
          >
            {label}
          </Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

// ─── RowOption ────────────────────────────────────────────────────────────────
const RowOption = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(bgAnim, {
      toValue: selected ? 1 : 0,
      useNativeDriver: false,
      speed: 20,
      bounciness: 6,
    }).start();
  }, [selected]);

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.97,
        useNativeDriver: true,
        speed: 50,
        bounciness: 0,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 0,
      }),
    ]).start();
    onPress();
  };

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#60A5FA"],
  });
  const borderColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E2E8F0", "#60A5FA"],
  });

  return (
    <Pressable onPress={handlePress} className="mb-2">
      <Animated.View
        style={{
          backgroundColor,
          borderColor,
          borderWidth: 1.5,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{ transform: [{ scale: scaleAnim }] }}
          className="py-3.5 px-4"
        >
          <Text
            className={`text-[13px] ${selected ? "font-Inter_SemiBold text-white" : "font-Inter_Regular text-gray-700"}`}
          >
            {label}
          </Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

// ─── ChipOption ───────────────────────────────────────────────────────────────
const ChipOption = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(bgAnim, {
      toValue: selected ? 1 : 0,
      useNativeDriver: false,
      speed: 20,
      bounciness: 6,
    }).start();
  }, [selected]);

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.94,
        useNativeDriver: true,
        speed: 50,
        bounciness: 0,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
        bounciness: 0,
      }),
    ]).start();
    onPress();
  };

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#FFFFFF", "#60A5FA"],
  });
  const borderColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E2E8F0", "#60A5FA"],
  });

  return (
    <Pressable onPress={handlePress} className="mr-2 mb-2">
      <Animated.View
        style={{
          backgroundColor,
          borderColor,
          borderWidth: 1.5,
          borderRadius: 50,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{ transform: [{ scale: scaleAnim }] }}
          className="py-2 px-3.5"
        >
          <Text
            className={`text-[12px] ${selected ? "font-Inter_SemiBold text-white" : "font-Inter_Regular text-gray-700"}`}
          >
            {label}
          </Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

// ─── SectionCard ──────────────────────────────────────────────────────────────
const SectionCard = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
    {title ? (
      <Text className="font-Inter_Bold text-[15px] text-gray-900 mb-3">
        {title}
      </Text>
    ) : null}
    {children}
  </View>
);

// ─── Label ────────────────────────────────────────────────────────────────────
const Label = ({ text, sub }: { text: string; sub?: string }) => (
  <View className="mb-2.5">
    <Text className="font-Inter_SemiBold text-[13px] text-slate-800">
      {text}
    </Text>
    {sub ? (
      <Text className="font-Inter_Regular text-[11px] text-slate-500 mt-0.5">
        {sub}
      </Text>
    ) : null}
  </View>
);

// ─── Divider ──────────────────────────────────────────────────────────────────
const Divider = () => <View className="h-px bg-slate-100 my-3" />;

// ─── SubLabel ─────────────────────────────────────────────────────────────────
const SubLabel = ({ text }: { text: string }) => (
  <Text className="font-Inter_SemiBold text-[11px] text-[#60A5FA] uppercase tracking-wide mb-2">
    {text}
  </Text>
);

// ─── StyledInput ──────────────────────────────────────────────────────────────
const StyledInput = ({
  placeholder,
  value,
  onChangeText,
  multiline = false,
}: {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="#94A3B8"
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="font-Inter_Regular text-[13px] text-slate-800"
      style={{
        borderWidth: 1.5,
        borderColor: focused ? "#60A5FA" : "#E2E8F0",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginBottom: 16,
        minHeight: multiline ? 80 : undefined,
        textAlignVertical: multiline ? "top" : undefined,
      }}
    />
  );
};

// ─── OtherInput ───────────────────────────────────────────────────────────────
const OtherInput = ({
  visible,
  placeholder,
  value,
  onChangeText,
}: {
  visible: boolean;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
}) => {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(heightAnim, {
        toValue: visible ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: visible ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [visible]);

  const maxHeight = heightAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 80],
  });

  return (
    <Animated.View
      style={{ maxHeight, opacity: opacityAnim, overflow: "hidden" }}
    >
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />
    </Animated.View>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ExhaustFanSt1 = () => {
  const [installType, setInstallType] = useState<InstallType>("Replacement");
  const [fanLocation, setFanLocation] = useState<FanLocation>("Bathroom");

  const [atticFanType, setAtticFanType] =
    useState<AtticFanType>("Gable (wall) fan");
  const [supplyingAtticFan, setSupplyingAtticFan] = useState<YesNo>("Yes");
  const [atticStories, setAtticStories] = useState<Stories>("1");

  const [bathroomYesNo, setBathroomYesNo] = useState<YesNo>("Yes");
  const [bathroomFanType, setBathroomFanType] =
    useState<BathroomFanType | null>(null);
  const [specialtyControl, setSpecialtyControl] = useState<SpecialtyControl>(
    "No specialty control",
  );
  const [bathroomAreas, setBathroomAreas] = useState<AreaOption[]>([]);
  const [bathroomAreaOther, setBathroomAreaOther] = useState("");
  const [bathroomDist, setBathroomDist] = useState<Distance | null>(null);
  const [bathroomDuctInfo, setBathroomDuctInfo] = useState("");

  const [kitchenYesNo, setKitchenYesNo] = useState<YesNo>("No");
  const [kitchenFanType, setKitchenFanType] = useState<KitchenFanType | null>(
    null,
  );
  const [kitchenAreas, setKitchenAreas] = useState<AreaOption[]>([]);
  const [kitchenAreaOther, setKitchenAreaOther] = useState("");
  const [kitchenDist, setKitchenDist] = useState<Distance | null>(null);
  const [kitchenDuctInfo, setKitchenDuctInfo] = useState("");

  const [panelLocation, setPanelLocation] = useState<PanelLocation>(
    "Basement (Finished)",
  );
  const [panelLocationOther, setPanelLocationOther] = useState("");

  const [additionalInfo, setAdditionalInfo] = useState("");
  const [additionalFocused, setAdditionalFocused] = useState(false);

  const [imgCurrentFan, setImgCurrentFan] = useState<string | null>(null);
  const [imgNewFan, setImgNewFan] = useState<string | null>(null);
  const [imgInstallLocation, setImgInstallLocation] = useState<string | null>(
    null,
  );
  const [imgPanelClose, setImgPanelClose] = useState<string | null>(null);
  const [imgPanelWide, setImgPanelWide] = useState<string | null>(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const switchLocation = (loc: FanLocation) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setFanLocation(loc);
      setImgCurrentFan(null);
      setImgNewFan(null);
      setImgInstallLocation(null);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  const toggleArea = (
    area: AreaOption,
    list: AreaOption[],
    setter: (v: AreaOption[]) => void,
  ) =>
    setter(
      list.includes(area) ? list.filter((a) => a !== area) : [...list, area],
    );

  const panelOptions: PanelLocation[] = [
    "Basement (Finished)",
    "Basement (Unfinished)",
    "Garage (Finished)",
    "Garage (Unfinished)",
    "Other",
  ];
  const areaOptions: AreaOption[] = [
    "Attic above",
    "Occupied space above",
    "Crawlspace (unfinished)",
    "Crawlspace (finished)",
    "Basement (unfinished)",
    "Basement (finished)",
    "Other",
  ];
  const distanceOptions: Distance[] = [
    "Less than 25 ft",
    "25 – 50 ft",
    "50 – 100 ft",
    "More than 100 ft",
    "Unsure",
  ];

  const renderDetails = () => {
    // ── Attic ──────────────────────────────────────────────────────────────
    if (fanLocation === "Attic") {
      return (
        <SectionCard title="Attic Fan Details">
          <Label text="Is it a roof or gable (wall) fan?" />
          <View className="flex-row gap-2.5 mb-4">
            {(["Roof fan", "Gable (wall) fan"] as AtticFanType[]).map((t) => (
              <AnimatedOption
                key={t}
                label={t}
                selected={atticFanType === t}
                onPress={() => setAtticFanType(t)}
              />
            ))}
          </View>

          <Label text="Will you be supplying the attic fan?" />
          <View className="flex-row gap-2.5 mb-4">
            {(["Yes", "No"] as YesNo[]).map((v) => (
              <AnimatedOption
                key={v}
                label={v}
                selected={supplyingAtticFan === v}
                onPress={() => setSupplyingAtticFan(v)}
              />
            ))}
          </View>

          {supplyingAtticFan === "Yes" && (
            <>
              <Label text="Upload photo of new fan" />
              <UploadButton
                label="Upload New Fan Photo"
                imageUri={imgNewFan}
                onImagePicked={setImgNewFan}
              />
            </>
          )}

          <Label text="How many stories is your home?" />
          <View className="flex-row gap-2.5 mb-4">
            {(["1", "2"] as Stories[]).map((s) => (
              <AnimatedOption
                key={s}
                label={s}
                selected={atticStories === s}
                onPress={() => setAtticStories(s)}
              />
            ))}
          </View>

          <Label text="Upload photo from the ground showing where the attic fan will be installed" />
          <UploadButton
            label="Upload Install Location Photo"
            imageUri={imgInstallLocation}
            onImagePicked={setImgInstallLocation}
          />
          <Text className="font-Inter_Regular text-[11px] text-slate-500">
            This photo helps us understand access and installation conditions.
          </Text>
        </SectionCard>
      );
    }

    // ── Kitchen ────────────────────────────────────────────────────────────
    if (fanLocation === "Kitchen") {
      return (
        <SectionCard title="Kitchen Exhaust Fan Details">
          <SubLabel text="Current Kitchen Fan" />
          <Label text="Upload photo of current exhaust fan" />
          <UploadButton
            label="Upload Current Fan Photo"
            imageUri={imgCurrentFan}
            onImagePicked={setImgCurrentFan}
          />

          <Label text="Existing duct diameter and vent location if known" />
          <StyledInput
            placeholder="e.g., 6 in duct venting through exterior"
            value={kitchenDuctInfo}
            onChangeText={setKitchenDuctInfo}
          />

          <Label text="Will you be providing the new kitchen exhaust fan?" />
          <View className="flex-row gap-2.5 mb-4">
            {(["Yes", "No"] as YesNo[]).map((v) => (
              <AnimatedOption
                key={v}
                label={v}
                selected={kitchenYesNo === v}
                onPress={() => setKitchenYesNo(v)}
              />
            ))}
          </View>

          {kitchenYesNo === "Yes" && (
            <>
              <Label text="Upload photo of new fan" />
              <UploadButton
                label="Upload New Fan Photo"
                imageUri={imgNewFan}
                onImagePicked={setImgNewFan}
              />
            </>
          )}

          {kitchenYesNo === "No" && (
            <>
              <Label text="What type of exhaust fan do you want?" />
              {(
                [
                  "Hood fan over range / stove",
                  "Over the range microwave",
                  "Through the wall vent",
                  "Through the ceiling (commonly over an Island)",
                ] as KitchenFanType[]
              ).map((t) => (
                <RowOption
                  key={t}
                  label={t}
                  selected={kitchenFanType === t}
                  onPress={() => setKitchenFanType(t)}
                />
              ))}
            </>
          )}

          <Divider />
          <Label text="What is above / below the area the exhaust fan will be installed? (Select all that apply)" />
          <View className="flex-row flex-wrap mb-1">
            {areaOptions.map((a) => (
              <ChipOption
                key={a}
                label={a}
                selected={kitchenAreas.includes(a)}
                onPress={() => toggleArea(a, kitchenAreas, setKitchenAreas)}
              />
            ))}
          </View>
          <OtherInput
            visible={kitchenAreas.includes("Other")}
            placeholder='Please describe "Other" area...'
            value={kitchenAreaOther}
            onChangeText={setKitchenAreaOther}
          />

          <Divider />
          <Label
            text="What is the approximate distance of the electrical panel from the install location?"
            sub="Measured along walls and ceiling in right angles."
          />
          {distanceOptions.map((d) => (
            <RowOption
              key={d}
              label={d}
              selected={kitchenDist === d}
              onPress={() => setKitchenDist(d)}
            />
          ))}
        </SectionCard>
      );
    }

    // ── Bathroom ───────────────────────────────────────────────────────────
    return (
      <SectionCard title="Bathroom Exhaust Fan Details">
        <SubLabel text="Current Bathroom Fan" />
        <Label text="Upload photo of current exhaust fan" />
        <UploadButton
          label="Upload Current Fan Photo"
          imageUri={imgCurrentFan}
          onImagePicked={setImgCurrentFan}
        />

        <Label text="Existing duct diameter and vent location if known" />
        <StyledInput
          placeholder="e.g., 6 in duct venting through exterior"
          value={bathroomDuctInfo}
          onChangeText={setBathroomDuctInfo}
        />

        <Label text="Will you be providing the new bathroom exhaust fan?" />
        <View className="flex-row gap-2.5 mb-4">
          {(["Yes", "No"] as YesNo[]).map((v) => (
            <AnimatedOption
              key={v}
              label={v}
              selected={bathroomYesNo === v}
              onPress={() => setBathroomYesNo(v)}
            />
          ))}
        </View>

        {bathroomYesNo === "Yes" && (
          <>
            <Label text="Upload photo of new fan" />
            <UploadButton
              label="Upload New Fan Photo"
              imageUri={imgNewFan}
              onImagePicked={setImgNewFan}
            />
          </>
        )}

        {bathroomYesNo === "No" && (
          <>
            <Label text="What type of exhaust fan do you want?" />
            {(
              [
                "Standard",
                "Quiet operation",
                "Bluetooth speaker",
                "Light/fan combo",
                "Heater/light fan combo",
                "Heater/fan (no light) combo",
              ] as BathroomFanType[]
            ).map((t) => (
              <RowOption
                key={t}
                label={t}
                selected={bathroomFanType === t}
                onPress={() => setBathroomFanType(t)}
              />
            ))}
            <Divider />
            <Label text="Do you want a specialty control?" />
            {(
              [
                "No specialty control",
                "Speed control",
                "Humidity sensor",
                "Timer",
              ] as SpecialtyControl[]
            ).map((c) => (
              <RowOption
                key={c}
                label={c}
                selected={specialtyControl === c}
                onPress={() => setSpecialtyControl(c)}
              />
            ))}
          </>
        )}

        <Divider />
        <Label text="What is above / below the area the exhaust fan will be installed? (Select all that apply)" />
        <View className="flex-row flex-wrap mb-1">
          {areaOptions.map((a) => (
            <ChipOption
              key={a}
              label={a}
              selected={bathroomAreas.includes(a)}
              onPress={() => toggleArea(a, bathroomAreas, setBathroomAreas)}
            />
          ))}
        </View>
        <OtherInput
          visible={bathroomAreas.includes("Other")}
          placeholder='Please describe "Other" area...'
          value={bathroomAreaOther}
          onChangeText={setBathroomAreaOther}
        />

        <Divider />
        <Label
          text="What is the approximate distance of the electrical panel from the install location?"
          sub="Measured along walls and ceiling in right angles."
        />
        {distanceOptions.map((d) => (
          <RowOption
            key={d}
            label={d}
            selected={bathroomDist === d}
            onPress={() => setBathroomDist(d)}
          />
        ))}
      </SectionCard>
    );
  };

  return (
    <View className="flex-1 bg-[#EFF6FF]">
      <ScrollView
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Badge */}
        <View className="self-start bg-blue-50 rounded-full px-3 py-1 mb-5 border border-blue-100">
          <Text className="font-Inter_SemiBold text-[11px] text-[#60A5FA] tracking-wide">
            Exhaust Fans
          </Text>
        </View>

        {/* Header */}
        <SectionCard>
          <Text className="font-Inter_Bold text-[20px] text-gray-900 mb-1">
            Exhaust Fans
          </Text>
          <Text className="font-Inter_Regular text-[13px] text-slate-500">
            Answer these exhaust-fan-specific questions so we can estimate
            accurately.
          </Text>
        </SectionCard>

        {/* New or Replacement */}
        <SectionCard title="New or Replacement?">
          <Text className="font-Inter_Regular text-[13px] text-slate-500 mb-3">
            Is this a new installation or a replacement?
          </Text>
          <View className="flex-row gap-2.5">
            {(["New Installation", "Replacement"] as InstallType[]).map((t) => (
              <AnimatedOption
                key={t}
                label={t}
                selected={installType === t}
                onPress={() => setInstallType(t)}
              />
            ))}
          </View>
        </SectionCard>

        {/* Fan Location */}
        <SectionCard title="Where is the exhaust fan located?">
          {(["Attic", "Kitchen", "Bathroom"] as FanLocation[]).map((loc) => (
            <RowOption
              key={loc}
              label={loc}
              selected={fanLocation === loc}
              onPress={() => switchLocation(loc)}
            />
          ))}
        </SectionCard>

        {/* Dynamic section */}
        <Animated.View style={{ opacity: fadeAnim }}>
          {renderDetails()}
        </Animated.View>

        {/* Electrical Panel */}
        <SectionCard title="Electrical Panel">
          <Label text="Where is your electrical panel located?" />
          {panelOptions.map((p) => (
            <RowOption
              key={p}
              label={p}
              selected={panelLocation === p}
              onPress={() => setPanelLocation(p)}
            />
          ))}
          <OtherInput
            visible={panelLocation === "Other"}
            placeholder="Describe panel location..."
            value={panelLocationOther}
            onChangeText={setPanelLocationOther}
          />

          <Divider />
          <Text className="font-Inter_Regular text-[13px] text-gray-700 mb-3">
            Upload photos of your electrical panel up close so we can see the
            breakers / panel label and about 10 ft away.
          </Text>
          <UploadButton
            label="Upload Panel Close-Up"
            imageUri={imgPanelClose}
            onImagePicked={setImgPanelClose}
          />
          <UploadButton
            label="Upload Panel Wide Photo"
            imageUri={imgPanelWide}
            onImagePicked={setImgPanelWide}
          />
          <Text className="font-Inter_Regular text-[11px] text-slate-500">
            These photos help us estimate routing and installation requirements
            more accurately.
          </Text>
        </SectionCard>
      </ScrollView>
    </View>
  );
};

export default ExhaustFanSt1;
