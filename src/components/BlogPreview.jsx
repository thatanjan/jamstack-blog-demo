import React from 'react'
import Image from 'next/image'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import MuiLink from './Links/MuiLink'

const BlogPreview = ({ title, createdAt, banner, description, slug }) => {
	const href = `/blog/${slug}`
	return (
		<Card>
			<MuiLink
				MuiComponent={CardHeader}
				title={title}
				subheader={createdAt}
				href={href}
			/>
			<MuiLink MuiComponent={CardMedia} href={href}>
				<Image src={banner} height={1080} width={1920} layout='responsive' />
			</MuiLink>
			<CardContent>
				<Typography variant='body1' color='textSecondary' component='p'>
					{description}
				</Typography>
			</CardContent>
		</Card>
	)
}
export default BlogPreview
