import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addGroupUser } from '../action/groups.actions';
import { connect } from 'react-redux';


export class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupUser: [],
      error: {},
      isSubmit: false
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }


  handleOk = () => {
    const { dispatch, groupDetail } = this.props;
    this.setState({ isSubmit: true });
    const groupUser = this.state.groupUser;

    if (groupUser.length === 0) {
      return;
    }

    let reqObj = {
      ...groupDetail,

    }
    reqObj.Users = groupUser.map(user => {
      return {
        FullName: user.FullName,
        OloID: user.OloID,
        ConnectionDisplayName: user.ConnectionDisplayName,
        PrimaryID: user.PrimaryID
      }
    })
    dispatch(addGroupUser(reqObj))
      .then(() => {
        this.setState({ groupUser: [] });
        this.props.toggle();
      });
  };

  handleCancel = () => {
    this.setState({ error: {}, isSubmit: false, groupUser: [] })
    this.props.toggle()
  };


  handleInput = (e, value, reason) => {
    this.setState({ groupUser: value })
  }


  render() {
    const { isSubmit, groupUser } = this.state;
    const { allUsers } = this.props;
    return (
      <div>
        <Modal
          className="create-endpoint"
          visible={this.props.modal}
          onCancel={this.handleCancel}
          footer={[
            <div className="footer-box">
              <Button className="create-btn" key="back" type="primary" onClick={this.handleOk}>
                ADD
              </Button>
              <Button className="cancle-btn" key="submit" onClick={this.handleCancel}>
                CANCEL
            </Button>
            </div>
          ]}
        >
          <div className='txt-header'>Add User</div>
          <div className='position-rel'>

            <Autocomplete
              multiple
              id="combo-box-demo"
              size="small"
              options={allUsers}
              getOptionLabel={option => `${option.FullName} - ${option.PrimaryID}`}
              style={{ width: '100%' }}
              onChange={this.handleInput}
              value={groupUser}
              renderInput={params => (
                <TextField {...params} variant="outlined" label="Users" placeholder="Users" />
              )}
            />
            {isSubmit && groupUser.length === 0 &&
              <div className="error-msg">
                Add at least one user
              </div>
            }
          </div>
        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { user } = state.authentication;
  const { allUsers } = state.users;
  const { groupDetail } = state.groups;
  return {
    user,
    allUsers,
    groupDetail
  }
}
export default connect(mapStateToProps)(AddUser);