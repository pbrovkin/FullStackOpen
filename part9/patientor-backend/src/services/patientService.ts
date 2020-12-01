import patientData from '../../data/patients'
import { Patient, PublicPatient, NoIdPatient } from '../types';
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

export default {
  getPatients,
  addPatient,
  findById
};