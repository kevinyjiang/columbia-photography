import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import PhotographerPortal from "./PhotographerPortal";
import JobForm from "./JobForm";
import withAuth from "./withAuth";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/hire" component={JobForm} />
            <Route path="/login" component={Login} />
            // <Route path="/jobs/:jobId" component={Login} />
            // props.location.params.jobId
            <Route path="/" component={withAuth(PhotographerPortal)} />
            // <Route path="/forgotPassword/:code"/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

// class ForgotPassword extends Component {
//
//   componentDidMount() {
//     // '/forgotPassword?code=123'
//     const url = new URL(window.location)
//     const code = url.searchParams.get('code')
//     // make ajax request to server validating code
//     // if not valid, show message + redirect
//   }
//
//   submitNewPassword() {
//     // submit code + newPass
//   }
// }
export default App;
