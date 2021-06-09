import React from 'react'
import Grid from '@material-ui/core/Grid'
import { nanoid } from 'nanoid'

import BlogPreview from '../BlogPreview'

const BlogPreviewLayout = ({ allBlogs }) => {
	return (
		<Grid container spacing={4}>
			{allBlogs.map(({ title, slug, banner, description, createdAt }) => (
				<Grid key={nanoid()} item lg={4}>
					<BlogPreview
						{...{
							title,
							banner,
							description,
							createdAt,
							slug,
						}}
					/>
				</Grid>
			))}
		</Grid>
	)
}

export default BlogPreviewLayout
