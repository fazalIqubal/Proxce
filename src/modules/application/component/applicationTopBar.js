import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateApplication from './createApplication'
import CreateConnection from '../../connections/component/createConnection'
import './applicationTopBar.scss'

import appActions from '../../../layout/MainLayout/action/user.actions';
const { toggleCollapsed } = appActions;

/* eslint eqeqeq: 0 */
export class ApplicationTopBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createModal: false
    }
  }

  openCreateModal = () => {
    this.setState({ createModal: true, isEdit: false })
  }

  toggleCreateModal = () => {
    this.setState({ createModal: false })
  }

  render() {
    const { toggleCollapsed, customizedTheme, pathname } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    let buttonName = 'application';
    switch (pathname) {
      case 'connections':
        buttonName = 'connection';
        break;

      default:
        break;
    }
    return (
      <div className='tenant-top-bar'>
        {/* <div className='left-bar'> */}
        <div
          className={
            collapsed ? 'menu-bar-icon menuCollapsed' : 'menu-bar-icon menuOpen'
          }
          style={{ color: customizedTheme.textColor }}
          onClick={toggleCollapsed}
        />
        <div className='txt-tenant-header'>{pathname}</div>
        {/* </div> */}
        {/* <div className='btn-box'> */}
        <div className='btn-add-tenant' onClick={() => { this.openCreateModal() }}>CREATE {buttonName}</div>
        {/* </div> */}

        {pathname == 'applications' && <CreateApplication
          modal={this.state.createModal}
          toggle={this.toggleCreateModal}
        />}

        {pathname == 'connections' && <CreateConnection
          modal={this.state.createModal}
          toggle={this.toggleCreateModal}
        />}
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.APP.App.toJS(),
    customizedTheme: 'themedefault',
    ...state.authentication
  }),
  { toggleCollapsed }
)(ApplicationTopBar);

