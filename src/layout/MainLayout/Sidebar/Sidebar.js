import React, { Component } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import options from './options';
import Scrollbars from '../utility/customScrollBar.js';
import { Menu } from 'antd';
import SideFixedBar from '../SideFixedBar/sideFixedBar.js';
import SidebarWrapper from './sidebar.style';
import appActions from '../action/user.actions';
import Logo from '../logo';
import _ from 'lodash';

const SubMenu = Menu.SubMenu;
const { Sider } = Layout;

const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} = appActions;
const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  handleClick(e) {
    this.props.changeCurrent([e.key]);
    if (this.props.app.view === 'MobileView') {
      setTimeout(() => {
        this.props.toggleCollapsed();
        this.props.toggleOpenDrawer();
      }, 100);
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };
  getMenuItem = ({ singleOption, submenuStyle, submenuColor }) => {
    const { location } = this.props;
    const { key, label, leftIcon, children } = singleOption;
    const url = stripTrailingSlash(this.props.url);
    const currentItem = location && location.pathname;
    if (children) {
      return (
        <SubMenu
          key={key}
          title={
            <span className="isoMenuHolder" style={submenuColor}>
              <i className={leftIcon} />
              <span className="nav-text">
                {label}
              </span>
            </span>
          }
        >
          {children.map(child => {
            const linkTo = child.withoutDashboard
              ? `/${child.key}`
              : `${url}/${child.key}`;
            return (
              <Menu.Item style={submenuStyle} key={child.key}>
                <Link style={submenuColor} to={linkTo}>
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className={child.leftIcon} />
                    <span className="nav-text">
                      {child.label}
                    </span>
                  </span>
                </Link>
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={key}>
        <Link to={`${url}/${key}`}>
          <span className="isoMenuHolder" style={submenuColor}>
            <i className={leftIcon}></i>
            <span className="nav-text">
              {label}
            </span>
            {(key === 'templates') ? <div className="menu-counter">25</div> : <div></div>}
          </span>
        </Link>
      </Menu.Item>
    );
  };
  render() {
    const { app, toggleOpenDrawer, customizedTheme, height, menuId } = this.props;
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = event => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
      return;
    };
    const styling = {
      backgroundColor: customizedTheme.backgroundColor,
    };
    const submenuStyle = {
      backgroundColor: 'rgba(0,0,0,0.3)',
      color: customizedTheme.textColor,
    };
    const submenuColor = {
      color: customizedTheme.textColor,
    };

    const menus = options.filter(function (res) { return res.menuid === menuId })

    const { location } = this.props;
    const currentItem = _.nth(_.split(location.pathname, '/'),1);

    return (
      <SidebarWrapper>
        <SideFixedBar  {...this.props} />
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width="240"
          className="platformSidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={styling}
        >
          <Logo collapsed={collapsed} menuId={menuId}/>
          <Scrollbars style={{ height: height - 70 }}>
            <Menu
              onClick={this.handleClick}
              theme="dark"
              className="isoDashboardMenu"
              mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={[currentItem]}
              onOpenChange={this.onOpenChange}
            >
              {menus.map(singleOption =>
                this.getMenuItem({ submenuStyle, submenuColor, singleOption })
              )}
            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

export default connect(
  state => ({
    app: state.APP.App.toJS(),
    customizedTheme: 'themedefault',
    height: state.APP.App.toJS().height,
    menuId: state.fixSideBar.fixSideBarReducer.menuId,
  }),
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
)(Sidebar);
