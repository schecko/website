import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

export default class Main extends React.Component 
{
    constructor() {
        super();
        this.state = {};
    }

    render () 
    {
        return (
            <Paper>
                <Typography variant="subheading">
                    Hello
                </Typography>
            </Paper>
        );
    }
}