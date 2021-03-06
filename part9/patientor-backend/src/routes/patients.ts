import express from 'express';
import patientService from '../services/patientService'
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);

      const updatedPatient = patientService.addEntry(patient, newEntry);
      res.json(updatedPatient);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
});

export default router;