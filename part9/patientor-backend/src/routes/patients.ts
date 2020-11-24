import express from 'express';
import patientService from '../services/patientService'

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
})

router.post('/', (req, res) => {
  const { name, ssn, dateOfBirth, gender, occupation } = req.body;
  const newPatient = patientService.addPatient(
    name,
    ssn,
    dateOfBirth,
    gender,
    occupation,
  );
  res.json(newPatient);
});

export default router;