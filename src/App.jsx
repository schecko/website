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

const TABS = [
	"Main",
	"GitHub",
	"LinkedIn"
];

class App extends React.Component {


	constructor(props) {
		super(props);
		this.state = {
			currentPage: 0,
		};
	}

	handleChange(event, value) {
		this.setState({ currentPage: value });
	};
	
	render() {
		var body = null;
		switch(this.state.currentPage) {
			default:
			case 0: { 
				body = null; 
			} break;
			case 1: { 
				body = <GithubIntegration/>; 
			} break;
			case 2: { 
				body = null; 
			} break;
		}

		return (
	  		<div className="App">
			    <MuiThemeProvider theme={theme}>
					<div>
						<AppBar position="static">
							<Tabs 
								value={this.state.currentPage} 
								onChange={this.handleChange.bind(this)}
							>
								{TABS.map((tab) => {
									return <Tab label={tab} />;
								})}
							</Tabs>
						</AppBar>
							{body}
					</div>
				</MuiThemeProvider>
	  		</div>
		);
  	}
}

export default App;
