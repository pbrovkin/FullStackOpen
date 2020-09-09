const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        let blogObject = new Blog(helper.initialBlogs[0])
        await blogObject.save()

        blogObject = new Blog(helper.initialBlogs[1])
        await blogObject.save()
    })

    test('app returns the correct amount of blog posts', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('identifier property of the blog is named id', async () => {
        const response = await api.get('/api/blogs')
        response.body.map(blog => expect(blog.id).toBeDefined())
    })

    test('request creates a new blog post', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: 'Canonical string reduction',
                    author: 'Edsger W. Dijkstra',
                    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
                    likes: 12,
                })
            ])
        )
    })

    test('likes property has 0 value by default if missing', async () => {
        const newBlog = {
            title: 'First class tests',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toEqual(0)
    })

    test('blog without title and url is not added', async () => {
        const newBlog = {
            author: 'Robert C. Martin',
            likes: 10,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})