import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Row, Col } from 'antd';
import './transactions.scss';
const Option = Select.Option;

export class ActionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
			actionDetail:{
				timeAttendence:'',
				punchUrl:'',
			}
    }
  }

  render() {
    const { actionDetail } = this.state;

    return (
      <div className="transaction-detail-box">
      <Row>
            <Col span={24}>
            <div className="">
            <div className="transaction-detail-containt ">
              <div className="transaction-detail-first-txt act-label-width">Action Type</div>
              <span className='transaction-detail-second-txt'>Punch</span>
            </div>

            <div className="transaction-detail-containt">
              <div className="transaction-detail-first-txt act-label-width">Punch Time</div>
              <span className='transaction-detail-second-txt'>25 May 2019, 5:30 PM</span>
            </div>

            <div className="transaction-detail-containt">
              <div className="transaction-detail-first-txt act-label-width">Punch Direction</div>
              <span className='transaction-detail-second-txt'>IN</span>
            </div>

            <div className="transaction-detail-containt">
              <div className="transaction-detail-first-txt act-label-width">Response</div>
              <span className='transaction-detail-second-txt'>Success</span>
            </div>

            <div className="transaction-detail-containt">
              <div className="transaction-detail-first-txt act-label-width">Status</div>
              <span className='transaction-detail-second-txt'>Completed</span>
            </div>

            </div>
            </Col>
          </Row>
          </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user,
  }
}
export default connect(mapStateToProps)(ActionDetail);