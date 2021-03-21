import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Row, Col, Tooltip, Tabs, Menu, Dropdown, Button, Date } from 'antd';
import "./spoofAtempts.scss";
import './users.scss';
import { history } from '../../../helpers'
import moment from 'moment';
import { getUserSpoofAtemptsById } from '../action/users.actions';
import user from "../../../image/user_preview.png";
import ActionDetail from './actionDetail';
const { TabPane } = Tabs
const dateFormat = 'MMM DD YYYY h:m A';

/* eslint eqeqeq: 0 */
export class SpoofAtemptsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1'
    }
  }


  componentDidMount() {
    const { dispatch, match } = this.props;
    const id = (match && match.params && match.params.id) || '';
    dispatch(getUserSpoofAtemptsById(id))
    // dispatch(getUserRawJson());
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  goToSpoofAtempts = () => {
    history.push(`/spoofAtempts`)
  }


  render() {
    const { userSpoofAtemptsDetail } = this.props;
    return (
      <div className="spoof-detail group-detail">
        <div className="back-btn" onClick={() => { this.goToSpoofAtempts() }}>
          <Icon type="left" /> Back to potential spoof attempts
        </div>


        <div className="group-header-custom customer-header">
          <Row>
            <Col span={24}>
              <div className="customer-details">
                <span className="customer-name">First Name Last Name</span>
                <span className="customer-name-status">Authorised</span>
                <div className="customer-id">
                <div className="activity-log-status">
                  <div className='app-id'>PRIMARYID</div><span className="app-id-txt">{userSpoofAtemptsDetail.id}</span>
                  <div className='created-date'>
                    <div className='timelapse-icon'></div>
                    <span className='app-id-txt'>{moment(userSpoofAtemptsDetail.logDate).format('MMM DD YYYY h:m A')}</span>
                  </div>
                  </div>
                </div>
              </div>
            </Col>

          </Row>
        </div>

        <div className="tab-section">
          <Tabs activeKey={this.state.activeKey} onChange={this.onChange}>
            <TabPane tab="Face Authentication" key="1">
              <div className="spoof-detail-box">
              <Row>
                <Col span={6}>
                <div className="spoof-detail-containt">
                  <div className="spoof-detail-image-heading">Captured Image</div>
                  <div className="capture-image-box"><img src={user} className='user-avatar capture-image' alt="" /></div><br></br>
                  <div className="spoof-detail-image-heading">Matched with</div>
                  <div className="capture-image-box"><img src={user} className='user-avatar capture-image' alt="" /></div>
                </div>
                </Col>

                <Col span={18}>
                <div className="spoof-description-text">
                <div className="spoof-detail-containt">
                  <div className="spoof-detail-first-txt">OloID</div>
                  <span className='spoof-detail-second-txt'>{userSpoofAtemptsDetail.eventDetail}</span>
                </div>

                <div className="spoof-detail-containt">
                  <div className="spoof-detail-first-txt">Secondary ID</div>
                  <span className='spoof-detail-second-txt'>{userSpoofAtemptsDetail.secondaryId}</span>
                </div>

                <div className="spoof-detail-containt">
                  <div className="spoof-detail-first-txt">Transaction ID</div>
                  <span className='spoof-detail-second-txt'>{userSpoofAtemptsDetail.transactionId}</span>
                </div>

                <div className="spoof-detail-containt">
                  <div className="spoof-detail-first-txt">Face Match</div>
                  <span className='spoof-detail-second-txt'>{userSpoofAtemptsDetail.faceMatch}</span>
                </div>

                <div className="spoof-detail-containt">
                  <div className="spoof-detail-first-txt">Face Mach Score</div>
                  <span className='spoof-detail-second-txt'>{userSpoofAtemptsDetail.faceMatchScore}</span>
                </div>

                <div className="spoof-detail-containt">
                  <div className="spoof-detail-first-txt">Liveliness</div>
                  <span className='spoof-detail-second-txt'>{userSpoofAtemptsDetail.liveliness}</span>
                </div>

                <div className="spoof-detail-containt">
                  <div className="spoof-detail-first-txt">Liveliness Score</div>
                  <span className='spoof-detail-second-txt'>{userSpoofAtemptsDetail.livelinessScore}</span>
                </div>

                <div className="spoof-detail-containt">
                  <div className="spoof-detail-first-txt">Mode</div>
                  <span className='spoof-detail-second-txt'>{userSpoofAtemptsDetail.made}</span>
                </div>

                <div className="spoof-detail-containt">
                  <div className="spoof-detail-first-txt">Connection</div>
                  <span className='spoof-detail-second-txt'>{userSpoofAtemptsDetail.connection}</span>
                </div>

                <div className="spoof-detail-containt">
                  <div className="spoof-detail-first-txt">Application</div>
                  <span className='spoof-detail-second-txt'>{userSpoofAtemptsDetail.application}</span>
                </div>

                <div className="spoof-detail-containt">
                  <div className="spoof-detail-first-txt">Endpoint ID</div>
                  <span className='spoof-detail-second-txt'>{userSpoofAtemptsDetail.endpointId}</span>
                </div>

                <div className="spoof-detail-containt">
                  <div className="spoof-detail-first-txt">Endpoint</div>
                  <span className='spoof-detail-second-txt'>{userSpoofAtemptsDetail.endpoint}</span>
                </div>
                </div>
                </Col>
              </Row>
              </div>
            </TabPane>
            <TabPane tab="Action" key="2">
            <ActionDetail />
            </TabPane>
            <TabPane tab="Raw JSON" key="3">
              <div>Coming soon</div>
            </TabPane>

          </Tabs>
        </div>



      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { userSpoofAtemptsDetail } = state.users;
  return {
    user,
    userSpoofAtemptsDetail
  }
}
export default connect(mapStateToProps)(SpoofAtemptsDetail);