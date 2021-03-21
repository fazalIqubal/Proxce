import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Icon } from 'antd';
import './users.scss';
import _ from 'lodash';
import Dropzone from 'react-dropzone'
import { addUserFace } from '../action/users.actions';
import Image from '../../../../src/image/Asset-icon.png';

export class AddFace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: {
                isValid: false,
                errorMsg: null,
            },
            isSumited: false,
            fileName: '',
            fileData: ''
        }
    }

    resetModal = () => {
        this.setState({
            error: {
                isValid: false,
                errorMsg: null,
            },
            isSumited: false,
            fileName: '',
            fileData: ''
        });
        this.props.handleCancel();
    }

    handleOk = () => {
        const { dispatch, usersDetail } = this.props;
        if (!this.state.fileData) {
            this.setState({
                error: {
                    isValid: false,
                    errorMsg: 'Please select image',
                }
            });
            return;
        }
        let req = {
            FaceImage: this.state.fileData.split(',')[1]
        }
        dispatch(addUserFace(usersDetail.OloID, req))
            .then((res) => {
                if (res.error) {
                    this.setState({
                        error: {
                            isValid: false,
                            errorMsg: res.message,
                        }
                    })
                    return;
                }
                this.resetModal();
            });
    }
    onRemoveImage = ()=>{
        this.setState({
            error: {
                isValid: false,
                errorMsg: null,
            },
            fileName: '',
            fileData: ''
        });
    }
    onChangeHandler = async (files) => {
        let selectedFiles = files;
        this.setState({
            error: {
                isValid: false,
                errorMsg: null,
            },
        }, async () => {
            for (let index = 0; index < selectedFiles.length; index++) {
                const file = selectedFiles[index];

                if (!this.validateInputFile(file)) {
                    this.setState({
                        error: {
                            isValid: false,
                            errorMsg: 'Only Supported png,jpg,jpeg',
                        }
                    });
                    break;
                }

                let base64 = await this.toBase64(file)
                this.setState({
                    isValid: true,
                    errorMsg: null,
                    fileName: file.name,
                    fileData: base64
                })
            }
        });
    }

    toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }


    validateInputFile(fileInput) {
        var _validFileExtensions = ["jpg", "jpeg", "png"];
        var t = fileInput.name.toLowerCase();
        if (_validFileExtensions.indexOf(t) === -1) {
            return true;
        } else {
            return false;
        }
    }


    render() {
        const { showModal } = this.props;
        const { fileData, error } = this.state;

        return (
            <div>
                <Modal
                    visible={showModal}
                    title=""
                    onOk={this.handleOk}
                    onCancel={this.resetModal}
                    footer={[
                        <Button className="face-upload-btn" key="submit" type="primary" onClick={this.handleOk}>
                            Upload
                    </Button>
                    ]}
                >

                    <Dropzone onDrop={acceptedFiles => { this.onChangeHandler(acceptedFiles) }}>
                        {({ getRootProps, getInputProps, isDragActive }) => (
                            <section className="image-section-container">
                                {
                                    !(fileData) &&
                                    <div {...getRootProps()} className={`${isDragActive ? 'dropzone file-drag' : 'dropzone'}`}>
                                        <input {...getInputProps()} />
                                        <p className="ant-upload-text">Drag and Drop a Image here</p>
                                        <div className="asset-icon"><img  alt="#" src={Image} /></div>
                                        <p className="ant-upload-hint">File type supported: png, jpg, jpeg</p>
                                        <p className="ant-upload-hint">File size upto 2 MB</p>
                                        <p className="ant-upload-hint">Maximun of 1 image only</p>
                                    </div>
                                }
                                {
                                    fileData && <div className="face-image-block" >
                                        <Icon type="close-circle" theme="filled"
                                            onClick={() => { this.onRemoveImage() }}
                                            className="remove-image-icon" />
                                        <img src={fileData} alt="" height="100px" width="100px" />
                                    </div>
                                }

                                {error && error.errorMsg && <p className="error-msg">
                                    {error.errorMsg}
                                </p>}
                            </section>
                        )}
                    </Dropzone>

                </Modal>
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
export default connect(mapStateToProps)(AddFace);

