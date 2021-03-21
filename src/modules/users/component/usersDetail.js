import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenantdetail.scss';
import '../../application/component/applicationDetail.scss';
import './users.scss';
import { Icon, Row, Col, Tooltip, Tabs, Menu, Dropdown, Button, message } from 'antd';
import TextField from "@material-ui/core/TextField";
import DeleteTenant from '../../tenant/component/deleteTenant'
import { history, fromValidate } from '../../../helpers'
import moment from 'moment';
import user from "../../../image/user_preview.png";
import { getUsersById, updateUser, deleteUserById } from '../action/users.actions';
import Endpoints from './userEndpoints'
import Faces from './faces';
import Group from './userGroup';
import History from './history';
import Consent from './consent';
import JSONPretty from 'react-json-pretty';
import AddFace from './addFace'

// import { Consent } from './consent';
const { TabPane } = Tabs

/* eslint eqeqeq: 0 */
export class UsersDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      consentForm: false,
      formError: {},
      formSubmit: false,
      advanceSetting: false,
      usersDetail: {
        ConnectionDisplayName: "",
        ConnectionID: "",
        CreatedAt: "",
        DisplayName: "",
        FullName: "",
        OloID: "",
        OndeviceModel: "",
        OnlineModel: "",
        PrimaryID: "",
        SecondaryID: "",
        Email: "",
        Status: "",
        TenantID: "",
        TenantName: "",
        UpdatedAt: "",
        Faces: []
      },
      activeKey: '1',
      UpldoadFile: false
    }
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const id = (match && match.params && match.params.id) || '';
    dispatch(getUsersById(id))
      .then(() => {
        let { usersDetail } = this.props;
        usersDetail.Faces = usersDetail.Faces || [];
        this.setState({ usersDetail })
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.setState({ formError: {}, formSubmit: true })
    const formValidation = fromValidate(e.target);
    if (!formValidation.valid) {
      this.setState({ formError: formValidation.invalidationEle })
    }
    else {
      const usersDetail = this.state.usersDetail;
      let updateParam = {
        "FullName": usersDetail.FullName,
        "PrimaryID": usersDetail.PrimaryID,
        "SecondaryID": usersDetail.SecondaryID ? parseInt(usersDetail.SecondaryID) : 0,
        "Email": usersDetail.Email,
        "ConnectionID": usersDetail.ConnectionID,
        "DisplayName": usersDetail.DisplayName,
        "CredentialFormat": usersDetail.CredentialFormat,
        "OndeviceModel": usersDetail.OndeviceModel,
        "OnlineModel": usersDetail.OnlineModel,
        "ConnectionDisplayName" : usersDetail.usersDetail.OnlineModel,
      }
      dispatch(updateUser(usersDetail.OloID, updateParam))
        .then((res) => {
          if (res.error) {
            message.error(res.message);
            return;
          }
          message.success("User updated successfully");
        });
    }
  };

  handleChange = (e) => {
    const usersDetail = Object.assign({}, this.state.usersDetail)
    const name = e.target.name;
    const value = e.target.value;
    usersDetail[name] = value;
    this.setState({ usersDetail });

    if (this.state.formSubmit) {
      this.setState({ formError: {} })
      const formValidation = fromValidate(this.fromNode);
      if (!formValidation.valid) {
        this.setState({ formError: formValidation.invalidationEle })
      }
    }
  }

  handleActionChange = (e) => {

  }

  openDeleteModal = (isBlock) => {
    this.setState({ deleteModal: true, isEdit: false, isBlock })
  }

  toggleDeleteModal = (id) => {
    if (id) {
      this.deleteUserById(id)
    }
    else {
      this.setState({ deleteModal: false })
    }
  }

  deleteUserById = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteUserById(id))
      .then((res) => {
        if (res.error) {
          return message.error(res.message)
        } else {
          this.goToUsers();
          this.setState({ deleteModal: false })
        }
      });
  }

  goToUsers = () => {
    history.push(`/users`)
  }

  copyText = (id) => {
    var copyText = document.getElementById(id);
    copyText.select();
    document.execCommand("copy");
  }

  printObject(object) {
    return JSON.stringify(object);
  }

  goToFaceTab = () => {
    this.setState({ activeKey: '2' })
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onClickAddFace = () => {
    this.setState({ UpldoadFile: true })
  }

  handleModalCancel = () => {
    this.setState({ UpldoadFile: false })
  }


  render() {
    const { usersDetail, formError, formSubmit } = this.state;
    const userData = this.props.usersDetail;
    const menu = (
      <Menu className="tenant-action-menu" onClick={this.handleActionChange}>
        <Menu.Item key="1" onClick={() => { this.openDeleteModal(true) }}>
          Block
        </Menu.Item>
        <Menu.Item key="2" onClick={() => { this.openDeleteModal(false) }} >
          Delete
        </Menu.Item>
        <Menu.Item key="3" onClick={() => { this.onClickAddFace() }}>
          Add Face
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="application-detail customer-detail user-detail">
        <div className="back-btn" onClick={() => { this.goToUsers() }}>
          <Icon type="left" /> Back to Users
        </div>

        <div className="user-header-custom customer-header">
          <Row>
            <Col span={12}>
              <div className="user-image-header">
                <div className="user-image-box">
                  <img src={(userData.Faces && userData.Faces.length > 0 && userData.Faces[0].SignedUrl) || user} alt="" />
                </div>
                <div className="customer-details">
                  <span className="customer-name">{userData.FullName}</span>
                  <span className='user-status'>Active</span>
                  <div className="customer-id">
                    <div className='app-id'>OLDID</div>
                    <div className='txt-app-id'>{userData.OloID}</div>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={12}>

              <div className="action-item">
                <Dropdown overlay={menu}>
                  <Button>
                    Action <Icon type="down" />
                  </Button>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </div>

        <div className="tab-section">
          <Tabs activeKey={this.state.activeKey} onChange={this.onChange}>

            <TabPane tab="Details" key="1">
              <form ref={node => this.fromNode = node} noValidate autoComplete="off" onSubmit={(e) => { this.handleSubmit(e) }}>
                <div className="customer-info">
                  <div className='txt-add-application'>Add Additional user Details</div>
                  <Row className="row">
                    <label>Full Name</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        id="full_name"
                        type="text"
                        className='form-textfield'
                        variant="outlined"
                        placeholder="Full Name"
                        value={usersDetail.FullName}
                        name="FullName"
                        onChange={(e) => { this.handleChange(e) }}
                      />
                    </Col>
                  </Row>
                  <Row className="row">
                    <label>Primary ID</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          readOnly: false,
                        }}
                        id="primary_Id"
                        type="text"
                        className='form-textfield'
                        margin="normal"
                        variant="outlined"
                        placeholder="Primary ID"
                        value={usersDetail.PrimaryID}
                        name="PrimaryID"
                        onChange={(e) => { this.handleChange(e) }}
                      />

                      <Tooltip title="Copy to clipboard">
                        <div className='copy-icon edit overide' onClick={() => this.copyText('primary_Id')}></div>
                      </Tooltip>
                      <div className='feild-desc'>Eg: Badge ID/ Employee ID</div>
                    </Col>

                  </Row>

                  <Row className="row">
                    <label>Secondary ID</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        required
                        error={formSubmit && formError['SecondaryID'] && (!formError['SecondaryID'].valid)}
                        inputProps={{
                          readOnly: false,
                          required: true
                        }}
                        id="secondary_Id"
                        type="number"
                        className='form-textfield sec-field'
                        margin="normal"
                        variant="outlined"
                        placeholder="Secondary ID"
                        value={usersDetail.SecondaryID}
                        name="SecondaryID"
                        onChange={(e) => { this.handleChange(e) }}
                        helperText={formError['SecondaryID'] && (!formError['SecondaryID'].valid) ? 'Required' : ''}
                      />
                      <Tooltip title="Copy to clipboard">
                        <div className='copy-icon edit overide' onClick={() => this.copyText('secondary_Id')}></div>
                      </Tooltip>
                      <div className='feild-desc'>Eg: Badge ID/ Employee ID</div>
                    </Col>

                  </Row>

                  <Row className="row">
                    <label>Email ID</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          readOnly: false,
                        }}
                        id="email_Id"
                        type="email"
                        className='form-textfield'
                        margin="normal"
                        variant="outlined"
                        placeholder="Email ID"
                        name="Email"
                        value={usersDetail.Email}
                        onChange={(e) => { this.handleChange(e) }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <label>Olo ID</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          readOnly: true,
                        }}
                        id="olo_id"
                        type="text"
                        className='form-textfield readonly-text'
                        margin="normal"
                        variant="outlined"
                        placeholder="Olo ID"
                        name="OloID"
                        value={usersDetail.OloID}
                        onChange={(e) => { this.handleChange(e) }}
                      />
                      <Tooltip title="Copy to clipboard">
                        <div className='copy-icon edit' onClick={() => this.copyText('olo_id')}></div>
                      </Tooltip>
                    </Col>
                  </Row>

                  <Row>
                    <label>Identity Confidence</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          readOnly: true,
                        }}
                        id="identity_confidence"
                        type="text"
                        className='form-textfield readonly-text'
                        margin="normal"
                        variant="outlined"
                        placeholder="Identity Confidence"
                        value={usersDetail.identity_confidence}
                        name="identity_confidence"
                        onChange={(e) => { this.handleChange(e) }}
                      />
                      <div className='feild-desc'>This score is calculated based on the quality and the number of images coptured</div>
                    </Col>
                  </Row>

                  <Row>
                    <label>Connection Name</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          readOnly: true,
                        }}
                        id="connection_id"
                        type="text"
                        className='form-textfield desc-margin readonly-text'
                        margin="normal"
                        variant="outlined"
                        placeholder="Connection ID"
                        value={usersDetail.ConnectionDisplayName}
                        name="ConnectionID"
                        onChange={(e) => { this.handleChange(e) }}
                      />
                      <Tooltip title="Copy to clipboard">
                        <div className='copy-icon edit' onClick={() => this.copyText('connection_id')}></div>
                      </Tooltip>
                    </Col>
                  </Row>

                  <Row>
                    <label>User Created Date Time</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        inputProps={{
                          readOnly: true,
                        }}
                        id="created_date"
                        type="text"
                        className='form-textfield desc-margin readonly-text'
                        margin="normal"
                        variant="outlined"
                        placeholder="Date & Time"
                        value={moment(usersDetail.CreatedAt).format('MMMM DD YYYY, h:m A')}
                        name="created_date"
                        onChange={(e) => { this.handleChange(e) }}
                      />
                      <Tooltip title="Copy to clipboard">
                        <div className='copy-icon edit' onClick={() => this.copyText('created_date')}></div>
                      </Tooltip>
                    </Col>
                  </Row>

                  <Row>
                    <Col span={24}>
                      <div>
                        <button className="btn-save ant-btn ant-btn-primary" type="primary">SAVE</button>
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
                              <div className="warnnig-text">Delete this user</div>
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
                  </Row>
                </div>
              </form>
            </TabPane>
            <TabPane tab="Faces" key="2">
              <Faces />
            </TabPane>
            <TabPane tab="Groups" key="3">
              <Group />
            </TabPane>
            <TabPane tab="Endpoints" key="4">
              <Endpoints />
            </TabPane>
            <TabPane tab="History" key="5">
              <History />
            </TabPane>
            <TabPane tab="Consent" key="6">
              <Consent />
            </TabPane>
            <TabPane tab="Raw JSON" key="7">
              <div className='raw-json'>
                <div className='string-json'>
                  <JSONPretty id="json-pretty" data={usersDetail}></JSONPretty>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
        <AddFace showModal={this.state.UpldoadFile} handleCancel={this.handleModalCancel} />
        <DeleteTenant
          modal={this.state.deleteModal}
          toggle={this.toggleDeleteModal}
          modalName='User'
          typeName={usersDetail.FullName}
          typeDetails={usersDetail}
          isBlock={this.state.isBlock}
        />

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { usersDetail } = state.users;
  return {
    user,
    usersDetail
  }
}
export default connect(mapStateToProps)(UsersDetail);
