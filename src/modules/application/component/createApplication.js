import React, { Component } from 'react';
import "./createApplication.scss";
import "../../tenant/component/createTenant.scss";
import { Modal, Button, Row, Col, message } from 'antd';
import TextField from "@material-ui/core/TextField";
import { saveApplication } from '../action/application.actions';
import { connect } from 'react-redux';

class CreateApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      application: {
        ApplicationName: '',
        ApplicationType: ''
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
      const application = this.state.application;
      const reqObj = {
        ApplicationName: application.ApplicationName.trim(),
        ApplicationType: application.ApplicationType,
        DisplayName: application.ApplicationType.replace(/\s/g, '')
      }
      dispatch(saveApplication(reqObj))
        .then(() => {
          message.success("Application created successfully");
          this.setState({ loading: false });
          this.resetFrom();
          this.props.toggle()
        });
    }
  };

  resetFrom = () => {
    this.setState({
      application: {
        ApplicationName: '',
        ApplicationType: ''
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
    const { application } = this.state;
    let error = {};
    if (!application.ApplicationName) {
      error.ApplicationName = true;
    }
    if (!application.ApplicationType) {
      error.ApplicationType = true;
    }
    this.setState({ error })
    return Object.keys(error).length == 0;
  }

  handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const { application, error } = Object.assign({}, this.state)
    var letters = /^[A-Za-z-]+$/;
    if(value.match(letters)) {
      application[name] = value;
      error[name] = false
      this.setState({ application, error })
    }
  }

  selectApplicationType = (type) => {
    const { application, error } = Object.assign({}, this.state)
    application['ApplicationType'] = type;
    error['ApplicationType'] = false
    this.setState({ application, error })
  }

  render() {

    const { error, isSubmit, application } = this.state;

    return (
      <div >
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
          <div className='txt-header'>Create a new Application</div>
          <div className='position-rel'>
            <TextField
              error={error.ApplicationName}
              name="ApplicationName"
              label="Application Name"
              type="text"
              className='tenant-form-textfield'
              margin="normal"
              variant="outlined"
              value={application.ApplicationName}
              helperText={error.ApplicationName ? 'Required' : ''}
              onChange={(e) => this.handleInput(e)}
            />
            {isSubmit && !error.ApplicationName && <div className='success-icon position'></div>}
            {error.ApplicationName && <div className='success-icon position error'></div>}
          </div>
          <div className='feild-desc'>Only alphabets and hyphen allowed.</div>
          <div className='application-type'>
            <div className='txt-type'>Application Type</div>
            <div className='types'>
              <Row>
                <Col span={8}>
                  <div className="box-col-padding">
                    <div className={`type-border mr-type ${error.ApplicationType ? 'notSelected' : application.ApplicationType == 'Oloid Verify' ? 'selected' : ''}`}
                      onClick={() => this.selectApplicationType('Oloid Verify')}>
                      <div className='type-icon'>
                        <div className='create-app-type-name'><span>OV</span></div>
                      </div>
                      <div className='txt-heading'>Oloid Verify</div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="box-col-padding">
                    <div className={`type-border mr-type ${error.ApplicationType ? 'notSelected' : application.ApplicationType == 'Oloid Thermal' ? 'selected' : ''}`}
                      onClick={() => this.selectApplicationType('Oloid Thermal')}>
                      <div className='type-icon'>
                        <div className='create-app-type-name'><span>OT</span></div>
                      </div>
                      <div className='txt-heading'>Oloid Thermal</div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="box-col-padding">
                    <div className={`type-border mr-type ${error.ApplicationType ? 'notSelected' : application.ApplicationType == 'Password Reset' ? 'selected' : ''}`}
                      onClick={() => this.selectApplicationType('Password Reset')}>
                      <div className='type-icon'>
                        <div className='create-app-type-name'><span>PR</span></div>
                      </div>
                      <div className='txt-heading'>Password Reset </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <div className="box-col-padding">
                    <div className={`type-border mr-type ${error.ApplicationType ? 'notSelected' : application.ApplicationType == 'Native SDK' ? 'selected' : ''}`}
                      onClick={() => this.selectApplicationType('Native SDK')}>
                      <div className='type-icon'>
                        <div className='create-app-type-name'><span>NS</span></div>
                      </div>
                      <div className='txt-heading'>Native SDK</div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="box-col-padding">
                    <div className={`type-border ${error.ApplicationType ? 'notSelected' : application.ApplicationType == 'Edge' ? 'selected' : ''}`}
                      onClick={() => this.selectApplicationType('Edge')}>
                      <div className='type-icon'>
                        <div className='create-app-type-name'><span>ED</span></div>
                      </div>
                      <div className='txt-heading'>Edge</div>
                    </div>
                  </div>
                </Col>
                <Col span={8}>

                </Col>
              </Row>
            </div>
            {error.ApplicationType && <div className='error-required'>Required</div>}
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
export default connect(mapStateToProps)(CreateApplication);
