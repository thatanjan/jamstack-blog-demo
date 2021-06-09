import React from 'react'
import Grid from '@material-ui/core/Grid'
import { nanoid } from 'nanoid'

import BlogPreview from '../BlogPreview'

const BlogPreviewLayout = ({ allBlogs }) => {
	return (
		<Grid container spacing={4}>
			{allBlogs.map((blog) => (
				<Grid key={nanoid()} item lg={4}>
					<BlogPreview {...blog} />
				</Grid>
			))}
		</Grid>
	)
}

export default BlogPreviewLayout
