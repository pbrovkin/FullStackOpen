import React from "react";
import { Gender } from "../types"
import { useStateValue } from "../state";
import GenderIcon from "../components/GenderIcon";
import EntryDetails from "../components/EntryDetails";

const PatientInfoPage: React.FC = () => {
  const [{ patient },] = useStateValue();

  if (!patient) {
    return <p>no data found</p>;
  }

  return (
    <div>
      <h1>
        {patient.name}
        {" "}
        <GenderIcon gender={patient.gender as Gender} />
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>Entries:</h3>
      {patient.entries.length > 0 ?
        patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)
        : <div>no entries found</div>}
    </div>
  )
}

export default PatientInfoPage;