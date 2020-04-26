import React from 'react';
import DiscoverCards from './DiscoverCards'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
//import DisContent from "./ForYouContent";
import InfiniteScroll from "react-infinite-scroll-component";
import Modal, { closeStyle } from 'simple-react-modal'
import CloseIcon from '@material-ui/icons/Close';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

// import DisContent from "./ForYouContent";
import { Typography, Card } from '@material-ui/core';


import API from "./utils/Api";

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
            keys: [],
            posts: [],
            page: 0,
            show: false,
            activePost: {},
        };
    }


    async componentDidMount() {
        const newPost = await this.getPostsFromApi();
        this.setState({ posts: newPost });
        console.log(this.state.posts);
    }

    async getPostsFromApi() {
        const response = await API.get(`users/5ea4ba1cec987466a0f3ca90/posts/recommended/${this.state.page}`);
        // console.log(response.data);
        let posts = [];
        for (const post of response.data) {
            let profilePicture = await this.getUserProfilePic(post.userId);
            posts.push({ profilePicture, ...post });
        }
        // console.log(posts);
        return posts;
    }

    async getUserProfilePic(id) {
        const response = await API.get(`users/${id}/profilePicture`);
        // console.log(response.data);

        return response.data;
    }

    fetchMoreData = async () => {
        this.setState({ page: (this.page + 1) }); //increment page
        const newPost = await this.getPostsFromApi();
        this.setState({
            posts: this.state.posts.concat(newPost),
        })
    }

    tagSelect = tagVal => {
        if (!this.state.keys.includes(tagVal)) {
            this.setState({ keys: this.state.keys.concat(tagVal) });
            //Call BE with new keys
        }
    }

    tagUnselect = tagVal => {
        for (var i = 0; i < this.state.keys.length; i++) {
            console.log(this.state.keys[i]);
            console.log(tagVal);
            if (this.state.keys[i] == tagVal) {
                this.state.keys.splice(i, 1);
                this.setState({ keys: this.state.keys });
                //Call BE with new keys
            }
        }
    }
    show() {
        this.setState({ show: true })
    }

    close() {
        this.setState({ show: false })
    }

    render() {
        const cusine = ["Japanese", "Korean", "Italian", "Indian", "Chinese", "American"];
        const tags = ["Keto", "Keto", "Keto", "Keto", "Keto", "Keto"];
        const exp = ["resturant", "chef", "novice", "home-cooked", "beginner"];

        const getDiscover = discoverPost => {
            return (
                <Grid item xs={12} sm={6} md={4} onClick={this.show.bind(this)}>
                    <DiscoverCards {...discoverPost} />
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
            <div style={{ marginTop: "30px" }}>
                <Modal
                    className="modal" //this will completely overwrite the default css completely//overwrites the default background
                    containerStyle={{ background: 'blue' }} //changes styling on the inner content area
                    containerClassName="test"
                    closeOnOuterClick={true}
                    show={this.state.show}
                    onClose={this.close.bind(this)} transitionSpeed={1000}>
                    <Card>

                        <CardHeader
                            action={
                                <IconButton aria-label="close">
                                    <CloseIcon onClick={this.close.bind(this)}/>
                                </IconButton>
                            }
                            title="Shrimp and Chorizo Paella"
                            subheader="September 14, 2016"
                        />
                        <CardMedia
                            className = 'media'
                            image="https://storage.googleapis.com/example_bucket_1_calhacks_practice/pp9.jpg"
                            title="Paella dish"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
                        </CardContent>
                    </Card>

                </Modal>
                <Grid container spacing={3} >
                    <Grid item container spacing={4} xs="3" direction="column">
                        <Grid item container spacing={2} direction="column">
                            <Grid item>
                                <Typography>Cuisine</Typography>
                            </Grid>
                            {cusine.map(tagInput => getTags(tagInput)).slice(0, 4)}
                        </Grid>
                        <Grid item container spacing={2} direction="column">
                            <Grid item>
                                <Typography>Tags</Typography>
                            </Grid>
                            {tags.map(tagInput => getTags(tagInput)).slice(0, 4)}
                        </Grid>
                        <Grid item container spacing={2} direction="column">
                            <Grid item>
                                <Typography>Experience</Typography>
                            </Grid>
                            {exp.map(tagInput => getTags(tagInput)).slice(0, 4)}
                        </Grid>
                    </Grid>
                    <Grid item container spacing={2} xs="9" direction="column">
                        <Grid item container spacing={1}>
                            <Typography paragraph>Tags:</Typography>
                            {this.state.keys.map(tagInput => disTags(tagInput))}
                        </Grid>
                        <Grid item container spacing={1}>
                            <InfiniteScroll
                                dataLength={this.state.posts.length}
                                next={this.fetchMoreData}
                                hasMore={true}
                                loader={<h4>Loading...</h4>}
                            >
                                <Grid item container spacing={1}>
                                    {this.state.posts.map(discoverPost => getDiscover(discoverPost))}
                                </Grid>
                            </InfiniteScroll>
                        </Grid>
                    </Grid>
                </Grid>

            </div>
        );
    }







    // render() {

    //     const cusine = ["Japanese", "Korean", "Italian", "Indian", "Chinese", "American"];
    //     const tags = ["Keto", "Keto", "Keto", "Keto", "Keto", "Keto"];
    //     const exp = ["resturant", "chef", "novice", "home-cooked", "beginner"];

    //     // const getDiscover = discoverPost => {
    //     //     return (
    //     //         <Grid item xs={12} sm={6} md={4}>
    //     //             <DiscoverCards {...discoverPost} />
    //     //         </Grid>
    //     //     );
    //     // };



}
export default Discover;