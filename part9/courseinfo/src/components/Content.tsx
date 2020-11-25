import React from "react";

interface Part {
  name: string;
  exerciseCount: number;
}

const Content: React.FC<{ courseParts: Array<Part> }> = ({ courseParts }) => (
  <>
    {courseParts.map((part) =>
      <p key={part.name}>{part.name} {part.exerciseCount}</p>
    )}
  </>
);

export default Content