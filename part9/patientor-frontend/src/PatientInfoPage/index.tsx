import React from "react";
import { Gender } from "../types"
import { useStateValue } from "../state";
import GenderIcon from "../components/GenderIcon"

const PatientInfoPage: React.FC = () => {
  const [{ patient, diagnoses },] = useStateValue();

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
      <h4>entries</h4>
      {patient.entries.length > 0 ?
        patient.entries.map(entry =>
          <div key={entry.id}>
            <p>{entry.date} {entry.description}</p>
            <ul>
              {entry.diagnosisCodes?.map(code => {
                let name = Object.values(diagnoses).find(o => o.code === code)?.name
                return <li key={code}>{code} {name}</li>
              })}
            </ul>
          </div>
        )
        : <p>no entries</p>}
    </div>
  )
}

export default PatientInfoPage;