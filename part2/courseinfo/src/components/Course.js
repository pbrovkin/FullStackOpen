import React from 'react'

const Total = ({ course }) => {
    const total = course.parts.map(part => part.exercises).reduce((acc, curr) => acc + curr)
    return (
        <p>
            <b>total of {total} exercises</b>
        </p>
    )
}

const Header = ({ courseName }) => (
    <h1>{courseName}</h1>
)

const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)

const Content = ({ course }) => (
    <>
        {course.parts.map(part =>
            <Part key={part.id} part={part} />
        )}
    </>
)

const Course = ({ course }) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}


export default Course