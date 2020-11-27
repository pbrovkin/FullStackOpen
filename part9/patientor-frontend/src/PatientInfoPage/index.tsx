import React from "react";
import { Gender } from "../types"
import { useStateValue } from "../state";
import GenderIcon from "../components/GenderIcon"

const PatientInfoPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();

  return (
    <div>
      <h1>
        {patient?.name}
        {" "}
        <GenderIcon gender={patient?.gender as Gender} />
      </h1>
      <p>{patient?.ssn}</p>
      <p>{patient?.occupation}</p>
    </div>
  )
}

export default PatientInfoPage;