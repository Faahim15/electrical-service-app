import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

const StarlinkSt4 = () => {
  const [notes, setNotes] = useState("");
  return (
    <View className="flex-1">
      <View>
        <Text className="text-xs font-Inter_Medium text-cyan-500 mb-1">
          Starlink
        </Text>
        <Text className="text-2xl font-Inter_Bold text-gray-900 mb-5">
          Additional information
        </Text>

        <TextInput
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          placeholder="Any additional notes..."
          placeholderTextColor="#9CA3AF"
          className="border border-gray-200 rounded-xl px-4 py-3 font-Inter_Regular text-sm text-gray-800 bg-white mb-6"
          style={{ minHeight: 120 }}
        />
      </View>
    </View>
  );
};

export default StarlinkSt4;
