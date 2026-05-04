import { HotTubDetails } from "@/src/types/serviceForm.types";
import React from "react";
import { ReviewPhotos } from "./ReviewPhotos";
import { ReviewRow } from "./ReviewRow";
import { ReviewSectionTitle } from "./ReviewSectionTitle";

export const HotTubReview = ({ details }: { details: HotTubDetails }) => (
  <>
    <ReviewSectionTitle title="Hot Tub Information" />
    <ReviewRow label="Has User Manual" value={details.hasUserManual} />
    {details.hasUserManual === "No" && (
      <>
        <ReviewRow label="Manufacturer" value={details.manufacturer} />
        <ReviewRow label="Model Number" value={details.modelNumber} />
      </>
    )}

    <ReviewSectionTitle title="Electrical Requirements" />
    <ReviewRow label="Amperage" value={details.amperage} />

    <ReviewSectionTitle title="Location Details" />
    <ReviewRow label="Placement" value={details.placement} />
    <ReviewRow label="Panel Location" value={details.panelLocation} />
    <ReviewRow label="Panel Distance" value={details.panelDistance} />
    <ReviewRow label="Additional Info" value={details.additionalInfo} />

    <ReviewSectionTitle title="Photos" />
    <ReviewPhotos label="Panel Photos" photos={details.panelPhotos} />
    <ReviewPhotos
      label="Install Location Photos"
      photos={details.installLocationPhotos}
    />
    <ReviewPhotos label="Receptacle Photos" photos={details.receptaclePhotos} />
  </>
);
