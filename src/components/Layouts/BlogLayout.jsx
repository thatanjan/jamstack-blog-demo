import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'

const useStyles = makeStyles({
	bannerStyle: {
		margin: '3rem 0',
	},
	paddingBottom: {
		paddingBottom: '1rem',
	},
})

const BlogLayout = ({
	children,
	banner,
	title,
	createdAt,
	description,
	totalViews,
	readingTime,
}) => {
	const { bannerStyle, paddingBottom } = useStyles()

	return (
		<Grid container justify='center'>
			<Grid item xs={11} md={8}>
				<div className={bannerStyle}>
					<Image src={banner} height={1080} width={1920} />
				</div>

				<Typography
					align='center'
					variant='h3'
					component='h1'
					className={paddingBottom}
				>
					{title}
				</Typography>

				<Grid container justify='space-evenly' className={paddingBottom}>
					<Grid item>
						<Typography variant='h6'>{createdAt}</Typography>
					</Grid>
					<Grid item>
						<Typography variant='h6'>{readingTime}</Typography>
					</Grid>
					<Grid item>
						<Typography variant='h6'>{totalViews} views</Typography>
					</Grid>
				</Grid>

				<Typography variant='h6' component='p' className={paddingBottom}>
					{description}
				</Typography>

				{children}
			</Grid>
		</Grid>
	)
}

export default BlogLayout
