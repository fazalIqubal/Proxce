import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddUser from './addUser'
import { Table, Button, message} from 'antd';
import { getGroupById, removeGroupUser } from '../action/groups.actions';
import moment from 'moment';
import '../../users/component/users.scss';
import _ from 'lodash';
import user from "../../../image/user_preview.png";
/* eslint eqeqeq: 0 */
export class GroupUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {
                    title: 'USER NAME',
                    dataIndex: 'FullName',
                    key: 'FullName',
                    sorter: (a, b) => a.FullName.localeCompare(b.FullName),
                    sortDirections: ['descend', 'ascend'],
                },

                {
                    title: 'PRIMARY ID',
                    dataIndex: 'PrimaryID',
                    key: 'PrimaryID',
                    sorter: (a, b) => a.PrimaryID.localeCompare(b.PrimaryID),
                    sortDirections: ['descend', 'ascend'],
                },

                {
                    title: 'CONNECTION',
                    dataIndex: 'ConnectionDisplayName',
                    key: 'ConnectionDisplayName',
                    sorter: (a, b) => a.ConnectionDisplayName.localeCompare(b.ConnectionDisplayName),
                    sortDirections: ['descend', 'ascend'],
                },

                {
                    title: 'OLD ID',
                    dataIndex: 'OloID',
                    key: 'OloID',
                    sorter: (a, b) => a.OloID.localeCompare(b.OloID),
                    sortDirections: ['descend', 'ascend'],
                }
            ],
            selectedRows: [],
            selectedRowKeys: []
        }
    }

    onSelectedRow = (selectedRowKeys, rows) => {
        this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: rows })
    }

    onClickDeleteGroup = () => {
        const { dispatch, groupDetail } = this.props;
        const users = this.state.selectedRows;
        dispatch(removeGroupUser(groupDetail.GroupID, users))
            .then(() => {
                this.setState({ selectedRowKeys: [], selectedRows: [] });
                message.success("Group Users updated successfully");
            });
    }

    openCreateModal = () => {
        this.setState({ createModal: true, isEdit: false })
    }

    toggleCreateModal = () => {
        this.setState({ createModal: false })
    }

    render() {
        const { columns, selectedRows, selectedRowKeys } = this.state;
        const { groupDetail } = this.props
        const groupUser = groupDetail.Users || [];

        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.onSelectedRow(selectedRowKeys, selectedRows)
            },
            getCheckboxProps: record => ({
                disabled: record.OloID === 'Disabled Group',
                name: record.OloID,
            }),
        };


        return (
            <div className='connection-container application-detail user-detail'>
                <div className="face-user-container">
                    <div className="row">
                        <div className="col-6">
                            <div className='button-box'>
                                {/* <Button className='cerate-group-btn' onClick={() => { this.openCreateModal() }}>ADD GROUP</Button> */}

                                <AddUser
                                    modal={this.state.createModal}
                                    toggle={this.toggleCreateModal}
                                />
                                <Button
                                    className="cerate-group-btn"
                                    key="submit"
                                    onClick={() => { this.openCreateModal() }}
                                >ADD USER</Button>

                                <div
                                    onClick={() => { this.onClickDeleteGroup() }}
                                    class={`${selectedRows.length == 0 ? 'disabled' : ''} user-delete-btn`}>
                                    <div className="user-delete-button"></div>
                                </div>
                                <div className="delete-count">
                                    {selectedRows.length} User(s) selected
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='table-box face-table'>
                    <Table
                        dataSource={groupUser || []}
                        columns={columns}
                        rowSelection={rowSelection}
                        pagination={{
                            pageSize: 10,
                            total: ((groupUser && groupUser.length) || 0),
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
    const { groupDetail } = state.groups;
    return {
        groupDetail
    }
}
export default connect(mapStateToProps)(GroupUser);