import React from 'react';

class Discover extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: false
      };
    }

    render(){
        return (
            <div>
               <h1>discover</h1>
                <p>discover page body content</p>
            </div>
         );
    }

}
export default Discover;