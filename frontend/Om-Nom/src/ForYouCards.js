import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Card, CardHeader, CardContent, CardActions, CardMedia, IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';

const ForYouCards  = props => {
    const { profilePicture, title, userID, dateCreated, numLikes, photoLinks } = props;
    return(
    <Card>
      <CardMedia style={{height: "300px"}} image={photoLinks[0]} title="Cauliflower Pizza"/>
        <Grid container>
            <Grid item xs={8}>
                <CardHeader 
                avatar={<Avatar src={profilePicture} />}
                title={title}
                subheader={userID}/>
                <CardContent>
                    <Typography paragraph>{dateCreated}</Typography>
                </CardContent>
            </Grid>
            <Grid item xs={4}>
                <CardContent>
                    <Typography paragraph>{numLikes}</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Grid>
        </Grid>
      
    </Card>
    );

}

export default ForYouCards;