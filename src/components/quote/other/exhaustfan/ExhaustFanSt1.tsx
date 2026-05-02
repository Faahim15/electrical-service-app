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
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow access to your photo library to upload images.",
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

    if (!result.canceled && result.assets.length > 0) {
      onPicked(result.assets[0].uri);
    }
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

    if (!result.canceled && result.assets.length > 0) {
      onPicked(result.assets[0].uri);
    }
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

// ─── UploadButton with Preview ────────────────────────────────────────────────
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
      <Pressable onPress={handlePress} style={{ marginBottom: 12 }}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          {/* Preview */}
          <View
            style={{
              borderRadius: 12,
              overflow: "hidden",
              borderWidth: 1.5,
              borderColor: "#06B6D4",
              backgroundColor: "#F0FDFF",
            }}
          >
            <Image
              source={{ uri: imageUri }}
              style={{ width: "100%", height: 160 }}
              resizeMode="cover"
            />
            {/* Replace overlay */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(6,182,212,0.85)",
                paddingVertical: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 6,
              }}
            >
              <Text style={{ fontSize: 14, color: "#FFFFFF" }}>🔄</Text>
              <Text
                style={{
                  fontFamily: "Inter_SemiBold",
                  fontSize: 12,
                  color: "#FFFFFF",
                }}
              >
                Tap to replace
              </Text>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={handlePress} style={{ marginBottom: 12 }}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          borderWidth: 1.5,
          borderColor: "#CBD5E1",
          borderRadius: 10,
          borderStyle: "dashed",
          paddingVertical: 14,
          paddingHorizontal: 16,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
          backgroundColor: "#F8FAFC",
        }}
      >
        <Text style={{ fontSize: 16, color: "#94A3B8" }}>↑</Text>
        <Text
          style={{ fontFamily: "Inter_Medium", fontSize: 13, color: "#06B6D4" }}
        >
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
    outputRange: ["#FFFFFF", "#38BDF8"],
  });
  const borderColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E2E8F0", "#38BDF8"],
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
          style={{
            transform: [{ scale: scaleAnim }],
            paddingVertical: 12,
            paddingHorizontal: 16,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: selected ? "Inter_SemiBold" : "Inter_Medium",
              fontSize: 13,
              textAlign: "center",
              color: selected ? "#FFFFFF" : "#374151",
            }}
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
    outputRange: ["#FFFFFF", "#38BDF8"],
  });
  const borderColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E2E8F0", "#38BDF8"],
  });

  return (
    <Pressable onPress={handlePress} style={{ marginBottom: 8 }}>
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
          style={{
            transform: [{ scale: scaleAnim }],
            paddingVertical: 14,
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              fontFamily: selected ? "Inter_SemiBold" : "Inter_Regular",
              fontSize: 13,
              color: selected ? "#FFFFFF" : "#374151",
            }}
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
    outputRange: ["#FFFFFF", "#38BDF8"],
  });
  const borderColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E2E8F0", "#38BDF8"],
  });

  return (
    <Pressable
      onPress={handlePress}
      style={{ marginRight: 8, marginBottom: 8 }}
    >
      <Animated.View
        style={{
          backgroundColor,
          borderColor,
          borderWidth: 1.5,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            paddingVertical: 8,
            paddingHorizontal: 14,
          }}
        >
          <Text
            style={{
              fontFamily: selected ? "Inter_SemiBold" : "Inter_Regular",
              fontSize: 12,
              color: selected ? "#FFFFFF" : "#374151",
            }}
          >
            {label}
          </Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

// ─── ProgressBar ──────────────────────────────────────────────────────────────
const ProgressBar = ({ step, total }: { step: number; total: number }) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: (step / total) * 100,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, []);
  const widthInterp = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });
  return (
    <View
      style={{
        height: 4,
        backgroundColor: "#E2E8F0",
        borderRadius: 99,
        marginBottom: 20,
      }}
    >
      <Animated.View
        style={{
          width: widthInterp,
          height: 4,
          borderRadius: 99,
          backgroundColor: "#06B6D4",
        }}
      />
    </View>
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
  <View
    style={{
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
      elevation: 2,
    }}
  >
    {title ? (
      <Text
        style={{
          fontFamily: "Inter_Bold",
          fontSize: 15,
          color: "#111827",
          marginBottom: 12,
        }}
      >
        {title}
      </Text>
    ) : null}
    {children}
  </View>
);

const Label = ({ text, sub }: { text: string; sub?: string }) => (
  <View style={{ marginBottom: 10 }}>
    <Text
      style={{ fontFamily: "Inter_SemiBold", fontSize: 13, color: "#1E293B" }}
    >
      {text}
    </Text>
    {sub ? (
      <Text
        style={{
          fontFamily: "Inter_Regular",
          fontSize: 11,
          color: "#64748B",
          marginTop: 2,
        }}
      >
        {sub}
      </Text>
    ) : null}
  </View>
);

const Divider = () => (
  <View style={{ height: 1, backgroundColor: "#F1F5F9", marginVertical: 12 }} />
);

// ─── Main Component ───────────────────────────────────────────────────────────
const ExhaustFanSt1 = () => {
  const [installType, setInstallType] = useState<InstallType>("Replacement");
  const [fanLocation, setFanLocation] = useState<FanLocation>("Bathroom");

  // Attic state
  const [atticFanType, setAtticFanType] =
    useState<AtticFanType>("Gable (wall) fan");
  const [supplyingAtticFan, setSupplyingAtticFan] = useState<YesNo>("Yes");
  const [atticStories, setAtticStories] = useState<Stories>("1");

  // Bathroom state
  const [bathroomYesNo, setBathroomYesNo] = useState<YesNo>("Yes");
  const [bathroomFanType, setBathroomFanType] =
    useState<BathroomFanType | null>("Heater/light fan combo");
  const [specialtyControl, setSpecialtyControl] = useState<SpecialtyControl>(
    "No specialty control",
  );
  const [bathroomAreas, setBathroomAreas] = useState<AreaOption[]>([]);
  const [bathroomDist, setBathroomDist] = useState<Distance | null>(null);

  // Kitchen state
  const [kitchenYesNo, setKitchenYesNo] = useState<YesNo>("No");
  const [kitchenFanType, setKitchenFanType] = useState<KitchenFanType | null>(
    null,
  );
  const [kitchenAreas, setKitchenAreas] = useState<AreaOption[]>([]);
  const [kitchenDist, setKitchenDist] = useState<Distance | null>(null);

  // Shared
  const [panelLocation, setPanelLocation] = useState<PanelLocation>(
    "Basement (Finished)",
  );
  const [additionalInfo, setAdditionalInfo] = useState("");

  // ── Image URIs (one per upload slot) ──────────────────────────────────────
  const [imgCurrentFan, setImgCurrentFan] = useState<string | null>(null);
  const [imgNewFan, setImgNewFan] = useState<string | null>(null);
  const [imgInstallLocation, setImgInstallLocation] = useState<string | null>(
    null,
  );
  const [imgPanelClose, setImgPanelClose] = useState<string | null>(null);
  const [imgPanelWide, setImgPanelWide] = useState<string | null>(null);

  // Fade animation for section switch
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const switchLocation = (loc: FanLocation) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      setFanLocation(loc);
      // Reset per-location images when switching
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

  // ── Render location-specific details ──────────────────────────────────────
  const renderDetails = () => {
    if (fanLocation === "Attic") {
      return (
        <SectionCard title="Attic Fan Details">
          <Label text="Is it a roof or gable (wall) fan?" />
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
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
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
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
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
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
          <Text
            style={{
              fontFamily: "Inter_Regular",
              fontSize: 11,
              color: "#64748B",
            }}
          >
            This photo helps us understand access and installation conditions.
          </Text>
        </SectionCard>
      );
    }

    if (fanLocation === "Kitchen") {
      return (
        <SectionCard title="Kitchen Exhaust Fan Details">
          <Text
            style={{
              fontFamily: "Inter_SemiBold",
              fontSize: 11,
              color: "#06B6D4",
              textTransform: "uppercase",
              letterSpacing: 0.5,
              marginBottom: 8,
            }}
          >
            Current Kitchen Fan
          </Text>
          <Label text="Upload photo of current exhaust fan" />
          <UploadButton
            label="Upload Current Fan Photo"
            imageUri={imgCurrentFan}
            onImagePicked={setImgCurrentFan}
          />

          <Label text="Existing duct diameter and vent location if known" />
          <TextInput
            placeholder="e.g., 6 in duct venting through exterior"
            placeholderTextColor="#94A3B8"
            style={{
              borderWidth: 1.5,
              borderColor: "#E2E8F0",
              borderRadius: 10,
              paddingVertical: 12,
              paddingHorizontal: 14,
              fontFamily: "Inter_Regular",
              fontSize: 13,
              color: "#1E293B",
              marginBottom: 16,
            }}
          />

          <Label text="Will you be providing the new kitchen exhaust fan?" />
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
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

          <Label text="What is above / below the area the exhaust fan will be installed? (Select all that apply)" />
          <View
            style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 8 }}
          >
            {areaOptions.map((a) => (
              <ChipOption
                key={a}
                label={a}
                selected={kitchenAreas.includes(a)}
                onPress={() => toggleArea(a, kitchenAreas, setKitchenAreas)}
              />
            ))}
          </View>

          <Label
            text="What is the approximate distance of the electrical panel from dedicated circuit install location?"
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

    // Bathroom (default)
    return (
      <SectionCard title="Bathroom Exhaust Fan Details">
        <Text
          style={{
            fontFamily: "Inter_SemiBold",
            fontSize: 11,
            color: "#06B6D4",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            marginBottom: 8,
          }}
        >
          Current Bathroom Fan
        </Text>
        <Label text="Upload photo of current exhaust fan" />
        <UploadButton
          label="Upload Current Fan Photo"
          imageUri={imgCurrentFan}
          onImagePicked={setImgCurrentFan}
        />

        <Label text="Existing duct diameter and vent location if known" />
        <TextInput
          placeholder="e.g., 6 in duct venting through exterior"
          placeholderTextColor="#94A3B8"
          style={{
            borderWidth: 1.5,
            borderColor: "#E2E8F0",
            borderRadius: 10,
            paddingVertical: 12,
            paddingHorizontal: 14,
            fontFamily: "Inter_Regular",
            fontSize: 13,
            color: "#1E293B",
            marginBottom: 16,
          }}
        />

        <Label text="Will you be providing the new bathroom exhaust fan?" />
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
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

        <Label text="What is above / below the area the exhaust fan will be installed? (Select all that apply)" />
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 8 }}
        >
          {areaOptions.map((a) => (
            <ChipOption
              key={a}
              label={a}
              selected={bathroomAreas.includes(a)}
              onPress={() => toggleArea(a, bathroomAreas, setBathroomAreas)}
            />
          ))}
        </View>

        <Label
          text="What is the approximate distance of the electrical panel from dedicated circuit install location?"
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
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Tag */}
        <View
          style={{
            alignSelf: "flex-start",
            backgroundColor: "#E0F2FE",
            borderRadius: 99,
            paddingVertical: 4,
            paddingHorizontal: 12,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter_Medium",
              fontSize: 12,
              color: "#0284C7",
            }}
          >
            Exhaust Fans
          </Text>
        </View>

        {/* Title */}
        <SectionCard>
          <Text
            style={{
              fontFamily: "Inter_Bold",
              fontSize: 20,
              color: "#111827",
              marginBottom: 4,
            }}
          >
            Exhaust Fans
          </Text>
          <Text
            style={{
              fontFamily: "Inter_Regular",
              fontSize: 13,
              color: "#64748B",
            }}
          >
            Answer these exhaust-fan-specific questions so we can estimate
            accurately.
          </Text>
        </SectionCard>

        {/* New or Replacement */}
        <SectionCard title="New or Replacement?">
          <Text
            style={{
              fontFamily: "Inter_Regular",
              fontSize: 13,
              color: "#64748B",
              marginBottom: 12,
            }}
          >
            Is this a new installation or a replacement?
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
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

        {/* Dynamic section with fade */}
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
          <Divider />
          <Text
            style={{
              fontFamily: "Inter_Regular",
              fontSize: 13,
              color: "#374151",
              marginBottom: 12,
            }}
          >
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
          <Text
            style={{
              fontFamily: "Inter_Regular",
              fontSize: 11,
              color: "#64748B",
            }}
          >
            These photos help us estimate routing and installation requirements
            more accurately.
          </Text>
        </SectionCard>

        {/* Additional Info */}
        <SectionCard title="Additional Information">
          <Label text="Additional information" />
          <TextInput
            placeholder="Anything else we should know about"
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            style={{
              borderWidth: 1.5,
              borderColor: "#E2E8F0",
              borderRadius: 10,
              paddingVertical: 12,
              paddingHorizontal: 14,
              fontFamily: "Inter_Regular",
              fontSize: 13,
              color: "#1E293B",
              minHeight: 90,
              textAlignVertical: "top",
            }}
          />
          <Text
            style={{
              fontFamily: "Inter_Regular",
              fontSize: 11,
              color: "#64748B",
              marginTop: 8,
            }}
          >
            The more details you share, the more accurate your estimate will be.
          </Text>
        </SectionCard>
      </ScrollView>
    </View>
  );
};

export default ExhaustFanSt1;
