import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from '../types';
import Diagnoses from './Diagnoses';
import DischargeData from './DischargeData';
import Header from './Header';
import SickLeaveDetail from './SickLeaveDetail';
import HealthCheckRatingIcon from './HealthCheckRatingIcon';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  };
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Segment>
      <Header entry={entry} icon="hospital symbol" />
      <div>
        {entry.discharge ? <DischargeData discharge={entry.discharge} /> : null}
      </div>
      <Diagnoses codes={entry.diagnosisCodes} />
    </Segment>
  );
};

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Segment>
      <Header entry={entry} icon="stethoscope" />
      <div>
        <strong>Employer: </strong>{entry.employerName}
      </div>
      {entry.sickLeave ? <SickLeaveDetail sickLeave={entry.sickLeave} /> : null}
      <Diagnoses codes={entry.diagnosisCodes} />
    </Segment>
  );
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Segment>
      <Header entry={entry} icon="doctor" />
      <HealthCheckRatingIcon rating={entry.healthCheckRating} />
      <Diagnoses codes={entry.diagnosisCodes} />
    </Segment>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default EntryDetails;