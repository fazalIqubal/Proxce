import React, { Component } from 'react';
import TopbarUser from '../Topbar/topbarUser';
import NotifictationUser from '../Topbar/notificationUser';
import { Link } from 'react-router-dom';
import { history } from '../../../helpers';
import options from '../Sidebar/options';

import LogoImage from '../../../image/logo.png';

import Icon1 from '../../../image/ic_1.png';
import Icon2 from '../../../image/ic_2.png';
import Icon3 from '../../../image/ic_3.png';
import Icon4 from '../../../image/ic_4.png';
import Icon1_Active from '../../../image/ic_1_selected.png';
import Icon2_Active from '../../../image/ic_2_selected.png';
import Icon3_Active from '../../../image/ic_3_selected.png';
import Icon4_Active from '../../../image/ic_4_selected.png';
import _ from 'lodash';
import { connect } from "react-redux";

import { setSelectedMenu } from "../action/sideFixedBarAction";


export class SideFixedBar extends Component {

  state = {
    selectedIndex: 0,
    Lists: [
      { id: 1, inActiveIcon: Icon2, activeIcon: Icon2_Active },
      { id: 2, inActiveIcon: Icon3, activeIcon: Icon3_Active },
      { id: 3, inActiveIcon: Icon4, activeIcon: Icon4_Active }
    ]
  }
  componentWillMount() {
    const { location } = this.props;
    const currentItem = _.nth(_.split(location.pathname, '/'), 1);
    const menus = options.find(function (res) { return res.key === currentItem });
    if (menus) {
      this.handleActive((menus.menuid - 1), true);
    }
  }

  handleActive = (index, isSelected) => {
    this.setState({ selectedIndex: index });
    let list = this.state.Lists;
    list = list.map(x => {
      x.active = false;
      return x;
    })
    list[index].active = true;
    this.setState({ Lists: list });

    if (index === 0) {
      if (!isSelected) {
        history.push('/applications')
      }
    }
    if (index === 1) {
      if (!isSelected) {
        history.push('/users')
      }
    }
    if (index === 2) {
      if (!isSelected) {
        history.push('/endpoint')
      }
    }
    this.props.setSelectedMenu(this.state.Lists[index].id)
  }

  render() {
    const { locale, user } = this.props;

    return (
      <div className="leftBar">
        <ul>
          <li>
            <Link to="/dashboard">
              <div className="logo">
                <img alt="logo" src={LogoImage} />
              </div>
            </Link>
          </li>
          {this.state.Lists.map((value, index) => (
            <li onClick={(e) => { this.handleActive(index) }} key={`item-${index}`} className={(value.active ? 'active' : '')}>
              <div className="icon">
                <img alt='' src={value.active ? value.activeIcon : value.inActiveIcon} />
              </div>
            </li>
          ))}
        </ul>
        <div className="profile-button isoUser">
          <div className="notification-box">
            <NotifictationUser />
          </div>
          {user.email && <TopbarUser locale={locale} />}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state, props) => ({
  Selectedmenu: state.fixSideBar.fixSideBarReducer.menuId,
  user: state.authentication.user
});

const mapDispatchToProps = (dispatch, props) => ({
  setSelectedMenu: (id) => dispatch(setSelectedMenu(id))
});

const SideFixedBarContainer = connect(mapStateToProps, mapDispatchToProps)(
  SideFixedBar
);

export default SideFixedBarContainer;

