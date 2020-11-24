import patientData from '../../data/patients.json'

import { NoSsnPatient, Patient } from '../types';

const patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): NoSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = () => {
  return [];
};

export default {
  getPatients,
  addPatient
};