import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    padding: 0,
    margin: 0,
    marginTop: 15,
    maxWidth: 650,
  },
})

const BlogList = ({ blogs }) => {
  const classes = useStyles()

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table>
        <TableBody>
          {blogs.sort(byLikes).map(blog => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}><i>{blog.title}</i></Link>
              </TableCell>
              <TableCell>
                {blog.author}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList