import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddGroup from './addGroup'
import { Table, Button, message } from 'antd';
import './users.scss';
import _ from 'lodash';
import { getUsersById, removeUserGroups } from '../action/users.actions';

/* eslint eqeqeq: 0 */
export class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [

        {
          title: 'GROUP NAME',
          dataIndex: 'GroupName',
          key: 'GroupName',
          sorter: (a, b) => a.GroupName.localeCompare(b.GroupName),
          sortDirections: ['descend', 'ascend'],
        },

        {
          title: 'DESCRIPTION',
          dataIndex: 'Description',
          key: 'Description',
          sorter: (a, b) => a.Description.localeCompare(b.Description),
          sortDirections: ['descend', 'ascend'],
        },
        {
          title: 'ASSIGNMENT',
          dataIndex: 'Assignment',
          key: 'Assignment',
          sorter: (a, b) => a.Assignment.localeCompare(b.Assignment),
          sortDirections: ['descend', 'ascend'],
        },

      ],
      selectedRows: [],
      selectedRowKeys: []
    }
  }

  onSelectedRow = (selectedRowKeys, rows) => {
    this.setState({ selectedRowKeys, selectedRows: rows })
  }

  openCreateModal = () => {
    this.setState({ createModal: true, isEdit: false })
  }

  toggleCreateModal = (isReload) => {
    this.setState({ createModal: false })
    if (isReload) {
      this.getUsersById()
    }
  }

  getUsersById() {
    const { dispatch, usersDetail } = this.props;
    dispatch(getUsersById(usersDetail.OloID));
  }


  onClickDeleteGroup = () => {
    const { dispatch, usersDetail } = this.props;
    const groups = this.state.selectedRows;
    dispatch(removeUserGroups(usersDetail.OloID, groups))
      .then(() => {
        this.setState({ selectedRowKeys: [], selectedRows: [] });
        message.success("Groups deleted successfully");
      });
  }


  render() {
    const { columns, selectedRows, selectedRowKeys } = this.state;
    const { usersDetail } = this.props
    const userGroup = usersDetail.Groups;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.onSelectedRow(selectedRowKeys, selectedRows)
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };


    return (
      <div className='connection-container'>
        <div className="face-user-container">
          <div className="row">
            <div className="col-6">
              <div className=''>
                <AddGroup
                  modal={this.state.createModal}
                  toggle={this.toggleCreateModal}
                  selectUsers={[usersDetail]}
                />
                <Button
                  className="cerate-group-btn"
                  onClick={() => { this.openCreateModal() }}
                >ADD GROUP</Button>

                <div
                  onClick={() => { this.onClickDeleteGroup() }}
                  className={`${selectedRows.length == 0 ? 'disabled' : ''} user-delete-btn`}>
                  <div className="user-delete-button"></div>
                </div>
                <div
                  className="delete-count"
                >{selectedRows.length} Group(s) selected</div>
              </div>
            </div>
          </div>
        </div>
        <div className='table-box face-table'>
          <Table
            rowKey="GroupID"
            dataSource={userGroup || []}
            columns={columns}
            rowSelection={rowSelection}
            pagination={{
              pageSize: 10,
              total: ((userGroup && userGroup.length) || 0),
              showTotal: (total, range) => `${range[0]} to ${range[1]} from ${total}`,
              defaultCurrent: 1
            }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { usersDetail } = state.users;
  return {
    usersDetail
  }
}
export default connect(mapStateToProps)(Group);
