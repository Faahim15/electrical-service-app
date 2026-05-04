import { NewConstructionDetails } from "@/src/types/serviceForm.types";
import React from "react";
import { ReviewPhotos } from "./ReviewPhotos";
import { ReviewRow } from "./ReviewRow";
import { ReviewSectionTitle } from "./ReviewSectionTitle";

export const NewConstructionReview = ({
  details,
}: {
  details: NewConstructionDetails;
}) => (
  <>
    <ReviewSectionTitle title="Project Status" />
    <ReviewRow label="Construction Begun" value={details.constructionBegun} />

    {details.constructionBegun === "Yes" && (
      <>
        <ReviewRow
          label="Construction Stage"
          value={details.constructionStage}
        />
        <ReviewSectionTitle title="Building Plans" />
        <ReviewPhotos
          label="Building Plan Photos"
          photos={details.buildingPlanPhotos}
        />
      </>
    )}

    {details.constructionBegun === "No" && (
      <>
        <ReviewSectionTitle title="Building Plans" />
        <ReviewRow
          label="Has Building Plans"
          value={details.hasBuildingPlans}
        />
        {details.hasBuildingPlans === "Yes" && (
          <ReviewPhotos
            label="Building Plan Photos"
            photos={details.buildingPlanPhotos2}
          />
        )}
      </>
    )}
  </>
);
