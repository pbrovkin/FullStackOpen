import React from "react";
import { Gender } from "../types"
import { Icon } from "semantic-ui-react";

const GenderIcon: React.FC<{ gender: Gender }> = ({ gender }) => {
  switch (gender) {
    case "male":
      return (
        <Icon name="mars" />
      )
    case "female":
      return (
        <Icon name="venus" />
      )
    case "other":
      return (
        <Icon name="genderless" />
      )
    default:
      return null
  }
}

export default GenderIcon