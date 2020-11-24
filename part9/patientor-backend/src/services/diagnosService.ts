import diagnosData from '../../data/diagnoses.json';

import { Diagnos } from '../types';

const diagnoses: Array<Diagnos> = diagnosData as Array<Diagnos>;

const getDiagnoses = (): Array<Diagnos> => {
  return diagnoses;
};

const addDiagnos = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnos
};