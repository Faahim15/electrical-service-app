import { RootState } from "@/src/redux/store";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { ReviewPhotos } from "../../../review/ReviewPhotos";
import { ReviewRow } from "../../../review/ReviewRow";
import { ReviewSectionTitle } from "../../../review/ReviewSectionTitle";

const StarlinkData = () => {
  const details = useSelector((state: RootState) => state.starlinkData);

  return (
    <View>
      {/* ── Step 1: Equipment Status ── */}
      <ReviewSectionTitle title="Equipment Status" />
      <ReviewRow
        label="Has Equipment"
        value={
          details.hasEquipment === "yes"
            ? "Yes"
            : details.hasEquipment === "no"
              ? "No"
              : "—"
        }
      />
      {details.hasEquipment === "no" && (
        <ReviewRow label="Expected Date" value={details.expectedDate || "—"} />
      )}

      {/* ── Step 2: Dish Location ── */}
      <ReviewSectionTitle title="Dish Location" />
      <ReviewRow
        label="Location"
        value={
          details.dishLocation
            ? details.dishLocation.charAt(0).toUpperCase() +
              details.dishLocation.slice(1)
            : "—"
        }
      />
      {details.dishLocation !== "ground" && details.dishLocation !== null && (
        <ReviewRow
          label="Has Mounting Equipment"
          value={
            details.hasMounting === "yes"
              ? "Yes"
              : details.hasMounting === "no"
                ? "No"
                : "—"
          }
        />
      )}
      {details.dishPhotos.length > 0 && (
        <ReviewPhotos label="Dish Photos" photos={details.dishPhotos} />
      )}

      {/* ── Step 3: Router Location ── */}
      <ReviewSectionTitle title="Router Location" />
      <ReviewRow label="Router Room" value={details.routerRoom || "—"} />
      <ReviewRow
        label="Above / Below"
        value={
          details.aboveOptions.length > 0
            ? details.aboveOptions.join(", ")
            : "—"
        }
      />
      {details.routerPhotos.length > 0 && (
        <ReviewPhotos label="Router Photos" photos={details.routerPhotos} />
      )}

      {/* ── Step 4: Additional Notes ── */}
      <ReviewSectionTitle title="Additional Info" />
      <ReviewRow
        label="Additional Notes"
        value={details.additionalNotes || "—"}
      />
    </View>
  );
};

export default StarlinkData;
