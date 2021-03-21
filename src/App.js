import React, { Component } from 'react';
import './App.scss';
import ErrorBoundary from './helpers/ErrorBoundary';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { history } from './helpers/history';
import MainLayout from './layout/MainLayout';
import Login from './modules/user/component/login';
import ChangePassword from './modules/user/component/changePassword';
import Authentication from './modules/user/component/authentication';
import ResetPassword from './modules/user/component/resetPassword';
import _ from "lodash";
import loader from './image/loader.gif';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="App">

          <div className="ui_block ui-block-loader" id="ui_block">
            <div style={{
              margin: "auto",
              maxHeight: "100%"
            }}>
              <div>
                <img src={loader} alt="" />
              </div>
            </div>
          </div>

          <Router history={history}>
            <Switch>
              <Redirect exact={true} from='/' to='/login' />
              <Route exact path='/login' name='Login Page' component={Login} />
              <Route exact path='/changePassword' name='ChangePassword' component={ChangePassword} />
              <Route exact path='/authentication' name='Authentication' component={Authentication} />
              <Route exact path='/resetPassword' name='ResetPassword' component={ResetPassword} />
              <Route exact path="/register" name="Register Page" component={(e) => { return <h3>Register Page</h3> }} />
              <Route exact path="/500" name="Page 500" component={(e) => { return <h3>not found</h3> }} />
              <Route exact path="/404" name="Page 404" component={(e) => { return <h3>not found</h3> }} />
              <Route path="/" name="Home" component={MainLayout} />
            </Switch>
          </Router>
        </div>
      </ErrorBoundary>
    );
  }
}
