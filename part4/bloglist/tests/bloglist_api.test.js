const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = helper.initialBlogs
            .map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    //the same with mongoose 'insertMany' method
    /* beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    }) */

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

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
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

    describe('updating a blog', () => {
        test('succeeds updating likes property for a blog post', async () => {
            const blogs = await helper.blogsInDb()

            const updatedBlog = {
                likes: 34
            }

            await api
                .put(`/api/blogs/${blogs[0].id}`)
                .send(updatedBlog)
                .expect(200)

            const updatedBlogs = await helper.blogsInDb()
            expect(updatedBlogs[0].likes).toBe(34)
        })
    })

    describe('when there is initially one user at db', () => {
        beforeEach(async () => {
            await User.deleteMany({})
            const user = new User({ username: 'root', password: 'sekret' })
            await user.save()
        })

        test('creation succeeds with a fresh username', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'mluukkai',
                name: 'Matti Luukkainen',
                password: 'salainen',
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

            const usernames = usersAtEnd.map(u => u.username)
            expect(usernames).toContain(newUser.username)
        })

        test('creation fails with proper statuscode and message if username already taken', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'root',
                name: 'Superuser',
                password: 'salainen',
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('`username` to be unique')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })

        test('creation fails with proper statuscode and message if username is less than 3 characters long', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'te',
                name: 'name',
                password: 'password',
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain(`is shorter than the minimum allowed length (3)`)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })

        test('creation fails with proper statuscode and message if password is less than 3 characters long', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'test',
                name: 'name',
                password: '',
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            expect(result.body.error).toContain('password missing or must be at least 3 characters')

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})