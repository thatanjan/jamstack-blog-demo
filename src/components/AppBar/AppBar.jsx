import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import MuiLink from '../Links/MuiLink'

const Appbar = ({ children }) => {
	return (
		<>
			<AppBar position='static'>
				<Toolbar>
					<Box style={{ flexGrow: 1 }}>
						<MuiLink href='/' MuiComponent={Typography} variant='h6'>
							Cules Blog
						</MuiLink>
					</Box>

					<MuiLink href='/search' MuiComponent={Button} color='inherit'>
						Search
					</MuiLink>
				</Toolbar>
			</AppBar>

			{children}
		</>
	)
}

export default Appbar
