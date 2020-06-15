const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})


test('app returns the correct amount of blogs', async () => {
    const blogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(blogs.body.length).toBe(helper.initialBlogs.length)
})


test('identifier property of the blog is named id', async () => {
    const blogs = await api.get('/api/blogs')
    blogs.body.map(blog => expect(blog.id).toBeDefined())
})


test('request creates a new blog post', async () => {
    const newBlog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 15
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogs = await api.get('/api/blogs')

    expect(blogs.body.length).toBe(helper.initialBlogs.length + 1)

    expect(blogs.body).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                title: 'React patterns',
                author: 'Michael Chan',
                url: 'https://reactpatterns.com/',
                likes: 15
            })
        ])
    )
})


test('likes property has 0 value by default', async () => {
    const newBlog = {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/'
    }

    const blogs = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(blogs.body.likes).toEqual(0)
})


test('fails with status code 400 if data invalid', async () => {
    const newBlog = {
        author: 'Edsger W. Dijkstra'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})


afterAll(() => {
    mongoose.connection.close()
})