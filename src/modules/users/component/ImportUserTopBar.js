import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateImport from './createImport'
import CreateFaceImport from './createFaceImport'
import './applicationTopBar.scss'
import appActions from '../../../layout/MainLayout/action/user.actions';
const { toggleCollapsed } = appActions;

/* eslint eqeqeq: 0 */
export class ImportUserTopBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      createModal: false,
      createFaceModal: false,
    }
  }

  openCreateModal = () => {
    this.setState({ createModal: true, isEdit: false })
  }

  toggleCreateModal = () => {
    this.setState({ createModal: false })
  }


  openCreateFaceModal = () => {
    this.setState({ createFaceModal: true, isEdit: false })
  }

  toggleCreateFaceModal = () => {
    this.setState({ createFaceModal: false })
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
          <div className='txt-tenant-header'>Import</div>
          <div className='btn-add-tenant' onClick={() => { this.openCreateModal() }}>IMPORT USERS</div>
          <div className='btn-face-tenant' onClick={() => { this.openCreateFaceModal() }}>IMPORT FACES</div>
        <CreateImport
          modal={this.state.createModal}
          toggle={this.toggleCreateModal}
        />
        <CreateFaceImport
          modal={this.state.createFaceModal}
          toggle={this.toggleCreateFaceModal}
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
)(ImportUserTopBar);

