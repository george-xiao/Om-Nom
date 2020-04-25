import React from 'react';
import ForYouCards from './ForYouCards'
import Grid from '@material-ui/core/Grid';
import FYContent from "./ForYouContent";



const ForYou = () => {
    const getForYou = forYouPost => {
        return (
            <Grid item xs={4}>
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
 
export default ForYou;