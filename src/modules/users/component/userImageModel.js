import React, { Component } from 'react';
import "./users.scss";
import { Modal } from 'antd';

class UserImageModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            error: {},
            isSubmit: false
        }
    }

    handleOk = () => {
        this.validateForm();
        this.setState({ isSubmit: true })
    };

    handleCancel = () => {
        this.setState({ user: {}, error: {}, isSubmit: false })
        this.props.toggle()
    };

    render() {
        const { error, isSubmit } = this.state;
        const { selectedUser } = this.props;
        return (
            <div >
                <Modal
                    visible={this.props.modal}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <div><img className="full-view-avatar" src={selectedUser.PrimaryFace} alt="" ></img></div>
                </Modal>
            </div>
        );
    }
}

export default UserImageModel;