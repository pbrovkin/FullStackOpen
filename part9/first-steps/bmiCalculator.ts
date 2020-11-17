interface BmiParameters {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: Array<string>): BmiParameters => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, mass: number) => {
  const heightInMeters = height / 100
  const bmi = mass / (heightInMeters * heightInMeters)

  if (bmi <= 15) {
    console.log('Very severely underweight');
  } else if (bmi <= 16) {
    console.log('Severely underweight');
  } else if (bmi <= 18.5) {
    console.log('Underweight');
  } else if (bmi <= 25) {
    console.log('Normal (healthy weight)');
  } else if (bmi <= 30) {
    console.log('Overweight');
  } else if (bmi <= 35) {
    console.log('Obese Class I (Moderately obese)');
  } else if (bmi <= 40) {
    console.log('Obese Class II (Severely obese)');
  } else if (bmi > 40) {
    console.log('Obese Class III (Very severely obese)');
  }
}

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight))
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}