import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addGroupEndpoints } from '../action/groups.actions';
import { connect } from 'react-redux';

export class AddEndpoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupEndpoint: [],
      error: {},
      isSubmit: false
    }
  }

  componentDidMount() {

  }

  handleOk = () => {
    const { dispatch, groupDetail } = this.props;
    this.setState({ isSubmit: true });
    const groupEndpoint = this.state.groupEndpoint;

    if (groupEndpoint.length === 0) {
      return;
    }

    let reqObj = {
      ...groupDetail,

    }
    reqObj.Endpoints = groupEndpoint.map(endpoint => {
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
        this.setState({ groupEndpoint: [] });
        this.props.toggle();
      });
  };


  handleCancel = () => {
    this.setState({ groupEndpoint: [], error: {}, isSubmit: false })
    this.props.toggle()
  };


  handleInput = (e, value, reason) => {
    this.setState({ groupEndpoint: value })
  }

  handleSelect = (value) => {
    console.log(`Selected: ${value}`);
  }



  render() {
    const { isSubmit, groupEndpoint } = this.state;
    const { allEndpoints} = this.props;
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
          <div className='txt-header'>Add Endpoint</div>
          <div>
            <Autocomplete
              multiple
              id="combo-box-demo"
              size="small"
              options={allEndpoints}
              getOptionLabel={option => option.EndpointName}
              style={{ width: '100%' }}
              onChange={this.handleInput}
              value={groupEndpoint}
              renderInput={params => (
                <TextField {...params} variant="outlined" label="Endpoint Code" placeholder="Favorites" />
              )}
            />
            {isSubmit && groupEndpoint.length === 0 &&
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
  const { allEndpoints } = state.endpoints;
  const { groupDetail } = state.groups;
  return {
    user,
    allUsers,
    allEndpoints,
    groupDetail
  }
}
export default connect(mapStateToProps)(AddEndpoint);