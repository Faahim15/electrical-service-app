import { ElectricalInspectionDetails } from "@/src/types/serviceForm.types";
import React from "react";
import { ReviewPhotos } from "./ReviewPhotos";
import { ReviewRow } from "./ReviewRow";
import { ReviewSectionTitle } from "./ReviewSectionTitle";

export const ElectricalInspectionReview = ({
  details,
}: {
  details: ElectricalInspectionDetails;
}) => (
  <>
    <ReviewSectionTitle title="Inspection Type" />
    <ReviewRow label="Inspection Type" value={details.inspectionType} />

    {(details.inspectionType === "Whole House" ||
      details.inspectionType === "Accessory Building" ||
      details.inspectionType === "Partial House") && (
      <ReviewRow label="Square Footage" value={details.squareFootage} />
    )}

    {details.inspectionType === "Electrical Service only" && (
      <>
        <ReviewRow label="Panel Count" value={details.panelCount} />
        <ReviewPhotos label="Panel Photos" photos={details.panelPhotos} />
      </>
    )}

    <ReviewSectionTitle title="Additional Information" />
    <ReviewRow label="Additional Info" value={details.additionalInfo} />
  </>
);
