import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import {
  selectDedicatedCircuitSt2,
  selectDedicatedCircuitSt3,
  selectDedicatedCircuitSt4,
  selectOutletsSt1,
  selectOutletsSt2,
  selectOutletsSt3,
  selectOutletsSt4,
  selectOutletsSt5,
} from "@/src/redux/slices/globalstore/outletsDataSlice";
import { ReviewPhotos } from "../../../review/ReviewPhotos";
import { ReviewRow } from "../../../review/ReviewRow";
import { ReviewSectionTitle } from "../../../review/ReviewSectionTitle";

const OutletsData = () => {
  const st1 = useSelector(selectOutletsSt1);
  const st2 = useSelector(selectOutletsSt2);
  const st3 = useSelector(selectOutletsSt3);
  const st4 = useSelector(selectOutletsSt4);
  const st5 = useSelector(selectOutletsSt5);
  const dcSt2 = useSelector(selectDedicatedCircuitSt2);
  const dcSt3 = useSelector(selectDedicatedCircuitSt3);
  const dcSt4 = useSelector(selectDedicatedCircuitSt4);

  return (
    <View>
      {/* ─── Outlet Details (St1) ─────────────────────────────────────────── */}
      <ReviewSectionTitle title="Outlet Details" />
      <ReviewRow label="Intended Use" value={st1.intendedUse} />
      {st1.intendedUse === "Other" && (
        <ReviewRow
          label="Other Use Description"
          value={st1.otherUseText || "—"}
        />
      )}
      <ReviewRow label="Quantity" value={st1.quantity || "—"} />

      {st1.intendedUse === "Freezer" ||
      st1.intendedUse === "Tools / Equipment" ? (
        <View>
          {/* Freezer or Tools / Equipment UI */}
          {/* ─── Dedicated Circuit — Panel & Location (DcSt2) ────────────────── */}
          <ReviewSectionTitle title="Dedicated Circuit — Panel & Location" />
          <ReviewRow
            label="Install Location"
            value={dcSt2.installLocation || "—"}
          />
          <ReviewRow
            label="Above / Below"
            value={
              dcSt2.aboveBelow.length > 0 ? dcSt2.aboveBelow.join(", ") : "—"
            }
          />
          <ReviewRow
            label="Distance from Panel"
            value={dcSt2.distance || "—"}
          />
          {dcSt2.distance === "Other" && (
            <ReviewRow
              label="Distance Description"
              value={dcSt2.otherDistanceText || "—"}
            />
          )}

          {/* ─── Dedicated Circuit — Electrical Specs (DcSt3) ────────────────── */}
          <ReviewSectionTitle title="Dedicated Circuit — Electrical Specs" />
          <ReviewRow
            label="Amps"
            value={dcSt3.selectedAmp !== null ? String(dcSt3.selectedAmp) : "—"}
          />
          <ReviewRow label="Volts" value={dcSt3.selectedVolt || "—"} />
          <ReviewRow
            label="NEMA Configuration"
            value={dcSt3.nemaConfig || "—"}
          />

          {/* ─── Dedicated Circuit — Photos (DcSt4) ──────────────────────────── */}
          <ReviewSectionTitle title="Dedicated Circuit — Photos" />
          {dcSt4.electricalMeterPhotos.length > 0 ? (
            <ReviewPhotos
              label="Electrical Meter Photos"
              photos={dcSt4.electricalMeterPhotos}
            />
          ) : (
            <ReviewRow label="Electrical Meter Photos" value="—" />
          )}
          {dcSt4.pathPhotos.length > 0 ? (
            <ReviewPhotos
              label="Path to Install Location"
              photos={dcSt4.pathPhotos}
            />
          ) : (
            <ReviewRow label="Path to Install Location" value="—" />
          )}
        </View>
      ) : (
        <View>
          {/* ─── Installation Type — Standard (St2) ──────────────────────────── */}
          <ReviewSectionTitle title="Installation Type" />
          <ReviewRow label="Install Type" value={st2.installType} />
          {st2.photos.length > 0 && (
            <ReviewPhotos label="Install Location Photos" photos={st2.photos} />
          )}

          {/* Amps / Volts / NEMA — only shown for New install */}
          {st2.installType === "New install" && (
            <>
              <ReviewRow label="Amps" value={st2.selectedAmp} />
              <ReviewRow label="Volts" value={st2.selectedVolt} />
              <ReviewRow
                label="NEMA Configuration"
                value={st2.nemaConfig || "—"}
              />
            </>
          )}

          {/* ─── Replacement Photos (St3) ─────────────────────────────────────── */}
          <ReviewSectionTitle title="Current Outlet" />
          <ReviewRow label="Install Type" value={st3.installType} />
          {st3.photo && (
            <ReviewPhotos label="Current Outlet Photo" photos={[st3.photo]} />
          )}

          {/* ─── Outlet Types (St4) ───────────────────────────────────────────── */}
          <ReviewSectionTitle title="Outlet Types" />
          <ReviewRow
            label="Selected Types"
            value={
              st4.selectedTypes.length > 0 ? st4.selectedTypes.join(", ") : "—"
            }
          />
        </View>
      )}

      {/* ─── Additional Notes (St5) ───────────────────────────────────────── */}
      <ReviewSectionTitle title="Additional Info" />
      <ReviewRow label="Additional Notes" value={st5.additionalNotes || "—"} />
    </View>
  );
};

export default OutletsData;
