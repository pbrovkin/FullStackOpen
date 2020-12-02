import React from 'react';
import { Discharge } from '../types';

const DischargeData: React.FC<{ discharge: Discharge }> = ({ discharge }) => {
  return (
    <div>
      <strong>Discharge: </strong>
      {discharge.date} / {discharge.criteria}
    </div>
  );
};

export default DischargeData;