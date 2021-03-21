import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Row, Col, Tabs, Menu, Dropdown, Button } from 'antd';
import { getTenantById } from '../action/tenant.actions';
import './tenants.scss';
import InviteTenant from './inviteTenant';
import InviteSupervisor from './inviteSupervisor';
import queryString from 'query-string';
import user from "../../../image/user_preview.png";
import General from './general';
import TenantProduct from './tenantProduct';
import TenantAdmin from './tenantAdmin';
import TenantSupervisor from './tenantSupervisor';
import { history } from '../../../helpers'
import moment from 'moment';

/* eslint eqeqeq: 0 */
const { TabPane } = Tabs
export class Tenant extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      consentForm: false,
      formError: {},
      formSubmit: false,
      advanceSetting: false,
      tenantDetail: {
        createdDate: null
      },
      activeKey: '1'
    }
  }

  openSupervisorModals = () => {
    this.setState({ supervisorModal: true, isEdit: false })
  }
  openCreateModal = () => {
    this.setState({ createModal: true, isEdit: false })
  }


  toggleUserModal = () => {
    this.setState({ supervisorModal: false })
  }

  toggleCreateModal = () => {
    this.setState({ createModal: false })
  }

  toggleSupervisorModal = () => {
    this.setState({ supervisorModal: false })
  }

  componentDidMount() {
    const { dispatch, location, user } = this.props;
    const param = queryString.parse(location.search);
    if (param && param.inviteAdmin) {
      this.setState({ createModal: true, activeKey: "3" });
      history.push('/tenant')
    }
    dispatch(getTenantById(user.tenantName));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, location, user } = nextProps;
    const param = queryString.parse(location.search);
    if (param && param.inviteAdmin && !this.state.createModal) {
      this.setState({ createModal: true, activeKey: "3" });
      history.push('/tenant')
    }
  }

  onChnageTab = activeKey => {
    this.setState({ activeKey });
  };

  render() {
    const { activeKey } = this.state;
    const { tenantDetail } = this.props;
    const menu = (
      <Menu className="tenant-action-menu" onClick={this.handleActionChange}>
        <Menu.Item key="1">
          <div className="ant-dropdown-menu-item-tenant"
            key="submit"
            onClick={() => { this.openCreateModal() }}>
            Invite Tenant Admin </div>
        </Menu.Item>
        <Menu.Item key="2"
          key="submit"
          onClick={() => { this.openSupervisorModals() }}>
          Invite Supervisor
        </Menu.Item>
      </Menu>
    );
    return (
      <div className='activityLog-container'>

        <InviteTenant
          modal={this.state.createModal}
          toggle={this.toggleCreateModal}
        />
        <InviteSupervisor
          modal={this.state.supervisorModal}
          toggle={this.toggleSupervisorModal}
        />
        <div className="customize-select">
          <div className="customer-header">
            <Row>
              <Col span={20}>
                <div className="tenant-image-header">
                  <div className="tenant-image-box">
                    <img src={user} alt="" />
                    <span className='tenant-edit-icon'></span>
                  </div>
                  <div className="tenant-details">
                    <span className="tenant-name">{tenantDetail.TenantName}</span>
                    <div className="customer-id">
                      <div className='app-id'>TENANTID: <span className="app-id-data">{tenantDetail.TenantID}</span></div>
                      <div className='app-id'>COSTID: <span className="app-id-data">{tenantDetail.CustomerID}</span></div>
                      {/* <div className='timelapse-icon'><div className="app-id-data">May 25 2019,5:30 PM</div></div> */}
                      <div className='app-id'>
                        <div className='timelapse-icon'></div>
                        <span className="app-id-data">{tenantDetail.CreatedDate && moment.unix(tenantDetail.CreatedDate).format('MMMM Do YYYY, h:m a')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col span={4}>

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
          <Tabs onChange={this.onChnageTab} activeKey={activeKey} defaultActiveKey="1">
            <TabPane tab="General" key="1">
              <General tenantDetail={tenantDetail} />
            </TabPane>
            <TabPane tab="Products" key="2">
              <TenantProduct tenantDetail={tenantDetail} />
            </TabPane>
            <TabPane tab="Tenant Admins" key="3">
              <TenantAdmin tenantDetail={tenantDetail} />
            </TabPane>
            <TabPane tab="Supervisors" key="4">
              <TenantSupervisor tenantDetail={tenantDetail} />
            </TabPane>
            <TabPane tab="Advanced" key="5">
              {/* <Consent /> */}
            </TabPane>
          </Tabs>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { tenantDetail } = state.tenant;
  return {
    user,
    tenantDetail
  }
}
export default connect(mapStateToProps)(Tenant);