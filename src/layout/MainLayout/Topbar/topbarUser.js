import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover } from 'antd';
import userpic from '../../../image/logo-profile.png';
import TopbarDropdownWrapper from './topbarDropdown.style';
import { history } from '../../../helpers';
import { Table, Button, Row, Col, Icon, Menu, Dropdown } from 'antd';
import flag from '../../../image/flag-icon.png';
import create_tenant from '../../../image/ic_CreateTenant.png';
import switch_tenant from '../../../image/ic_SwitchTenant.png';
import setting_icon from '../../../image/ic_Settings.png';
import email_icon from '../../../image/ic_Email.png';
import profile_icon from '../../../image/ic_ViewProfile.png';
import account_user_icon from '../../../image/ic_AccountUsage.png';
import logout_icon from '../../../image/ic_Logout.png';
import { logout } from '../../../modules/user/action/user.actions'

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  logout(e) {
    const { dispatch } = this.props;
    dispatch(logout())
    history.push('/login')
  }
  goToInviteTanant = () => {
    history.push(`/tenant?tab=invite&inviteAdmin=true`)
  };

  goToTanant = () => {
    history.push(`/tenant`)
  }

  render() {
    const { user } = this.props;
    const content = (

      <TopbarDropdownWrapper className="isoUserDropdown">
        <span className="isoDropdownLink menu-tab-heading not-allowed">
          <Icon className="menu-icon-padding1" />
          {user.tenantName && user.tenantName.toUpperCase()}
        </span>
        <span className="isoDropdownLink menu-tab-heading not-allowed">
          <img className="menu-icon-padding" alt="flag" src={flag} width="16"></img>
          {user.region && user.region}
        </span>
        <div className="menu-devider-line"></div>
        <a className="isoDropdownLink" onClick={() => { this.goToTanant() }}>
          <img className="menu-icon-padding" alt="setting-icon" src={setting_icon} width="16"></img>
          Settings
        </a>
        <a className="isoDropdownLink" onClick={this.goToInviteTanant}>
          <img className="menu-icon-padding" alt="create-tenant" src={create_tenant} width="16"></img>
          Invite Admin
        </a>
        <div className="menu-devider-line"></div>
        <a className="isoDropdownLink">
          <img className="menu-icon-padding" alt="email_icon" src={email_icon} width="16"></img>
          <span className="side-menu-email-text">{user.email}</span>
        </a>
        <a className="isoDropdownLink">
          <img className="menu-icon-padding" alt="profile" src={profile_icon} width="16"></img>
          View Profile
        </a>
        <div className="menu-devider-line"></div>
        <a className="isoDropdownLink">
          <img className="menu-icon-padding" alt="account_user_icon" src={account_user_icon} width="16"></img>
          Account Usage
        </a>
        <a className="isoDropdownLink" onClick={this
          .logout
          .bind(this)}>
          <img className="menu-icon-padding" alt="logout_icon" src={logout_icon} width="16"></img>
          Logout
        </a>
      </TopbarDropdownWrapper>

    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
        overlayClassName="user-popover"
      >
        <div className="isoImgWrapper">
          {/* <img alt="user" src={userpic} /> */}
          <div className="login-user-bg" >{user.username && user.username.charAt(0).toUpperCase()}</div>
          <span className="userActivity online" />
        </div>
      </Popover>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user
  }
}
export default connect(mapStateToProps)(TopbarUser);