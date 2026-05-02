import React from "react";
import { ReviewPhotos } from "./ReviewPhotos";
import { ReviewRow } from "./ReviewRow";
import { ReviewSectionTitle } from "./ReviewSectionTitle";

interface RemodelingDetails {
  panelLocation: string;
  remodlingArea: string;
  hasPlans: string;
  planPhotos: string[];
  electricalNeeds: string;
  hasPermit: string;
  permitNumber: string;
  additionalInfo: string;
  existingSpacePhotos: string[];
  panelPhotos: string[];
}

export const RemodelingReview = ({
  details,
}: {
  details: RemodelingDetails;
}) => (
  <>
    <ReviewSectionTitle title="Project Basics" />
    <ReviewRow label="Panel Location" value={details.panelLocation} />
    <ReviewRow label="Remodeling Area" value={details.remodlingArea} />

    <ReviewSectionTitle title="Plans" />
    <ReviewRow label="Has Plans" value={details.hasPlans} />
    <ReviewPhotos label="Plan Photos" photos={details.planPhotos} />
    <ReviewRow label="Electrical Needs" value={details.electricalNeeds} />

    <ReviewSectionTitle title="Permit" />
    <ReviewRow label="Has Permit" value={details.hasPermit} />
    <ReviewRow label="Permit Number" value={details.permitNumber} />
    <ReviewRow label="Additional Info" value={details.additionalInfo} />

    <ReviewSectionTitle title="Photos" />
    <ReviewPhotos
      label="Existing Space Photos"
      photos={details.existingSpacePhotos}
    />
    <ReviewPhotos label="Panel Photos" photos={details.panelPhotos} />
  </>
);
