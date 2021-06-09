import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import SearchBox from '../../components/SearchBox/SearchBox'

const Index = () => {
	return (
		<Grid container justify='center'>
			<Grid
				item
				xs={12}
				component={Typography}
				variant='h2'
				align='center'
				color='secondary'
			>
				Search Blog
			</Grid>

			<Grid item xs={11} md={8}>
				<SearchBox />
			</Grid>
		</Grid>
	)
}

export default Index
