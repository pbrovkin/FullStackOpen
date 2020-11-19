interface ExsParameters {
  hours: Array<number>;
  target: number;
}

const parseExsArguments = (args: Array<string>): ExsParameters => {
  if (args.length < 4) throw new Error('Not enough arguments');

  let target = 0;
  const hours = [];
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    } else {
      if (i == 2) {
        target = Number(args[i]);
      } else {
        hours.push(Number(args[i]));
      }
    }
  }
  return { hours, target };
};

const calculateExercises = (hours: Array<number>, target: number) => {
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
  };
};

try {
  const { hours, target } = parseExsArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (e) {
  // eslint-disable-next-line
  console.log('Error, something bad happened, message: ', e.message);
}