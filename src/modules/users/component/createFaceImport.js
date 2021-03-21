import React, { Component } from "react";
import "../../application/component/createApplication.scss";
import "../../connections/component/createConnection.scss";
import "../../tenant/component/createTenant.scss";
import FaceErrorImport from './faceErrorImport'
import { Modal, Button, Icon, Collapse, Progress, message, notification } from "antd";
import _ from 'lodash';
import { connect } from 'react-redux';
import { ImportUserFace } from '../action/users.actions';
import Dropzone from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid';

const { Panel } = Collapse;
const key = 'updatable';
class ImportFaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faceErrorModal: false,
      faces: [],
      exceededFiles: [],
      error: {
        isValid: false,
        errorMsg: null,
        isExceed: false
      },
      isSubmit: false,
      isConfirmImport: false,
      filesCount: 0,
      selectedFile: '',
      failedFace: []
    };

  }


  openNotification = () => {
    const { fileCount, failedFace } = this.state;
    let failedCount = 0;
    failedFace.forEach((face) => {
      failedCount = failedCount + face.files.length;
    })

    const btn = (
      <div className="toster-description-text">
        <Button className="error-toster-btn" type="primary" size="small"
          onClick={() => {
            this.openFaceErrorModal();
            notification.close(key)
          }}>
          View Detail
      </Button>
        <Button className="error-toster-btn" type="primary" size="small"
          onClick={() => {
            notification.close(key)
          }}>
          Close
      </Button>
      </div>
    );
    notification.open({
      description:
        <div>
          'Uploaded {fileCount - failedCount} of {fileCount} faces {failedCount} error(s)'
      </div>,
      btn,
      key,
      duration: 0,
      placement: 'bottomLeft',
      closeIcon: null,
      className: "toster-view-detail"

    });
  };


  openSuccessNotification = () => {

    const btn = (
      <div className="toster-description-text">
        <Button className="error-toster-btn" type="primary" size="small"
          onClick={() => {
            notification.close(key)
          }}>
          Close
      </Button>
      </div>
    );
    notification.open({
      description: <div> Uploaded Successful!</div>,
      btn,
      key,
      duration: 0,
      placement: 'bottomLeft',
      closeIcon: null,
      className: "toster-view-detail"

    });
  };

  openProgress = (redusePer, face) => {
    notification.open({
      message:
        <div>
          <div>Uploading {face.PrimaryID} folder</div>
          <div className="upld-prgrs-bar">
            <Progress percent={redusePer} size="small" status="active" />
          </div>
        </div>,
      key,
      duration: 0,
      placement: 'bottomLeft',
      className: "toster-progress-detail"

    });
  };


  handleResetModal = () => {
    this.setState({
      faces: [],
      exceededFiles: [],
      error: {
        isValid: false,
        errorMsg: null,
        isExceed: false
      },
      isSubmit: false,
      isConfirmImport: false,
      selectedFile: '',
    });
    this.props.toggle();
  };



  validateForm = () => {
    const { faces } = this.state;
    let isMoreFile = false;
    let exceededFiles = [];
    faces.forEach((face) => {
      if (face.files.length > 5) {
        isMoreFile = true;
        exceededFiles.push(face);
      }
    })
    if (isMoreFile) {
      this.setState({
        error: {
          isValid: true,
          errorMsg: '',
          isExceed: true
        },
        exceededFiles
      });
    }
    return isMoreFile;
  };

  handleOk = () => {
    const { faces, isConfirmImport } = this.state;
    this.setState({ isSubmit: true });
    if (faces.length === 0) {
      this.setState({
        error: {
          isValid: false,
          errorMsg: 'error in imported files or no files selected',
          isExceed: false
        }
      });
      return;
    }
    if (!this.validateForm()) {
      if (isConfirmImport) {
        //call the api 
        this.openProgress(0, faces[0]);
        this.uploadFile(faces, 0);
        this.handleResetModal();
      } else {
        this.setState({ isConfirmImport: true, error: { isValid: true, isExceed: false } })
      }

    }

  };
  uploadFile(faces, index) {
    const { dispatch } = this.props;

    if (faces.length == index) {

      setTimeout(() => {
        (this.state.failedFace && this.state.failedFace.length === 0) ?
          this.openSuccessNotification() :
          this.openNotification();
        this.handleResetModal();
      }, 1000);
    } else {

      let redusePer = 0;
      redusePer = 100 / faces.length;
      let face = faces[index];
      dispatch(ImportUserFace(face))
        .then((res) => {
          if (res.error) {
            this.setState({ failedFace: [...this.state.failedFace, faces[index]] })
          }
          this.openProgress((redusePer * (index + 1)), face);
          this.uploadFile(faces, (index + 1))
        });
    }
  }

  onChangeHandler = async (files) => {
    let selectedFiles = files;
    let faces = [];
    let isError = false;
    let folderName = '';
    let transactionID = uuidv4();
    this.setState({
      error: {
        isValid: false,
        errorMsg: null,
        isExceed: false,
        isConfirmImport: false,
      },
      fileCount: selectedFiles.length,
      failedFace: []
    }, async () => {
      for (let index = 0; index < selectedFiles.length; index++) {
        const file = selectedFiles[index];
        let path = file.path.split("/");
        folderName = path[1];

        if (path.length !== 4 || !this.validateInputFile(file)) {
          isError = true;
          this.setState({
            error: {
              isValid: false,
              errorMsg: 'Folder is not valid',
              isExceed: false,
              isConfirmImport: false
            },
            selectedFile: folderName
          });
          break;
        }
        let face = _.find(faces, (res) => { return res.PrimaryID === path[2] });

        let base64 = await this.toBase64(file)
        base64 = base64 && base64.split(',')[1];
        if (face) {
          face.files.push({
            "fileName": file.name,
            "data": base64
          })
        }
        else {
          faces.push({
            PrimaryID: path[2],
            TransactionID: transactionID,
            files: [{
              "fileName": file.name,
              "data": base64
            }]
          })
        }
      }
      if (!isError) {
        this.setState({ faces: faces, selectedFile: folderName });
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

  openFaceErrorModal = () => {
    this.setState({ faceErrorModal: true, isEdit: false })
  }

  toggleFaceErrorModal = () => {
    this.setState({ faceErrorModal: false, failedFace: [] })
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
    const { error, isSubmit, fileCount, selectedFile, faces, exceededFiles } = this.state;

    return (
      <div>
        <Modal

          className="create-application"
          visible={this.props.modal}
          onCancel={this.handleResetModal}
          footer={!error.isExceed ?
            <div className="footer-box">
              <Button
                className={`create-btn ${error.errorMsg && !error.isValid ? 'disabled' : ''}`}
                htmlType="button"
                type="primary"
                onClick={() => this.handleOk(!isSubmit)}
              > IMPORT</Button>
              <Button
                className="cancle-btn"
                htmlType="button"
                onClick={this.handleResetModal}
              >CANCEL</Button>
            </div> :
            <div className="footer-box">
              <Button
                className="cancle-btn"
                htmlType="button"
                onClick={this.handleResetModal}
              >Ok</Button>
            </div>
          }
        >

          {
            !error.isValid &&
            <div>
              <div className="txt-header">Import Face(s)</div>
              <div>
                <div className="user-position-rel">
                  {/* <div>
                    <label className="file">
                      <input directory="" webkitdirectory="" type="file" id="file"
                        accept="csv"
                        onChange={(event) => { this.onChangeHandler(event.target.files) }}
                        // onChange={this.multiple.true}
                        multiple
                        aria-label="File browser example"
                      />
                      <span className={`${(isSubmit && error.file) ? 'error' : ''} file-custom`}>
                        {(selectedFile) || 'Select File'}
                      </span>
                    </label>
                  </div> */}

                  <Dropzone noClick={true} onDrop={acceptedFiles => { this.onChangeHandler(acceptedFiles) }}>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                      <section>
                        <div {...getRootProps()} className={`${isDragActive ? 'dropzone file-drag' : 'dropzone'}`}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here to select files</p>
                        </div>
                      </section>
                    )}
                  </Dropzone>

                </div>
                <div className="form-csv-text">Acceptable file types: .JPG,.PNG. Maximum 5 faces per employee.</div>
                <span>Selected Folder: {selectedFile}</span>
                <div className="form-import-face-text">Following should be the folder structure import  -> One folder per employee containing faces of the employee. Each folder named as primaryid</div>
              </div>


              {
                error.errorMsg &&
                <div className="form-face-err-text">
                  Improper folder structureFollowing should be the folder structure import  -> One folder per employee containing maximum of 5 faces per employee. Each folder named as primaryid
                </div>
              }

            </div>
          }



          {
            error.isExceed &&
            <div>
              <div className="txt-header">
                Following primary IDs exceeded the defined limit of 5 faces per employee
            </div>

              <Collapse
                bordered={false}
                defaultActiveKey={['0']}
                className="site-collapse-custom-collapse"
              >
                {
                  exceededFiles.map((data, index) => {
                    return <Panel
                      header={data.PrimaryID}
                      key={index + 1}
                      className="site-collapse-custom-panel"
                      extra={
                        <div>
                          <Icon type="exclamation-circle" theme="filled" />
                        </div>
                      }>
                      {data.files.map((file, idx) => {
                        return <p key={idx}>{file.fileName}</p>
                      })}
                    </Panel>
                  })
                }
              </Collapse>

            </div>}

          {
            error.isValid && !error.isExceed &&
            <div>
              <div>Import {fileCount} Faces of employees?</div>
            </div>
          }



        </Modal>
        <FaceErrorImport
          modal={this.state.faceErrorModal}
          toggle={this.toggleFaceErrorModal}
          failedFace={this.state.failedFace}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { allConnections } = state.connection;
  return {
    user,
    allConnections
  }
}
export default connect(mapStateToProps)(ImportFaces);