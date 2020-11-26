import React from "react";
import { CoursePart } from '../types';

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => (
  <p>
    <strong>Number of exercises:{" "}</strong>
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

export default Total