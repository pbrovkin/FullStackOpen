const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Some title',
        author: 'Pavel Durov',
        url: 'http://telegram.com/',
        likes: 7
    },
    {
        title: 'Testing title',
        author: 'Testing Author',
        url: 'http://testing.com/',
        likes: 23
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
    blogsInDb,
    usersInDb
}