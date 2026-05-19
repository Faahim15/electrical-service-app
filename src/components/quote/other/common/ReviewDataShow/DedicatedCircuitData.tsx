import { RootState } from "@/src/redux/store";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { ReviewPhotos } from "../../../review/ReviewPhotos";
import { ReviewRow } from "../../../review/ReviewRow";
import { ReviewSectionTitle } from "../../../review/ReviewSectionTitle";

const DedicatedCircuitData = () => {
  const details = useSelector((state: RootState) => state.dedicatedCircuitData);

  return (
    <View>
      {/* ── St1: Intended Use ── */}
      <ReviewSectionTitle title="Intended Use" />
      <ReviewRow label="Circuit For" value={details.selectedCircuit || "—"} />
      {details.selectedCircuit === "Other" && (
        <ReviewRow
          label="Other Circuit Details"
          value={details.otherCircuitText || "—"}
        />
      )}
      <ReviewRow label="Panel Location" value={details.selectedPanel || "—"} />
      {details.selectedPanel === "Other (please specify)" && (
        <ReviewRow
          label="Other Panel Location"
          value={details.otherPanelText || "—"}
        />
      )}

      {/* ── St2: Panel and Location ── */}
      <ReviewSectionTitle title="Panel and Location" />
      <ReviewRow
        label="Install Location"
        value={details.installLocation || "—"}
      />
      <ReviewRow
        label="Above / Below Area"
        value={
          details.selectedAboveBelow.length > 0
            ? details.selectedAboveBelow.join(", ")
            : "—"
        }
      />
      <ReviewRow
        label="Panel Distance"
        value={details.selectedDistance || "—"}
      />
      {details.selectedDistance === "Other" && (
        <ReviewRow
          label="Other Distance Details"
          value={details.otherDistanceText || "—"}
        />
      )}

      {/* ── St3: Electrical Specifications ── */}
      <ReviewSectionTitle title="Electrical Specifications" />
      <ReviewRow
        label="Amps"
        value={details.selectedAmp !== null ? `${details.selectedAmp}A` : "—"}
      />
      <ReviewRow label="Volts" value={details.selectedVolt || "—"} />
      <ReviewRow label="NEMA Configuration" value={details.nemaConfig || "—"} />

      {/* ── St4: Photos ── */}
      <ReviewSectionTitle title="Photos" />
      {details.electricalMeterPhotos.length > 0 && (
        <ReviewPhotos
          label="Electrical Meter Photos"
          photos={details.electricalMeterPhotos}
        />
      )}
      {details.pathPhotos.length > 0 && (
        <ReviewPhotos
          label="Panel to Install Path Photos"
          photos={details.pathPhotos}
        />
      )}

      {/* ── St5: Additional Info ── */}
      <ReviewSectionTitle title="Additional Info" />
      <ReviewRow
        label="Additional Notes"
        value={details.additionalNotes || "—"}
      />
    </View>
  );
};

export default DedicatedCircuitData;
