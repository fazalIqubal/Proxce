import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Row, Col, Tooltip, Tabs, Menu, Dropdown, Button, Date } from 'antd';
import './activityLog.scss';
import { history } from '../../../helpers'
import moment from 'moment';
import { getActivityLogById } from '../action/activityLog.actions';
import JSONPretty from 'react-json-pretty';
const { TabPane } = Tabs
const dateFormat = 'MMM DD YYYY h:m A';
/* eslint eqeqeq: 0 */
export class ActivityLogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1'
    }
  }


  componentDidMount() {
    const { dispatch, match } = this.props;
    const id = (match && match.params && match.params.id) || '';
    dispatch(getActivityLogById(id))
    // dispatch(getUserRawJson());
  }

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  goToActivityLog = () => {
    history.push(`/activityLog`)
  }


  render() {
    const { activityLogDetail } = this.props;
    return (
      <div className="activity-detail group-detail">
        <div className="back-btn" onClick={() => { this.goToActivityLog() }}>
          <Icon type="left" /> Back to Activity Log
        </div>


        <div className="group-header-custom customer-header">
          <Row>
            <Col span={24}>
              <div className="customer-details">
                <span className="customer-name">Event Type</span>
                <div className="customer-id">
                  <div className="activity-log-status">
                    <div className='app-id'>ACTID</div>
                    <span className="app-id-txt">{activityLogDetail._id}</span>
                    <div className='created-date'>
                      <div className='timelapse-icon'></div>
                      <span className='app-id-txt'>{moment(activityLogDetail.date).format('MMM DD YYYY h:m A')}</span>
                    </div>
                  </div>
                  <div className='txt-app-id'></div>

                </div>
              </div>
            </Col>

          </Row>
        </div>

        <div className="tab-section">
          <Tabs activeKey={this.state.activeKey} onChange={this.onChange}>
            <TabPane tab="Details" key="1">
              <div className="activity-detail-box">

                <div className="activity-detail-containt">
                  <div className="activity-detail-first-txt">Event Detail</div>
                  <span className='activity-detail-second-txt'>{activityLogDetail.type}</span>
                </div>

                <div className="activity-detail-containt">
                  <div className="activity-detail-first-txt">Description</div>
                  <span className='activity-detail-second-txt'>{activityLogDetail.description}</span>
                </div>

                <div className="activity-detail-containt">
                  <div className="activity-detail-first-txt">Source</div>
                  <span className='activity-detail-second-txt'>{activityLogDetail.source}</span>
                </div>

                <div className="activity-detail-containt">
                  <div className="activity-detail-first-txt">User</div>
                  <span className='activity-detail-second-txt'>{activityLogDetail.userName}</span>
                </div>

                <div className="activity-detail-containt">
                  <div className="activity-detail-first-txt">Application</div>
                  <span className='activity-detail-second-txt'>{activityLogDetail.application}</span>
                </div>

                <div className="activity-detail-containt">
                  <div className="activity-detail-first-txt">Connection</div>
                  <span className='activity-detail-second-txt'>{activityLogDetail.connection}</span>
                </div>

                <div className="activity-detail-containt">
                  <div className="activity-detail-first-txt">Endpoint Name</div>
                  <span className='activity-detail-second-txt'>{activityLogDetail.endpointName}</span>
                </div>

                <div className="activity-detail-containt">
                  <div className="activity-detail-first-txt">Endpoint ID</div>
                  <span className='activity-detail-second-txt'>{activityLogDetail.endpointId}</span>
                </div>

                <div className="activity-detail-containt">
                  <div className="activity-detail-first-txt">Location</div>
                  <span className='activity-detail-second-txt'>{activityLogDetail.host}</span>
                </div>


              </div>
            </TabPane>
            <TabPane tab="Raw JSON" key="2">
              <div className='raw-json'>
                <div className='string-json'>
                  <JSONPretty id="json-pretty" data={activityLogDetail}></JSONPretty>
                </div>
              </div>
            </TabPane>

          </Tabs>
        </div>



      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { activityLogDetail } = state.activityLog;
  return {
    user,
    activityLogDetail
  }
}
export default connect(mapStateToProps)(ActivityLogDetail);
