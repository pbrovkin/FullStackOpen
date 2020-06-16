const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
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


    describe('addition of a new blog', () => {
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
                .expect(200)
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
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(blogs.body.likes).toEqual(0)
        })

        test('fails with status code 400 if title and url are missing', async () => {
            const newBlog = {
                author: 'Goose Hiddink'
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
        })
    })


    describe('deletion of a blog', () => {
        test('succeeds with status code 204 deleting a single blog', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd.length).toBe(
                helper.initialBlogs.length - 1
            )

            const titles = blogsAtEnd.map(b => b.title)

            expect(titles).not.toContain(blogToDelete.title)
        })
    })

    describe('updating of a blog', () => {
        test('update the amount of likes for a blog post', async () => {
            const blogs = await helper.blogsInDb()

            const updatedBlog = {
                likes: 34
            }

            await api
                .put(`/api/blogs/${blogs[0].id}`)
                .send(updatedBlog)

            const newBlogs = await helper.blogsInDb()
            expect(newBlogs[0].likes).toBe(34)
        })
    })
})


afterAll(() => {
    mongoose.connection.close()
})