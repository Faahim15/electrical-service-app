import * as ImagePicker from "expo-image-picker";
import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────
type LightingType =
  | "Interior Lighting"
  | "Flood Lights"
  | "Wall / Coach Lights"
  | "Driveway Lighting"
  | "Pole / Area Lighting"
  | "Landscape"
  | null;

type InstallType = "New Installation" | "Replacement" | null;
type YesNo = "Yes" | "No" | null;
type SwitchType =
  | "Standard (Toggle)"
  | "Smart"
  | "Standard (Rocker/Decorator)"
  | "Dimmer (Rocker/Decorator)"
  | "Dimmer (Toggle)"
  | "Motion"
  | "Timer"
  | "I'll provide my own"
  | "Other"
  | null;
type SwitchNewExisting = "New" | "Existing" | null;
type PowerControl = "Switch" | "Dusk to dawn" | "Timer" | null;

// Interior sub-types
type FixtureWeight = "less than 15 lbs" | "greater than 15 lbs" | null;
type FixtureKind =
  | "Surface Mount"
  | "Recessed"
  | "Chain hung chandelier"
  | "Pendant (Chain)"
  | "Crystal Chandelier"
  | "Pendant (Rod)"
  | "Pendant (Cord)"
  | null;

// Wall surface
type WallSurface =
  | "Brick"
  | "Siding"
  | "Stucco"
  | "Concrete"
  | "Wood"
  | "Metal"
  | null;

// Landscape voltage
type VoltageType = "Line Voltage" | "Low Voltage" | null;

// ─── AnimatedPressable ────────────────────────────────────────────────────────
const AnimatedTouchable = ({
  onPress,
  children,
  style,
}: {
  onPress: () => void;
  children: React.ReactNode;
  style?: object;
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const press = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();
    onPress();
  };
  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <TouchableOpacity onPress={press} activeOpacity={0.85}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

// ─── OptionButton ─────────────────────────────────────────────────────────────
const OptionButton = ({
  label,
  selected,
  onPress,
  fullWidth = false,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  fullWidth?: boolean;
}) => (
  <AnimatedTouchable onPress={onPress}>
    <View
      className={`rounded-xl border py-3 px-3 items-center justify-center ${
        fullWidth ? "w-full" : ""
      } ${
        selected ? "bg-[#4AA9F5] border-[#4AA9F5]" : "bg-white border-gray-200"
      }`}
      style={{ minHeight: 48 }}
    >
      <Text
        className={`text-sm text-center ${
          selected
            ? "text-white font-Inter_SemiBold"
            : "text-gray-800 font-Inter_Regular"
        }`}
      >
        {label}
      </Text>
    </View>
  </AnimatedTouchable>
);

// ─── TwoColGrid ───────────────────────────────────────────────────────────────
const TwoColGrid = ({
  items,
  selected,
  onSelect,
}: {
  items: string[];
  selected: string | null;
  onSelect: (v: string) => void;
}) => (
  <View className="flex-row flex-wrap gap-2">
    {items.map((item) => (
      <View key={item} style={{ width: "48%" }}>
        <OptionButton
          label={item}
          selected={selected === item}
          onPress={() => onSelect(item)}
        />
      </View>
    ))}
  </View>
);

// ─── YesNoRow ─────────────────────────────────────────────────────────────────
const YesNoRow = ({
  value,
  onChange,
}: {
  value: YesNo;
  onChange: (v: YesNo) => void;
}) => (
  <View className="flex-row gap-3">
    {(["Yes", "No"] as YesNo[]).map((opt) => (
      <View key={opt!} style={{ flex: 1 }}>
        <OptionButton
          label={opt!}
          selected={value === opt}
          onPress={() => onChange(opt)}
        />
      </View>
    ))}
  </View>
);

// ─── UploadBox ────────────────────────────────────────────────────────────────
const UploadBox = ({
  label,
  images,
  onAdd,
}: {
  label: string;
  images: string[];
  onAdd: (uri: string) => void;
}) => {
  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please allow photo access to upload images.",
        );
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets.length > 0) {
      result.assets.forEach((asset) => onAdd(asset.uri));
    }
  };

  return (
    <View>
      <AnimatedTouchable onPress={pickImage}>
        <View className="border border-gray-200 rounded-xl p-4 items-center bg-white">
          <Text className="text-2xl text-gray-400 mb-1">↑</Text>
          <Text className="text-gray-500 font-Inter_Regular text-sm">
            {label}
          </Text>
        </View>
      </AnimatedTouchable>
      {images.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-2"
        >
          <View className="flex-row gap-2">
            {images.map((uri, i) => (
              <Image
                key={i}
                source={{ uri }}
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 10,
                  backgroundColor: "#eee",
                }}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

// ─── SectionCard ──────────────────────────────────────────────────────────────
const SectionCard = ({
  children,
  className: cls = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <View className={`bg-white rounded-2xl p-4 mb-4 shadow-sm ${cls}`}>
    {children}
  </View>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <Text className="text-gray-800 font-Inter_Regular text-sm mb-3 leading-5">
    {children}
  </Text>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
  <Text className="text-gray-400 font-Inter_Regular text-xs mb-1">
    {children}
  </Text>
);

// ─── Interior Lighting Section ────────────────────────────────────────────────
const InteriorSection = () => {
  const [fixtureWeight, setFixtureWeight] = useState<FixtureWeight>(null);
  const [fixtureKind, setFixtureKind] = useState<FixtureKind>(null);
  const [complexAssembly, setComplexAssembly] = useState<YesNo>(null);
  const [installType, setInstallType] = useState<InstallType>(null);
  const [ceilingHeight, setCeilingHeight] = useState("");
  const [providing, setProviding] = useState<YesNo>(null);
  const [fixtureDetails, setFixtureDetails] = useState("");
  const [switchType, setSwitchType] = useState<SwitchNewExisting>(null);
  const [upgradeSwitch, setUpgradeSwitch] = useState<YesNo>(null);
  const [switchKind, setSwitchKind] = useState<SwitchType>(null);
  const [multiSwitch, setMultiSwitch] = useState<YesNo>(null);

  const [areaPhotos, setAreaPhotos] = useState<string[]>([]);
  const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
  const [newPhotos, setNewPhotos] = useState<string[]>([]);

  const fixtureKinds = [
    "Surface Mount",
    "Recessed",
    "Chain hung chandelier",
    "Pendant (Chain)",
    "Crystal Chandelier",
    "Pendant (Rod)",
    "Pendant (Cord)",
  ];

  const switchKinds = [
    "Standard (Toggle)",
    "Smart",
    "Standard (Rocker/Decorator)",
    "Dimmer (Rocker/Decorator)",
    "Dimmer (Toggle)",
    "Motion",
    "Timer",
    "I'll provide my own",
  ];

  return (
    <SectionCard>
      <Text className="text-gray-900 font-Inter_SemiBold text-base mb-4">
        Interior Lighting Details
      </Text>

      <Label>
        What type of interior lighting fixture(s) will be installed?
      </Label>
      <View className="gap-2 mb-4">
        {(["less than 15 lbs", "greater than 15 lbs"] as FixtureWeight[]).map(
          (w) => (
            <OptionButton
              key={w!}
              label={`Lighting Fixture(s) ${w}`}
              selected={fixtureWeight === w}
              onPress={() => setFixtureWeight(w)}
              fullWidth
            />
          ),
        )}
      </View>

      <Label>What kind of light fixture(s) will be installed?</Label>
      <TwoColGrid
        items={fixtureKinds}
        selected={fixtureKind}
        onSelect={(v) => setFixtureKind(v as FixtureKind)}
      />
      <View className="mb-4" />

      <Label>Does your fixture(s) have a complex assembly?</Label>
      <SubHeading>
        Many parts to be assembled, multiple attachment points, or delivered in
        multiple boxes
      </SubHeading>
      <YesNoRow value={complexAssembly} onChange={setComplexAssembly} />
      <View className="mb-4" />

      <Label>Is this a new install or replacement light fixture(s)?</Label>
      <View className="flex-row gap-3 mb-4">
        {(["New Installation", "Replacement"] as InstallType[]).map((opt) => (
          <View key={opt!} style={{ flex: 1 }}>
            <OptionButton
              label={opt!}
              selected={installType === opt}
              onPress={() => setInstallType(opt)}
            />
          </View>
        ))}
      </View>

      {installType === "New Installation" && (
        <>
          <Label>
            Upload photos of the area where you want light fixture(s) installed
          </Label>
          <View className="mb-4">
            <UploadBox
              label="Upload Area Photos"
              images={areaPhotos}
              onAdd={(uri) => setAreaPhotos((p) => [...p, uri])}
            />
          </View>
        </>
      )}

      {installType === "Replacement" && (
        <>
          <Label>Upload photos of current light fixture(s)</Label>
          <View className="mb-4">
            <UploadBox
              label="Upload Current Fixture Photos"
              images={currentPhotos}
              onAdd={(uri) => setCurrentPhotos((p) => [...p, uri])}
            />
          </View>
        </>
      )}

      <Label>
        How tall is the ceiling where the light(s) will be installed?
      </Label>
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800 font-Inter_Regular"
        placeholder="Enter ceiling height"
        placeholderTextColor="#aaa"
        value={ceilingHeight}
        onChangeText={setCeilingHeight}
      />

      <Label>Will you be providing the new light fixture(s)?</Label>
      <YesNoRow value={providing} onChange={setProviding} />
      <View className="mb-4" />

      {providing === "Yes" && (
        <>
          <Label>Upload photo(s) of your new light fixture(s)</Label>
          <View className="mb-4">
            <UploadBox
              label="Upload New Fixture Photos"
              images={newPhotos}
              onAdd={(uri) => setNewPhotos((p) => [...p, uri])}
            />
          </View>
        </>
      )}

      {providing === "No" && (
        <>
          <Label>
            Please provide details on the type of fixture(s) you want provided
          </Label>
          <TextInput
            className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800 font-Inter_Regular"
            placeholder="Enter fixture details..."
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={4}
            style={{ minHeight: 100, textAlignVertical: "top" }}
            value={fixtureDetails}
            onChangeText={setFixtureDetails}
          />
        </>
      )}

      <Label>
        Will the fixture(s) be connected to a new or existing switch?
      </Label>
      <View className="flex-row gap-3 mb-4">
        {(["New", "Existing"] as SwitchNewExisting[]).map((opt) => (
          <View key={opt!} style={{ flex: 1 }}>
            <OptionButton
              label={opt!}
              selected={switchType === opt}
              onPress={() => setSwitchType(opt)}
            />
          </View>
        ))}
      </View>

      {switchType === "New" && (
        <>
          <Label>What kind of switch do you want installed?</Label>
          <TwoColGrid
            items={switchKinds}
            selected={switchKind}
            onSelect={(v) => setSwitchKind(v as SwitchType)}
          />
          <View className="mb-4" />
        </>
      )}

      {switchType === "Existing" && (
        <>
          <Label>Do you want to upgrade your switch?</Label>
          <YesNoRow value={upgradeSwitch} onChange={setUpgradeSwitch} />
          <View className="mb-4" />
        </>
      )}

      <Label>Will there be more than one switch location?</Label>
      <YesNoRow value={multiSwitch} onChange={setMultiSwitch} />
    </SectionCard>
  );
};

// ─── Flood Lights Section ─────────────────────────────────────────────────────
const FloodLightsSection = () => {
  const [installType, setInstallType] = useState<InstallType>(null);
  const [installHeight, setInstallHeight] = useState("");
  const [providing, setProviding] = useState<YesNo>(null);
  const [floodDetails, setFloodDetails] = useState("");
  const [powerControl, setPowerControl] = useState<PowerControl>(null);
  const [switchType, setSwitchType] = useState<SwitchNewExisting>(null);
  const [switchKind, setSwitchKind] = useState<SwitchType>(null);
  const [multiSwitch, setMultiSwitch] = useState<YesNo>(null);

  const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
  const [newPhotos, setNewPhotos] = useState<string[]>([]);

  const switchKinds = [
    "Standard (Toggle)",
    "Smart",
    "Standard (Rocker/Decorator)",
    "Other",
    "I'll provide my own",
  ];

  return (
    <SectionCard>
      <Text className="text-gray-900 font-Inter_SemiBold text-base mb-4">
        Flood Lights Details
      </Text>

      <Label>Is this a new install or replacement flood light(s)?</Label>
      <View className="flex-row gap-3 mb-4">
        {(["New Installation", "Replacement"] as InstallType[]).map((opt) => (
          <View key={opt!} style={{ flex: 1 }}>
            <OptionButton
              label={opt!}
              selected={installType === opt}
              onPress={() => setInstallType(opt)}
            />
          </View>
        ))}
      </View>

      {installType === "Replacement" && (
        <>
          <Label>Upload photo(s) of current flood light(s)</Label>
          <View className="mb-4">
            <UploadBox
              label="Upload Current Flood Light Photos"
              images={currentPhotos}
              onAdd={(uri) => setCurrentPhotos((p) => [...p, uri])}
            />
          </View>
        </>
      )}

      <Label>How high will the flood light(s) be installed?</Label>
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800 font-Inter_Regular"
        placeholder="Enter installation height"
        placeholderTextColor="#aaa"
        value={installHeight}
        onChangeText={setInstallHeight}
      />

      <Label>Will you be providing the new flood light(s)?</Label>
      <YesNoRow value={providing} onChange={setProviding} />
      <View className="mb-4" />

      {providing === "Yes" && (
        <>
          <Label>Upload photo(s) of new fixture(s)</Label>
          <View className="mb-4">
            <UploadBox
              label="Upload New Flood Light Photos"
              images={newPhotos}
              onAdd={(uri) => setNewPhotos((p) => [...p, uri])}
            />
          </View>
        </>
      )}

      {providing === "No" && (
        <>
          <Label>
            Please provide details on the type of flood light(s) you want
            provided
          </Label>
          <TextInput
            className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800 font-Inter_Regular"
            placeholder="Enter flood light details..."
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={4}
            style={{ minHeight: 100, textAlignVertical: "top" }}
            value={floodDetails}
            onChangeText={setFloodDetails}
          />
        </>
      )}

      <Label>
        Will the flood light(s) be controlled by a switch or have constant
        power?
      </Label>
      <View className="gap-2 mb-4">
        {(
          [
            "Switch",
            "Constant Power (for motion / camera flood lights)",
          ] as string[]
        ).map((opt) => (
          <OptionButton
            key={opt}
            label={opt}
            selected={powerControl === opt}
            onPress={() => setPowerControl(opt as PowerControl)}
            fullWidth
          />
        ))}
      </View>

      {powerControl === "Switch" && (
        <>
          <Label>
            Will the fixture(s) be connected to a new or existing switch?
          </Label>
          <View className="flex-row gap-3 mb-4">
            {(["New", "Existing"] as SwitchNewExisting[]).map((opt) => (
              <View key={opt!} style={{ flex: 1 }}>
                <OptionButton
                  label={opt!}
                  selected={switchType === opt}
                  onPress={() => setSwitchType(opt)}
                />
              </View>
            ))}
          </View>

          {switchType === "New" && (
            <>
              <Label>What kind of switch do you want installed?</Label>
              <TwoColGrid
                items={switchKinds}
                selected={switchKind}
                onSelect={(v) => setSwitchKind(v as SwitchType)}
              />
              <View className="mb-4" />
            </>
          )}

          <Label>Will there be more than one switch location?</Label>
          <YesNoRow value={multiSwitch} onChange={setMultiSwitch} />
        </>
      )}
    </SectionCard>
  );
};

// ─── Wall / Coach Lights Section ──────────────────────────────────────────────
const WallCoachSection = () => {
  const [installType, setInstallType] = useState<InstallType>(null);
  const [surface, setSurface] = useState<WallSurface>(null);
  const [providing, setProviding] = useState<YesNo>(null);
  const [newLightDetails, setNewLightDetails] = useState("");
  const [switchType, setSwitchType] = useState<SwitchNewExisting>(null);
  const [upgradeSwitch, setUpgradeSwitch] = useState<YesNo>(null);
  const [switchKind, setSwitchKind] = useState<SwitchType>(null);
  const [multiSwitch, setMultiSwitch] = useState<YesNo>(null);

  const [areaPhotos, setAreaPhotos] = useState<string[]>([]);
  const [newPhotos, setNewPhotos] = useState<string[]>([]);

  const surfaces = ["Brick", "Siding", "Stucco", "Concrete", "Wood", "Metal"];
  const switchKinds = [
    "Standard (Toggle)",
    "Smart",
    "Standard (Rocker/Decorator)",
    "Dimmer (Rocker/Decorator)",
    "Dimmer (Toggle)",
    "Motion",
    "Timer",
    "I'll provide my own",
  ];

  return (
    <SectionCard>
      <Text className="text-gray-900 font-Inter_SemiBold text-base mb-4">
        Wall / Coach Lights Details
      </Text>

      <Label>Is this a new install or replacement light fixture(s)?</Label>
      <View className="flex-row gap-3 mb-4">
        {(["New Installation", "Replacement"] as InstallType[]).map((opt) => (
          <View key={opt!} style={{ flex: 1 }}>
            <OptionButton
              label={opt!}
              selected={installType === opt}
              onPress={() => setInstallType(opt)}
            />
          </View>
        ))}
      </View>

      <Label>
        Upload photo(s) of the area(s) you want light fixture(s) installed
      </Label>
      <View className="mb-4">
        <UploadBox
          label="Upload Area Photos"
          images={areaPhotos}
          onAdd={(uri) => setAreaPhotos((p) => [...p, uri])}
        />
      </View>

      <Label>What type of surface will the lights be mounted to?</Label>
      <TwoColGrid
        items={surfaces}
        selected={surface}
        onSelect={(v) => setSurface(v as WallSurface)}
      />
      <View className="mb-4" />

      <Label>Will you be providing the new light fixture(s)?</Label>
      <YesNoRow value={providing} onChange={setProviding} />
      <View className="mb-4" />

      {providing === "Yes" && (
        <>
          <Label>Upload photo(s) of your new light fixture(s)</Label>
          <View className="mb-4">
            <UploadBox
              label="Upload New Fixture Photos"
              images={newPhotos}
              onAdd={(uri) => setNewPhotos((p) => [...p, uri])}
            />
          </View>
        </>
      )}

      {providing === "No" && (
        <>
          <Label>
            Please provide details on the type of New light(s) you want provided
          </Label>
          <TextInput
            className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800 font-Inter_Regular"
            placeholder="Enter new light details..."
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={4}
            style={{ minHeight: 100, textAlignVertical: "top" }}
            value={newLightDetails}
            onChangeText={setNewLightDetails}
          />
        </>
      )}

      <Label>
        Will the fixture(s) be connected to a new or existing switch?
      </Label>
      <View className="flex-row gap-3 mb-4">
        {(["New", "Existing"] as SwitchNewExisting[]).map((opt) => (
          <View key={opt!} style={{ flex: 1 }}>
            <OptionButton
              label={opt!}
              selected={switchType === opt}
              onPress={() => setSwitchType(opt)}
            />
          </View>
        ))}
      </View>

      {switchType === "New" && (
        <>
          <Label>What kind of switch do you want installed?</Label>
          <TwoColGrid
            items={switchKinds}
            selected={switchKind}
            onSelect={(v) => setSwitchKind(v as SwitchType)}
          />
          <View className="mb-4" />
        </>
      )}

      {switchType === "Existing" && (
        <>
          <Label>Do you want to upgrade your switch?</Label>
          <YesNoRow value={upgradeSwitch} onChange={setUpgradeSwitch} />
          <View className="mb-4" />
          {upgradeSwitch === "Yes" && (
            <>
              <Label>What kind of switch do you want installed?</Label>
              <TwoColGrid
                items={[
                  "Standard",
                  "Toggle",
                  "Rocker (Decorator)",
                  "Smart",
                  "Dimmer",
                  "Motion",
                  "Timer",
                  "I'll provide my own",
                ]}
                selected={switchKind}
                onSelect={(v) => setSwitchKind(v as SwitchType)}
              />
              <View className="mb-4" />
            </>
          )}
        </>
      )}

      <Label>Will there be more than one switch location?</Label>
      <YesNoRow value={multiSwitch} onChange={setMultiSwitch} />
    </SectionCard>
  );
};

// ─── Driveway Lighting Section ────────────────────────────────────────────────
const DrivewaySection = () => {
  const [installType, setInstallType] = useState<InstallType>(null);
  const [providing, setProviding] = useState<YesNo>(null);
  const [newLightDetails, setNewLightDetails] = useState("");
  const [distance, setDistance] = useState("");
  const [powerControl, setPowerControl] = useState<PowerControl>(null);
  const [switchType, setSwitchType] = useState<SwitchNewExisting>(null);
  const [switchKind, setSwitchKind] = useState<SwitchType>(null);
  const [multiSwitch, setMultiSwitch] = useState<YesNo>(null);

  const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
  const [newPhotos, setNewPhotos] = useState<string[]>([]);

  const controls: PowerControl[] = ["Switch", "Dusk to dawn", "Timer"];

  return (
    <SectionCard>
      <Text className="text-gray-900 font-Inter_SemiBold text-base mb-4">
        Driveway Lighting Details
      </Text>

      <Label>Is this a new install or replacement lighting?</Label>
      <View className="flex-row gap-3 mb-4">
        {(["New Installation", "Replacement"] as InstallType[]).map((opt) => (
          <View key={opt!} style={{ flex: 1 }}>
            <OptionButton
              label={opt!}
              selected={installType === opt}
              onPress={() => setInstallType(opt)}
            />
          </View>
        ))}
      </View>

      {installType === "Replacement" && (
        <>
          <Label>Upload photo(s) of current lighting</Label>
          <View className="mb-4">
            <UploadBox
              label="Upload Current Lighting Photos"
              images={currentPhotos}
              onAdd={(uri) => setCurrentPhotos((p) => [...p, uri])}
            />
          </View>
        </>
      )}

      <Label>Will you be providing the new lighting?</Label>
      <YesNoRow value={providing} onChange={setProviding} />
      <View className="mb-4" />

      {providing === "Yes" && (
        <>
          <Label>Upload photo(s) of new lights</Label>
          <View className="mb-4">
            <UploadBox
              label="Upload New Lighting Photos"
              images={newPhotos}
              onAdd={(uri) => setNewPhotos((p) => [...p, uri])}
            />
          </View>
        </>
      )}

      {providing === "No" && (
        <>
          <Label>
            Please provide details on the type of New light(s) you want provided
          </Label>
          <TextInput
            className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800 font-Inter_Regular"
            placeholder="Enter new light details..."
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={4}
            style={{ minHeight: 100, textAlignVertical: "top" }}
            value={newLightDetails}
            onChangeText={setNewLightDetails}
          />
        </>
      )}

      <Label>How far from the house is the driveway lighting?</Label>
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800 font-Inter_Regular"
        placeholder="Enter distance from house"
        placeholderTextColor="#aaa"
        value={distance}
        onChangeText={setDistance}
      />

      <Label>How do you want the lighting controlled?</Label>
      <View className="gap-2 mb-4">
        {controls.map((c) => (
          <OptionButton
            key={c!}
            label={c!}
            selected={powerControl === c}
            onPress={() => setPowerControl(c)}
            fullWidth
          />
        ))}
      </View>

      {powerControl === "Switch" && (
        <>
          <Label>
            Will the fixture(s) be connected to a new or existing switch?
          </Label>
          <View className="flex-row gap-3 mb-4">
            {(["New", "Existing"] as SwitchNewExisting[]).map((opt) => (
              <View key={opt!} style={{ flex: 1 }}>
                <OptionButton
                  label={opt!}
                  selected={switchType === opt}
                  onPress={() => setSwitchType(opt)}
                />
              </View>
            ))}
          </View>

          {switchType && (
            <>
              <Label>What kind of switch do you want installed?</Label>
              <TwoColGrid
                items={["Standard", "Smart", "Other", "I'll provide my own"]}
                selected={switchKind}
                onSelect={(v) => setSwitchKind(v as SwitchType)}
              />
              <View className="mb-4" />
            </>
          )}

          <Label>Will there be more than one switch location?</Label>
          <YesNoRow value={multiSwitch} onChange={setMultiSwitch} />
        </>
      )}
    </SectionCard>
  );
};

// ─── Pole / Area Lighting Section ─────────────────────────────────────────────
const PoleAreaSection = () => {
  const [installType, setInstallType] = useState<InstallType>(null);
  const [providing, setProviding] = useState<YesNo>(null);
  const [lightDetails, setLightDetails] = useState("");
  const [distance, setDistance] = useState("");
  const [powerControl, setPowerControl] = useState<PowerControl>(null);
  const [switchType, setSwitchType] = useState<SwitchNewExisting>(null);
  const [upgradeSwitch, setUpgradeSwitch] = useState<YesNo>(null);
  const [switchKind, setSwitchKind] = useState<SwitchType>(null);
  const [multiSwitch, setMultiSwitch] = useState<YesNo>(null);

  const [areaPhotos, setAreaPhotos] = useState<string[]>([]);
  const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
  const [newPhotos, setNewPhotos] = useState<string[]>([]);

  const controls: PowerControl[] = ["Switch", "Dusk to dawn", "Timer"];

  return (
    <SectionCard>
      <Text className="text-gray-900 font-Inter_SemiBold text-base mb-4">
        Pole / Area Lighting Details
      </Text>

      <Label>Is this a new install or replacement lighting?</Label>
      <View className="flex-row gap-3 mb-4">
        {(["New Installation", "Replacement"] as InstallType[]).map((opt) => (
          <View key={opt!} style={{ flex: 1 }}>
            <OptionButton
              label={opt!}
              selected={installType === opt}
              onPress={() => setInstallType(opt)}
            />
          </View>
        ))}
      </View>

      {installType === "New Installation" && (
        <>
          <Label>Upload photo(s) of where the lighting will be installed</Label>
          <View className="mb-4">
            <UploadBox
              label="Upload Area Photos"
              images={areaPhotos}
              onAdd={(uri) => setAreaPhotos((p) => [...p, uri])}
            />
          </View>
        </>
      )}

      {installType === "Replacement" && (
        <>
          <Label>Upload photo(s) of current lighting</Label>
          <View className="mb-4">
            <UploadBox
              label="Upload Current Lighting Photos"
              images={currentPhotos}
              onAdd={(uri) => setCurrentPhotos((p) => [...p, uri])}
            />
          </View>
        </>
      )}

      <Label>Will you be providing the new lighting?</Label>
      <YesNoRow value={providing} onChange={setProviding} />
      <View className="mb-4" />

      {providing === "Yes" && (
        <>
          <Label>Upload photo(s) of new lights</Label>
          <View className="mb-4">
            <UploadBox
              label="Upload New Lighting Photos"
              images={newPhotos}
              onAdd={(uri) => setNewPhotos((p) => [...p, uri])}
            />
          </View>
        </>
      )}

      {providing === "No" && (
        <>
          <Label>Describe the lighting you want provided</Label>
          <TextInput
            className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800 font-Inter_Regular"
            placeholder="Enter lighting details..."
            placeholderTextColor="#aaa"
            multiline
            numberOfLines={4}
            style={{ minHeight: 100, textAlignVertical: "top" }}
            value={lightDetails}
            onChangeText={setLightDetails}
          />
        </>
      )}

      <Label>
        How far from the house do you want the pole / area lighting?
      </Label>
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800 font-Inter_Regular"
        placeholder="Enter distance from house"
        placeholderTextColor="#aaa"
        value={distance}
        onChangeText={setDistance}
      />

      <Label>How do you want the lighting controlled?</Label>
      <View className="gap-2 mb-4">
        {controls.map((c) => (
          <OptionButton
            key={c!}
            label={c!}
            selected={powerControl === c}
            onPress={() => setPowerControl(c)}
            fullWidth
          />
        ))}
      </View>

      {powerControl === "Switch" && (
        <>
          <Label>
            Will the fixture(s) be connected to a new or existing switch?
          </Label>
          <View className="flex-row gap-3 mb-4">
            {(["New", "Existing"] as SwitchNewExisting[]).map((opt) => (
              <View key={opt!} style={{ flex: 1 }}>
                <OptionButton
                  label={opt!}
                  selected={switchType === opt}
                  onPress={() => setSwitchType(opt)}
                />
              </View>
            ))}
          </View>

          {switchType === "New" && (
            <>
              <Label>What kind of switch do you want installed?</Label>
              <TwoColGrid
                items={["Standard", "Smart", "Other", "I'll provide my own"]}
                selected={switchKind}
                onSelect={(v) => setSwitchKind(v as SwitchType)}
              />
              <View className="mb-4" />
            </>
          )}

          {switchType === "Existing" && (
            <>
              <Label>Do you want to upgrade your switch?</Label>
              <YesNoRow value={upgradeSwitch} onChange={setUpgradeSwitch} />
              <View className="mb-4" />
              {upgradeSwitch === "Yes" && (
                <>
                  <Label>What kind of switch do you want installed?</Label>
                  <TwoColGrid
                    items={[
                      "Standard",
                      "Smart",
                      "Other",
                      "I'll provide my own",
                    ]}
                    selected={switchKind}
                    onSelect={(v) => setSwitchKind(v as SwitchType)}
                  />
                  <View className="mb-4" />
                </>
              )}
            </>
          )}

          <Label>Will there be more than one switch location?</Label>
          <YesNoRow value={multiSwitch} onChange={setMultiSwitch} />
        </>
      )}
    </SectionCard>
  );
};

// ─── Landscape Section ────────────────────────────────────────────────────────
const LandscapeSection = () => {
  const [voltage, setVoltage] = useState<VoltageType>(null);
  const [info, setInfo] = useState("");

  return (
    <SectionCard>
      <Text className="text-gray-900 font-Inter_SemiBold text-base mb-4">
        Landscape Lighting Details
      </Text>

      <Label>
        Will this be Line Voltage (120 volt) or Low Voltage (12–24 volt)?
      </Label>
      <View className="gap-2 mb-4">
        {(["Line Voltage", "Low Voltage"] as VoltageType[]).map((v) => (
          <OptionButton
            key={v!}
            label={v!}
            selected={voltage === v}
            onPress={() => setVoltage(v)}
            fullWidth
          />
        ))}
      </View>

      <Label>Information about your project</Label>
      <TextInput
        className="border border-gray-200 rounded-xl px-4 py-3 mb-4 text-gray-800 font-Inter_Regular"
        placeholder="Any information you feel we should know for your quote"
        placeholderTextColor="#aaa"
        multiline
        numberOfLines={5}
        style={{ minHeight: 110, textAlignVertical: "top" }}
        value={info}
        onChangeText={setInfo}
      />

      <View className="border border-[#4AA9F5] rounded-xl p-4 bg-blue-50">
        <Text className="text-[#4AA9F5] font-Inter_Regular text-sm leading-5">
          We will reach out to schedule a site visit as soon as possible in
          order to provide you a quote.
        </Text>
      </View>
    </SectionCard>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const LightingSt1 = () => {
  const [lightingType, setLightingType] = useState<LightingType>(null);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const lightingTypes: LightingType[] = [
    "Interior Lighting",
    "Flood Lights",
    "Wall / Coach Lights",
    "Driveway Lighting",
    "Pole / Area Lighting",
    "Landscape",
  ];

  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [lightingType]);

  const handleTypeSelect = (t: LightingType) => {
    fadeAnim.setValue(0);
    setLightingType(t);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  const renderDetailsSection = () => {
    if (!lightingType) return null;
    return (
      <Animated.View style={{ opacity: fadeAnim }}>
        {lightingType === "Interior Lighting" && <InteriorSection />}
        {lightingType === "Flood Lights" && <FloodLightsSection />}
        {lightingType === "Wall / Coach Lights" && <WallCoachSection />}
        {lightingType === "Driveway Lighting" && <DrivewaySection />}
        {lightingType === "Pole / Area Lighting" && <PoleAreaSection />}
        {lightingType === "Landscape" && <LandscapeSection />}

        {lightingType !== "Landscape" && (
          <SectionCard>
            <Text className="text-gray-800 font-Inter_Medium text-sm mb-2">
              Additional Information
            </Text>
            <TextInput
              className="border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-Inter_Regular"
              placeholder="Any additional information you feel we should know for your quote"
              placeholderTextColor="#aaa"
              multiline
              numberOfLines={4}
              style={{ minHeight: 100, textAlignVertical: "top" }}
              value={additionalInfo}
              onChangeText={setAdditionalInfo}
            />
          </SectionCard>
        )}
      </Animated.View>
    );
  };

  return (
    <View className="flex-1 ">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Card */}
        <SectionCard>
          <Text className="text-gray-900 font-Inter_Bold text-base mb-1">
            Lighting
          </Text>
          <Text className="text-gray-500 font-Inter_Regular text-sm leading-5">
            Answer these lighting-specific questions so we can estimate
            accurately.
          </Text>
        </SectionCard>

        {/* Lighting Type */}
        <SectionCard>
          <Text className="text-gray-900 font-Inter_SemiBold text-base mb-1">
            Lighting Type
          </Text>
          <Text className="text-gray-500 font-Inter_Regular text-sm mb-4">
            What type of lighting do you need?
          </Text>
          <TwoColGrid
            items={lightingTypes as string[]}
            selected={lightingType}
            onSelect={(v) => handleTypeSelect(v as LightingType)}
          />
        </SectionCard>

        {/* Conditional Details */}
        {renderDetailsSection()}
      </ScrollView>
    </View>
  );
};

export default LightingSt1;
