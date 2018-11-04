import React from 'react';
import GithubIntegration from "./components/GithubIntegration"
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
	  primary: {
		light: '#484848',
		main: '#212121',
		dark: '#000000',
		// contrastText: will be calculated to contrast with palette.primary.main
	  },
	  secondary: {
		light: '#ff6659',
		main: '#d32f2f',
		dark: '#9a0007',
		contrastText: '#ffcc00',
	  },
	  // error: will use the default color
	},
  });

function TabContainer(props) {
	return (
	  <Typography component="div" style={{ padding: 8 * 3 }}>
		{props.children}
	  </Typography>
	);
  }

class App extends React.Component {
	state = {
		currentPage: 0,
	  };
	
	handleChange = (event, value) => {
		this.setState({ current_page: value });
	};
	
	render() {
		const { classes } = this.props;

		return (
	  		<div className="App">
			    <MuiThemeProvider theme={theme}>
					<div>
						<AppBar position="static">
							<Tabs 
								value={this.state.currentPage} 
								onChange={this.handleChange}
							>
								<Tab label="Main" />
								<Tab label="Github" />
								<Tab label="LinkedIn" />
							</Tabs>
						</AppBar>
							{this.state.currentPage === 0 
								&& <TabContainer>Item One</TabContainer>}
							{this.state.currentPage === 1 
								&& <TabContainer>Item Two</TabContainer>}
							{this.state.currentPage === 2 
								&& <TabContainer>Item Three</TabContainer>}
					</div>
					<Button variant="contained" color="primary">
						Hello World
					</Button>
					<Tabs></Tabs>
					<h1> Scott Checko </h1>
					<GithubIntegration />
				</MuiThemeProvider>
	  		</div>
		);
  	}
}

export default App;
