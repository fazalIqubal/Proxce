import React, { Component } from 'react';
import "./endpointsDetail.scss";
import { Modal, Button, message } from 'antd';
import { Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@material-ui/core';
import { addGroupEndpoints, getAllGroups } from '../../groups/action/groups.actions';
import { connect } from 'react-redux';
import _ from 'lodash';

export class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: {
        GroupID: ''
      },
      error: {},
      isSubmit: false
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllGroups());
  }

  handleOk = () => {
    this.setState({ isSubmit: true });
    const { dispatch, endpoints, allGroups } = this.props;
    const groupDetail = this.state.group;

    if (this.validateForm()) {
      if (endpoints.length === 0) {
        message.error("Required at least one endpoint")
        return;
      }
      let selectedGroup = _.find(allGroups, (group) => { return group.GroupID === groupDetail.GroupID })

      let reqObj = {
        ...selectedGroup,

      }
      reqObj.Endpoints = endpoints.map(endpoint => {
        return {
          EndpointName: endpoint.EndpointName || ' ',
          EndpointID: endpoint.EndpointID || ' ',
          Description: endpoint.Description || ' ',
          EndpointType: endpoint.EndpointType || ' ',
          Location: endpoint.Location || ' ',
        }
      })
      dispatch(addGroupEndpoints(reqObj))
        .then(() => {
          this.setState({ group: { GroupID: '' }, isSubmit: false, error: {} });
          message.success("Endpoint Groups updated successfully");
          this.props.toggle(true);
        });
    }

  };


  validateForm = () => {
    const { group } = this.state;
    let error = {};
    if (!group.GroupID) {
      error.GroupID = true;
    }
    this.setState({ error })
    return Object.keys(error).length == 0;
  }



  handleCancel = () => {
    this.setState({ group: { GroupID: '' }, error: {}, isSubmit: false })
    this.props.toggle()
  };


  handleSelect = (e) => {
    const { group, error } = Object.assign({}, this.state)
    group['GroupID'] = e.target.value;
    error['GroupID'] = false
    this.setState({ group, error })
  }

  render() {
    const { allGroups } = this.props
    const { error, isSubmit, group } = this.state;

    return (
      <div>
        <Modal
          className="create-application"
          visible={this.props.modal}
          onCancel={this.handleCancel}
          footer={[
            <div key="footer" className="footer-box">
              <Button className="create-btn" key="back" type="primary" onClick={this.handleOk}>
                SAVE
              </Button>
              <Button className="cancle-btn" key="submit" onClick={this.handleCancel}>
                CANCEL
            </Button>
            </div>
          ]}
        >
          <div className='txt-header'>Add Group</div>
          <div className='position-rel'>
            <FormControl variant="outlined" className='region-select' error={error.GroupID}>
              <InputLabel id="demo-simple-select-outlined-label">
                Choose Group
              </InputLabel>
              <Select
                error={error.GroupID}
                placeholder="Group Name"
                className="form-textfield"
                onChange={(e) => this.handleSelect(e)}
                name="GroupID"
                value={group.GroupID}
              >
                {
                  allGroups.map((group, index) => {
                    return <MenuItem key={index} value={group.GroupID}>{group.GroupName}</MenuItem>
                  })
                }
              </Select>
              {error.GroupID && <FormHelperText>Required</FormHelperText>}
            </FormControl>
            {isSubmit && !error.GroupID && <div className='success-icon position'></div>}
            {error.GroupID && <div className='success-icon position error'></div>}
          </div>


        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { user } = state.authentication;
  const { allGroups } = state.groups;
  return {
    user,
    allGroups
  }
}
export default connect(mapStateToProps)(AddGroup);