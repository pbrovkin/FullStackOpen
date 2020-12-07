import diagnosData from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosData as Diagnosis[];

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnos = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnos
};