const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: '5f6255454a02190300812a2a',
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        user: '5f6255454a02190300812a2a',
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        user: '5f6255454a02190300812a2a',
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        user: '5f6255974a02190300812a2b',
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        user: '5f6255974a02190300812a2b',
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        user: '5f6255974a02190300812a2b',
        __v: 0
    }
]

const initialUsers = [
    {
        _id: '5f6255454a02190300812a2a',
        blogs: ['5a422a851b54a676234d17f7', '5a422aa71b54a676234d17f8', '5a422b3a1b54a676234d17f9'],
        username: 'pavel',
        name: 'Pavel Durov',
        passwordHash: '$2b$10$FjL0JuJ4yy7kqTQeuARnaeF7Nox3h0NCuHcB1pYsLswpGBujD8BoK',
        _v: 2
    },
    {
        _id: '5f6255974a02190300812a2b',
        blogs: ['5a422b891b54a676234d17fa', '5a422ba71b54a676234d17fb', '5a422bc61b54a676234d17fc'],
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        passwordHash: '$2b$10$Y6N2ERRm.O6aNpW/3TNmMOoju1OP2PyUhn6PhSDFJvmYTH4CJ0IzC',
        _v: 2
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    initialUsers,
    blogsInDb,
    usersInDb
}