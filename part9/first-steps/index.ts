import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || isNaN(height)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  if (!weight || isNaN(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(height, weight);
  res.send({
    weight: weight,
    height: height,
    bmi: bmi
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});