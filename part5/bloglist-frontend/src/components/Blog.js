import React, { useState } from 'react'

const Blog = ({ blog }) => {
    const [specs, setSpecs] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div onClick={() => setSpecs(!specs)} style={blogStyle}>
            <p>
                {blog.title} / {blog.author}
                <button onClick={() => setSpecs(!specs)}>
                    {specs ? ('hide') : 'view'}
                </button>
            </p>
            {specs ? (
                <>
                    <p><a href={blog.url}>{blog.url}</a></p>
                    <p>
                        {blog.likes} likes
                        <button>like</button>
                    </p>
                    <p>added by {blog.user.name}</p>
                </>
            ) : null}
        </div>
    )
}

export default Blog