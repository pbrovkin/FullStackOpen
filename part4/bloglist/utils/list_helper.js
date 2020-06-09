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

module.exports = {
    dummy,
    totalLikes
}