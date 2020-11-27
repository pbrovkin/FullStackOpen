import React from "react";
import { useStateValue } from "../state";

const PatientInfoPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();

  return (
    <div>
      <h3>{patient?.name}</h3>
      <p>{patient?.gender}</p>
      <p>{patient?.ssn}</p>
      <p>{patient?.occupation}</p>
    </div>
  )
}

export default PatientInfoPage;