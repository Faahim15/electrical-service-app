import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
// adjust path as needed
import { RootState } from "@/src/redux/store";
import { ReviewPhotos } from "../../../review/ReviewPhotos";
import { ReviewRow } from "../../../review/ReviewRow";
import { ReviewSectionTitle } from "../../../review/ReviewSectionTitle";

const ExhaustFunData = () => {
  const s = useSelector((state: RootState) => state.exhaustFan);

  return (
    <View>
      {/* ── General ─────────────────────────────────────────────────────── */}
      <ReviewSectionTitle title="General" />
      <ReviewRow label="Install Type" value={s.installType} />
      <ReviewRow label="Fan Location" value={s.fanLocation} />

      {/* ── Attic ───────────────────────────────────────────────────────── */}
      {s.fanLocation === "Attic" && (
        <>
          <ReviewSectionTitle title="Attic Fan Details" />
          <ReviewRow label="Fan Type" value={s.atticFanType} />
          <ReviewRow label="Supplying Fan" value={s.supplyingAtticFan} />
          <ReviewRow label="Home Stories" value={s.atticStories} />
          {s.supplyingAtticFan === "Yes" && (
            <ReviewPhotos label="New Fan Photos" photos={s.photosNewFan} />
          )}
          <ReviewPhotos
            label="Attic Install Location Photos"
            photos={s.photosAtticLocation}
          />
        </>
      )}

      {/* ── Kitchen ─────────────────────────────────────────────────────── */}
      {s.fanLocation === "Kitchen" && (
        <>
          <ReviewSectionTitle title="Kitchen Fan Details" />
          <ReviewRow label="Providing Fan" value={s.kitchenYesNo} />
          {s.kitchenYesNo === "No" && s.kitchenFanType && (
            <ReviewRow label="Fan Type" value={s.kitchenFanType} />
          )}
          <ReviewRow label="Duct Info" value={s.kitchenDuctInfo || "—"} />
          <ReviewRow
            label="Area Above / Below"
            value={
              s.kitchenAreas.length
                ? s.kitchenAreas.join(", ") +
                  (s.kitchenAreas.includes("Other") && s.kitchenAreaOther
                    ? ` (${s.kitchenAreaOther})`
                    : "")
                : "—"
            }
          />
          <ReviewRow label="Panel Distance" value={s.kitchenDist ?? "—"} />
          <ReviewPhotos
            label="Current Fan Photos"
            photos={s.photosKitchenCurrentFan}
          />
          {s.kitchenYesNo === "Yes" && (
            <ReviewPhotos
              label="New Fan Photos"
              photos={s.photosKitchenNewFan}
            />
          )}
        </>
      )}

      {/* ── Bathroom ────────────────────────────────────────────────────── */}
      {s.fanLocation === "Bathroom" && (
        <>
          <ReviewSectionTitle title="Bathroom Fan Details" />
          <ReviewRow label="Providing Fan" value={s.bathroomYesNo} />
          {s.bathroomYesNo === "No" && s.bathroomFanType && (
            <ReviewRow label="Fan Type" value={s.bathroomFanType} />
          )}
          {s.bathroomYesNo === "No" && (
            <ReviewRow label="Specialty Control" value={s.specialtyControl} />
          )}
          <ReviewRow label="Duct Info" value={s.bathroomDuctInfo || "—"} />
          <ReviewRow
            label="Area Above / Below"
            value={
              s.bathroomAreas.length
                ? s.bathroomAreas.join(", ") +
                  (s.bathroomAreas.includes("Other") && s.bathroomAreaOther
                    ? ` (${s.bathroomAreaOther})`
                    : "")
                : "—"
            }
          />
          <ReviewRow label="Panel Distance" value={s.bathroomDist ?? "—"} />
          <ReviewPhotos
            label="Current Fan Photos"
            photos={s.photosBathroomCurrentFan}
          />
          {s.bathroomYesNo === "Yes" && (
            <ReviewPhotos
              label="New Fan Photos"
              photos={s.photosBathroomNewFan}
            />
          )}
        </>
      )}

      {/* ── Electrical Panel ────────────────────────────────────────────── */}
      <ReviewSectionTitle title="Electrical Panel" />
      <ReviewRow
        label="Panel Location"
        value={
          s.panelLocation === "Other" && s.panelLocationOther
            ? `Other – ${s.panelLocationOther}`
            : s.panelLocation
        }
      />
      <ReviewPhotos label="Panel Close-Up Photos" photos={s.photosPanelClose} />
      <ReviewPhotos label="Panel Wide Photos" photos={s.photosPanelWide} />

      {/* ── Additional Info ─────────────────────────────────────────────── */}
      <ReviewSectionTitle title="Additional Info" />
      <ReviewRow label="Notes" value={s.additionalNotes || "—"} />
    </View>
  );
};

export default ExhaustFunData;
