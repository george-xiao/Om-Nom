import React from 'react';
import DiscoverCards from './DiscoverCards'
import ProfileCard from './ProfileCard'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Avatar, Card, CardHeader, CardContent, CardActions, CardMedia, IconButton, Typography } from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
//import DisContent from "./ForYouContent";
import API from "./utils/Api";


class Profile extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: false,
        user: [],
        posts: []
      };
    }

    async componentDidMount() {
      const response = await API.get(`users/5ea4ba1cec987466a0f3ca90/posts`,{});
      const users = await API.get(`users/5ea4ba1cec987466a0f3ca90`,{});
      console.log(users);
      this.setState({posts: response.data,
      user: users.data});
      
    }


    render(){
      const getDiscover = discoverPost => {
        return (
            <Grid item xs={12} sm={6} md={4}>
              <DiscoverCards post={discoverPost}/>
            </Grid>
        );
      };

      const getProfile = profile=> {
        return (
            <Grid item xs={12}>
                <ProfileCard {...profile}/>
            </Grid>
        );
      };

      const curUser = this.state.user;


      return (
        <div style={{marginTop: "30px"}}>
            <Grid container spacing={2} direction="column">
              <Grid item spacing={2} direction="row">
                <Card>
                  <Grid container spacing={2} direction="row">
                    <Grid item xs={4}>
                      <CardMedia style={{height: "300px", width: "300px"}} image={curUser.profilePicture}/>
                    </Grid>
                    <Grid item container xs={8} direction="column">
                      <Grid item xs={2}/>
                      <Grid item container spacing={1} direction="row" justify="space-evenly">
                        <CardHeader 
                          title={curUser.firstName}
                          subheader={curUser.username}/>
                        <Grid>
                          <Typography component="p">460</Typography>
                          <Typography component="p">Followers</Typography>
                        </Grid>
                        <Grid>
                          <Typography component="p">307</Typography>
                          <Typography component="p">Following</Typography>
                        </Grid>
                        <Typography component="p">{curUser.userType}</Typography>
                        </Grid>
                      <Grid item xs={2}/>
                      <Grid item >
                        <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">{curUser.bio}</Typography>
                          <Grid container>
                            <LocationOnIcon/>
                            <Typography component="p">Toronto</Typography>
                          </Grid>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item container spacing={2}>
                  {this.state.posts.map(discoverPost => getDiscover(discoverPost))}
              </Grid>
            </Grid>
            
        </div>
      );
    }

}

export default Profile;