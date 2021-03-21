import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateGroup from './createGroup'
import '../../application/component/applicationTopBar.scss'
import appActions from '../../../layout/MainLayout/action/user.actions';
const { toggleCollapsed } = appActions;

/* eslint eqeqeq: 0 */
export class GroupsTopBar extends Component {

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
    const { toggleCollapsed, customizedTheme } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    return (
      <div className='tenant-top-bar'>
          <div
            className={
              collapsed ? 'menu-bar-icon menuCollapsed' : 'menu-bar-icon menuOpen'
            }
            style={{ color: customizedTheme.textColor }}
            onClick={toggleCollapsed}
          />
          <div className='txt-tenant-header'>Groups</div>
                
          <div className='btn-add-tenant' onClick={() => { this.openCreateModal() }}>CREATE Group</div>
     
        <CreateGroup
          modal={this.state.createModal}
          toggle={this.toggleCreateModal}
        />
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
)(GroupsTopBar);

