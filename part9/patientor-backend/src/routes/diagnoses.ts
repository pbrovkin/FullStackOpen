import express from 'express';
import diagnosService from '../services/diagnosService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosService.getEntries());
})

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
})

export default router;