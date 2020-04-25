import React from 'react';
import ForYouCards from './ForYouCards'
import Grid from '@material-ui/core/Grid';
import FYContent from "./ForYouContent";


class ForYou extends React.Component {
    constructor(props) {
      super(props);
  
      // Sets up our initial state
      this.state = {
        error: false,
        hasMore: true,
        isLoading: false,
        users: [],
      };
    }

    render() {
        const {
            error,
            hasMore,
            isLoading,
            users,
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