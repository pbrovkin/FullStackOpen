const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('total likes of empty list is zero', () => {
        const blogs = []

        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(0)
    })

    test('total likes of list with only one blog equals the likes of that blog', () => {
        const result = listHelper.totalLikes([helper.initialBlogs[0]])
        expect(result).toBe(7)
    })

    test('total likes of bloglist equals the sum of likes of each blog', () => {
        const result = listHelper.totalLikes(helper.initialBlogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('from bloglist', () => {
        const result = listHelper.favoriteBlog(helper.initialBlogs)
        expect(result).toEqual({
            title: helper.initialBlogs[2].title,
            author: helper.initialBlogs[2].author,
            likes: helper.initialBlogs[2].likes,
        })
    })
})

describe('author with the most blogs', () => {
    test('from bloglist', () => {
        const result = listHelper.mostBlogs(helper.initialBlogs)
        expect(result).toEqual(
            {
                author: 'Robert C. Martin',
                blogs: 3
            })
    })
})

describe('author with the most likes', () => {
    test('from bloglist', () => {
        const result = listHelper.mostLikes(helper.initialBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})