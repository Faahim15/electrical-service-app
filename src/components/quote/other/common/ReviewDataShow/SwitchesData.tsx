import { selectSwitchesPayload } from "@/src/redux/slices/globalstore/switchesDataSlice";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { ReviewPhotos } from "../../../review/ReviewPhotos";
import { ReviewRow } from "../../../review/ReviewRow";
import { ReviewSectionTitle } from "../../../review/ReviewSectionTitle";

const SwitchesData = () => {
  const details = useSelector(selectSwitchesPayload);

  return (
    <View>
      {/* Switch Details */}
      <ReviewSectionTitle title="Switch Details" />
      <ReviewRow label="Quantity" value={details.quantity} />
      <ReviewRow label="Install Type" value={details.installType} />

      {/* Switch Types */}
      <ReviewSectionTitle title="Switch Type" />
      <ReviewRow
        label="Selected Types"
        value={
          details.selectedTypes.length > 0
            ? details.selectedTypes.join(", ")
            : "None selected"
        }
      />

      {/* Photos */}
      <ReviewSectionTitle title="Photos" />
      <ReviewPhotos label="Switch Photos" photos={details.photos} />

      {/* Additional Info */}
      <ReviewSectionTitle title="Additional Info" />
      <ReviewRow
        label="Additional Notes"
        value={details.additionalNotes || "N/A"}
      />
    </View>
  );
};

export default SwitchesData;
