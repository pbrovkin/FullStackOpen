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
  console.log(calculateBmi(180, 74))
} catch (e) {
  console.log('Something went wrong, error message: ', e.message);
}