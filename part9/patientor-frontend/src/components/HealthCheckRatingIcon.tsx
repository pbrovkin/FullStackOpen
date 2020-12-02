import React from 'react';
import { Icon } from 'semantic-ui-react';
import { HealthCheckRating } from '../types';

type HealtCheckRatingIconProps = {
  rating: HealthCheckRating;
};

const RatingToColor = (rating: HealthCheckRating):
  "green" | "olive" | "yellow" | "orange" | "red" | undefined => {
  switch (rating) {
    case 0:
      return "green";
    case 1:
      return "olive";
    case 2:
      return "yellow"
    case 3:
      return "orange";
    case 4:
      return "red";
  }
};

const HealtCheckRatingIcon = ({ rating }: HealtCheckRatingIconProps) => {
  return (
    <Icon name="heart" color={RatingToColor(rating)} />
  );
};

export default HealtCheckRatingIcon;