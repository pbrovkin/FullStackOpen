let _ = require('lodash')

const dummy = (blogs) => {
    return blogs ? 1 : 0
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((prev, curr) => prev + curr, 0)
}

const favoriteBlog = (blogs) => {
    const favBlog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    const result = {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    }
    return result
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const mostBlogsAuthor = _.head(_(authors)
        .countBy()
        .entries()
        .maxBy(_.last))
    let count = 0
    blogs.forEach(blog => {
        if (blog.author === mostBlogsAuthor) {
            count = count + 1
        }
    })
    const result = {
        author: mostBlogsAuthor,
        blogs: count
    }
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}