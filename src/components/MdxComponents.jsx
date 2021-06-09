import Image from 'next/image'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import MuiLink from './Links/MuiLink'
import CodeBlock from './CodeBlock'

const headerElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

const Iframe = ({ videoID, title }) => {
	return (
		<iframe
			{...{ title, src: `https://www.youtube.com/embed/${videoID}` }}
			frameBorder='0'
			allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
			allowFullScreen
			style={{ width: '100%', height: '50vh' }}
		/>
	)
}

let components = { Iframe, code: CodeBlock }

headerElements.forEach((item) => {
	components[item] = (props) => <Typography variant={item} {...props} />
})

components.p = (props) => (
	<Typography variant='body1' {...props} style={{ padding: '0.4rem 0' }} />
)

components.ul = (props) => (
	<List component='ul' {...props} style={{ listStyle: 'disc' }} />
)
components.ol = (props) => (
	<List component='ol' {...props} style={{ listStyle: 'decimal' }} />
)

components.li = ({ children, ...props }) => (
	<ListItem {...props} style={{ display: 'list-item' }}>
		<ListItemText primary={children} />
	</ListItem>
)

components.img = ({ src }) => (
	<Image
		src='dfdf'
		loader={() => src}
		width={1920}
		height={1080}
		layout='responsive'
	/>
)

components.a = (props) => {
	return (
		<MuiLink
			MuiComponent={Typography}
			style={{ fontSize: 'inherit' }}
			{...props}
		/>
	)
}

export default components
