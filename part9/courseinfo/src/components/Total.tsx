import React from "react";

interface Part {
  exerciseCount: number;
}

const Total: React.FC<{ courseParts: Array<Part> }> = ({ courseParts }) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

export default Total