const Blog = require('../models/blog')

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


module.exports = {
    initialBlogs,
    blogsInDb
}