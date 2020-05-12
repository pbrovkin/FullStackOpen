import React from 'react'

const Header = ({ name }) => {
    return (
        <h2>{name}</h2>
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            {course.parts.map(part =>
                <Part
                    key={part.id}
                    part={part}
                />)}
        </div>
    )
}


export default Course