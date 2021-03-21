import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenantdetail.scss';
import '../../application/component/applicationDetail.scss';
import { Icon, Row, Col, Tooltip, Tabs, Switch, message } from 'antd';
import TextField from "@material-ui/core/TextField";
import { history, fromValidate } from '../../../helpers'
import moment from 'moment';
import { getConnectionById } from '../action/connection.actions';
import Source from './source';
import Application from './application';
import DeleteTenant from '../../tenant/component/deleteTenant';
import { updateConnections, deleteConnectionById } from '../action/connection.actions';

const { TabPane } = Tabs;

/* eslint eqeqeq: 0 */
export class ConnectionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      consentForm: false,
      formError: {},
      formSubmit: false,
      advanceSetting: false,
      connectionDetail: {
        CreatedAt: new Date(),
        RequireConsent:false
      }
    }
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const id = (match && match.params && match.params.id) || '';
    dispatch(getConnectionById(id))
      .then(() => {
        const { connectionDetail } = this.props;
        this.setState({ connectionDetail: connectionDetail || {} })
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

    }
  };

  handleChange = (e) => {
    const connectionDetail = Object.assign({}, this.state.connectionDetail)
    const name = e.target.name;
    const value = e.target.value;
    connectionDetail[name] = value;
    this.setState({ connectionDetail });

    if (this.state.formSubmit) {
      this.setState({ formError: {} })
      const formValidation = fromValidate(this.fromNode);
      if (!formValidation.valid) {
        this.setState({ formError: formValidation.invalidationEle })
      }
    }
  }

  updateConnections = () => {
    const { dispatch } = this.props;
    const connection = this.state.connectionDetail;
    const reqObj = {
      ...connection,
      ConnectionDisplayName: connection.ConnectionDisplayName,
      Description: connection.Description,
    }
    dispatch(updateConnections(reqObj))
      .then((res) => {
        if (res.error) {
          message.error(res.message);
          return;
        }
        message.success("Connection updated successfully");
      });
  }

  handleActionChange = (e) => {

  }

  openDeleteModal = () => {
    this.setState({ deleteModal: true, isEdit: false })
  }

  toggleDeleteModal = (id) => {
    if (id) {
      this.deleteConnectionById(id)
    }
    else {
      this.setState({ deleteModal: false })
    }
  }

  deleteConnectionById = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteConnectionById(id))
      .then((res) => {
        if (res.error) {
          return message.error(res.message)
        } else {
          this.goToConnections();
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

  goToConnections = () => {
    history.push(`/connections`)
  }

  copyText = (id) => {
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
  }


  onChangeConsent = (checked) => {
    const connectionDetail = Object.assign({}, this.state.connectionDetail);
    connectionDetail.RequireConsent = checked;
    this.setState({ connectionDetail });

  }
  toggleAdvanceSettings = () => {
    this.setState({ advanceSetting: !this.state.advanceSetting })
  }

  openDeleteModal = () => {
    this.setState({ deleteModal: true, isEdit: false })
  }

  toggleDeleteModal = () => {
    this.setState({ deleteModal: false })
  }

  render() {
    const { connectionDetail, advanceSetting } = this.state;

    return (
      <div className="application-detail customer-detail">
        <div className="back-btn" onClick={() => { this.goToConnections() }}>
          <Icon type="left" /> Back to Connections
        </div>

        <div className="customer-header">
          <Row>
            <Col span={24}>
              {/* <div className="app-image-caitainer">
                <div className="clock-icon clock-icon-edit"></div>
                <div className='edit-icon'></div>
              </div> */}
              <div className="customer-details">
                <span className="customer-name">{connectionDetail.ConnectionDisplayName}</span>
                <div className="customer-id">
                  <div className='app-id'>CONNID</div>
                  <div className='txt-app-id'>{connectionDetail.ConnectionID}</div>
                  <div className='conn-created-date'>
                    <div className='timelapse-icon'></div>
                    <div>{moment(connectionDetail.CreatedAt).format('MMMM Do YYYY, h:m:s A')}</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="tab-section">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Settings" key="1">
              <form ref={node => this.fromNode = node} noValidate autoComplete="off" onSubmit={(e) => { this.handleSubmit(e) }}>
                <div className="customer-info">
                  <Row className="row">
                    <label>Connection Name</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          readOnly: true,
                        }}
                        id="connection_name"
                        type="text"
                        className='form-textfield readonly-text'
                        variant="outlined"
                        placeholder="Connection Name"
                        value={connectionDetail.ConnectionDisplayName}
                        name="ConnectionDisplayName"
                      />
                    </Col>
                  </Row>

                  <Row>
                    <label>Description</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          maxLength: 140
                        }}
                        id="Description"
                        type="text"
                        className='form-textfield desc-margin'
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows="2"
                        placeholder="Connection Description"
                        value={connectionDetail.Description}
                        name="Description"
                        onChange={(e) => { this.handleChange(e) }}
                      />
                      <div className='feild-desc'>Add a Description for the application in less than 140 characters</div>
                    </Col>
                  </Row>

                  <Row className="row">
                    <label>Facial Recognition Model</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          readOnly: true,
                        }}
                        id="facial_recognition_model"
                        type="text"
                        className='form-textfield readonly-text margin-bt'
                        variant="outlined"
                        value={connectionDetail.OnlineModel}
                      />
                    </Col>
                  </Row>

                  <div className='txt-learn'>Learn More</div>
                  <div className="req-box-conta">
                    <Row>
                      <Col span={24} className="from-left-col">
                        <Switch defaultChecked
                          checked={connectionDetail.RequireConsent}
                          onChange={this.onChangeConsent} className='switch-box' />
                        <span className='txt-consent'>User Consent Required?</span>
                        <div className='feild-desc consent-desc'>During on-bording of face, the user will be prompted to provide consent to store and use the face for different applications within the workplace.</div>
                      </Col>
                    </Row>
                  </div>
                  <Row>
                    <Col span={24} className="from-left-col">
                      <div>
                        <button className="btn-save ant-btn ant-btn-primary"
                          onClick={() => { this.updateConnections() }}
                          type="primary">SAVE</button>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="del-app-container">
                  <Row>
                    <Col span={12}>
                      <div className="del-box">
                        <Row>
                          <Col span={3} className="icon-container">
                            <div className="warnnig-icon"></div>
                          </Col>
                          <Col span={14} className="warrning-msg">
                            <div>
                              <div className="warnnig-text">Delete this connection</div>
                              <div className="warnnig-sub-text">This action cannot be undone</div>
                            </div>
                          </Col>
                          <Col span={7} className="btn-cantainer">
                            <div>
                              <button
                                onClick={() => { this.openDeleteModal() }}
                                type="button" className="btn-delete">DELETE</button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col span={12}>
                    </Col>
                  </Row>
                </div>
              </form>
            </TabPane>
            <TabPane tab="Source" key="2">
              <Source />
            </TabPane>
            <TabPane tab="Application" key="3">
              <Application />
            </TabPane>
            <TabPane tab="Configure" key="4">
            </TabPane>
          </Tabs>
        </div>
        <DeleteTenant
          modal={this.state.deleteModal}
          toggle={this.toggleDeleteModal}
          modalName='Connection'
          typeName='Connection Abc'
          typeDetails={connectionDetail}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { connectionDetail } = state.connection;
  return {
    user,
    connectionDetail: connectionDetail
  }
}
export default connect(mapStateToProps)(ConnectionDetail);
