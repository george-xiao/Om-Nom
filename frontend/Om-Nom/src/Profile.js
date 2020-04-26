import React from 'react';
import DiscoverCards from './DiscoverCards'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DisContent from "./ForYouContent";
import { Avatar, Card, CardHeader, CardContent, CardActions, CardMedia, IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

function User(props) {
  return (
    <Card>
      <Grid container>
        <Grid item xs={4}>
          <CardMedia style={{height: "300px", width: "300px"}} image={props.imageUrl}/>
        </Grid>
        <Grid item container xs={8} direction="column" justify="flex-start" alignItems="flex-start">
          <Grid item container xs={4} direction="row" justify="space-between">
            <Grid item>
            <CardHeader 
            title={props.name}
            subheader={props.username}/>
            </Grid>
            <Grid item>
            <Typography component="p">{props.type}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={8}>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">{props.bio}</Typography>
            <Grid container>
              <LocationOnIcon/>
              <Typography component="p">{props.loc}</Typography>
            </Grid>
          </CardContent>
        </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}


class Profile extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: false,
        user: ""
      };
    }

    render(){
      const getDiscover = discoverPost => {
        return (
            <Grid item xs={12} sm={6} md={4}>
                <DiscoverCards {...discoverPost}/>
            </Grid>
        );
      };
      return (
        <div style={{marginTop: "30px"}}>
            <Grid container spacing={2} direction="column">
              <Grid item spacing={4} xs={12}>
                <User name="User Name" username="username" imageUrl="./img/blank.png" bio="this is my bio" loc="Toronto" type="chef"/>
              </Grid>
              <Grid item container spacing={2}>
                  {DisContent.map(discoverPost => getDiscover(discoverPost))}
              </Grid>
            </Grid>
            
        </div>
      );
    }

}

export default Profile;