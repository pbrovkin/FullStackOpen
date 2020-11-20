import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight) {
    res.status(400).send({ error: 'parameters missing' });
  }
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(height, weight);
  res.send({
    weight: weight,
    height: height,
    bmi: bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;
  if (!body.daily_exercises || !body.target) {
    res.status(400).send({ error: 'parameters missing' });
  }
  if (!Array.isArray(body.daily_exercises)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    || !body.daily_exercises.every((i: unknown) => typeof i === 'number')
    || isNaN(body.target)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }
  const result = calculateExercises(body.daily_exercises, body.target);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});