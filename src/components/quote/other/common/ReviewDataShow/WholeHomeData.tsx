import { RootState } from "@/src/redux/store";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { ReviewPhotos } from "../../../review/ReviewPhotos";
import { ReviewRow } from "../../../review/ReviewRow";
import { ReviewSectionTitle } from "../../../review/ReviewSectionTitle";

const WholeHomeData = () => {
  const details = useSelector((state: RootState) => state.wholeHomeData);

  return (
    <View>
      <ReviewSectionTitle title="Photos" />
      <ReviewPhotos label="Panel Photos" photos={details.photos} />
      {/* <ReviewPhotos label="Panel Photos" photos={details.photos} /> */}

      <ReviewSectionTitle title="Additional Info" />
      <ReviewRow label="Additional Info" value={details.additionalNotes} />
    </View>
  );
};

export default WholeHomeData;
