import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ForYou from './ForYou';
import Profile from './Profile';
import Discover from './Discover';
import Error from './Error';
import Navigation from './Navigation';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <div>
          <Grid direction="column">
          <Grid item>
            <Navigation />
          </Grid>
          <Grid item container> 
            <Grid item xs={1} sm={2}/>
            <Grid item xs={10} sm={8} >
              <Switch>
                <Route path="/" component={ForYou} exact/>
                <Route path="/foryou" component={ForYou}/>
                <Route path="/discover" component={Discover}/>
                <Route path="/profile" component={Profile}/>
                <Route component={Error}/>
              </Switch>
            </Grid>
            <Grid item xs={1} sm={2}/>
          </Grid>
          </Grid>
        </div> 
        </BrowserRouter>
      </div>
    );
  }

  
}

export default App;
