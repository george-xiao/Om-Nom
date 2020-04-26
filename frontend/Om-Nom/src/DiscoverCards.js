import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Card, CardHeader, CardContent, CardActions, CardMedia, IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';

const DiscoverCards  = props => {
    const { avatarUrl, title, imageUrl } = props;
    return(
    <Card>
      <CardMedia style={{height: "200px"}} image={imageUrl} title="Cauliflower Pizza"/>
        <Grid container>
            <Grid item xs={8}>
                <CardHeader 
                avatar={<Avatar src={avatarUrl} />}
                title={title}/>
            </Grid>
            <Grid item xs={4}>
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

export default DiscoverCards;