import React from 'react';
 

class Profile extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: false
      };
    }

    render(){
        return (
            <div>
               <h1>Profile</h1>
                <p>Profile page body content</p>
            </div>
         );
    }

}

export default Profile;