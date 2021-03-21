import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import appActions from '../action/user.actions';
import TopbarWrapper from './topbar.style';
import _ from 'lodash'
import DashBoardTopbar from './dashBoard';
import ApplicationTopBar from '../../../modules/application/component/applicationTopBar';
import UserTopBar from '../../../modules/users/component/UserTopBar';
import ImportUserTopBar from '../../../modules/users/component/ImportUserTopBar';
import GroupsTopBar from '../../../modules/groups/component/GroupsTopBar';
import options from '../Sidebar/options';

const { Header } = Layout;
const { toggleCollapsed } = appActions;

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.getTopBar = this.getTopBar.bind(this);
  }
  getTopBar(page) {
    const { toggleCollapsed, customizedTheme } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    let pageName = page.pathname.split('/');
    const menu = options.find(function (res) { return res.key === _.last(pageName) })
    if (page.pathname.indexOf('detail') > -1) {
      pageName = '';
    }
    if (page.pathname === "/dashboard") {
      return <DashBoardTopbar />;
    }
    else if (page.pathname === "/applications" || page.pathname === "/connections" ) {
      return <ApplicationTopBar pathname={page.pathname.replace('/','')}/>;
    }
    else if (page.pathname === "/users") {
      return <UserTopBar />;
    }
    else if (page.pathname === "/import") {
      return <ImportUserTopBar />;
    }
    else if (page.pathname === "/groups") {
      return <GroupsTopBar />;
    }
    else {
      return (
        <div style={{ width: '100%' }}>
          <div
            className={
              collapsed ? 'leftBtn menuCollapsed' : 'leftBtn menuOpen'
            }
            style={{ color: customizedTheme.textColor }}
            onClick={toggleCollapsed}
          />
          <span className="page_name">{menu ? menu.label : ''}</span>
        </div>
      )
    }
  }
  render() {
    const { customizedTheme, location } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: 'fixed',
      width: '100%',
      height: 70
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? 'platformTopbar collapsed' : 'platformTopbar'
          }
        >
          {this.getTopBar(location)}
        </Header>
      </TopbarWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.APP.App.toJS(),
    customizedTheme: 'themedefault'
  }),
  { toggleCollapsed }
)(Topbar);
