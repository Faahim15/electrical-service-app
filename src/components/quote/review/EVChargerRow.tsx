import React from "react";
import { ReviewPhotos } from "./ReviewPhotos";
import { ReviewRow } from "./ReviewRow";
import { ReviewSectionTitle } from "./ReviewSectionTitle";

interface EVChargerDetails {
  chargerType: string;
  nemaConfig: string;
  providingCharger: string;
  chargerStatus: string;
  installationLocation: string;
  panelLocation: string;
  panelDistance: string;
  chargerAreaPhotos: string[];
  panelPhotos: string[];
  additionalInfo: string;
}

export const EVChargerReview = ({ details }: { details: EVChargerDetails }) => (
  <>
    <ReviewSectionTitle title="EV Charger Details" />
    <ReviewRow label="Charger Type" value={details.chargerType} />
    <ReviewRow label="NEMA Config" value={details.nemaConfig} />
    <ReviewRow label="Providing Charger" value={details.providingCharger} />
    <ReviewRow label="Charger Status" value={details.chargerStatus} />

    <ReviewSectionTitle title="Installation" />
    <ReviewRow
      label="Installation Location"
      value={details.installationLocation}
    />
    <ReviewRow label="Panel Location" value={details.panelLocation} />
    <ReviewRow label="Panel Distance" value={details.panelDistance} />

    <ReviewSectionTitle title="Photos" />
    <ReviewPhotos
      label="Charger Area Photos"
      photos={details.chargerAreaPhotos}
    />
    <ReviewPhotos label="Panel Photos" photos={details.panelPhotos} />

    <ReviewSectionTitle title="Additional Info" />
    <ReviewRow label="Additional Info" value={details.additionalInfo} />
  </>
);
