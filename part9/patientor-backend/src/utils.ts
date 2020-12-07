/* eslint-disable @typescript-eslint/no-explicit-any */
import { NoIdPatient, Gender, NoIdEntry, TypeOfEntry, HealthCheckRating } from './types';

export const toNewPatient = (object: any): NoIdPatient => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: []
  };
};

export const toNewEntry = (object: any): NoIdEntry => {
  const type = parseEntryType(object.type);

  const baseEntry = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
  };

  switch (type) {
    case 'Hospital':
      return {
        type,
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseString(object.discharge.criteria)
        },
        ...baseEntry
      };
    case 'OccupationalHealthcare':
      const occupationalHealthCareEntry: NoIdEntry = {
        type,
        employerName: parseString(object.employerName),
        ...baseEntry
      };
      if (object.sickLeave) {
        occupationalHealthCareEntry.sickLeave = {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate)
        };
      }
      return occupationalHealthCareEntry;
    case 'HealthCheck':
      return {
        type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        ...baseEntry
      };
    default:
      throw new Error('Incorrect entry type' + type);
  }
}

const parseString = (param: any): string => {
  if (!param || !isString(param)) {
    throw new Error('Incorrect or missing string: ' + param);
  }
  return param;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseEntryType = (entryType: any): string => {
  if (!isEntryType(entryType)) {
    throw new Error('Incorrect entry type: ' + entryType);
  }
  return entryType;
};

const isEntryType = (param: any): param is TypeOfEntry => {
  return Object.values(TypeOfEntry).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect healthcheck rating: ' + healthCheckRating);
  }
  return healthCheckRating;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

export default toNewPatient;