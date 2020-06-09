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
    console.log(favBlog)
    return {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes,
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}