import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Table, Row, Col, Button, DatePicker } from 'antd';
import { getAllTransactions } from '../action/transactions.actions';
import '../../tenant/component/tenants.scss'
import './transactions.scss';
import { getAllApplication } from '../../application/action/application.actions';
import { history } from '../../../helpers';
import _ from 'lodash';

const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD HH:mm';
/* eslint eqeqeq: 0 */
export class Transactions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'CAPTURED FACE',
          dataIndex: 'faces',
          key: 'faces',
          render: (coulmnIcon, data) => <div onClick={() => { this.openCreateModal(data) }} className=''><img src={coulmnIcon} ></img></div>
        },
        {
          title: 'FULL NAME',
          dataIndex: 'userName',
          key: 'userName',
          sorter: (a, b) => a.userName.localeCompare(b.userName),
          sortDirections: ['descend', 'ascend'],
          render: (text, userName) => <div className='user-name clickable-text'><div className='' onClick={() => this.openTransactionDetail(userName)}>{text}</div></div>
        },
        {
          title: 'DATE TIME',
          dataIndex: 'dateTime',
          key: 'dateTime',
          sorter: (a, b) => a.dateTime.localeCompare(b.dateTime),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'PRIMARYID',
          dataIndex: 'PrimaryID',
          key: 'PrimaryID',
          sorter: (a, b) => a.PrimaryID.localeCompare(b.PrimaryID),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'APPLICATION NAME',
          dataIndex: 'application',
          key: 'application',
          sorter: (a, b) => a.application.localeCompare(b.application),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'ENDPOINT NAME',
          dataIndex: 'endpointName',
          key: 'endpointName',
          sorter: (a, b) => a.endpointName.localeCompare(b.endpointName),
          sortDirections: ['descend', 'ascend'],
        },


        {
          title: 'LOCATION',
          dataIndex: 'Location',
          key: 'Location',
          sorter: (a, b) => a.Location.localeCompare(b.Location),
          sortDirections: ['descend', 'ascend'],
        }
      ],
      selectedUser: {}
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllTransactions());
    dispatch(getAllApplication())
  }

  compareByAlph = (a, b) => { if (a > b) { return -1; } if (a < b) { return 1; } return 0; }

  openTransactionDetail = (user) => {
    history.push(`/transactions/${user.userId}/detail`)
  }

  render() {
    const { columns, selectedUser } = this.state;
    const { allTransactions } = this.props;
    const { allApplication } = this.props
    const application = _.uniqBy(allApplication, 'ApplicationName');
    return (
      <div className='application-container users-container'>
        <div className='top-header'>
          <div className='search-box'>
            <div className='search-icon'></div>
            <input placeholder='Search by Name or Primary ID' />
          </div>
        </div>
        <div className='bottom-box'>
          <Row>
            <Col span={6}>
              <div className='txt-customer'>From Date Time</div>
              <div className="transactions-filter">
                <DatePicker showTime placeholder="From Date Time" format={dateFormat} />
              </div>
            </Col>
            <Col span={6}>
              <div className='txt-customer'>To Date Time</div>
              <div className="transactions-filter">
                <DatePicker showTime placeholder="From Date Time" format={dateFormat} />
              </div>
            </Col>
            <Col span={6}>
              <label className="dropdown-level-txt">Application Name</label>
              <div className="from-left-col">
                <Select defaultValue='Application Name' className="select-input">
                  <Option key="ALL" value="ALL">ALL</Option>
                  {
                    application && application.map((res, index) => {
                      return <Option key={index} value={res.ApplicationName}> {res.ApplicationName} </Option>
                    })
                  }
                </Select>
              </div>
            </Col>
            <Col span={6}>
              {/* <label className="dropdown-level-txt">Location</label>
              <div className="from-left-col">
                <Select defaultValue='Location' className="select-input">
                  <Option key="ALL" value="ALL">ALL</Option>
                </Select>
              </div> */}
            </Col>
          </Row>
          <div className='transactions-button-box '>
            <Button
              className="transactions-refresh-btn"
            >REFRESH</Button>
            <Button
              className="transactions-clear-btn"
            >CLEAR</Button>
          </div>
          <div className='table-box users'>
            <Table
              dataSource={allTransactions}
              columns={columns}
              pagination={{
                pageSize: 10,
                total: allTransactions.length,
                showTotal: (total, range) => `${range[0]} to ${range[1]} from ${total}`,
                defaultCurrent: 1
              }
              } />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { allTransactions } = state.transactions;
  const { allApplication } = state.application;
  return {
    user,
    allTransactions,
    allApplication
  }
}
export default connect(mapStateToProps)(Transactions);
