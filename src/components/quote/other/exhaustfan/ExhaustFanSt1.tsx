import { RootState } from "@/src/redux/store";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import PhotoUploadSection from "../../PhotoUploadSection";
// import { setFanLocation } from "@/src/redux/slices/globalstore/ExhaustFanDataSlice";

import {
  setAtticFanType,
  setAtticStories,
  setBathroomAreaOther,
  setBathroomDist,
  setBathroomDuctInfo,
  setBathroomFanType,
  setBathroomYesNo,
  setFanLocation,
  setInstallType,
  setKitchenAreaOther,
  setKitchenDist,
  setKitchenDuctInfo,
  setKitchenFanType,
  setKitchenYesNo,
  setPanelLocation,
  setPanelLocationOther,
  setPhotosAtticLocation,
  setphotosBathromlocation,
  setPhotosBathroomCurrentFan,
  setPhotosBathroomNewFan,
  setPhotosKitchenCurrentFan,
  setphotosKitchenLocation,
  setPhotosKitchenNewFan,
  setPhotosNewFan,
  setPhotosPanelClose,
  setPhotosPanelWide,
  setSpecialtyControl,
  setSupplyingAtticFan,
  toggleBathroomArea,
  toggleKitchenArea,
} from "@/src/redux/slices/globalstore/ExhaustFanDataSlice";

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
            className={`text-base text-center ${selected ? "font-Inter_SemiBold text-white" : "font-Inter_Medium text-[#1F2937]"}`}
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
            className={`text-base font-Inter_SemiBold ${selected ? "text-white" : "font-Inter_Regular text-gray-700"}`}
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
            className={`text-base font-Inter_Medium ${selected ? "text-white" : "text-[#1F2937]"}`}
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
      <Text className="text-lg font-Inter_SemiBold text-[#1F2937] mb-3">
        {title}
      </Text>
    ) : null}
    {children}
  </View>
);

// ─── Label ────────────────────────────────────────────────────────────────────
const Label = ({ text, sub }: { text: string; sub?: string }) => (
  <View className="mb-2.5">
    <Text className="font-Inter_SemiBold text-base text-slate-800">{text}</Text>
    {sub ? (
      <Text className="font-Inter_Regular text-[11px] text-[#717182] mt-0.5">
        {sub}
      </Text>
    ) : null}
  </View>
);

// ─── Divider ──────────────────────────────────────────────────────────────────
const Divider = () => <View className="h-px bg-slate-100 my-3" />;

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
      className="font-Inter_Regular text-sm text-slate-800"
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
  const dispatch = useDispatch();
  const state = useSelector((s: RootState) => s.exhaustFan);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const switchLocation = (loc: FanLocation) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      dispatch(setFanLocation(loc));
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

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
    if (state.fanLocation === "Attic") {
      return (
        <SectionCard title="Attic Fan Details">
          <Label text="Is it a roof or gable (wall) fan?" />
          <View className="flex-row gap-2.5 mb-4">
            {(["Roof fan", "Gable (wall) fan"] as AtticFanType[]).map((t) => (
              <AnimatedOption
                key={t}
                label={t}
                selected={state.atticFanType === t}
                onPress={() => dispatch(setAtticFanType(t))}
              />
            ))}
          </View>

          <Label text="Will you be supplying the attic fan?" />
          <View className="flex-row gap-2.5 mb-4">
            {(["Yes", "No"] as YesNo[]).map((v) => (
              <AnimatedOption
                key={v}
                label={v}
                selected={state.supplyingAtticFan === v}
                onPress={() => dispatch(setSupplyingAtticFan(v))}
              />
            ))}
          </View>

          {state.supplyingAtticFan === "Yes" && (
            <>
              <Label text="Upload photo of new fan" />
              <PhotoUploadSection
                label="Upload New Fan Photo"
                photos={state.photosNewFan}
                onPhotosChange={(p) => dispatch(setPhotosNewFan(p))}
              />
            </>
          )}

          <Label text="How many stories is your home?" />
          <View className="flex-row gap-2.5 mb-4">
            {(["1", "2"] as Stories[]).map((s) => (
              <AnimatedOption
                key={s}
                label={s}
                selected={state.atticStories === s}
                onPress={() => dispatch(setAtticStories(s))}
              />
            ))}
          </View>

          <Label text="Upload photo from the ground showing where the attic fan will be installed" />
          <PhotoUploadSection
            label="Upload Install Location Photo"
            photos={state.photosAtticLocation}
            onPhotosChange={(p) => dispatch(setPhotosAtticLocation(p))}
          />
          <Text className="font-Inter_Regular text-[11px] text-[#717182]">
            This photo helps us understand access and installation conditions.
          </Text>
        </SectionCard>
      );
    }

    // ── Kitchen ────────────────────────────────────────────────────────────
    if (state.fanLocation === "Kitchen") {
      return (
        <SectionCard title="Kitchen Exhaust Fan Details">
          {state.installType === "New Installation" && (
            <View>
              <Label text="New Kitchen  Fan" />
              {/* <Label text="Upload photo of current exhaust fan" /> */}
              <PhotoUploadSection
                label="upload photo of installation location"
                photos={state.photosKitchenLocation}
                onPhotosChange={(p) => dispatch(setphotosKitchenLocation(p))}
              />
            </View>
          )}

          {state.installType === "Replacement" && (
            <View>
              <Label text="Current Kitchen Fan" />
              <Label text="Upload photo of current exhaust fan" />
              <PhotoUploadSection
                label="Upload Current Fan Photo"
                photos={state.photosKitchenCurrentFan}
                onPhotosChange={(p) => dispatch(setPhotosKitchenCurrentFan(p))}
              />

              <Label text="Existing duct diameter and vent location if known" />
              <StyledInput
                placeholder="duct venting through exterior wall"
                value={state.kitchenDuctInfo}
                onChangeText={(t) => dispatch(setKitchenDuctInfo(t))}
              />
            </View>
          )}

          <Label text="Will you be providing the new kitchen exhaust fan?" />
          <View className="flex-row gap-2.5 mb-4">
            {(["Yes", "No"] as YesNo[]).map((v) => (
              <AnimatedOption
                key={v}
                label={v}
                selected={state.kitchenYesNo === v}
                onPress={() => dispatch(setKitchenYesNo(v))}
              />
            ))}
          </View>

          {state.kitchenYesNo === "Yes" && (
            <>
              <Label text="Upload photo of new fan" />
              <PhotoUploadSection
                label="Upload New Fan Photo"
                photos={state.photosKitchenNewFan}
                onPhotosChange={(p) => dispatch(setPhotosKitchenNewFan(p))}
              />
            </>
          )}

          {state.kitchenYesNo === "No" && (
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
                  selected={state.kitchenFanType === t}
                  onPress={() => dispatch(setKitchenFanType(t))}
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
                selected={state.kitchenAreas.includes(a)}
                onPress={() => dispatch(toggleKitchenArea(a))}
              />
            ))}
          </View>
          <OtherInput
            visible={state.kitchenAreas.includes("Other")}
            placeholder='Please describe "Other" area...'
            value={state.kitchenAreaOther}
            onChangeText={(t) => dispatch(setKitchenAreaOther(t))}
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
              selected={state.kitchenDist === d}
              onPress={() => dispatch(setKitchenDist(d))}
            />
          ))}
        </SectionCard>
      );
    }

    // ── Bathroom ───────────────────────────────────────────────────────────
    return (
      <SectionCard title="Bathroom Exhaust Fan Details">
        {state.installType === "New Installation" && (
          <View>
            <Label text="New Bathroom Fan" />
            {/* <Label text="Upload photo of current exhaust fan" /> */}
            <PhotoUploadSection
              label="upload photo of installation location"
              photos={state.photosBathromlocation}
              onPhotosChange={(p) => dispatch(setphotosBathromlocation(p))}
            />
          </View>
        )}

        {state.installType === "Replacement" && (
          <View>
            <Label text="Current Bathroom Fan" />
            <Label text="Upload photo of current exhaust fan" />
            <PhotoUploadSection
              label="Upload Current Fan Photo"
              photos={state.photosBathroomCurrentFan}
              onPhotosChange={(p) => dispatch(setPhotosBathroomCurrentFan(p))}
            />

            <Label text="Existing duct diameter and vent location if known" />
            <StyledInput
              placeholder="duct venting through exterior wall"
              value={state.bathroomDuctInfo}
              onChangeText={(t) => dispatch(setBathroomDuctInfo(t))}
            />
          </View>
        )}

        <Label text="Will you be providing the new bathroom exhaust fan?" />
        <View className="flex-row gap-2.5 mb-4">
          {(["Yes", "No"] as YesNo[]).map((v) => (
            <AnimatedOption
              key={v}
              label={v}
              selected={state.bathroomYesNo === v}
              onPress={() => dispatch(setBathroomYesNo(v))}
            />
          ))}
        </View>

        {state.bathroomYesNo === "Yes" && (
          <>
            <Label text="Upload photo of new fan" />
            <PhotoUploadSection
              label="Upload New Fan Photo"
              photos={state.photosBathroomNewFan}
              onPhotosChange={(p) => dispatch(setPhotosBathroomNewFan(p))}
            />
          </>
        )}

        {state.bathroomYesNo === "No" && (
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
                selected={state.bathroomFanType === t}
                onPress={() => dispatch(setBathroomFanType(t))}
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
                selected={state.specialtyControl === c}
                onPress={() => dispatch(setSpecialtyControl(c))}
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
              selected={state.bathroomAreas.includes(a)}
              onPress={() => dispatch(toggleBathroomArea(a))}
            />
          ))}
        </View>
        <OtherInput
          visible={state.bathroomAreas.includes("Other")}
          placeholder='Please describe "Other" area...'
          value={state.bathroomAreaOther}
          onChangeText={(t) => dispatch(setBathroomAreaOther(t))}
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
            selected={state.bathroomDist === d}
            onPress={() => dispatch(setBathroomDist(d))}
          />
        ))}
      </SectionCard>
    );
  };

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Badge */}
        <View className="bg-[#EFF6FF] px-2 py-1.5 justify-center items-center rounded-full w-32 mb-2">
          <Text className="text-sm font-Inter_Medium text-[#60A5FA]">
            Exhaust Fans
          </Text>
        </View>

        {/* Header */}
        <SectionCard>
          <Text className="text-xl font-Inter_Bold text-[#1F2937] mb-1">
            Exhaust Fans
          </Text>
          <Text className="font-Inter_Regular text-base text-[#717182]">
            Answer these exhaust-fan-specific questions so we can estimate
            accurately.
          </Text>
        </SectionCard>

        {/* New or Replacement */}
        <SectionCard title="New or Replacement?">
          <Text className="font-Inter_Regular text-sm text-[#717182] mb-3">
            Is this a new installation or a replacement?
          </Text>
          <View className="flex-row gap-2.5">
            {(["New Installation", "Replacement"] as InstallType[]).map((t) => (
              <AnimatedOption
                key={t}
                label={t}
                selected={state.installType === t}
                onPress={() => dispatch(setInstallType(t))}
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
              selected={state.fanLocation === loc}
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
              selected={state.panelLocation === p}
              onPress={() => dispatch(setPanelLocation(p))}
            />
          ))}
          <OtherInput
            visible={state.panelLocation === "Other"}
            placeholder="Describe panel location..."
            value={state.panelLocationOther}
            onChangeText={(t) => dispatch(setPanelLocationOther(t))}
          />

          <Divider />
          <Text className="text-base font-Inter_SemiBold text-[#1F2937] mb-3">
            Upload photos of your electrical panel up close so we can see the
            breakers / panel label and about 10 ft away.
          </Text>
          <PhotoUploadSection
            label="Upload Panel Close-Up"
            photos={state.photosPanelClose}
            onPhotosChange={(p) => dispatch(setPhotosPanelClose(p))}
          />
          <PhotoUploadSection
            label="Upload Panel Wide Photo"
            photos={state.photosPanelWide}
            onPhotosChange={(p) => dispatch(setPhotosPanelWide(p))}
          />
          <Text className="font-Inter_Regular text-[11px] text-[#717182]">
            These photos help us estimate routing and installation requirements
            more accurately.
          </Text>
        </SectionCard>
      </ScrollView>
    </View>
  );
};

export default ExhaustFanSt1;
