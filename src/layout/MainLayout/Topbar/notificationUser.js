import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Popover } from 'antd';
import TopbarDropdownWrapper from './topbarDropdown.style';
import notipic from '../../../image/flowDesigner/notification.png';

class NotifictationUser extends Component {
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

  }
  handleHelp = () => {
    window.open('http://localhost:3000');
  };

  render() {
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        <a className="isoDropdownLink"> User Notifictation1 </a>
        <a className="isoDropdownLink"> User Notifictation2 </a>
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
      >
        <div>
          <img className="notification-icon" alt="user" src={notipic} />
        </div>
      </Popover>
    );
  }
}
export default connect(null, {})(NotifictationUser);
