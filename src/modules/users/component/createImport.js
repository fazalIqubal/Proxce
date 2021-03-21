import React, { Component } from "react";
import "../../application/component/createApplication.scss";
import "../../connections/component/createConnection.scss";
import "../../tenant/component/createTenant.scss";
import { Modal, Button, Icon, Collapse, Upload, message } from "antd";
import { getAllConnection } from '../../connections/action/connection.actions';
import { usersService } from '../service';
import _ from 'lodash';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText
} from "@material-ui/core";
// import { Select, Table } from 'antd';
// const Option = Select.Option;
const { Panel } = Collapse;
const { Dragger } = Upload;

class CreateConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      error: {
        fileType: false
      },
      isSubmit: false,
      s3Url: '',
      info: {},
      activeKey: ['1'],
      selectedConnectionId: null,
      fileType: '',
      enablePublish: false,
      fileStatus: '',
      fileData: []
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllConnection());
  }

  handleOk = () => {
    this.setState({ isSubmit: true });
    if (!this.validateForm()) {
      this.setState({ connection: {}, error: {}, user: {}, isSubmit: false });
      this.props.toggle();
    }
  };

  handleCancel = () => {
    this.setState({ connection: {}, error: {}, user: {}, isSubmit: false, s3Url: '',
    info: {}, activeKey: ['1'], selectedConnectionId: null,
    fileType: '',
    enablePublish: false,
    fileStatus: '',
    fileData: []});
    this.props.toggle();
  };

  validateForm = () => {
    const { user, error } = this.state;
    let isError = false;
    if (!user.connection_name) {
      error.connection_name = true;
      isError = true;
    }
    if (!user.file) {
      error.file = true;
      isError = true;
    }
    if (user.file && _.last(_.split(user.file.name, '.')) !== 'csv') {
      error.fileType = true;
      isError = true;
    }
    this.setState({ error });
    return isError
  };

  handleInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    const { user, error } = Object.assign({}, this.state);
    user[name] = value;
    error[name] = false;
    this.setState({ user, error });
  };

  handleSelect = (e, field) => {
    const { user, error } = Object.assign({}, this.state);
    user[field] = e.target.value;
    error[field] = false;
    this.setState({ user, error });
  };

  onChangeHandler = event => {
    const { user, error } = Object.assign({}, this.state);
    user['file'] = event.target.files[0];
    error['file'] = false;
    error['fileType'] = false;
    if (user.file && _.last(_.split(user.file.name, '.')) !== 'csv') {
      error['fileType'] = true;
      this.setState({ error });
      return false;
    }
    this.setState({ user, error, fileLoading: true });
    setTimeout(() => {
      this.setState({ fileLoading: false });
    }, 1000)
  }

  handleConnectionSelect = (e) => {
    this.setState({selectedConnectionId: e.target.value});
  }

  uploadFile = event => {
    let {info, s3Url} = this.state;
    let formData = new FormData();
    formData.append('file', info.file);
    let fileType = _.last(_.split(info.file.name, '.'));
    let contentType = fileType === 'csv' ? 'text/csv' : 'text/json';
    fetch(s3Url, { 
      method: 'PUT',
      body: formData, 
      headers: {
        "Content-Type": contentType
      }
    }).then(function(res){
      if(res.status === 200){
        this.setState({activeKey: ['3'], fileType});
      }
    }.bind(this)).catch(err => {
      console.log(err)
    });
  }

  analyzeData = event => {
    if(this.state.selectedConnectionId){
      let body = {
        "action": "analyze",
        "fileType": this.state.fileType,
        "ConnectionID": this.state.selectedConnectionId
      };
      usersService.processImport(body).then(function(res){
        if(res && res.message === "Success"){
          this.getStatusInInterval();
        }
      }.bind(this));
    }
  }

  getStatusInInterval = () => {
    setInterval(this.getStatus, 5000);
  }

  getStatus = () => {
    if(this.state.fileStatus !== 'COMPLETED'){
      usersService.getImportStatus().then(function(res){
        if(_.get(res.data, 'result.status')){
          this.setState({fileStatus: res.data.result.status, fileData: res.data.result.results});
        }
      }.bind(this));
    }else{
      this.setState({enablePublish: true});
    }
  }

  publishFile = () => {
    if(this.state.selectedConnectionId){
      let body = {
        "action": "publish",
        "fileType": this.state.fileType,
        "ConnectionID": this.state.selectedConnectionId
      };
      usersService.processImport(body).then(function(res){
        if(res && res.message === "Success"){
          this.handleCancel();
        }
      }.bind(this));
    }
  }

  render() {
    const { error, isSubmit, user, fileLoading } = this.state;
    const { allConnections } = this.props
    const props = {
        action: this.state.s3Url,
        onChange: info => {
          this.setState({info});
        },
        beforeUpload: file => {
          let {s3Url} = this.state; 
          let body = {
            "action": "Upload",
            "fileType": "IMPORT_USER_PENDING"
          };
          usersService.getS3Url(body).then(function(res){
            s3Url = res.data.url;
            this.setState({s3Url, activeKey: ['2']});
          }.bind(this));
          return false;
        },
      }
    return (
      <div>
        <Modal
          className="create-application"
          visible={this.props.modal}
          onCancel={this.handleCancel}
          footer={[
            <div className="footer-box">
              <Button
                className="create-btn"
                key="back"
                type="primary"
                onClick={() => this.publishFile()}
                disabled={!this.state.enablePublish}
              >
                PUBLISH
              </Button>
              <Button
                className="cancle-btn"
                key="submit"
                onClick={this.handleCancel}
              >
                CANCEL
              </Button>
            </div>
          ]}
        >
          <div className="txt-header">Import User(s)</div>
          <Collapse activeKey={this.state.activeKey}>
            <Panel header="Upload" key="1">
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Import CSV or JSON file
                </p>
              </Dragger>
            </Panel>
            <Panel header="Validation" className="validation" key="2">
              <h2>Summary</h2>
              <p><span>File Size: </span><span>{this.state.info.file && this.state.info.file.size} kb</span></p>
              <p><span>File name: </span><span>{this.state.info.file && this.state.info.file.name}</span></p>
              <p className="button-content"><Button className="create-btn" onClick={(e) => this.uploadFile(e)}>Import</Button></p>
            </Panel>
            <Panel header="Analyze" key="3">
              <div className='position-rel'>
                <FormControl variant="outlined" className='region-select' error={error.ConnectionID}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Connection
                  </InputLabel>
                  <Select
                    labelId="ConnectionID"
                    id="demo-simple-select-outlined"
                    name="ConnectionID"
                    onChange={(e) => this.handleConnectionSelect(e)}
                    value={this.state.selectedConnectionId}
                    placeholder="Connection"
                  >
                    {
                      allConnections.map((conn, index) => {
                        return <MenuItem key={index} value={conn.ConnectionID}>{conn.ConnectionDisplayName}</MenuItem>
                      })
                    }
                  </Select>
                  {error.ConnectionID && <FormHelperText>Required</FormHelperText>}
                </FormControl>
              </div>
              {this.state.fileData.length > 0 && <div className="position-rel">
                  <pre  className="json-area">
                    {JSON.stringify(this.state.fileData, null, 2) }
                  </pre>
              </div>}
              <div className='position-rel'>
                <p className="button-content"><Button className="create-btn" disabled={!this.state.selectedConnectionId} onClick={(e) => this.analyzeData(e)}>Analyze</Button></p>
              </div>
            </Panel>
          </Collapse>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { allConnections } = state.connection;
  return {
    allConnections
  }
}

export default connect(mapStateToProps)(CreateConnection);