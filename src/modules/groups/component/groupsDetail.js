import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenantdetail.scss';
import '../../application/component/applicationDetail.scss';
import AddUser from '../../groups/component/addUser';
import './groups.scss';
import { Icon, Row, Col, Tabs, Menu, Dropdown, Button, message } from 'antd';
import TextField from "@material-ui/core/TextField";
import DeleteTenant from '../../tenant/component/deleteTenant'
import { history, fromValidate } from '../../../helpers'
import { getGroupById, deleteGroupById } from '../action/groups.actions';
import { getAllUsers } from '../../users/action/users.actions';
import { getAllEndpoints } from '../../endpoint/action/endpoints.actions';
import GroupEndpoint from './groupEndpoint';
import GroupUser from './groupUser';
import AddEndpoint from './addEndpoint';
import { updateGroup } from '../action/groups.actions';

const { TabPane } = Tabs

/* eslint eqeqeq: 0 */
export class groupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      formError: {},
      formSubmit: false,
      groupDetailFrom: {

      },
      activeKey: '1'
    }
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const id = (match && match.params && match.params.id) || '';
    dispatch(getGroupById(id))
      .then(() => {
        const { groupDetail } = this.props;
        this.setState({ groupDetailFrom: groupDetail })
      });

    dispatch(getAllUsers());
    dispatch(getAllEndpoints());
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
      const groupDetailFrom = this.state.groupDetailFrom;
      dispatch(updateGroup(groupDetailFrom))
        .then(() => {
          this.setState({ loading: false });
          message.success("Group updated successfully");
        });
    }
  };

  handleChange = (e) => {
    const groupDetailFrom = Object.assign({}, this.state.groupDetailFrom)
    const name = e.target.name;
    const value = e.target.value;
    groupDetailFrom[name] = value;
    this.setState({ groupDetailFrom });
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

  deleteGroupById = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteGroupById(id))
    .then((res) => {
      if (res.error) {
        return message.error(res.message)
      } else {
        this.goToGroups();
        this.setState({ deleteModal: false })
      }
    });
  }

  // goToUsers = () => {
  //   history.push(`/users`)
  // }

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

  goToGroups = () => {
    history.push(`/groups`)
  }
  openCreateModal = () => {
    this.setState({ createModal: true, isEdit: false })
  }

  toggleCreateModal = () => {
    this.setState({ createModal: false })
  }

  openCreateUserModal = () => {
    this.setState({ userModal: true, isEdit: false })
  }
  toggleCreateUserModal = () => {
    this.setState({ userModal: false })
  }

  render() {
    const { groupDetailFrom, formSubmit, formError } = this.state;
    const { groupDetail } = this.props;
    const menu = (
      <Menu className="tenant-action-menu" onClick={this.handleActionChange}>
        <Menu.Item key="1">
          <div className="ant-dropdown-menu-item-group"
            key="submit"
            onClick={() => { this.openCreateModal() }}>
            Add Endpoint</div>
        </Menu.Item>
        <Menu.Item key="2">
          <div className="ant-dropdown-menu-item-group"
            key="submit"
            onClick={() => { this.openCreateUserModal() }}>
            Add User</div>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="application-detail customer-detail group-detail">
        <AddEndpoint
          modal={this.state.createModal}
          toggle={this.toggleCreateModal}
        />
        <AddUser
          modal={this.state.userModal}
          toggle={this.toggleCreateUserModal}
        />

        <div className="back-btn" onClick={() => { this.goToGroups() }}>
          <Icon type="left" /> Back to Groups
        </div>
        <div className="group-header-custom customer-header">
          <Row>
            <Col span={12}>
              <div className="customer-details">
                <span className="customer-name">{groupDetail.GroupName}</span>
                <span className='user-status'>Active</span>
                <div className="customer-id">
                  <div className='app-id'>GroupID:</div>
                  <div className='txt-app-id'>{groupDetail.GroupID}</div>
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
                  <Row className="row">
                    <label>Group Name</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        error={formSubmit && formError['GroupName'] && (!formError['GroupName'].valid)}
                        disabled
                        id="GroupName"
                        type="text"
                        className='form-textfield'
                        variant="outlined"
                        placeholder="Group Name"
                        value={groupDetailFrom.GroupName}
                        name="GroupName"
                        onChange={(e) => { this.handleChange(e) }}
                        helperText={formError['GroupName'] && (!formError['GroupName'].valid) ? 'Required' : ''}
                      />
                    </Col>
                  </Row>
                  <Row className="row">
                    <label>Description</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        required
                        error={formSubmit && formError['Description'] && (!formError['Description'].valid)}
                        inputProps={{
                          readOnly: false,
                          maxLength: 140
                        }}
                        id="description"
                        type="text"
                        multiline={true}
                        rows={4}
                        className='form-textfield'
                        margin="normal"
                        variant="outlined"
                        placeholder="Group Description"
                        value={groupDetailFrom.Description}
                        name="Description"
                        onChange={(e) => { this.handleChange(e) }}
                      />
                      <div className='feild-desc'>Add a description for the Group in less than 140 charaters</div>
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
                      <div className="del-app del-box">
                        <Row>
                          <Col span={3} className="icon-container">
                            <div className="warnnig-icon"></div>
                          </Col>
                          <Col span={14} className="warrning-msg">
                            <div>
                              <div className="warnnig-text">Delete this group</div>
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
            <TabPane tab="Endpoints" key="2">
              <GroupEndpoint />
            </TabPane>
            <TabPane tab="Users" key="3">
              <GroupUser />
            </TabPane>
          </Tabs>
        </div>
        <DeleteTenant
          modal={this.state.deleteModal}
          toggle={this.toggleDeleteModal}
          modalName='Group'
          typeDetails={groupDetail}
          typeName={groupDetail.GroupName}
          isBlock={this.state.isBlock}
        />
      </div>

    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { groupDetail } = state.groups;
  return {
    user,
    groupDetail
  }
}
export default connect(mapStateToProps)(groupDetail);
