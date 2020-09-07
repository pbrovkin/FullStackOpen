const dummy = (blogs) => {
    if (blogs) {
        return 1
    }
}

const totalLikes = (blogs) => {
    return blogs.map(blog => blog.likes).reduce((prev, curr) => prev + curr, 0)
}

module.exports = {
    dummy,
    totalLikes
}