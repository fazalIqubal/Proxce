import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenants.scss';
import '../../application/component/applicationDetail.scss';
import { Row, Col, Table, Icon } from 'antd';
import { getUserHistory }  from '../action/users.actions';
import moment from 'moment';
import { DatePicker } from 'antd';

/* eslint eqeqeq: 0 */
const dateFormat = 'YYYY/MM/DD';
export class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'DATE / TIME',
          dataIndex: 'dateTime',
          key: 'dateTime',
          render: (dateTime)=><div>{moment(dateTime).format('MMM DD YYYY h:m A')}</div>
        },

        {
          title: 'APPLICATION NAME',
          dataIndex: 'applicationName',
          key: 'applicationName',
        },

        {
          title: 'ENDPOINT',
          dataIndex: 'endPoint',
          key: 'endPoint',
        },

        {
          title: 'LOCATION',
          dataIndex: 'location',
          key: 'location',
          sorter: (a, b) => a.location.localeCompare(b.location),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'EVENT',
          dataIndex: 'event',
          key: 'event',
        },     
      ]
    }
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(getUserHistory());
  }

  compareByAlph =(a, b)=>{ if (a > b) { return -1; } if (a < b) { return 1; } return 0; }

  render() {
    const { columns } = this.state;
    const { userHistory } = this.props

    return (
      <div className='connection-container user-history'>
        <Row>
              <Col span={6} className="from-left-col datetime">
                <DatePicker placeholder="From Date"  format={dateFormat} />
              </Col>
              <Col span={6} className="datetime">
                <DatePicker placeholder="To Date"  format={dateFormat} />
              </Col>
            </Row>
        <div className='table-box'>
            <Table 
              dataSource={(userHistory.length && userHistory) || []} 
              columns={columns} 
              pagination = {{
                pageSize: 10,
                total: userHistory.length,
                showTotal:(total, range) => `${range[0]} to ${range[1]} from ${total}`,
                defaultCurrent:1
              }}
            />
          </div>
      </div>
			);
  }
}

function mapStateToProps(state) {
  const { userHistory } = state.users;
  return {
    userHistory
  }
}
export default connect(mapStateToProps)(History);
