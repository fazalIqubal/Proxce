import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Row, Col, Icon, Dropdown, Menu } from 'antd';
import { getTenantSupervisors } from '../action/tenant.actions';
import InviteSupervisor from './inviteSupervisor'
import moment from 'moment';
import { Switch } from 'antd';
import './tenants.scss';
import _ from 'lodash';

export class TenantSupervisor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [

                {
                    title: 'NAME',
                    dataIndex: 'name',
                    key: 'name',
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    sortDirections: ['descend', 'ascend'],
                },

                {
                    title: 'EMAIL',
                    dataIndex: 'email',
                    key: 'email',
                    sorter: (a, b) => a.email.localeCompare(b.email),
                    sortDirections: ['descend', 'ascend'],
                },

                {
                    title: 'VERIFIED',
                    dataIndex: 'verified',
                    key: 'verified',
                    sorter: (a, b) => a.verified.localeCompare(b.verified),
                    sortDirections: ['descend', 'ascend'],
                    render: (text, obj) => <div>
                        {obj.verified
                             ?<div className="success-icon"></div>
                             :<div className="success-icon error"></div>
                        }
                    </div>
                },

                {
                    title: 'APPLICATION',
                    dataIndex: 'application',
                    key: 'application',
                    sorter: (a, b) => a.application.localeCompare(b.application),
                    sortDirections: ['descend', 'ascend'],
                    render: (application, obj) => <div>
                        {
                            application && application.map((app) => {
                                return <div className="supervisor-application-tab"> {app.name} </div>
                            })
                        }
                    </div>
                },

                {
                    title: '',
                    dataIndex: 'threeDot',
                    key: 'threeDot',
                    sortDirections: ['descend', 'ascend'],
                    render: (text, obj) =>
                        <Dropdown overlay={this.menu}>
                            <Icon type="more" style={{ pointer: 'cursor', fontSize: '30px', fontWeight: 'bold', color: '#000000' }} />
                        </Dropdown>
                },

            ],

        }
    }

    menu() {
        return (
            <Menu>
                <Menu.Item key="1">
                    Add Application
            </Menu.Item>
                <Menu.Item key="2">
                    Delete Application
                </Menu.Item>
                <Menu.Item key="3">
                    Delete Supervisors
                </Menu.Item>
                <Menu.Item key="4">
                    Resend Invite 
                </Menu.Item>
                <Menu.Item key="5">
                    Edit Email
                </Menu.Item>
            </Menu>
        );
    }

    componentDidMount() {
        const { dispatch } = this.props;
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getTenantSupervisors());
    }

    compareByAlph = (a, b) => { if (a > b) { return -1; } if (a < b) { return 1; } return 0; }

    onSelectedRow = (rows) => {
        this.setState({ selectedRows: rows })
    }
    onClickSetPrimary = () => {
        const { dispatch } = this.props;
    }

    onClickAddFace = () => {
    }

    onClickDeleteFace = () => {
    }

    openCreateModal = () => {
        this.setState({ createModal: true, isEdit: false })
    }
    
    toggleCreateModal = () => {
        this.setState({ createModal: false })
    }


    render() {
        const { columns, selectedRows } = this.state;
        const { tenantSupervisor } = this.props

        return (
            <div className='tenant-container'>
                     <InviteSupervisor
                        modal={this.state.createModal}
                        toggle={this.toggleCreateModal}
                        />
                <div className="face-user-container">
                    <div className="row">

                    </div>
                </div>
                <div className='table-box face-table'>
                    <div className="bottom-box">
                        <Row>
                            <Col span={24}>
                                <div>
                                    <button className="btn-invite ant-btn ant-btn-primary" type="primary"
                                     key="submit"
                                     onClick={() => { this.openCreateModal() }}
                                    >INVITE SUPERVISOR</button>
                                </div>
                            </Col>
                        </Row><br></br>
                        <Table
                            dataSource={(tenantSupervisor.length && tenantSupervisor) || []}
                            columns={columns}
                            pagination={{
                                pageSize: 10,
                                total: tenantSupervisor.length,
                                showTotal: (total, range) => `${range[0]} to ${range[1]} from ${total}`,
                                defaultCurrent: 1
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { tenantSupervisor } = state.tenant;
    return {
        tenantSupervisor
    }
}
export default connect(mapStateToProps)(TenantSupervisor);