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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}