import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Card, CardHeader, CardContent, CardActions, CardMedia, IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';
class DiscoverCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
        };
    }

    render() {
        return (
            <div onClick={this.props.handleStateChange(this.props.title)}>
                <Card>
                    <CardMedia style={{ height: "200px" }} image={this.props.photoLinks[0]} title="Cauliflower Pizza" />
                    <Grid container spacing={1}>
                        <Grid item xs={8}>
                            <CardHeader
                                avatar={<Avatar src={this.props.profilePicture} />}
                                title={this.props.title} />
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
            </div>
        );
    }


}

export default DiscoverCards;