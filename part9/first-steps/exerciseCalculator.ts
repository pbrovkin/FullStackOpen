interface InputParameters {
  hours: number[];
  target: number;
}

const calculateExercises = (hours: number[], target: number) => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(item => item > 0).length;
  const average = hours.reduce((a, b) => a + b, 0) / hours.length;
  const success = target <= average;
  let rating;
  let ratingDescription;
  if (average / target < 0.5) {
    rating = 1;
    ratingDescription = 'bad';
  } else if (average / target < 1) {
    rating = 2;
    ratingDescription = 'ok';
  } else {
    rating = 3;
    ratingDescription = 'good';
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

try {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}