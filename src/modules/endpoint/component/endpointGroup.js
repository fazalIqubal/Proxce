import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddGroup from './addGroup'
import { Table, Button, message } from 'antd';
import './endpointsDetail.scss';
import _ from 'lodash';
import { getEndpointById, removeEndpointGroups } from '../action/endpoints.actions';

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


  compareByAlph = (a, b) => { if (a > b) { return -1; } if (a < b) { return 1; } return 0; }

  onSelectedRow = (selectedRowKeys, rows) => {
    this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: rows })
  }

  openCreateModal = () => {
    this.setState({ createModal: true, isEdit: false })
  }

  toggleCreateModal = (isReload) => {
    this.setState({ createModal: false })
    if (isReload) {
      this.getEndpointById()
    }
  }

  getEndpointById() {
    const { dispatch, endpointDetail } = this.props;
    dispatch(getEndpointById(endpointDetail.EndpointID));
  }

  onClickDeleteGroup = () => {
    const { dispatch, endpointDetail } = this.props;
    const groups = this.state.selectedRows;
    dispatch(removeEndpointGroups(endpointDetail.EndpointID, groups))
      .then(() => {
        this.setState({ selectedRowKeys: [], selectedRows: [] });
        message.success("Groups deleted successfully");
      });
  }

  render() {
    const { columns, selectedRows, selectedRowKeys } = this.state;
    const { endpointDetail } = this.props
    const groups = endpointDetail.Groups;

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
        <div className="group-user-container">
          <div className="row">
            <div className="col-6">
              <div className=''>
                {/* <Button className='cerate-group-btn' onClick={() => { this.openCreateModal() }}>ADD GROUP</Button> */}

                <AddGroup
                  endpoints={[endpointDetail]}
                  modal={this.state.createModal}
                  toggle={this.toggleCreateModal}

                />
                <Button
                  className="cerate-group-btn"
                  key="submit"
                  onClick={() => { this.openCreateModal() }}
                >ADD GROUP</Button>

                <div
                  onClick={() => { this.onClickDeleteGroup() }}
                  class={`${selectedRows.length == 0 ? 'disabled' : ''} user-delete-btn`}>
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
            dataSource={groups || []}
            columns={columns}
            rowSelection={rowSelection}
            pagination={{
              pageSize: 10,
              total: ((groups && groups.length) || 0),
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
  const { endpointDetail } = state.endpoints;
  return {
    endpointDetail
  }
}
export default connect(mapStateToProps)(Group);
