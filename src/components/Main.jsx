import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

export default class Main extends React.Component
{
    constructor() {
        super();
        this.state = {};
    }

    render ()
    {
		let item_props = {
			xs: 10,
			sm: 10,
			md: 10,
			lg: 5,
			xl: 5,
		};
        return (
			<Typography variant="subheading" width="10%">
				<Container>
				  <Grid container spacing={3}>
					<Grid item {...item_props} >
					  <Paper >
						hello world 1
					  </Paper>
					</Grid>
					<Grid item {...item_props} >
					  <Paper>
						hello world 2
					  </Paper>
					</Grid>
					<Grid item {...item_props} >
					  <Paper>
						hell world 3
					  </Paper>
					</Grid>
				  </Grid>
				</Container>
			</Typography>
        );
    }
}
