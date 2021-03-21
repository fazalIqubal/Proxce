import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Row, Col, Icon, Menu, Dropdown, Modal, message } from 'antd';
import { resetUserPassword, deleteCognitoUser } from '../../users/action/users.actions';
import { getTenantAdmins } from '../action/tenant.actions';
import InviteTenant from './inviteTenant';
import './tenants.scss';
import _ from 'lodash';

const { confirm } = Modal;

export class TenantAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            createConfirmationPassword: false,
            columns: [

                {
                    title: 'NAME',
                    dataIndex: 'FullName',
                    key: 'FullName',
                    sorter: (a, b) => a.FullName.localeCompare(b.FullName),
                    sortDirections: ['descend', 'ascend'],
                },

                {
                    title: 'EMAIL',
                    dataIndex: 'Email',
                    key: 'Email',
                    sorter: (a, b) => a.Email.localeCompare(b.Email),
                    sortDirections: ['descend', 'ascend'],
                },

                {
                    title: 'VERIFIED',
                    dataIndex: 'UserStatus',
                    key: 'UserStatus',
                    sorter: (a, b) => a.UserStatus.localeCompare(b.UserStatus),
                    sortDirections: ['descend', 'ascend'],
                    render: (text, obj) => <div>
                        {obj.UserStatus === 'CONFIRMED'
                            ? <div className="success-icon"></div>
                            : <div className="success-icon error"></div>
                            // <Icon type="close" style={{ pointer: 'cursor', fontSize: '10px', fontWeight: 'bold', color: '#ffffff', backgroundColor: '#e42a31', borderRadius:'50px', padding:'2px' }} />
                        }
                    </div>
                },

                {
                    title: '',
                    dataIndex: 'threeDot',
                    key: 'threeDot',
                    // sorter: (a, b) => a.threeDot.localeCompare(b.threeDot),
                    sortDirections: ['descend', 'ascend'],
                    render: (text, obj) =>
                        <Dropdown overlay={() => this.menu(obj)}>
                            <Icon type="more" style={{ pointer: 'cursor', fontSize: '30px', fontWeight: 'bold', color: '#000000' }} />
                        </Dropdown>
                },

            ],

        }
    }

    menu(obj) {
        return (
            <Menu>
                <Menu.Item key="1">
                    <div onClick={() => {
                        this.openConfirmationPassword(obj)
                    }}>Reset Password</div>
                </Menu.Item>
                <Menu.Item key="2">
                    <div onClick={() => {
                        this.openConfirmationDelete(obj)
                    }}> Delete Tenant Admin</div>
                </Menu.Item>
            </Menu>
        );
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getTenantAdmins({ role: 'admin' }));
    }

    openCreateModal = () => {
        this.setState({ createModal: true, isEdit: false })
    }

    toggleCreateModal = () => {
        this.setState({ createModal: false })
    }


    openConfirmationPassword = (obj) => {
        const { dispatch } = this.props;
        confirm({
            title: `Are you sure reset the ${obj.FullName} password?`,
            icon: <i></i>,
            // content: 'Some descriptions',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                dispatch(resetUserPassword(obj.OloID, obj))
                    .then((res) => {
                        if (res.error) {
                            message.error(res.message);
                            return;
                        }
                        message.success(res.message);
                    });
            },
            onCancel() {
                console.log('NO');
            },
        });
    }

    openConfirmationDelete = (obj) => {
        const { dispatch } = this.props;
        confirm({
            title: `Are you sure delete this ${obj.FullName}?`,
            icon: <i></i>,
            // content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                dispatch(deleteCognitoUser(obj.OloID, obj.Email))
                    .then((res) => {
                        if (res.error) {
                            message.error(res.message);
                            return;
                        }
                        message.success(res.message);
                    });
            },
            onCancel() {
                console.log('NO');
            },
        });
    }

    toggleCreateConfirmationPassword = () => {
        this.setState({ createConfirmationPassword: false })
    }

    render() {
        const { columns, selectedRows } = this.state;
        const { tenantAdmin } = this.props;

        return (
            <div className='tenant-container'>
                <InviteTenant
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
                                    >INVITE TENANT ADMIN</button>
                                </div>
                            </Col>
                        </Row><br></br>
                        <Table
                            rowKey="OloID"
                            dataSource={(tenantAdmin.length && tenantAdmin) || []}
                            columns={columns}
                            pagination={{
                                pageSize: 10,
                                total: tenantAdmin.length,
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
    const { tenantAdmin } = state.tenant;
    return {
        tenantAdmin: tenantAdmin
    }
}
export default connect(mapStateToProps)(TenantAdmin);