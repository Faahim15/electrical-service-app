import React from "react";
import { ReviewPhotos } from "./ReviewPhotos";
import { ReviewRow } from "./ReviewRow";
import { ReviewSectionTitle } from "./ReviewSectionTitle";

interface PanelUpgradeDetails {
  serviceType: string;
  upgradeAmps: string;
  currentAmperage: string;
  powerType: string;
  panelLocation: string;
  additionalInfo: string;
  meterPhotos: string[];
  panelPhotos: string[];
}

export const PanelUpgradeReview = ({
  details,
}: {
  details: PanelUpgradeDetails;
}) => (
  <>
    <ReviewSectionTitle title="Service Type" />
    <ReviewRow label="Service Type" value={details.serviceType} />
    <ReviewRow label="Upgrade Amps" value={details.upgradeAmps} />

    <ReviewSectionTitle title="Current Panel" />
    <ReviewRow label="Current Amperage" value={details.currentAmperage} />
    <ReviewRow label="Power Type" value={details.powerType} />

    <ReviewSectionTitle title="Panel Location" />
    <ReviewRow label="Panel Location" value={details.panelLocation} />
    <ReviewRow label="Additional Info" value={details.additionalInfo} />

    <ReviewSectionTitle title="Photos" />
    <ReviewPhotos label="Meter Photos" photos={details.meterPhotos} />
    <ReviewPhotos label="Panel Photos" photos={details.panelPhotos} />
  </>
);
