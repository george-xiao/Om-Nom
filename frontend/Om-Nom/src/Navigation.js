import React from 'react';
import './Nav.css';
import { NavLink, Redirect } from 'react-router-dom';
import blank from './img/blank.png'; 
import API from "./utils/Api";
 
class Navigation extends React.Component {
    constructor() {
        super();
        this.state = {
          value: "",
          search: "",
          user:{},
          submitted: false
        };

      this.handleChange = this.handleChange.bind(this);
      this.keyPress = this.keyPress.bind(this);
      }

    async componentDidMount(){
    const response = await API.get('users/5ea4ba1cec987466a0f3ca90');
    this.setState({user: response.data});
    //console.log(response.data);
    }
    
    keyPress(e){
        if(e.keyCode == 13){
           console.log('value', e.target.value);
           // put the login here
           this.setState({search: e.target.value,
            submitted: true
        });
           
           
        }
     }

     handleChange(e) {
        this.setState({ value: e.target.value });
     }

    render(){
        if (this.state.submitted) {
            return (
              <Redirect to="/discover" tag={this.state.search}/>
            )
          }
        return (
            <div className="App-header">
                <h1 className="Dm-serif" id="title">Om Nom</h1>
                <div className="Red-hat Medium Navs">
                    <NavLink to="/foryou" className="Navlink" activeClassName="Bold">For You</NavLink>
                    <NavLink to="/discover" className="Navlink" activeClassName="Bold">Discover</NavLink>
                    <NavLink to="/profile"className="Navlink" activeClassName="Bold">Profile</NavLink>
                </div>
                <div className="User-interaction">
                    <input
                        value={this.state.value} 
                        onChange={this.handleChange}
                        onKeyDown={this.keyPress} 
                        type="text"
                        className="Red-hat Medium"
                        style={{
                            width: "10vw",
                            margin: "10px"
                        }}
                        placeholder="I want to cook..."
                        />
                    <button style={{
                            margin: "10px"
                        }}>New Post</button>
                    <img className="Dp-pic" src={this.state.user.profilePicture} alt={blank} />
                </div>
            </div>
        );
    };
    
}
 
export default Navigation;