import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenantdetail.scss';
import './applicationDetail.scss';
import { Icon, Row, Col, Tooltip, Tabs, Switch, message } from 'antd';
import TextField from "@material-ui/core/TextField";
import DeleteTenant from '../../tenant/component/deleteTenant'
import { history, fromValidate } from '../../../helpers'
import moment from 'moment';
import { getApplicationById, updateApplication, updateApplicationLogo, deleteApplicationById } from '../action/application.actions';
import Customize from './customizeTab'
import ActionDetails from './actionDetail';
import Connection from './connection';
import ConsentForm from './consentModal';
import Integrations from './integrations';
import JSONPretty from 'react-json-pretty';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import _ from 'lodash';

const { TabPane } = Tabs



/* eslint eqeqeq: 0 */
export class ApplicationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      consentForm: false,
      formError: {},
      formSubmit: false,
      advanceSetting: false,
      applicationDetail: {
        ApplicationID: "",
        ApplicationLogo: "",
        ApplicationName: "",
        ApplicationType: "",
        Authentication: "",
        Connections: [],
        CreatedAt: "",
        Description: "",
        DisplayName: "",
        EndPoints: [],
        PingTimeOut: "",
        RequireConsent: true,
        TenantID: "",
        TenantName: "",
        UpdatedAt: "",
        Version: 0,
      }
    }
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const id = (match && match.params && match.params.id) || '';
    dispatch(getApplicationById(id))
      .then(() => {
        const { applicationDetail } = this.props;
        this.setState({ applicationDetail })
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ formError: {}, formSubmit: true })
    const formValidation = fromValidate(e.target);
    if (!formValidation.valid) {
      this.setState({ formError: formValidation.invalidationEle })
    }
    else {

      this.onUpdateApplication();
    }
  };

  onUpdateApplication = () => {
    const { dispatch } = this.props;
    const applicationDetail = this.state.applicationDetail;
    dispatch(updateApplication(applicationDetail))
      .then((res) => {
        this.setState({ loading: false });
        message.success("Application updated successfully");
        this.setState({ applicationDetail: res })
      });
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  onUpdateApplicationLogo = (event) => {
    const { dispatch } = this.props;
    const applicationDetail = this.state.applicationDetail;
    const file = event.target.files[0];

    var _validFileExtensions = ["jpg", "jpeg", "bmp", "gif", "png"];
    var t = file.type.split('/').pop().toLowerCase();
    if (_validFileExtensions.indexOf(t) == -1) {
      message.error('Please proivde the valid file');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(',');
      let req = {
        ApplicationID: applicationDetail.ApplicationID,
        LogoBase64String: base64[1]
      }
      dispatch(updateApplicationLogo(req))
        .then((res) => {
          this.setState({ loading: false });
          message.success("Application logo updated successfully");
          this.setState({ applicationDetail: res })
        });
    }
  }


  handleChange = (e) => {
    const applicationDetail = Object.assign({}, this.state.applicationDetail)
    const name = e.target.name;
    const value = e.target.value;
    applicationDetail[name] = value;
    this.setState({ applicationDetail });

    if (this.state.formSubmit) {
      this.setState({ formError: {} })
      const formValidation = fromValidate(this.fromNode);
      if (!formValidation.valid) {
        this.setState({ formError: formValidation.invalidationEle })
      }
    }
  }

  openDeleteModal = (isRotate) => {
    this.setState({ deleteModal: true, isEdit: false, isRotate })
  }

  toggleDeleteModal = (id, reason) => {
    if (id) {
      this.deleteApplicationById(id, reason)
    }
    else {
      this.setState({ deleteModal: false })
    }
  }

  deleteApplicationById = (id, reason) => {
    const { dispatch } = this.props;
    dispatch(deleteApplicationById(id, reason))
      .then((res) => {
        if (res.error) {
          return message.error(res.message)
        } else {
          this.goToApplication();
          this.setState({ deleteModal: false })
        }
      });
  }

  openConsentForm = () => {
    this.setState({ consentForm: true })
  }

  toggleConsentForm = () => {
    this.setState({ consentForm: false })
  }

  goToApplication = () => {
    history.push(`/applications`)
  }

  copyText = (id) => {
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
  }

  onChangeConsent = (checked) => {
    const applicationDetail = Object.assign({}, this.state.applicationDetail);
    applicationDetail.RequireConsent = checked;
    this.setState({ applicationDetail });

  }

  toggleAdvanceSettings = () => {
    this.setState({ advanceSetting: !this.state.advanceSetting })
  }

  handleRawJSONChange = (data) => {
    this.setState({ applicationDetail: data });
  }

  onChangeTab = (activeKey) => {
    this.setState({ activeTab: activeKey });
  }



  render() {
    const { applicationDetail, advanceSetting, isRotate, activeTab } = this.state;
    const appData = this.props.applicationDetail;

    return (
      <div className="application-detail customer-detail">
        <div className="back-btn" onClick={() => { this.goToApplication() }}>
          <Icon type="left" /> Back to Application
        </div>


        <div className="customer-header">
          <Row>
            <Col span={24}>
              <div className="app-image-caitainer">
                {!_.trim(appData.ApplicationLogo) && <div className="clock-icon clock-icon-edit"></div>}
                {
                  _.trim(appData.ApplicationLogo) &&
                  <img className="app-icon" src={appData.ApplicationLogo} alt="" />
                }
                <div className="app-image-shadow"></div>
                <div className='edit-icon upload-btn-wrapper'>
                  <input type="file" name="myfile" onChange={this.onUpdateApplicationLogo} />
                </div>
              </div>
              <div className="customer-details">
                <span className="customer-name">{appData.ApplicationName}</span>
                <span className='time-clock'>{appData.ApplicationType}</span>
                <div className="customer-id">
                  <div className='app-id'>APPID</div>
                  <div className='txt-app-id'>{appData.ApplicationID}</div>
                  <div className='created-date'>
                    <div className='timelapse-icon'></div>
                    <div>{moment(appData.CreatedAt).format('MMMM Do YYYY, h:m:s A')}</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="tab-section">
          <Tabs defaultActiveKey="2" onChange={(key) => { this.onChangeTab(key) }}>
            <TabPane tab="Quick Start" key="1">

            </TabPane>
            <TabPane tab="Settings" key="2">
              <form ref={node => this.fromNode = node} noValidate autoComplete="off" onSubmit={(e) => { this.handleSubmit(e) }}>
                <div className="customer-info">
                  <div className='txt-add-application'>Add Application Details</div>
                  <Row className="row">
                    <label>Application Name</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        id="application_name"
                        type="text"
                        className='form-textfield'
                        variant="outlined"
                        placeholder="Application Name"
                        value={applicationDetail.ApplicationName}
                        name="ApplicationName"
                        required
                        onChange={(e) => { this.handleChange(e) }}
                      />
                    </Col>
                  </Row>
                  <Row className="row">
                    <label>Application ID</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          readOnly: true,
                        }}
                        id="application_Id"
                        type="text"
                        className='form-textfield readonly-text'
                        margin="normal"
                        variant="outlined"
                        placeholder="Application ID"
                        value={applicationDetail.ApplicationID}
                        name="ApplicationID"
                        onChange={(e) => { this.handleChange(e) }}
                      />

                      <Tooltip title="Copy to clipboard">
                        <div className='copy-icon edit overide' onClick={() => this.copyText('application_Id')}></div>
                      </Tooltip>
                    </Col>
                  </Row>

                  <Row>
                    <label>Application Type</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          readOnly: true,
                        }}
                        id="application_type"
                        type="text"
                        className='form-textfield readonly-text'
                        margin="normal"
                        variant="outlined"
                        placeholder="Application Type"
                        value={applicationDetail.ApplicationType}
                        name="ApplicationType"
                        onChange={(e) => { this.handleChange(e) }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <label>Domain</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          readOnly: true,
                        }}
                        id="domain"
                        type="email"
                        className='form-textfield readonly-text'
                        margin="normal"
                        variant="outlined"
                        placeholder="Domain"
                        value={applicationDetail.TenantName}
                        name="TenantName"
                        onChange={(e) => { this.handleChange(e) }}
                      />
                      <Tooltip title="Copy to clipboard">
                        <div className='copy-icon edit overide' onClick={() => this.copyText('domain')}></div>
                      </Tooltip>

                    </Col>
                  </Row>

                  <Row>
                    <label>Client ID</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          readOnly: true,
                        }}
                        id="client_id"
                        type="text"
                        className='form-textfield desc-margin readonly-text'
                        margin="normal"
                        variant="outlined"
                        placeholder="Client ID"
                        value={applicationDetail.TenantID}
                        name="TenantID"
                        onChange={(e) => { this.handleChange(e) }}
                      />
                      <Tooltip title="Copy to clipboard">
                        <div className='copy-icon edit' onClick={() => this.copyText('client_id')}></div>
                      </Tooltip>
                    </Col>
                    <div className='feild-desc'>The Client ID may be embedded in the client. It enables the oloid system to validate the application</div>
                  </Row>

                  <Row>
                    <label>Secret</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          readOnly: true,
                        }}
                        id="secret"
                        type="password"
                        className='form-textfield desc-margin readonly-text'
                        margin="normal"
                        variant="outlined"
                        placeholder="Secret"
                        value={applicationDetail.secret}
                        name="secret"
                        onChange={(e) => { this.handleChange(e) }}
                      />
                      <Tooltip title="Copy to clipboard">
                        <div className='copy-icon edit' onClick={() => this.copyText('secret')}></div>
                      </Tooltip>
                    </Col>
                    <div className='feild-desc'>The Secret may be embedded in the client. It enables the oloid system to authorize the applications</div>
                  </Row>

                  <Row>
                    <label>Description</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          maxLength: 140
                        }}
                        id="description"
                        type="text"
                        className='form-textfield desc-margin'
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows="2"
                        placeholder="Application Description"
                        value={applicationDetail.Description}
                        name="Description"
                        onChange={(e) => { this.handleChange(e) }}
                      />
                      <div className='feild-desc'>Add a description for the application in less than 140 characters</div>
                    </Col>
                  </Row>

                  <Row>
                    <label>Application Logo</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        id="application_logo"
                        type="text"
                        className='form-textfield desc-logo-margin'
                        margin="normal"
                        variant="outlined"
                        placeholder="https://"
                        value={applicationDetail.ApplicationLogo}
                        name="ApplicationLogo"
                        onChange={(e) => { this.handleChange(e) }}
                      />
                      <div className='feild-desc app-logo'>The URL of the Logo to display for the application, if none is set the default badge for this type of application will be shown. Recommended size is 150 x 150 pixels</div>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24} className="from-left-col">
                      <Switch
                        checked={applicationDetail.RequireConsent}
                        onChange={this.onChangeConsent}
                        className='switch-box' />
                      <span className='txt-consent'>User Consent Required?</span>
                      <span className='btn-consent' onClick={() => { this.openConsentForm() }} >CONSENT FORM</span>
                      <div className='feild-desc consent-desc'>Add an additional step of capturing the user content while on-boarding the end user's face</div>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24} className="from-left-col">
                      <div className='advance-setting' onClick={this.toggleAdvanceSettings}>ADVANCED SETTING</div>
                      {advanceSetting && <div className='advance-box'>
                        <div className='title'>Ping Time Out</div>
                        <TextField
                          id="time_out"
                          type="text"
                          className='form-textfield time-out'
                          margin="normal"
                          variant="outlined"
                          value={applicationDetail.PingTimeOut}
                          name="PingTimeOut"
                          onChange={(e) => { this.handleChange(e) }}
                        />
                      </div>}
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24} className="from-left-col">
                      <div>
                        <button type="submit" className="btn-save ant-btn ant-btn-primary" >SAVE</button>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="del-app-container">
                  <Row>
                    <Col span={12}>
                      <div className="del-box app-del">
                        <Row>
                          <Col span={3} className="icon-container">
                            <div className="warnnig-icon"></div>
                          </Col>
                          <Col span={14} className="warrning-msg">
                            <div>
                              <div className="warnnig-text">Delete this application</div>
                              <div className="warnnig-sub-text">This action cannot be undone</div>
                            </div>
                          </Col>
                          <Col span={7} className="btn-cantainer">
                            <div>
                              <button
                                onClick={() => { this.openDeleteModal(false) }}
                                type="button" className="btn-delete">DELETE</button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="del-box secret-app">
                        <Row>
                          <Col span={3} className="icon-container">
                            <div className="warnnig-icon"></div>
                          </Col>
                          <Col span={14} className="warrning-msg">
                            <div>
                              <div className="warnnig-text">Rotate Secret</div>
                              <div className="warnnig-sub-text">This action will warrant all applications to be updated with the new client secret</div>
                            </div>
                          </Col>
                          <Col span={7} className="btn-cantainer">
                            <div>
                              <button
                                onClick={() => { this.openDeleteModal(true) }}
                                type="button" className="btn-delete">ROTATE</button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>

                </div>
              </form>
            </TabPane>
            {/* <TabPane tab="Action" key="3">
              <ActionDetails />
            </TabPane> */}
            <TabPane tab="Customize" key="3">
              <Customize applicationDetail={applicationDetail}></Customize>
            </TabPane>
            <TabPane tab="Connections" key="4">
              <Connection />
            </TabPane>
            <TabPane tab="Integrations" key="5">
              <Integrations />
            </TabPane>
            <TabPane tab="Raw JSON" key="6">
              <div className='raw-json edit-json'>

                {activeTab == 6 &&
                  <div className='string-json'>
                    <Editor
                      mode="tree"
                      allowedModes={['code', 'tree']}
                      value={applicationDetail}
                      onChange={this.handleRawJSONChange}
                    />
                    <div>
                      <button type="button"
                        onClick={() => { this.onUpdateApplication() }}
                        className="btn-save ant-btn ant-btn-primary" >SAVE</button>
                    </div>
                  </div>
                }
              </div>
            </TabPane>
          </Tabs>
        </div>

        <DeleteTenant
          modal={this.state.deleteModal}
          toggle={this.toggleDeleteModal}
          modalName='Application'
          typeName='oloid.com'
          typeDetails={applicationDetail}
          isRotate={isRotate}
        />

        <ConsentForm
          modal={this.state.consentForm}
          toggle={this.toggleConsentForm}
        />

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { applicationDetail } = state.application;
  return {
    user,
    applicationDetail
  }
}
export default connect(mapStateToProps)(ApplicationDetail);
