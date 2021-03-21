import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddEndpoint from './addEndpoint'
import { Table, Button, Row, Col, Icon, message } from 'antd';
import { getGroupById, removeGroupEndpoints } from '../action/groups.actions';
import moment from 'moment';
import '../../users/component/users.scss';
import _ from 'lodash';
/* eslint eqeqeq: 0 */
export class GroupEndpoint extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [

                {
                    title: 'ENDPOINT NAME',
                    dataIndex: 'EndpointName',
                    key: 'EndpointName',
                    sorter: (a, b) => a.EndpointName.localeCompare(b.EndpointName),
                    sortDirections: ['descend', 'ascend'],
                },

                {
                    title: 'ENDPOINT DESCRIPTION',
                    dataIndex: 'Description',
                    key: 'Description',
                    sorter: (a, b) => a.Description.localeCompare(b.Description),
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'ENDPOINT TYPE',
                    dataIndex: 'type',
                    key: 'type',
                    sorter: (a, b) => a.type.localeCompare(b.type),
                    sortDirections: ['descend', 'ascend'],
                },
                {
                    title: 'LOCATION',
                    dataIndex: 'Location',
                    key: 'Location',
                    sorter: (a, b) => a.location.localeCompare(b.location),
                    sortDirections: ['descend', 'ascend'],
                },

            ],
            selectedRows: [],
            selectedRowKeys: []
        }
    }

    componentDidMount() {

    }

    getGroupDetail = () => {
        const { dispatch, match } = this.props;
        const id = (match && match.params && match.params.id) || '';
        dispatch(getGroupById(id))
    }

    onSelectedRow = (selectedRowKeys, rows) => {
        this.setState({ selectedRowKeys: selectedRowKeys, selectedRows: rows })
    }


    onClickDeleteGroup = () => {
        const { dispatch, groupDetail } = this.props;
        const endpoints = this.state.selectedRows;
        dispatch(removeGroupEndpoints(groupDetail.GroupID, endpoints))
            .then(() => {
                this.setState({ selectedRowKeys: [], selectedRows: [] });
                message.success("Group Endpoints updated successfully");
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
        const groupEndpoint = groupDetail.Endpoints || [];

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
            <div className='connection-container application-detail user-detail'>
                <div className="face-user-container">
                    <div className="row">
                        <div className="col-6">
                            <div className='button-box'>
                                {/* <Button className='cerate-group-btn' onClick={() => { this.openCreateModal() }}>ADD GROUP</Button> */}

                                <AddEndpoint
                                    modal={this.state.createModal}
                                    toggle={this.toggleCreateModal}
                                />
                                <Button
                                    className="cerate-group-btn"
                                    key="submit"
                                    onClick={() => { this.openCreateModal() }}
                                >ADD ENDPOINT</Button>

                                <div
                                    onClick={() => { this.onClickDeleteGroup() }}
                                    className={`${selectedRows.length == 0 ? 'disabled' : ''} user-delete-btn`}>
                                    <div className="user-delete-button"></div>
                                </div>
                                <div className="delete-count">{selectedRows.length} Endpoint(s) selected</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='table-box face-table'>
                    <Table
                        dataSource={groupEndpoint || []}
                        columns={columns}
                        rowSelection={rowSelection}
                        pagination={{
                            pageSize: 10,
                            total: ((groupEndpoint && groupEndpoint.length) || 0),
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
export default connect(mapStateToProps)(GroupEndpoint);