
import React from "react";
import * as utils from "../utils";
import Octokit from "@octokit/rest";
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

var GITHUB = "https://github.com/schecko";

const octokit = Octokit();

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class RepoComponent extends React.Component 
{
    render() {
        const directRepoLink = this.props.repo.html_url;
        const name = capitalizeFirstLetter(this.props.repo.name);

        return (
            <TableRow>
                <TableCell>
                    <a 
                        href="{ directRepoLink }" 
                        onClick = { () => { utils.openInNewTab(directRepoLink) } }
                    >
                        { name }
                    </a>
                </TableCell>
                <TableCell>{this.props.repo.description}</TableCell>
            </TableRow>
        );
    }
}

export default class GithubIntegration extends React.Component 
{
    constructor() {
        super();
        this.state = {};
    }

    getProjects () 
    {
        const request = {
            username: "schecko",
            type: "all"
        }

        octokit.repos.getForUser(request)
        .then(result => {
            
            // sort the repos by the date they were created
            var sortedData = result.data.sort((a, b) => {
                const datea = new Date(a.created_at).getTime();
                const dateb = new Date(b.created_at).getTime();

                if(datea > dateb) 
                    return -1;
                else if(datea === dateb) 
                    return 0;
                else 
                    return 1;
            });

            // remove repos that have few commits
            var filteredData = sortedData.filter((repo) => {
               if (repo.size > 4000)
                    return true;
                else
                    return false;
            });

            this.setState({ repos: filteredData });
        });
    }

    render () 
    {
        var repoComponents = [];
        if(this.state.repos) {
            repoComponents = this.state.repos.map((repo, index) => {
                return (
                    <RepoComponent repo = { repo } key = { index } index = { index }/>
                );
            })
        } else {
            this.getProjects();
        }

        return <div>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Expansion Panel 1</Typography>
                </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Expansion Panel 2</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Disabled Expansion Panel</Typography>
            </ExpansionPanelSummary>
        </ExpansionPanel>
      </div>;

        return <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <a 
                            href="{ GITHUB }" 
                            onClick = { () => { utils.openInNewTab(GITHUB) } }
                        >
                            { GITHUB }
                        </a>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {repoComponents}
                </TableBody>
            </Table>
        </Paper>;
    }
}