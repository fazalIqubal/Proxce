import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Row, Col, Table } from 'antd';
import { getAllActivityLog } from '../action/activityLog.actions';
import './activityLog.scss'
import { history } from '../../../helpers'
import { DatePicker } from 'antd';
import moment from 'moment';
/* eslint eqeqeq: 0 */
const dateFormat = 'YYYY-MM-DD HH:mm';
const Option = Select.Option;
export class ActivityLog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'EVENT TYPE',
          dataIndex: 'type',
          key: 'type',
          sorter: (a, b) => a.type && a.type.localeCompare(b.type),
          sortDirections: ['descend', 'ascend'],
          render: (text, obj) => <div className='app-name' onClick={() => this.openActivityDetail(obj)}>{text}</div>
        },
        {
          title: 'DATE / TIME',
          dataIndex: 'date',
          key: 'date',
          render: (text, obj) => <div>{moment(text).format('MMM DD YYYY h:m A')}</div>,
          sorter: (a, b) => a.date && a.date.localeCompare(b.date),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'USERS',
          dataIndex: 'userName',
          key: 'userName',
          sorter: (a, b) => a.userName && a.userName.localeCompare(b.userName),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'CONNECTION',
          dataIndex: 'connection',
          key: 'connection',
          sorter: (a, b) => a.connection && a.connection.localeCompare(b.connection),
          sortDirections: ['descend', 'ascend'],
        },

        {
          title: 'APPLICATION',
          dataIndex: 'application',
          key: 'application',
          sorter: (a, b) => a.application && a.application.localeCompare(b.application),
          sortDirections: ['descend', 'ascend'],
        },

        {
          title: 'SOURCE',
          dataIndex: 'source',
          key: 'source',
          sorter: (a, b) => a.source && a.source.localeCompare(b.source),
          sortDirections: ['descend', 'ascend'],
        }
      ]
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllActivityLog());
  }

  compareByAlph = (a, b) => { if (a > b) { return -1; } if (a < b) { return 1; } return 0; }

  openActivityDetail = (connection) => {
    history.push(`/activitylog/${connection._id}/detail`)
  }

  render() {
    const { columns } = this.state;
    const { allActivityLog } = this.props
    return (
      <div className='activityLog-container'>

        <div className='bottom-box'>
          <div className="customize-select">
            <div className="date-filters">
              <Row>
                <Col span={6}>
                  <label className="dropdown-level-txt">Event Type</label>
                  <div className="from-left-col">
                    <Select defaultValue='Event Type' className="select-input">
                      <Option key="ALL" value="ALL">ALL</Option>
                    </Select>
                  </div>
                </Col>
                <Col span={6}>
                  <label className="dropdown-level-txt">From Date Time</label>
                  <div className="from-left-col">
                    <DatePicker showTime placeholder="From Date Time" format={dateFormat} />
                  </div>
                </Col>
                <Col span={6}>
                  <label className="dropdown-level-txt">To Date Time</label>
                  <div className="from-left-col">
                    <DatePicker showTime placeholder="To Date Time" format={dateFormat} />
                  </div>
                </Col>
                <Col span={6}>
                  <label className="dropdown-level-txt">Source</label>
                  <div className="from-left-col">
                    <Select defaultValue='Source' className="select-input">
                      <Option key="ALL" value="ALL">ALL</Option>
                    </Select>
                  </div>
                </Col>
              </Row>
            </div>
            <div className='table-box'>
              <Table
                rowKey="_id"
                dataSource={allActivityLog}
                columns={columns}
                pagination={{
                  pageSize: 10,
                  total: allActivityLog.length,
                  showTotal: (total, range) => `${range[0]} to ${range[1]} from ${total}`,
                  defaultCurrent: 1
                }
                } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { allActivityLog } = state.activityLog;
  return {
    user,
    allActivityLog
  }
}
export default connect(mapStateToProps)(ActivityLog);
