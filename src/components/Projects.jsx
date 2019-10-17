
import React from "react";
import * as utils from "../utils";
import { StyleSheet, css } from "aphrodite";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

let PROJECTS = [
	{
		name: "Akriveia",
		url: "https://github.com/schecko",
		short_description: "An aid for First Responders in minor emergencies to locate employees in buildings.",
		long_description: "Akriveia is a system consisting of a server, beacons, and tags... TODO",
		team_size: 5,
	}
];

class RepoComponent extends React.Component
{
    render() {
		const proj = this.props.proj;

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					{proj.name}
                </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
					<table>
						<tr>
							<td><a href={proj.url}> {proj.url} </a></td>
						</tr>
					</table>
                    {proj.long_description}
                </Typography>
            </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}

export default class GithubIntegration extends React.Component
{
    constructor() {
        super();
        this.state = {};
    }

    render ()
    {
		let repoComponents = PROJECTS.map((proj, index) => {
			return (
				<RepoComponent proj={ proj } key={ index } index={ index }/>
			);
		})

        return (
            <Paper>
                <Typography variant="subheading">
					Notable Projects
                </Typography>
                {repoComponents}
            </Paper>
        );
    }
}
