const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(helper.initialUsers)
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
        const response = await api
            .post('/api/login')
            .send({ username: helper.initialUsers[0].username, password: 'password' })
            .expect(200)
            .expect('Content-Type', /application\/json/)
        token = response.body.token
    })

    test('app returns the correct amount of blog posts', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('identifier property of the blog is named id', async () => {
        const response = await api.get('/api/blogs')
        response.body.map(blog => expect(blog.id).toBeDefined())
    })

    describe('addition of a new blog', () => {
        test('request creates a new blog post', async () => {
            const newBlog = {
                title: 'Test blog',
                author: 'Test Author',
                url: 'http://localhost:3001/api/blogs',
                likes: 11,
                user: helper.initialUsers[0]._id
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')

            expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        title: 'Test blog',
                        author: 'Test Author',
                        url: 'http://localhost:3001/api/blogs',
                        likes: 11
                    })
                ])
            )
        })

        test('fails if token is not provided', async () => {
            const newBlog = {
                title: 'New one',
                author: 'New Author',
                url: 'http://localhost:3001/api/users',
                likes: 0
            }

            await api
                .post('/api/blogs')
                .send(newBlog)
                .expect(401)
                .expect('Content-Type', /application\/json/)
        })

        test('likes property has 0 value by default if missing', async () => {
            const newBlog = {
                title: 'World class tests',
                author: 'Martin Robert C.',
                url: 'http://blog.cleancoder.com/',
                user: helper.initialUsers[0]._id
            }

            const response = await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(response.body.likes).toEqual(0)
        })

        test('blog without title and url is not added', async () => {
            const newBlog = {
                author: 'New Author',
                likes: 15,
                user: helper.initialUsers[0]._id
            }

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        })
    })

    describe('deletion of a blog', () => {
        test('user can delete his own blog post', async () => {
            await api
                .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(204)

            const response = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

            expect(response.body.length).toBe(helper.initialBlogs.length - 1)
        })
    })

    describe('updating a blog', () => {
        test('succeeds updating likes property for a blog post', async () => {
            const blogs = await helper.blogsInDb()

            const updatedBlog = {
                likes: 54
            }

            await api
                .put(`/api/blogs/${blogs[0].id}`)
                .send(updatedBlog)
                .expect(200)

            const updatedBlogs = await helper.blogsInDb()
            expect(updatedBlogs[0].likes).toBe(54)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})