import React, { Component } from 'react';
import "../../application/component/createApplication.scss";
import "./createConnection.scss";
import { Modal, Button, Row, Col, message } from 'antd';
import TextField from "@material-ui/core/TextField";
import { saveConnections } from '../action/connection.actions';
import { connect } from 'react-redux';

class CreateConnection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connection: {
      },
      error: {},
      isSubmit: false
    }
  }


  handleOk = () => {
    this.setState({ isSubmit: true });
    if (this.validateForm()) {
      const { dispatch } = this.props;
      this.setState({ loading: true });
      const connection = this.state.connection;
      const reqObj = {
        ConnectionDisplayName: connection.ConnectionDisplayName.trim(),
        Description: '',
        OnlineModel: connection.OnlineModel,
      }
      dispatch(saveConnections(reqObj))
        .then((res) => {
          this.setState({ loading: false });
          if(res.error){
            message.error(res.message)
          }
          else{
            this.props.toggle()
          }
        });
    }
  };

  resetFrom = () => {
    this.setState({
      connection: {
        ConnectionDisplayName: '',
        OnlineModel: ''
      },
      error: {},
      isSubmit: false
    })
  }
  handleCancel = () => {
    this.resetFrom();
    this.props.toggle()
  };

  validateForm = () => {
    const { connection } = this.state;
    let error = {};
    if (!connection.ConnectionDisplayName) {
      error.ConnectionDisplayName = true;
    }
    if (!connection.OnlineModel) {
      error.OnlineModel = true;
    }
    this.setState({ error });
    return Object.keys(error).length == 0;
  }

  handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const { connection, error } = Object.assign({}, this.state)
    connection[name] = value;
    error[name] = false
    this.setState({ connection, error })
  }

  selectConnectionType = (type) => {
    const { connection, error } = Object.assign({}, this.state)
    connection['OnlineModel'] = type;
    error['OnlineModel'] = false
    this.setState({ connection, error })
  }

  getLearnMore = () => {

  }

  render() {

    const { error, isSubmit, connection } = this.state;

    return (
      <div >
        <Modal
          className="create-application"
          visible={this.props.modal}
          onCancel={this.handleCancel}
          footer={[
            <div className="footer-box">
              <Button className="create-btn" key="back" type="primary" onClick={this.handleOk}>
                CREATE
              </Button>
              <Button className="cancle-btn" key="submit" onClick={this.handleCancel}>
                CANCEL
            </Button>
            </div>
          ]}
        >
          <div className='txt-header'>Create a new Connection</div>
          <div className='position-rel'>
            <TextField
              error={error.ConnectionDisplayName}
              name="ConnectionDisplayName"
              label="Connection Name"
              type="text"
              className='tenant-form-textfield'
              margin="normal"
              variant="outlined"
              helperText={error.ConnectionDisplayName ? 'Required' : ''}
              onChange={(e) => this.handleInput(e)}
            />
            {isSubmit && !error.ConnectionDisplayName && <div className='success-icon position'></div>}
            {error.ConnectionDisplayName && <div className='success-icon position error'></div>}
          </div>

          <div className='application-type'>
            <div className='txt-type'>Choose a Facial Recognition Model</div>
            <div className='types models'>
              <Row>
              <Col span={12}>
              <div className="box-col-padding">
                <div className=''>
                  <div className={`type-border mr-type ${error.OnlineModel ? 'notSelected' : connection.OnlineModel == 'Model A' ? 'selected' : ''}`}
                    onClick={() => this.selectConnectionType('Model A')}>
                    <div className='type-icon'>
                      <div className='modal-a-icon'></div>
                    </div>
                    <div className='txt-heading'>Model A</div>
                  </div>
                  <div className='learn-box'>
                    <div className='txt-learn' onClick={this.getLearnMore}>Learn More</div>
                  </div>
                </div>
                </div>
                </Col>
                <Col span={12}>
                <div className="box-col-padding">
                  <div className={`type-border ${error.OnlineModel ? 'notSelected' : connection.OnlineModel == 'Model B' ? 'selected' : ''}`}
                    onClick={() => this.selectConnectionType('Model B')}>
                    <div className='type-icon'>
                      <div className='modal-b-icon'></div>
                    </div>
                    <div className='txt-heading'>Model B</div>
                  </div>
                  <div className='learn-box'>
                    <div className='txt-learn' onClick={this.getLearnMore}>Learn More</div>
                  </div>
                  </div>
                  </Col>
                  {/* <Col span={8}>
                  <div className="box-col-padding"></div>
                  </Col> */}
              </Row>
            </div>
            {error.OnlineModel && <div className='error-required'>Required</div>}
          </div>
        </Modal>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user
  }
}
export default connect(mapStateToProps)(CreateConnection);