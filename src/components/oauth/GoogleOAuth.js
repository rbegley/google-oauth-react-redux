import React, {Component} from 'react';
import {GOOGLE_AUTH_CLIENT_ID} from '../../config/oauthApiConfig';
import {connect} from 'react-redux';
import {signIn, signOut} from "../../actions";

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: GOOGLE_AUTH_CLIENT_ID,
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onAuthButtonClicked = () => {
    this.props.isSignedIn ? this.auth.signOut() : this.auth.signIn();
  };

  renderAuthButton() {
    return (
        <button
            onClick={this.onAuthButtonClicked}>
          {this.props.isSignedIn ? 'Sign Out' : 'Sign In'}
        </button>
    )
  }

  render() {
    return (
        <div>
          {this.renderAuthButton()}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);