import React, { useState, useRef, useCallback } from 'react';
import ForYouCards from './ForYouCards'
import Grid from '@material-ui/core/Grid';
import FYContent from "./ForYouContent";
import LoadPosts from './LoadPosts'


class ForYou extends React.Component {
    constructor(props) {
      super(props);
  
      // Sets up our initial state
      this.state = {
        error: false

      };
    }

    // 1. Load the people that the user follows
    // 2. Send thoe list of people to request from the DB
    // 3. Load the Posts based on DB info in chronological order 
    // 4. Infinite Posts until end of time

    render() {
        const {
            error
        } = this.state;

        const getForYou = forYouPost => {
            return (
                <Grid item xs={12} sm={6} md={4}>
                    <ForYouCards {...forYouPost}/>
                </Grid>
            );
        };

        return (
            <div style={{marginTop: "30px"}}>
                 <Grid container spacing={2}>
                     {FYContent.map(forYouPost => getForYou(forYouPost))}
                 </Grid>
             </div>
         );
    }
}


 
export default ForYou;