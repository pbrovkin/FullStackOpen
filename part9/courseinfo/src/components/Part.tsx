import React from "react";
import { CoursePart } from "../types"

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return (
        <div key={part.name}>
          <p>name: <strong>{part.name}</strong></p>
          <p>exercise count: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
        </div>
      )
    case "Using props to pass data":
      return (
        <div key={part.name}>
          <p>name: <strong>{part.name}</strong></p>
          <p>exercise count: {part.exerciseCount}</p>
          <p>group project count: {part.groupProjectCount}</p>
        </div>
      )
    case "Deeper type usage":
      return (
        <div key={part.name}>
          <p>name: <strong>{part.name}</strong></p>
          <p>exercise count: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
          <p>exercise submission link: {part.exerciseSubmissionLink}</p>
        </div>
      )
    case "My own course":
      return (
        <div key={part.name}>
          <p>name: <strong>{part.name}</strong></p>
          <p>exercise count: {part.exerciseCount}</p>
          <p>description: {part.description}</p>
        </div>
      )
    default:
      return assertNever(part);
  }
}

export default Part