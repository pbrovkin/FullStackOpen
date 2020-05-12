import React from 'react'

const Header = ({ courseName }) => (
    <h1>{courseName}</h1>
)

const Part = ({ part }) => (
    <p>{part.name} {part.exercises}</p>
)

const Content = ({ course }) => (
    <>
        {course.parts.map(part =>
            <Part part={part} />)}
    </>
)

const Course = ({ course }) => {
    return (
        <div>
            <Header courseName={course.name} />
            <Content course={course} />
        </div>
    )
}


export default Course