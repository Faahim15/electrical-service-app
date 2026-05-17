import TextAreaInput from "@/src/components/shared/TextAreaInput";
import { setAdditionalNotes } from "@/src/redux/slices/globalstore/StarlinkDataSlice";
import { AppDispatch, RootState } from "@/src/redux/store";
import React from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const StarlinkSt4 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const additionalNotes = useSelector(
    (state: RootState) => state.starlinkData.additionalNotes,
  );
  return (
    <View className="flex-1">
      <View>
        <View className="bg-[#EFF6FF] mb-2 px-2 py-1.5 justify-center items-center rounded-full w-24">
          <Text className="text-sm font-Inter_Medium text-[#60A5FA] ">
            Starlink
          </Text>
        </View>
        <TextAreaInput
          label="Additional notes (optional)"
          placeholder="Any additional information you'd like to share"
          value={additionalNotes}
          onChangeText={(text) => dispatch(setAdditionalNotes(text))}
        />
      </View>
    </View>
  );
};

export default StarlinkSt4;
