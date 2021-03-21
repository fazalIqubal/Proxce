import React, { Component } from 'react';
import "../../application/component/createApplication.scss";
import "../../connections/component/createConnection.scss";
import "../../tenant/component/createTenant.scss";
import { Modal, Button } from 'antd';
import { TextField, Select, MenuItem,  InputLabel, FormControl,  FormHelperText } from '@material-ui/core';
// import { Select, Table } from 'antd';
// const Option = Select.Option;

class CreateConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{
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

  validateForm=()=>{
    const { user, error } = this.state;
    if(!user.connection_name)
    {
      error.connection_name = true;
    }
    if(!user.full_name)
    {
      error.full_name = true;
    }
    if(!user.primary_id)
    {
      error.primary_id = true;
    }
    this.setState({error})
  }

  handleInput=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    const { user, error } = Object.assign({}, this.state)
    user[name]= value;
    error[name] = false
    this.setState({user, error})
  }

  handleSelect=(type)=>{
    const { user, error } = Object.assign({}, this.state)
    user['connection_name']= type;
    error['connection_name'] = false
    this.setState({user, error})
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
                CREATE
              </Button>
              <Button className="cancle-btn" key="submit"  onClick={this.handleCancel}>
                CANCEL
            </Button>
            </div>
          ]}
        >
          <div className='txt-header'>Create a new Group</div>
          <div className='position-rel'>
            <TextField
              error={error.full_name}
              name="group_name"
              label="Group Name"
              type="text"
              className='tenant-form-textfield'
              margin="normal"
              variant="outlined"
              helperText={error.full_name? 'Required':''}
              onChange={(e)=>this.handleInput(e)}
            />
            {isSubmit && !error.full_name && <div className='success-icon position'></div>}
            {error.full_name && <div className='success-icon position error'></div>}
          </div>

         
         
           
            
        </Modal>
      </div>
    );
  }
}

export default CreateConnection;
