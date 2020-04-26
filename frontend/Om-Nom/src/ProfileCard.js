import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Card, CardHeader, CardContent, CardActions, CardMedia, IconButton, Typography } from "@material-ui/core";

import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';

const ProfileCard  = props => {
    const { profilePicture, title, follwingIds, firstname, username, photoLinks, userType, bio, nationality } = props;
    return(
        <Card>
        <Grid container>
          <Grid item xs={4}>
            <CardMedia style={{height: "300px", width: "300px"}} image={props.profilePicture}/>
          </Grid>
          <Grid item container xs={8} direction="column" justify="flex-start" alignItems="flex-start">
            <Grid item container xs={4} direction="row" justify="space-between">
              <Grid item>
              <CardHeader 
              title={props.firstname}
              subheader={props.username}/>
              </Grid>
              <Grid item>
              <Typography component="p">{props.follwingIds.length}</Typography>
              <Typography component="p">Followers</Typography>
              </Grid>
              <Grid item>
              <Typography component="p">{props.follwingIds.length}</Typography>
              <Typography component="p">Following</Typography>
              </Grid>
              <Grid item>
              <Typography component="p">{props.userType}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={8}>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">{props.bio}</Typography>
              <Grid container>
                <LocationOnIcon/>
                <Typography component="p">{props.nationality[0]}, {props.nationality[1]}</Typography>
              </Grid>
            </CardContent>
          </Grid>
          </Grid>
        </Grid>
      </Card>
    );

}

export default ProfileCard;