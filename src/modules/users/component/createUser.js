import React, { Component } from 'react';
import "../../application/component/createApplication.scss";
import "../../connections/component/createConnection.scss";
import "../../tenant/component/createTenant.scss";
import { Modal, Button, message } from 'antd';
import { TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@material-ui/core';
import { getAllConnection } from '../../connections/action/connection.actions';
import { connect } from 'react-redux';
import { createUser } from '../action/users.actions';

class CreateConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        ConnectionID: '',
        FullName: '',
        PrimaryID: ''
      },
      error: {},
      isSubmit: false
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllConnection());
  }

  handleOk = () => {
    this.setState({ isSubmit: true })
    if (this.validateForm()) {
      const { dispatch } = this.props;
      this.setState({ loading: true });
      const user = this.state.user;
      dispatch(createUser(user))
        .then((res) => {
          if (res.error) {
            return message.error(res.message)
          }
          this.setState({ loading: false });
          this.resetFrom()
          this.props.toggle()
        });
    }
  };

  resetFrom = () => {
    this.setState({
      user: {
        ConnectionID: '',
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

  validateForm = () => {
    const { user } = this.state;
    let error = {};
    if (!user.ConnectionID) {
      error.ConnectionID = true;
    }
    if (!user.FullName) {
      error.FullName = true;
    }
    if (!user.PrimaryID) {
      error.PrimaryID = true;
    }
    this.setState({ error })
    return Object.keys(error).length === 0;
  }

  handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const { user, error } = Object.assign({}, this.state)
    var letters = /^[A-Za-z ]+$/;
    if(name == 'FullName'){
      if(value.match(letters)) {
        user[name] = value;
        error[name] = false;
      }
    } else {
      user[name] = value;
      error[name] = false;
    }
    this.setState({ user, error })
   
  }

  handleSelect = (e) => {
    const { user, error } = Object.assign({}, this.state)
    user['ConnectionID'] = e.target.value;
    error['ConnectionID'] = false
    this.setState({ user, error })
  }

  render() {
    const { error, isSubmit, user } = this.state;
    const { allConnections } = this.props
    return (
      <div>
        <Modal
          className="create-application"
          visible={this.props.modal}
          onCancel={this.handleCancel}
          footer={[
            <div className="footer-box" key="footer">
              <Button className="create-btn" key="back" type="primary" onClick={this.handleOk}>
                CREATE
              </Button>
              <Button className="cancle-btn" key="submit" onClick={this.handleCancel}>
                CANCEL
            </Button>
            </div>
          ]}
        >
          <div className='txt-header'>Create a new user</div>
          <div className='position-rel'>
            <TextField
              error={error.FullName}
              name="FullName"
              value={user.FullName}
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
              error={error.PrimaryID}
              name="PrimaryID"
              value={user.PrimaryID}
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
            <FormControl variant="outlined" className='region-select' error={error.ConnectionID}>
              <InputLabel id="demo-simple-select-outlined-label">
                Connection
              </InputLabel>
              <Select
                labelId="ConnectionID"
                id="demo-simple-select-outlined"
                name="ConnectionID"
                onChange={(e) => this.handleSelect(e)}
                value={user.ConnectionID}
                placeholder="Connection"
              >
                {
                  allConnections.map((conn, index) => {
                    return <MenuItem key={index} value={conn.ConnectionID}>{conn.ConnectionDisplayName}</MenuItem>
                  })
                }
              </Select>
              {error.ConnectionID && <FormHelperText>Required</FormHelperText>}
            </FormControl>
            {isSubmit && !error.ConnectionID && <div className='success-icon position'></div>}
            {error.ConnectionID && <div className='success-icon position error'></div>}
          </div>


        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { allConnections } = state.connection;
  return {
    user,
    allConnections
  }
}
export default connect(mapStateToProps)(CreateConnection);
