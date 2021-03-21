import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import routes from '../../routes';
import './MainLayout.scss'
import _ from 'lodash';
import AppHolder from "./commonStyle";
import { Layout } from "antd";
import { Debounce } from "react-throttle";
import WindowResizeListener from "react-window-size-listener";
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import appActions from "./action/user.actions";
import themes from "./settings/themes";
import { ThemeProvider } from "styled-components";

const { Content } = Layout;
const { toggleAll } = appActions;
/* eslint eqeqeq: 0 */
export class MainLayout extends Component {
  render() {
    const { user } = this.props;
    const filteredRoutes = _.filter(routes, (route) => {
      return true;//user && route.allowedRoles.indexOf(_.first(user.roles)) > -1
    })
    const { url } = this.props.match;
    const { location } = this.props;
    const { height, selectedTheme } = this.props;

    return (
      <ThemeProvider theme={themes[selectedTheme]}>
        <AppHolder>
          <Layout style={{ height: "100vh" }}>
            <Debounce time="1000" handler="onResize">
              <WindowResizeListener
                onResize={windowSize =>
                  this.props.toggleAll(
                    windowSize.windowWidth,
                    windowSize.windowHeight
                  )
                }
              />
            </Debounce>
            <Topbar url={url} location={location} />
            <Layout style={{ flexDirection: "row", overflowX: "hidden" }}>
              <Sidebar url={url} {...this.props} />
              <Layout
                className="platformContentMainLayout"
                style={{
                  height: height
                }}
              >
                <Content
                  className="platformContent"
                  style={{
                    padding: "70px 0 0",
                    flexShrink: "0",
                    background: "#f1f3f6",
                    position: "relative"
                  }}
                >
                  <Switch>
                    {
                      filteredRoutes.map((route, idx) => {
                        return route.component ? (<Route key={idx} path={route.path} exact={route.exact}
                          name={route.name}
                          render={props => (
                            localStorage.getItem('user')
                              ? <route.component {...props} />
                              : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                          )} />)
                          : (localStorage.getItem('user')
                            ? ''
                            : <Redirect key={idx} to={{ pathname: '/login' }} />);
                      })
                    }

                    {
                      (!user || !user.accesstoken) &&
                      <Redirect to={{ pathname: '/login' }} />
                    }
                    {
                      user && user.accesstoken &&
                      <Redirect from="/" to="/applications" />
                    }

                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </AppHolder>
      </ThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user,
    selectedTheme: 'themedefault',
    height: state.APP.App.toJS().height
  }
}

export default connect(
  mapStateToProps,
  { toggleAll }
)(MainLayout);
