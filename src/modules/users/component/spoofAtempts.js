import React, { Component } from "react";
import { connect } from "react-redux";
import "../../tenant/component/tenants.scss";
import { Select, Row, Col, Table, Button, Tag } from "antd";
import "../../application/component/applicationDetail.scss";
import { getUserSpoofAtempts } from "../action/users.actions";
import moment from "moment";
import "./spoofAtempts.scss";
import "../../../modules/report/component/report.scss";
import { DatePicker } from 'antd';
import user from "../../../image/user_preview.png";
import { history } from '../../../helpers'
import { getAllApplication } from '../../application/action/application.actions';
import _ from 'lodash';

const dateFormat = 'YYYY-MM-DD HH:mm';
const Option = Select.Option;
/* eslint eqeqeq: 0 */
export class UserSpoofAtempts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'CAPTURED FACE',
          dataIndex: 'faces',
          key: 'faces',
          render: (text, obj) => <div className="face-background">
            <img src={user} className='user-avatar' alt="" />
            {obj.isPrimary && <div className="face-online"></div>}
          </div>,
          width: '15%',
        },

        {
          title: 'FULL NAME',
          dataIndex: 'name',
          key: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          sortDirections: ['descend', 'ascend'],
          render: (text, obj)=><div className='app-name clickable-text' onClick={()=>this.openSpoofAtemptDetail(obj)}>{text}</div>
        },

        {
          title: 'DATE / TIME',
          dataIndex: 'date',
          key: 'date',
          sorter: (a, b) => a.date.localeCompare(b.date),
          sortDirections: ['descend', 'ascend'],
          render: (dateTime) => <div>{moment(dateTime).format('MMM DD YYYY h:m A')}</div>
        },

        {
          title: 'PRIMARY ID',
          dataIndex: 'primary',
          key: 'primary',
          sorter: (a, b) => a.primary.localeCompare(b.primary),
          sortDirections: ['descend', 'ascend'],
        },

        {
          title: 'APPLICATION',
          dataIndex: 'application',
          key: 'application',
          sorter: (a, b) => a.application.localeCompare(b.application),
          sortDirections: ['descend', 'ascend'],
        },

        {
          title: 'ENDPOINT NAME',
          dataIndex: 'endpoint',
          key: 'endpoint',
          sorter: (a, b) => a.endpoint.localeCompare(b.endpoint),
          sortDirections: ['descend', 'ascend'],
        },

        {
          title: 'LOCATION',
          dataIndex: 'location',
          key: 'location',
          sorter: (a, b) => a.location.localeCompare(b.location),
          sortDirections: ['descend', 'ascend'],
        },

      ],
      selectedRows: []
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getUserSpoofAtempts());
    dispatch(getAllApplication())
      
  }

  openSpoofAtemptDetail=(connection)=>{
    history.push(`/spoofAtempts/${connection.id}/detail`)
  }


  render() {
    const { columns } = this.state;
    const { userSpoofAtempts } = this.props;
    const { allApplication } = this.props;
    const application = _.uniqBy(allApplication, 'ApplicationName');

    
    return (
      <div className="teanant-container report-container">
         <div className='top-header'>
          <div className='search-box'>
            <div className='search-icon'></div>
            <input placeholder='Search by Name or Primary ID' />
          </div>
        </div>
        <div className="bottom-box">
          <div className="customize-select">
            <Row>
              <Col span={6}>
                <label className="dropdown-level-txt">From Date Time</label>
                 <div  className="from-left-col"> 
                <DatePicker showTime  placeholder="From Date Time"  format={dateFormat} />
                </div>
              </Col>
              <Col span={6}>
              <label className="dropdown-level-txt">To Date Time</label>
              <div  className="from-left-col"> 
                <DatePicker showTime placeholder="To Date Time"  format={dateFormat} />
                </div>
              </Col>
              <Col span={6}>
              <label className="dropdown-level-txt">Application Name</label>
              <div  className="from-left-col"> 
              <Select defaultValue='Application Name' className="select-input">
              <Option key="ALL" value="ALL">ALL</Option>
              {
                application && application.map((res, index)=>{
                  return <Option key={index} value={res.ApplicationName}> {res.ApplicationName} </Option>
                  })
              }
              
              </Select>
                </div>
              </Col>
              <Col span={6}>
              {/* <label className="dropdown-level-txt">Location</label>
              <div  className="from-left-col"> 
              <Select defaultValue='Location' className="select-input">
              <Option key="ALL" value="ALL">ALL</Option>
              </Select>
                </div> */}
              </Col>
            </Row>
            <div className='spoof-button-box '>
            <Button
              className="spoof-refresh-btn"
              key="submit"
              >REFRESH</Button>
            <Button
              className="spoof-clear-btn"
              key="submit"
              >CLEAR</Button>
          </div>

            <div className="table-box">
              <Table
                dataSource={(userSpoofAtempts) || []}
                columns={columns}
                pagination={{
                  pageSize: 10,
                  total: (userSpoofAtempts && userSpoofAtempts.length) || 0,
                  showTotal: (total, range) =>
                    `${range[0]} to ${range[1]} from ${total}`,
                  defaultCurrent: 1
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { userSpoofAtempts } = state.users;
  const { allApplication } = state.application;
  return {
    userSpoofAtempts,
    allApplication
  };
}
export default connect(mapStateToProps)(UserSpoofAtempts);