import React, { Component } from 'react';
import "../../tenant/component/createTenant.scss";
import { Modal, Button, Select, Spin, message } from 'antd';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { getUsersForDropdown, inviteCognitoUser } from '../../users/action/users.actions';
import _ from 'lodash';

class InviteTenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: '',
      fetching: false,
      invite: {
        FullName: '',
        PrimaryID: '',
        Email: ''
      },
      error: {},
      isSubmit: false
    }
    this.lastFetchId = 0;
  }


  fetchUser = value => {
    const { dispatch } = this.props;
    const self = this;

    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      searchValue: value,
      typingTimeout: setTimeout(function () {
        if (self.state.searchValue.length > 2) {
          self.setState({ data: [], fetching: true });
          dispatch(getUsersForDropdown({ search: self.state.searchValue }, false))
            .then((data) => {
              let orginalResult = Object.assign([], data);
              data = data.map(user => ({
                text: `${user.FullName} ${user.PrimaryID}`,
                value: user.OloID,
              }));
              self.setState({ data, fetching: false, orginalResult });
            })
        }

      }, 1000)
    });


  };
  handleChange = value => {
    const selectedUser = _.find(this.state.orginalResult, (res) => { return res.OloID == value });
    let params = {
      selectedUser,
      data: [],
      fetching: false,
      value
    }
    if ((selectedUser && selectedUser.OloID)) {
      params.invite = {
        FullName: selectedUser.FullName || '',
        PrimaryID: selectedUser.PrimaryID || '',
        Email: selectedUser.Email || ''
      }
      params.value = selectedUser.FullName
    }
    this.setState({
      ...params
    });
  }

  validateForm = () => {
    const { invite } = this.state;
    let error = {};
    if (!invite.Email) {
      error.Email = true;
    }
    if (!invite.FullName) {
      error.FullName = true;
    }
    if (!invite.PrimaryID) {
      error.PrimaryID = true;
    }
    this.setState({ error })
    return Object.keys(error).length === 0;
  }

  handleOk = () => {
    this.setState({ isSubmit: true })
    if (this.validateForm()) {
      const { dispatch } = this.props;
      this.setState({ loading: true });
      const user = this.state.invite;
      dispatch(inviteCognitoUser(user))
        .then((res) => {
          if (res.error) {
            message.error(res.message);
            return;
          }
          this.setState({ loading: false });
          this.resetFrom()
          this.props.toggle()
        });
    }
  };

  resetFrom = () => {
    this.setState({
      invite: {
        Email: '',
        FullName: '',
        PrimaryID: ''
      },
      error: {},
      isSubmit: false
    })
  }

  handleCancel = () => {
    this.resetFrom();
    this.props.toggle()
  };


  handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const { invite, error } = Object.assign({}, this.state)
    invite[name] = value;
    error[name] = false
    this.setState({ invite, error })
  }

  handleSelect = (type) => {
    const { invite, error } = Object.assign({}, this.state)
    invite['connection_name'] = type;
    error['connection_name'] = false
    this.setState({ invite, error })
  }


  render() {

    const { error, isSubmit, invite } = this.state;
    const { Option } = Select;
    const { fetching, data, value } = this.state;
    return (
      <div>
        <Modal
          className="invite-tenant"
          visible={this.props.modal}
          onCancel={this.handleCancel}
          footer={[
            <div className="footer-box">
              <Button className="create-btn" key="back" type="primary" onClick={this.handleOk}>
                INVITE
              </Button>
              <Button className="cancle-btn" key="submit" onClick={this.handleCancel}>
                CANCEL
            </Button>
            </div>
          ]}
        >

          <div className='txt-header'>Invite Tenant Admin</div>
          <div className='position-rel'>
            <div className="user-list-box">
              <div className='search-icon-box'>
                <div className='search-icon'></div>
              </div>
              <Select
                mode="combobox"
                className='tenant-form-textfield'
                optionLabelProp="label"
                value={value}
                placeholder="Search by Name or Primary ID"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={this.fetchUser}
                onChange={this.handleChange}
                style={{ width: '100%' }}
              >
                {data.map(d => (
                  <Option key={d.value} label={d.text}>{d.text}</Option>
                ))}
              </Select>
            </div>
          </div>
          <div className='position-rel'>
            <TextField
              disabled
              error={error.FullName}
              name="FullName"
              value={invite.FullName}
              label="Full Name"
              type="text"
              className='tenant-form-textfield'
              margin="normal"
              variant="outlined"
              helperText={error.FullName ? 'Required' : ''}
              onChange={(e) => this.handleInput(e)}
            />
            {isSubmit && !error.FullName && <div className='success-icon position'></div>}
            {error.FullName && <div className='success-icon position error'></div>}
          </div>
          <div className='position-rel'>
            <TextField
              disabled
              error={error.PrimaryID}
              name="PrimaryID"
              value={invite.PrimaryID}
              label="Primary ID"
              type="text"
              className='tenant-form-textfield'
              margin="normal"
              variant="outlined"
              helperText={error.PrimaryID ? 'Required' : ''}
              onChange={(e) => this.handleInput(e)}
            />
            {isSubmit && !error.PrimaryID && <div className='success-icon position'></div>}
            {error.PrimaryID && <div className='success-icon position error'></div>}
          </div>
          <div className='position-rel'>
            <TextField
              disabled
              error={error.Email}
              name="Email"
              value={invite.Email}
              label="Tenant Admin Email"
              type="email"
              className='tenant-form-textfield'
              margin="normal"
              variant="outlined"
              helperText={error.Email ? 'Required' : ''}
              onChange={(e) => this.handleInput(e)}
            />
            {isSubmit && !error.Email && <div className='success-icon position'></div>}
            {error.Email && <div className='success-icon position error'></div>}
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user
  }
}
export default connect(mapStateToProps)(InviteTenant);