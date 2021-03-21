import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Select, Table, Button } from 'antd';
import { getAllUsers, filterUsers } from '../action/users.actions';
import '../../tenant/component/tenants.scss';
import './users.scss';
import { history } from '../../../helpers';
import { getAllConnection } from '../../connections/action/connection.actions';
import UserImageModel from './userImageModel';
import AddGroup from './addGroup'
import _ from 'lodash';
const Option = Select.Option;

/* eslint eqeqeq: 0 */
export class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'FACE/#FACES',
          dataIndex: 'PrimaryFace',
          width: '15%',
          key: 'faces',
          render: (PrimaryFace, data) => <div onClick={() => { this.openCreateModal(data) }} className=''><img src={PrimaryFace} alt=""></img></div>
        },
        {
          title: 'FULL NAME',
          dataIndex: 'FullName',
          key: 'FullName',
          sorter: (a, b) => a.FullName.localeCompare(b.FullName),
          sortDirections: ['descend', 'ascend'],
          render: (text, obj) => <div className='user-name clickable-text'><div className={`bullet ${true ? 'green' : 'red'}`}></div><div className='app-name' onClick={() => this.openApplicationDetail(obj)}>{text}</div></div>
        },
        // {
        //   title: 'OLOID',
        //   dataIndex: 'OloID',
        //   width: '20%',
        //   key: 'OloID',
        //   sorter: (a, b) => a.OloID.localeCompare(b.OloID),
        //   sortDirections: ['descend', 'ascend'],
        // },
        {
          title: 'CONNECTION',
          dataIndex: 'ConnectionDisplayName',
          key: 'ConnectionDisplayName',
          sorter: (a, b) => a.ConnectionDisplayName.localeCompare(b.ConnectionDisplayName),
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
          title: 'LAST UPDATED',
          dataIndex: 'UpdatedAt',
          key: 'UpdatedAt',
          sorter: (a, b) => a.UpdatedAt.localeCompare(b.UpdatedAt),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'LAST FACE AUTHENTICATION',
          dataIndex: 'lastFaceAuthentication',
          key: 'lastFaceAuthentication',
          sorter: (a, b) => a.lastFaceAuthentication.localeCompare(b.lastFaceAuthentication),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'TOTAL # FACE AUTHENTICATION',
          dataIndex: 'totalFaceAuthentication',
          key: 'totalFaceAuthentication',
          sorter: (a, b) => a.totalFaceAuthentication.localeCompare(b.totalFaceAuthentication),
          sortDirections: ['descend', 'ascend'],
        }
      ],
      selectedRows: [],
      selectedRowKeys: [],
      selectedUser: {},
      filter: {
        search: '',
        connection: 'ALL'
      }
    }
  }
  openCreateModal = (data) => {
    this.setState({ createModal: true, selectedUser: data, isEdit: false })
  }

  openGroupModal = (data) => {
    this.setState({ groupModal: true, selectedRows: this.state.selectedRows })
  }

  toggleGroupModal = () => {
    this.setState({ groupModal: false })
  }

  toggleCreateModal = () => {
    this.setState({ createModal: false })
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllUsers());
    dispatch(getAllConnection())
  }

  openApplicationDetail = (user) => {
    history.push(`/users/${user.OloID}/detail`)
  }
  onChangeHandler = (e) => {
    const { filter } = this.state;
    const name = e.target.name;
    const value = e.target.value;
    filter[name] = value;
    this.setState({ filter })
  }

  onSearch = (e) => {
    const { dispatch } = this.props;
    const { filter } = this.state
    if (e.key === 'Enter') {
      filter.connection = 'ALL';
      this.setState({ filter });
      dispatch(getAllUsers({ search: this.state.filter.search }));
    }
  }
  onChangeAppType = (connection) => {
    const { filter } = this.state
    const { dispatch } = this.props;;
    let param = { ...filter }
    param.connection = '';
    filter.connection = connection;
    this.setState({ filter });
    if (connection != 'ALL') {
      param.connection = connection;
    }
    dispatch(filterUsers(param));
  }

  onSelectedRow = (selectedRowKeys, rows) => {
    this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: rows })
  }

  render() {
    const { columns, selectedUser, selectedRows, selectedRowKeys, filter } = this.state;
    const { allUsers } = this.props;
    const { allConnections } = this.props;
    const connections = _.uniqBy(allConnections, 'ConnectionDisplayName');

    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.onSelectedRow(selectedRowKeys, selectedRows)
      },
      getCheckboxProps: record => ({
        disabled: record.EndpointID === 'Disabled Group',
        name: record.EndpointID,
      }),
    };
    return (
      <div className='application-container users-container'>
        <div className='top-header'>
          <div className='search-box'>
            <div className='search-icon'></div>
            <input placeholder='Search User'
              name="search"
              value={filter.search}
              onKeyDown={this.onSearch}
              onChange={(e) => { this.onChangeHandler(e) }} />
          </div>
        </div>
        <div className='endp-bottom-box'>
          <div className='txt-customer'>Connections</div>
          <Select
            defaultValue='All'
            onChange={(e) => { this.onChangeAppType(e) }}
            value={filter.connection}
            className="select-input">
            <Option key="ALL" value="ALL">ALL</Option>
            {
              connections && connections.map((res, index) => {
                return <Option className="select-input" key={index} value={res.ConnectionDisplayName}> {res.ConnectionDisplayName} </Option>
              })
            }
          </Select>
          <div className="add-btn-row-container">
            <div className="add-btn-row">
              <div className=''>
                <Button
                  className={`${selectedRows.length == 0 ? 'disabled' : ''} cerate-group-btn`}
                  // className="cerate-group-btn"
                  key="submit"
                  onClick={() => { this.openGroupModal() }}
                >ADD GROUP</Button>
                <span>{selectedRows.length} User(s) selected</span>
              </div>
            </div>
          </div>
          <div className='table-box users'>
            <Table
              rowKey="OloID"
              rowSelection={rowSelection}
              dataSource={allUsers}
              columns={columns}
              pagination={{
                pageSize: 10,
                total: allUsers.length,
                showTotal: (total, range) => `${range[0]} to ${range[1]} from ${total}`,
                defaultCurrent: 1
              }
              } />
          </div>
        </div>

        <UserImageModel
          modal={this.state.createModal}
          toggle={this.toggleCreateModal}
          selectedUser={selectedUser}
        />
        <AddGroup
          modal={this.state.groupModal}
          selectUsers={this.state.selectedRows}
          toggle={this.toggleGroupModal}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { allUsers } = state.users;
  const { allConnections } = state.connection;
  return {
    user,
    allUsers,
    allConnections
  }
}
export default connect(mapStateToProps)(Users);
