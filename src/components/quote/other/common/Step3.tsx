import React, { useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";

// Types

type PropertyType = "House" | "Condo" | "Apartment" | "Commercial";
type OwnershipStatus = "Owner" | "Tenant" | "Property Manager" | "Other";
type Timeline = "As soon as possible" | "This week" | "This month" | "Flexible";

// PropertyCard

const PropertyCard = ({
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

  // ── ADDED: animate border/bg when selected changes ──
  React.useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: selected ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  const handlePress = () => {
    onPress();
  };

  const borderColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E5E7EB", "#06B6D4"],
  });
  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ffffff", "#F0FDFF"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        width: "47%",
        borderWidth: 1.5,
        borderColor,
        backgroundColor,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
      }}
    >
      <TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
        <Text
          className={`text-sm text-center font-Inter_Medium ${
            selected ? "text-[#06B6D4]" : "text-[#374151]"
          }`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

// RowCard

const RowCard = ({
  label,
  badge,
  selected,
  onPress,
}: {
  label: string;
  badge?: string;
  selected: boolean;
  onPress: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(selected ? 1 : 0)).current;

  // ── ADDED: animate border/bg when selected changes ──
  React.useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: selected ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [selected]);

  const handlePress = () => {
    onPress();
  };

  const borderColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E5E7EB", "#06B6D4"],
  });
  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ffffff", "#F0FDFF"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
        borderWidth: 1.5,
        borderColor,
        backgroundColor,
        borderRadius: 12,
      }}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.85}
        className="flex-row justify-between items-center px-4 py-3"
      >
        <Text
          className={`text-sm font-Inter_Medium ${
            selected ? "text-[#06B6D4]" : "text-[#374151]"
          }`}
        >
          {label}
        </Text>
        {badge ? (
          <Text className="text-xs text-[#6B7280] font-Inter_Regular">
            {badge}
          </Text>
        ) : null}
      </TouchableOpacity>
    </Animated.View>
  );
};

// Step3

const Step3 = ({ onContinue }: { onContinue?: () => void }) => {
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);
  const [ownershipStatus, setOwnershipStatus] =
    useState<OwnershipStatus | null>(null);
  const [timeline, setTimeline] = useState<Timeline | null>(null);

  const propertyTypes: PropertyType[] = [
    "House",
    "Condo",
    "Apartment",
    "Commercial",
  ];
  const ownershipStatuses: OwnershipStatus[] = [
    "Owner",
    "Tenant",
    "Property Manager",
    "Other",
  ];
  const timelineOptions: { label: Timeline; badge: string }[] = [
    { label: "As soon as possible", badge: "Urgent" },
    { label: "This week", badge: "Soon" },
    { label: "This month", badge: "Planned" },
    { label: "Flexible", badge: "No rush" },
  ];

  const isValid =
    propertyType !== null && ownershipStatus !== null && timeline !== null;

  return (
    <View className="flex-1">
      <Text className="text-2xl font-Inter_Bold text-[#111827] mb-1">
        Project basics
      </Text>
      <Text className="text-sm text-[#6B7280] font-Inter_Regular mb-6">
        A few details to help us understand the job
      </Text>

      <Text className="text-sm font-Inter_Medium text-[#374151] mb-2">
        Property Type <Text className="text-red-500">*</Text>
      </Text>
      <View className="flex-row flex-wrap gap-2 mb-5">
        {propertyTypes.map((type) => (
          <PropertyCard
            key={type}
            label={type}
            selected={propertyType === type}
            onPress={() => setPropertyType(type)}
          />
        ))}
      </View>

      <Text className="text-sm font-Inter_Medium text-[#374151] mb-2">
        Ownership Status <Text className="text-red-500">*</Text>
      </Text>
      <View className="gap-2 mb-5">
        {ownershipStatuses.map((status) => (
          <RowCard
            key={status}
            label={status}
            selected={ownershipStatus === status}
            onPress={() => setOwnershipStatus(status)}
          />
        ))}
      </View>

      <Text className="text-sm font-Inter_Medium text-[#374151] mb-2">
        Timeline / Urgency <Text className="text-red-500">*</Text>
      </Text>
      <View className="gap-2 mb-4">
        {timelineOptions.map((item) => (
          <RowCard
            key={item.label}
            label={item.label}
            badge={item.badge}
            selected={timeline === item.label}
            onPress={() => setTimeline(item.label)}
          />
        ))}
      </View>

      <View className="bg-[#ECFEFF] rounded-xl p-3 mb-6 border border-[#A5F3FC]">
        <Text className="text-xs text-[#06B6D4] font-Inter_Regular leading-4">
          The more accurate your details, the faster we can respond with a
          quote.
        </Text>
      </View>
    </View>
  );
};

export default Step3;
