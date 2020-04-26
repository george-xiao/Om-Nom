import React from 'react';
import DiscoverCards from './DiscoverCards'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DisContent from "./ForYouContent";
import { Typography } from '@material-ui/core';

/* 
    0. If there is a search, it is checked and directed to the Discover Page
        0-1. Yes search : Load Relevent results to the page
        0-2. No search: Load Posts based on tags that the user most frequently likes
    1. The user can eliminate choices shown based on tags, cuisine and experience
    2. Send the list of tags to request from the DB
    3. Infinite Posts until end of time
*/


class Discover extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: false,
        keys: []
      };
    }


    tagSelect = tagVal => {
        if (!this.state.keys.includes(tagVal)){
            this.setState({ keys: this.state.keys.concat(tagVal)});
            //Call BE with new keys
        }
    }

    tagUnselect = tagVal => {
        for (var i = 0; i < this.state.keys.length; i++){
            console.log(this.state.keys[i]);
            console.log(tagVal);
            if (this.state.keys[i] == tagVal){
                this.state.keys.splice(i,1);
                this.setState({ keys:this.state.keys });
                //Call BE with new keys
            }
        }
    }


    render(){
        
        const cusine = ["Japanese", "Korean", "Italian", "Indian", "Chinese", "American"];
        const tags = ["Keto", "Keto", "Keto", "Keto","Keto", "Keto"];
        const exp = ["resturant", "chef", "novice","home-cooked", "beginner"];

        const getDiscover = discoverPost => {
            return (
                <Grid item xs={12} sm={6} md={4}>
                    <DiscoverCards {...discoverPost}/>
                </Grid>
            );
        };


        const getTags = tagInput => {
            return (
                <Grid item>
                    <Button 
                        fullWidth="true" 
                        variant="contained" 
                        onClick={() => this.tagSelect(tagInput)}>{tagInput}</Button>
                </Grid>
            );
        };

        const disTags = tagInput => {
            return (
                <Grid item xs="3" >
                    <Button 
                        fullWidth="true" 
                        variant="contained" 
                        color="primary"
                        onClick={() => this.tagUnselect(tagInput)}>{tagInput}</Button>
                </Grid>
            );
        };




        return (
            <div style={{marginTop: "30px"}}>
            <Grid container spacing={3} >
                <Grid item container spacing={4} xs="3" direction="column">
                    <Grid item container spacing={2} direction="column">
                        <Grid item>
                        <Typography>Cuisine</Typography>
                        </Grid>
                        {cusine.map(tagInput => getTags(tagInput)).slice(0,4)}
                    </Grid>
                    <Grid item container spacing={2} direction="column">
                        <Grid item>
                        <Typography>Tags</Typography>
                        </Grid>
                        {tags.map(tagInput => getTags(tagInput)).slice(0,4)}
                    </Grid>
                    <Grid item container spacing={2} direction="column">
                        <Grid item>
                        <Typography>Experience</Typography>
                        </Grid>
                        {exp.map(tagInput => getTags(tagInput)).slice(0,4)}
                    </Grid>
                </Grid>
                <Grid item container spacing={2} xs="9" direction="column">
                    <Grid item container spacing={1}>
                        <Typography paragraph>Tags:</Typography>
                        {this.state.keys.map(tagInput => disTags(tagInput))}
                    </Grid>
                    <Grid item container spacing={1}>
                        {DisContent.map(discoverPost => getDiscover(discoverPost))}
                    </Grid>
                </Grid>
            </Grid>
        </div>
         );
    }

}
export default Discover;