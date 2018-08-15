
import React from "react";
import * as utils from "../utils";
import { octokit } from "@octokit/rest";

var GITHUB = "https://github.com/schecko";

class RepoComponent extends React.Component 
{
    render() {
        console.log(this.props);
        const directRepoLink = this.props.repo.html_url; 
        return (
            <tr>
                <td><a href="{ directRepoLink }" onClick = { () => { utils.openInNewTab(directRepoLink) } }>{ this.props.repo.name }</a></td>
                <td>{ this.props.repo.description }</td>
            </tr>
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
                    <RepoComponent repo = { repo } key = { index }/>
                );
            })
        } else {
            this.getProjects();
        }

        const tableStyle = {
            border: 1,
            paddingTop: "5px"
        }
        return (
            <div>
                <span>
                    Github:&nbsp;
                </span>
                <span>
                    <a href="{ GITHUB }" onClick = { () => { utils.openInNewTab(GITHUB) } }>{ GITHUB }</a>
                </span>
                
                <table style = { tableStyle }>
                    <caption>Some&nbsp;Recent&nbsp;Projects</caption>
                    
                    <tbody>
                        { repoComponents }
                    </tbody>
                </table>
            </div>
        );
    }
}