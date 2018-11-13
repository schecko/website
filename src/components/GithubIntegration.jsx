
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
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <a 
                        href="{ directRepoLink }" 
                        onClick = { () => { utils.openInNewTab(directRepoLink) } }
                    >
                        { name }
                    </a>
                </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    {this.props.repo.description}
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

        return (
            <Paper>
                <Typography variant="subheading">
                    Some Recent Projects (Open Source)
                </Typography>
                {repoComponents}
            </Paper>
        );
    }
}