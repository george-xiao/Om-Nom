import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Card, CardHeader, CardContent, CardActions, CardMedia, IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Grid from '@material-ui/core/Grid';

class ForYouCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            likes: 0,
            wasLiked: false,
        };
        this.updateLikes = this.updateLikes.bind(this);
    }

    updateLikes() {
        if (!this.state.wasLiked) {
            this.setState({ wasLiked: true });
            this.setState({ likes: (this.state.likes + 1) });
            console.log(this.props.numLikes);
            console.log(this.state.likes);
        } else {
            this.setState({ wasLiked: false });
            this.setState({ likes: (this.state.likes - 1) });
        }
    }
    componentDidMount() {
        this.setState({ likes: this.props.numLikes });
    }

    // const ForYouCards  = props => {
    render() {
        // function ActionLink() {

        // }
        const { profilePicture, title, userID, dateCreated, numLikes, photoLinks } = this.props;
        return (
            <Card>
                <CardMedia style={{ height: "300px" }} image={photoLinks[0]} title="Cauliflower Pizza" />
                <Grid container>
                    <Grid item xs={8}>
                        <CardHeader
                            avatar={<Avatar src={profilePicture} />}
                            title={title}
                            subheader={userID} />
                        <CardContent>
                            <Typography paragraph>{dateCreated}</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={4}>
                        <CardContent>
                            <Typography paragraph>{this.state.likes}</Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon onClick={this.updateLikes} />
                            </IconButton>
                        </CardActions>
                    </Grid>
                </Grid>

            </Card>
        );
    }

}

export default ForYouCards;