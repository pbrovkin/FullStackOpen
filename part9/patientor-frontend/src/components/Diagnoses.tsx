import React from 'react';
import { useStateValue } from '../state';

const Diagnoses: React.FC<{ codes: string[] | undefined }> = ({ codes }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <>
      {codes ?
        <div>
          <h4>Diagnoses:</h4>
          <ul>
            {codes.map(code =>
              <li key={code}>{code} {diagnoses[code].name}</li>
            )}
          </ul>
        </div>
        : null
      }
    </>
  );
};

export default Diagnoses;