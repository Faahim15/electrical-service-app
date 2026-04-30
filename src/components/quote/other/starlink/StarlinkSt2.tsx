import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
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
    outputRange: ["#ffffff", "#3B82F6"],
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
          borderColor: selected ? "#3B82F6" : "#E5E7EB",
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
const UploadArea = ({ label }: { label: string }) => (
  <View className="border border-dashed border-gray-300 rounded-xl p-5 items-center mt-2 mb-4 bg-gray-50">
    <Text className="text-cyan-400 text-3xl mb-2">↑</Text>
    <Text className="text-gray-500 font-Inter_Regular text-xs text-center mb-3">
      {label}
    </Text>
    <TouchableOpacity
      className="border border-gray-300 rounded-full px-5 py-1.5"
      activeOpacity={0.7}
    >
      <Text className="text-gray-500 font-Inter_Regular text-xs">
        Choose File
      </Text>
    </TouchableOpacity>
  </View>
);

const StarlinkSt2 = () => {
  const [location, setLocation] = useState<string | null>(null);
  const [hasMounting, setHasMounting] = useState<string | null>(null);

  const showUpload = location === "roof" || location === "eave";
  return (
    <View className="flex-1">
      <Text className="text-xs font-Inter_Medium text-cyan-500 mb-1">
        Starlink
      </Text>
      <Text className="text-2xl font-Inter_Bold text-gray-900 mb-2">
        Dish location
      </Text>
      <Text className="text-sm font-Inter_Regular text-gray-600 mb-5">
        Where would you like the user terminal / dish installed?
      </Text>

      {["Roof", "Eave", "Ground"].map((loc) => (
        <OptionRow
          key={loc}
          label={loc}
          selected={location === loc.toLowerCase()}
          onPress={() => setLocation(loc.toLowerCase())}
        />
      ))}

      {location && (
        <Animated.View>
          <Text className="text-sm font-Inter_Medium text-gray-700 mt-4 mb-3">
            Do you have the mounting equipment?
          </Text>
          <OptionRow
            label="Yes"
            selected={hasMounting === "yes"}
            onPress={() => setHasMounting("yes")}
          />
          <OptionRow
            label="No"
            selected={hasMounting === "no"}
            onPress={() => setHasMounting("no")}
          />
        </Animated.View>
      )}

      {showUpload && (
        <UploadArea label="Upload photo from ground of area to install user terminal / dish" />
      )}
    </View>
  );
};

export default StarlinkSt2;
