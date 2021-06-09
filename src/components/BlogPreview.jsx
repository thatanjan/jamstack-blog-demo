import React from 'react'
import Image from 'next/image'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import MuiLink from './Links/MuiLink'

import useApiSWR from '../hooks/useApiSWR'

const BlogPreview = ({
	title,
	createdAt,
	totalViews,
	banner,
	description,
	slug,
	readingTime,
}) => {
	const href = `/blog/${slug}`

	const { data } = useApiSWR(`/api/views/${slug}`)

	return (
		<Card>
			<MuiLink
				MuiComponent={CardHeader}
				title={title}
				subheader={
					<>
						{createdAt}, {data ? data.totalViews : totalViews} views, {readingTime}
					</>
				}
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
