import diagnosData from '../../data/diagnoses.json';

import { DiagnosEntry } from '../types';

const diagnoses: Array<DiagnosEntry> = diagnosData as Array<DiagnosEntry>;

const getEntries = (): Array<DiagnosEntry> => {
  return diagnoses;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry
};