import React from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { Gender, Patient, Entry, TypeOfEntry } from "../types"
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import GenderIcon from "../components/GenderIcon";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from '../AddEntryModal';

const getInitialValues = (entryType: TypeOfEntry): Entry => {
  switch (entryType) {
    case "Hospital":
      return {
        id: "",
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        discharge: {
          date: "",
          criteria: ""
        }
      };
    case "OccupationalHealthcare":
      return {
        id: "",
        type: "OccupationalHealthcare",
        description: "",
        date: "",
        specialist: "",
        employerName: ""
      };
    case "HealthCheck":
      return {
        id: "",
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        healthCheckRating: 0
      };
  }
};

const switchTypeName = (type: TypeOfEntry): string => {
  switch (type) {
    case 'HealthCheck':
      return 'health check';
    case 'Hospital':
      return 'hospital';
    case 'OccupationalHealthcare':
      return 'occupational healthcare';
  }
};

const PatientInfoPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [entryType, setEntryType] = React.useState<TypeOfEntry>("HealthCheck");

  const openModal = (entryType: TypeOfEntry): void => {
    setEntryType(entryType);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (!patient) {
    return <p>no data found</p>;
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data);
    }
  };

  return (
    <div>
      <h1>
        {patient.name}
        {" "}
        <GenderIcon gender={patient.gender as Gender} />
      </h1>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        initialValue={getInitialValues(entryType)}
      />
      <h3>Add an entry:</h3>
      <Button onClick={() => openModal("Hospital")}>{switchTypeName("Hospital")}</Button>
      <Button onClick={() => openModal("OccupationalHealthcare")}>{switchTypeName("OccupationalHealthcare")}</Button>
      <Button onClick={() => openModal("HealthCheck")}>{switchTypeName("HealthCheck")}</Button>
      <h3>Entries:</h3>
      {patient.entries.length > 0 ?
        patient.entries.map(entry => <EntryDetails key={entry.id} entry={entry} />)
        : <div>no entries found</div>}
    </div>
  )
}

export default PatientInfoPage;