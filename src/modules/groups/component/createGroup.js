import React, { Component } from 'react';
import "../../application/component/createApplication.scss";
import "../../connections/component/createConnection.scss";
import "../../tenant/component/createTenant.scss";
import { Modal, Button } from 'antd';
import { TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { createGroup }  from '../action/groups.actions';

export class CreateConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {
        GroupName: ''
      },
      error: {},
      isSubmit: false
    }
  }

  handleOk = () => {
    this.setState({ isSubmit: true });
    if (this.validateForm()) {
      const { dispatch } = this.props;
      this.setState({ loading: true });
      const group = this.state.group;
      const reqObj = {
        GroupName: group.GroupName.trim()
      }
      dispatch(createGroup(reqObj))
        .then(() => {
          this.setState({ loading: false });
          this.resetFrom()
          this.props.toggle()
        });
    }
  };

  resetFrom = () => {
    this.setState({
      group: {
        GroupName: ''
      },
      error: {},
      isSubmit: false
    })
  }

  handleCancel = () => {
    this.setState({ connection: {}, error: {}, isSubmit: false })
    this.props.toggle()
  };

  validateForm = () => {
    const { group } = this.state;
    let error = {};
    if (!group.GroupName) {
      error.GroupName = true;
    }
    this.setState({ error })
    return Object.keys(error).length == 0;
  }

  handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const { group, error } = Object.assign({}, this.state)
    group[name] = value;
    error[name] = false
    this.setState({ group, error })
  }

  render() {
    const { error, isSubmit, group } = this.state;
    return (
      <div>
        <Modal
          className="create-application"
          visible={this.props.modal}
          onCancel={this.handleCancel}
          footer={[
            <div className="footer-box">
              <Button className="create-btn" key="back" type="primary" onClick={this.handleOk}>
                CREATE
              </Button>
              <Button className="cancle-btn" key="submit" onClick={this.handleCancel}>
                CANCEL
            </Button>
            </div>
          ]}
        >
          <div className='txt-header'>Create a new Group</div>
          <div className='position-rel'>
            <TextField
              error={error.GroupName}
              name="GroupName"
              value={group.GroupName}
              label="Group Name"
              type="text"
              className='tenant-form-textfield'
              margin="normal"
              variant="outlined"
              helperText={error.GroupName ? 'Required' : ''}
              onChange={(e) => this.handleInput(e)}
            />
            {isSubmit && !error.GroupName && <div className='success-icon position'></div>}
            {error.GroupName && <div className='success-icon position error'></div>}
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
export default connect(mapStateToProps)(CreateConnection);