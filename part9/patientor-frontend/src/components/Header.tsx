import React from 'react';
import { Icon } from 'semantic-ui-react';
import { BaseEntry } from '../types';

const Header: React.FC<{
  entry: BaseEntry;
  icon: "hospital symbol" | "stethoscope" | "doctor"
}> = ({ entry, icon }) => {
  return (
    <div>
      <h1>{entry.date} <Icon name={icon} /></h1>
      <div><strong>Specialist: </strong>{entry.specialist}</div>
      <div><strong>Description: </strong> {entry.description}</div>
    </div>
  );
};

export default Header;