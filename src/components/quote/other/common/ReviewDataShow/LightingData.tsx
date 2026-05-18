import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import { RootState } from "@/src/redux/store";
import { ReviewPhotos } from "../../../review/ReviewPhotos";
import { ReviewRow } from "../../../review/ReviewRow";
import { ReviewSectionTitle } from "../../../review/ReviewSectionTitle";

const LightingData = () => {
  const lighting = useSelector((state: RootState) => state.lighting);

  const {
    lightingType,
    interior,
    floodLights,
    wallCoach,
    driveway,
    poleArea,
    landscape,
    additionalNotes,
  } = lighting;

  return (
    <View>
      {/* ── Lighting Type ───────────────────────────────────────────── */}
      <ReviewSectionTitle title="Lighting" />
      <ReviewRow label="Lighting Type" value={lightingType ?? ""} />

      {/* ── Interior Lighting ───────────────────────────────────────── */}
      {lightingType === "Interior Lighting" && (
        <>
          <ReviewSectionTitle title="Interior Lighting" />
          <ReviewRow
            label="Fixture Weight"
            value={
              interior.fixtureWeight
                ? `Lighting Fixture(s) ${interior.fixtureWeight}`
                : ""
            }
          />
          <ReviewRow label="Fixture Kind" value={interior.fixtureKind ?? ""} />
          <ReviewRow
            label="Complex Assembly"
            value={interior.complexAssembly ?? ""}
          />
          <ReviewRow label="Install Type" value={interior.installType ?? ""} />
          <ReviewRow label="Ceiling Height" value={interior.ceilingHeight} />
          <ReviewRow
            label="Providing Fixture"
            value={interior.providing ?? ""}
          />
          {interior.providing === "No" && (
            <ReviewRow
              label="Fixture Details"
              value={interior.fixtureDetails}
            />
          )}
          <ReviewRow label="Switch" value={interior.switchNewExisting ?? ""} />
          {interior.switchNewExisting === "New" && (
            <ReviewRow label="Switch Kind" value={interior.switchKind ?? ""} />
          )}
          {interior.switchNewExisting === "Existing" && (
            <ReviewRow
              label="Upgrade Switch"
              value={interior.upgradeSwitch ?? ""}
            />
          )}
          <ReviewRow
            label="Multiple Switch Locations"
            value={interior.multiSwitch ?? ""}
          />

          {/* Photos */}
          <ReviewSectionTitle title="Photos" />
          {interior.installType === "New Installation" &&
            interior.photosNew.length > 0 && (
              <ReviewPhotos label="Area Photos" photos={interior.photosNew} />
            )}
          {interior.installType === "Replacement" &&
            interior.photosCurrent.length > 0 && (
              <ReviewPhotos
                label="Current Fixture Photos"
                photos={interior.photosCurrent}
              />
            )}
          {interior.providing === "Yes" &&
            interior.photosFixtureNew.length > 0 && (
              <ReviewPhotos
                label="New Fixture Photos"
                photos={interior.photosFixtureNew}
              />
            )}
        </>
      )}

      {/* ── Flood Lights ────────────────────────────────────────────── */}
      {lightingType === "Flood Lights" && (
        <>
          <ReviewSectionTitle title="Flood Lights" />
          <ReviewRow
            label="Install Type"
            value={floodLights.installType ?? ""}
          />
          <ReviewRow
            label="Installation Height"
            value={floodLights.installHeight}
          />
          <ReviewRow
            label="Providing Fixture"
            value={floodLights.providing ?? ""}
          />
          {floodLights.providing === "No" && (
            <ReviewRow
              label="Flood Light Details"
              value={floodLights.floodDetails}
            />
          )}
          <ReviewRow
            label="Power Control"
            value={floodLights.powerControl ?? ""}
          />
          {floodLights.powerControl === "Switch" && (
            <>
              <ReviewRow
                label="Switch"
                value={floodLights.switchNewExisting ?? ""}
              />
              {floodLights.switchNewExisting === "New" && (
                <>
                  <ReviewRow
                    label="Switch Kind"
                    value={floodLights.switchKind ?? ""}
                  />
                  {floodLights.switchKind === "Other" && (
                    <ReviewRow
                      label="Switch Name"
                      value={floodLights.switchOtherText}
                    />
                  )}
                </>
              )}
              {floodLights.switchNewExisting === "Existing" && (
                <ReviewRow
                  label="Upgrade Switch"
                  value={floodLights.upgradeSwitch ?? ""}
                />
              )}
              <ReviewRow
                label="Multiple Switch Locations"
                value={floodLights.multiSwitch ?? ""}
              />
            </>
          )}

          {/* Photos */}
          <ReviewSectionTitle title="Photos" />
          {floodLights.installType === "New Installation" &&
            floodLights.photosNew.length > 0 && (
              <ReviewPhotos
                label="Area Photos"
                photos={floodLights.photosNew}
              />
            )}
          {floodLights.installType === "Replacement" &&
            floodLights.photosCurrent.length > 0 && (
              <ReviewPhotos
                label="Current Fixture Photos"
                photos={floodLights.photosCurrent}
              />
            )}
          {floodLights.providing === "Yes" &&
            floodLights.photosFixtureNew.length > 0 && (
              <ReviewPhotos
                label="New Flood Light Photos"
                photos={floodLights.photosFixtureNew}
              />
            )}
        </>
      )}

      {/* ── Wall / Coach Lights ─────────────────────────────────────── */}
      {lightingType === "Wall / Coach Lights" && (
        <>
          <ReviewSectionTitle title="Wall / Coach Lights" />
          <ReviewRow label="Install Type" value={wallCoach.installType ?? ""} />
          {wallCoach.installType === "New Installation" && (
            <ReviewRow label="Mount Surface" value={wallCoach.surface ?? ""} />
          )}
          <ReviewRow
            label="Providing Fixture"
            value={wallCoach.providing ?? ""}
          />
          {wallCoach.providing === "No" && (
            <ReviewRow
              label="Light Details"
              value={wallCoach.newLightDetails}
            />
          )}
          <ReviewRow label="Switch" value={wallCoach.switchNewExisting ?? ""} />
          {wallCoach.switchNewExisting === "New" && (
            <ReviewRow label="Switch Kind" value={wallCoach.switchKind ?? ""} />
          )}
          {wallCoach.switchNewExisting === "Existing" && (
            <>
              <ReviewRow
                label="Upgrade Switch"
                value={wallCoach.upgradeSwitch ?? ""}
              />
              {wallCoach.upgradeSwitch === "Yes" && (
                <ReviewRow
                  label="Switch Kind"
                  value={wallCoach.switchKind ?? ""}
                />
              )}
            </>
          )}
          <ReviewRow
            label="Multiple Switch Locations"
            value={wallCoach.multiSwitch ?? ""}
          />

          {/* Photos */}
          <ReviewSectionTitle title="Photos" />
          {wallCoach.installType === "New Installation" &&
            wallCoach.photosNew.length > 0 && (
              <ReviewPhotos label="Area Photos" photos={wallCoach.photosNew} />
            )}
          {wallCoach.installType === "Replacement" &&
            wallCoach.photosCurrent.length > 0 && (
              <ReviewPhotos
                label="Current Fixture Photos"
                photos={wallCoach.photosCurrent}
              />
            )}
          {wallCoach.providing === "Yes" &&
            wallCoach.photosFixtureNew.length > 0 && (
              <ReviewPhotos
                label="New Fixture Photos"
                photos={wallCoach.photosFixtureNew}
              />
            )}
        </>
      )}

      {/* ── Driveway Lighting ───────────────────────────────────────── */}
      {lightingType === "Driveway Lighting" && (
        <>
          <ReviewSectionTitle title="Driveway Lighting" />
          <ReviewRow label="Install Type" value={driveway.installType ?? ""} />
          <ReviewRow
            label="Providing Lighting"
            value={driveway.providing ?? ""}
          />
          {driveway.providing === "No" && (
            <ReviewRow label="Light Details" value={driveway.newLightDetails} />
          )}
          <ReviewRow label="Distance from House" value={driveway.distance} />
          <ReviewRow
            label="Power Control"
            value={driveway.powerControl ?? ""}
          />
          {driveway.powerControl === "Switch" && (
            <>
              <ReviewRow
                label="Switch"
                value={driveway.switchNewExisting ?? ""}
              />
              {driveway.switchNewExisting === "New" && (
                <>
                  <ReviewRow
                    label="Switch Kind"
                    value={driveway.switchKind ?? ""}
                  />
                  {driveway.switchKind === "Other" && (
                    <ReviewRow
                      label="Switch Name"
                      value={driveway.switchOtherText}
                    />
                  )}
                </>
              )}
              {driveway.switchNewExisting === "Existing" && (
                <ReviewRow
                  label="Upgrade Switch"
                  value={driveway.upgradeSwitch ?? ""}
                />
              )}
              <ReviewRow
                label="Multiple Switch Locations"
                value={driveway.multiSwitch ?? ""}
              />
            </>
          )}

          {/* Photos */}
          <ReviewSectionTitle title="Photos" />
          {driveway.installType === "New Installation" &&
            driveway.photosNew.length > 0 && (
              <ReviewPhotos label="Area Photos" photos={driveway.photosNew} />
            )}
          {driveway.installType === "Replacement" &&
            driveway.photosCurrent.length > 0 && (
              <ReviewPhotos
                label="Current Fixture Photos"
                photos={driveway.photosCurrent}
              />
            )}
          {driveway.providing === "Yes" &&
            driveway.photosFixtureNew.length > 0 && (
              <ReviewPhotos
                label="New Light Photos"
                photos={driveway.photosFixtureNew}
              />
            )}
        </>
      )}

      {/* ── Pole / Area Lighting ────────────────────────────────────── */}
      {lightingType === "Pole / Area Lighting" && (
        <>
          <ReviewSectionTitle title="Pole / Area Lighting" />
          <ReviewRow label="Install Type" value={poleArea.installType ?? ""} />
          <ReviewRow
            label="Providing Lighting"
            value={poleArea.providing ?? ""}
          />
          {poleArea.providing === "No" && (
            <ReviewRow label="Light Details" value={poleArea.lightDetails} />
          )}
          <ReviewRow label="Distance from House" value={poleArea.distance} />
          <ReviewRow
            label="Power Control"
            value={poleArea.powerControl ?? ""}
          />
          {poleArea.powerControl === "Switch" && (
            <>
              <ReviewRow
                label="Switch"
                value={poleArea.switchNewExisting ?? ""}
              />
              {poleArea.switchNewExisting === "New" && (
                <>
                  <ReviewRow
                    label="Switch Kind"
                    value={poleArea.switchKind ?? ""}
                  />
                  {poleArea.switchKind === "Other" && (
                    <ReviewRow
                      label="Switch Name"
                      value={poleArea.switchOtherText}
                    />
                  )}
                </>
              )}
              {poleArea.switchNewExisting === "Existing" && (
                <>
                  <ReviewRow
                    label="Upgrade Switch"
                    value={poleArea.upgradeSwitch ?? ""}
                  />
                  {poleArea.upgradeSwitch === "Yes" && (
                    <>
                      <ReviewRow
                        label="Switch Kind"
                        value={poleArea.switchKind ?? ""}
                      />
                      {poleArea.switchKind === "Other" && (
                        <ReviewRow
                          label="Switch Name"
                          value={poleArea.switchOtherText}
                        />
                      )}
                    </>
                  )}
                </>
              )}
              <ReviewRow
                label="Multiple Switch Locations"
                value={poleArea.multiSwitch ?? ""}
              />
            </>
          )}

          {/* Photos */}
          <ReviewSectionTitle title="Photos" />
          {poleArea.installType === "New Installation" &&
            poleArea.photosNew.length > 0 && (
              <ReviewPhotos label="Area Photos" photos={poleArea.photosNew} />
            )}
          {poleArea.installType === "Replacement" &&
            poleArea.photosCurrent.length > 0 && (
              <ReviewPhotos
                label="Current Fixture Photos"
                photos={poleArea.photosCurrent}
              />
            )}
          {poleArea.providing === "Yes" &&
            poleArea.photosFixtureNew.length > 0 && (
              <ReviewPhotos
                label="New Light Photos"
                photos={poleArea.photosFixtureNew}
              />
            )}
        </>
      )}

      {/* ── Landscape Lighting ──────────────────────────────────────── */}
      {lightingType === "Landscape" && (
        <>
          <ReviewSectionTitle title="Landscape Lighting" />
          <ReviewRow label="Voltage Type" value={landscape.voltage ?? ""} />
        </>
      )}

      {/* ── Additional Info (Step 2) ────────────────────────────────── */}
      <ReviewSectionTitle title="Additional Info" />
      <ReviewRow label="Additional Notes" value={additionalNotes} />
    </View>
  );
};

export default LightingData;
