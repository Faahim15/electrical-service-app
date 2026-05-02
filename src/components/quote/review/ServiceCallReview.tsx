import React from "react";
import { ReviewPhotos } from "./ReviewPhotos";
import { ReviewRow } from "./ReviewRow";
import { ReviewSectionTitle } from "./ReviewSectionTitle";

interface ServiceCallDetails {
  projectDetails: string;
  preferredTime: string;
  schedulingDays: string[];
  additionalNotes: string;
  quickTags: string[];
  panelPhotos: string[];
  workAreaPhotos: string[];
  referencePhotos: string[];
}

export const ServiceCallReview = ({
  details,
}: {
  details: ServiceCallDetails;
}) => (
  <>
    <ReviewSectionTitle title="Project Details" />
    <ReviewRow label="Issue Description" value={details.projectDetails} />

    <ReviewSectionTitle title="Scheduling" />
    <ReviewRow label="Preferred Time" value={details.preferredTime} />
    <ReviewRow
      label="Preferred Days"
      value={details.schedulingDays.join(", ")}
    />

    <ReviewSectionTitle title="Photos" />
    <ReviewPhotos label="Panel Photos" photos={details.panelPhotos} />
    <ReviewPhotos label="Work Area Photos" photos={details.workAreaPhotos} />
    <ReviewPhotos
      label="Extra Reference Photos"
      photos={details.referencePhotos}
    />

    <ReviewSectionTitle title="Additional Notes" />
    <ReviewRow label="Notes" value={details.additionalNotes} />
    <ReviewRow label="Quick Tags" value={details.quickTags.join(", ")} />
  </>
);
