import diagnosData from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosData as Array<Diagnosis>;

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

const addDiagnos = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnos
};