import patientData from '../../data/patients'
import { Patient, PublicPatient, NoIdPatient, NoIdEntry } from '../types';
import { v4 as uuid } from 'uuid';

const patients: Patient[] = patientData as Patient[];

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NoIdPatient): Patient => {

  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const addEntry = (patient: Patient, entry: NoIdEntry): Patient => {
  const newEntry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);
  return patient;
};

export default {
  getPatients,
  addPatient,
  findById,
  addEntry
};