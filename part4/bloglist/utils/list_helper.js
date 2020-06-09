let _ = require('lodash')

const dummy = (blogs) => {
    if (blogs) {
        return 1
    }
}

const totalLikes = (blogs) => {
    const total = blogs
        .map(blog => blog.likes)
        .reduce((prev, curr) => prev + curr, 0)
    return total
}

const favoriteBlog = (blogs) => {
    let favBlog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    return {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
    }
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
    return {
        author: mostBlogsAuthor,
        blogs: count
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}