import React, {Component} from 'react';
import GoogleAuth from "./components/oauth/GoogleOAuth";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleAuth/>
      </div>
    );
  }
}

export default App;
