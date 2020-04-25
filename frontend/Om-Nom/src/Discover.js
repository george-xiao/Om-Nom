import React from 'react';


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