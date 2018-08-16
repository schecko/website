
import React from "react";
import * as utils from "../utils";
import Octokit from "@octokit/rest";
import { StyleSheet, css } from "aphrodite";

var GITHUB = "https://github.com/schecko";

const octokit = Octokit();

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class RepoComponent extends React.Component 
{
    render() {
        console.log(this.props);
        const directRepoLink = this.props.repo.html_url;
        const name = capitalizeFirstLetter(this.props.repo.name);

        const style = {
            borderBottom: "1px solid black",
        };

        console.log("key: ", this.props.index);

        return (
            <tr style = { style }>
                <td><a href="{ directRepoLink }" onClick = { () => { utils.openInNewTab(directRepoLink) } }>{ name }</a></td>
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
                    <RepoComponent repo = { repo } key = { index } index = { index }/>
                );
            })
        } else {
            this.getProjects();
        }
        
        const padding = "10px";

        const tableStyle = {
            "border": "1px solid black",

            "border-collapse": "collapse",
            "padding": "10px",
            "background": "red"
        };

        const captionStyle = {
            "textAlign": "left",
            "fontSize": "30px",
            "padding": padding,
        };

        return (
            <div>
                <span>
                    Github:&nbsp;
                </span>
                <span>
                    <a href="{ GITHUB }" onClick = { () => { utils.openInNewTab(GITHUB) } }>{ GITHUB }</a>
                </span>
                
                <table style = { tableStyle }>
                    <caption style = { captionStyle }>Some Recent Projects</caption>
                    
                    <tbody>
                        { repoComponents }
                    </tbody>
                </table>
            </div>
        );
    }
}