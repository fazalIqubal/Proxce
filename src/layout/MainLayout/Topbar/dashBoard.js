import React, { Component } from 'react';
import { connect } from 'react-redux';
import appActions from '../action/user.actions';
const { toggleCollapsed } = appActions;

class DashBoardTopbar extends Component {

  render() {
    const { toggleCollapsed, customizedTheme } = this.props;
    const collapsed = this.props.collapsed && !this.props.openDrawer;
    return (
      <div className="page dashbord">
        <div className="isoLeft">
          <button
            className={
              collapsed ? 'leftBtn menuCollapsed' : 'leftBtn menuOpen'
            }
            style={{ color: customizedTheme.textColor }}
            onClick={toggleCollapsed}
          />
        </div>
      </div> 
    );
  }
}

export default connect(
  state => ({
    ...state.APP.App.toJS(),
    customizedTheme: 'themedefault'
  }),
  { toggleCollapsed }
)(DashBoardTopbar);
