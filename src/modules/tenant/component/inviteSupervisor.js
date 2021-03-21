import React, { Component } from 'react';
import "../../application/component/createApplication.scss";
import "../../connections/component/createConnection.scss";
import "../../tenant/component/createTenant.scss";
import { Modal, Button } from 'antd';
import { TextField, Select, MenuItem,  InputLabel, FormControl,  FormHelperText } from '@material-ui/core';

class InviteSupervisor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      InviteSupervisor:{
      },
      error:{},
      isSubmit:false
    }
  }

  handleOk = () => {
    this.validateForm();
    this.setState({isSubmit:true})
  };

  handleCancel = () => {
    this.setState({connection:{}, error:{},isSubmit:false})
    this.props.toggle()
  };


  handleInput=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    const { invite, error } = Object.assign({}, this.state)
    invite[name]= value;
    error[name] = false
    this.setState({invite, error})
  }

  handleSelect=(type)=>{
    const { invite, error } = Object.assign({}, this.state)
    invite['connection_name']= type;
    error['connection_name'] = false
    this.setState({invite, error})
  }

  render() {

    const { error, isSubmit, user } = this.state;

    return (
      <div>
        <Modal
          className="create-application"
          visible={this.props.modal}
          onCancel={this.handleCancel}
          footer={[
            <div className="footer-box">
              <Button className="create-btn" key="back" type="primary" onClick={this.handleOk}>
                INVITE
              </Button>
              <Button className="cancle-btn" key="submit"  onClick={this.handleCancel}>
                CANCEL
            </Button>
            </div>
          ]}
        >
          <div className='txt-header'>Invite Supervisor</div>
          <div className='position-rel'>
            <TextField
              error={error.admin_name}
              name="admin_name"
              label="Supervisor Name"
              type="text"
              className='tenant-form-textfield'
              margin="normal"
              variant="outlined"
              helperText={error.admin_name? 'Required':''}
              onChange={(e)=>this.handleInput(e)}
            />
            {isSubmit && !error.admin_name && <div className='success-icon position'></div>}
            {error.admin_name && <div className='success-icon position error'></div>}
          </div>
          <div className='position-rel'>
            <TextField
              error={error.admin_name}
              name="admin_email"
              label="Supervisor Email"
              type="email"
              className='tenant-form-textfield'
              margin="normal"
              variant="outlined"
              helperText={error.admin_email? 'Required':''}
              onChange={(e)=>this.handleInput(e)}
            />
            {isSubmit && !error.admin_email && <div className='success-icon position'></div>}
            {error.admin_email && <div className='success-icon position error'></div>}
          </div>
        </Modal>
      </div>
    );
  }
}

export default InviteSupervisor;