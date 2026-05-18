import { RootState } from "@/src/redux/store";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { ReviewPhotos } from "../../../review/ReviewPhotos";
import { ReviewRow } from "../../../review/ReviewRow";
import { ReviewSectionTitle } from "../../../review/ReviewSectionTitle";

const CeilingFanData = () => {
  const details = useSelector((state: RootState) => state.ceilingFanData);

  return (
    <View>
      {/* ── St1: Installation Type ── */}
      <ReviewSectionTitle title="Installation Type" />
      <ReviewRow
        label="Installation Type"
        value={
          details.installationType === "replacement"
            ? "Replacement"
            : details.installationType === "new_install"
              ? "New Install"
              : "—"
        }
      />

      {/* Replacement photos */}
      {details.installationType === "replacement" &&
        details.replacementPhotos.length > 0 && (
          <ReviewPhotos
            label="Current Fan Photos"
            photos={details.replacementPhotos}
          />
        )}

      {/* New install fields */}
      {details.installationType === "new_install" && (
        <>
          <ReviewRow
            label="Above / Below Area"
            value={
              details.selectedAreas.length > 0
                ? details.selectedAreas.join(", ")
                : "—"
            }
          />
          <ReviewRow
            label="Has Light Fixture"
            value={
              details.hasLightFixture === "yes"
                ? "Yes"
                : details.hasLightFixture === "no"
                  ? "No"
                  : "—"
            }
          />
          <ReviewRow
            label="Pre-wired for Fan"
            value={
              details.preWired === "yes"
                ? "Yes"
                : details.preWired === "no"
                  ? "No"
                  : details.preWired === "unsure"
                    ? "Not Sure"
                    : "—"
            }
          />
        </>
      )}

      {/* ── St2: Fan Details ── */}
      <ReviewSectionTitle title="Fan Details" />
      <ReviewRow
        label="Providing Fan"
        value={
          details.providingFan === "yes"
            ? "Yes"
            : details.providingFan === "no"
              ? "No"
              : "—"
        }
      />
      {details.providingFan === "yes" && details.fanPhotos.length > 0 && (
        <ReviewPhotos label="New Fan Photos" photos={details.fanPhotos} />
      )}
      {details.providingFan !== "yes" && (
        <ReviewRow
          label="Fan Description"
          value={details.fanDescription || "—"}
        />
      )}
      <ReviewRow label="Ceiling Height" value={details.ceilingHeight || "—"} />

      {/* ── St3: Switch Details ── */}
      <ReviewSectionTitle title="Switch Details" />
      <ReviewRow
        label="Switch Connection"
        value={
          details.switchConnection === "new"
            ? "New"
            : details.switchConnection === "existing"
              ? "Existing"
              : details.switchConnection === "remote"
                ? "Fan comes with remote"
                : "—"
        }
      />
      {details.switchConnection === "existing" && (
        <ReviewRow
          label="Upgrade Switch"
          value={
            details.upgradeSwitch === "yes"
              ? "Yes"
              : details.upgradeSwitch === "no"
                ? "No"
                : "—"
          }
        />
      )}
      {details.selectedSwitchKind && (
        <ReviewRow label="Switch Kind" value={details.selectedSwitchKind} />
      )}

      {/* ── St4: Additional Info ── */}
      <ReviewSectionTitle title="Additional Info" />
      <ReviewRow
        label="Additional Notes"
        value={details.additionalNotes || "—"}
      />
    </View>
  );
};

export default CeilingFanData;
