import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { Entry, TypeOfEntry } from '../types';
import AddEntryForm, { EntryFormValues } from './AddEntryForm';

const switchTypeName = (type: TypeOfEntry): string => {
  switch (type) {
    case 'HealthCheck':
      return 'health check';
    case 'Hospital':
      return 'hospital';
    case 'OccupationalHealthcare':
      return 'occupational healthcare';
  }
};

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  initialValue: Entry;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, initialValue }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry {switchTypeName(initialValue.type)} entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} initialValue={initialValue} />
    </Modal.Content>
  </Modal>
);

export default AddEntryModal;
