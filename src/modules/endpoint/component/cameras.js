import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenants.scss';
import '../../application/component/applicationDetail.scss';
import { Row, Col, message } from 'antd';
import TextField from "@material-ui/core/TextField";
import _ from 'lodash';
import { fromValidate } from '../../../helpers';
import DeleteTenant from '../../tenant/component/deleteTenant'
import { getEndpointById, updateEndpoint,deleteCameraId } from '../action/endpoints.actions';

/* eslint eqeqeq: 0 */
export class Cameras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: {
        Camera: {}
      },
      formError: {},
      formSubmit: false,
    }
  }

  componentWillMount() {
    const { endpoint } = this.props;
    endpoint.Camera = endpoint.Camera || {};
    this.setState({ endpoint: endpoint })
  }
  componentWillReceiveProps(props) {
    const { endpoint } = props;
    if (endpoint && !(_.isEqual(endpoint, this.state.endpoint))) {
      endpoint.Camera = endpoint.Camera || {};
      this.setState({ endpoint: endpoint })
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const endpoint = Object.assign({}, this.state.endpoint)
    this.setState({ formError: {}, formSubmit: true })
    const formValidation = fromValidate(e.target);
    if (!formValidation.valid) {
      this.setState({ formError: formValidation.invalidationEle })
    }
    else {
      dispatch(updateEndpoint(endpoint))
        .then(() => {
          message.success("Endpoint updated successfully");
        });
    }
  };

  toggleDeleteModal = (id) => {
    if (id) {
      this.deleteCameraId(id)
    }
    else {
      this.setState({ deleteModal: false })
    }
  }

  deleteCameraId = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteCameraId(id))
      .then((res) => {
        if (res.error) {
          return message.error(res.message)
        } else {
          this.setState({ deleteModal: false })
        }
      });
  }

  openDeleteModal = (isBlock) => {
    this.setState({ deleteModal: true, isEdit: false, isBlock })
  }

  handleChange = (e) => {
    const endpoint = Object.assign({}, this.state.endpoint)
    const name = e.target.name;
    const value = e.target.value;
    endpoint.Camera[name] = value;
    this.setState({ endpoint });

    if (this.state.formSubmit) {
      this.setState({ formError: {} })
      const formValidation = fromValidate(this.fromNode);
      if (!formValidation.valid) {
        this.setState({ formError: formValidation.invalidationEle })
      }
    }
  }

  render() {
    const { formSubmit, formError, endpoint } = this.state;
    return (
      <div className=''>
        <form ref={node => this.fromNode = node} noValidate autoComplete="off" onSubmit={(e) => { this.handleSubmit(e) }}>
          <div className="customer-info">
            <Row className="row">
              <label>Camera IP/DNS</label>
              <Col span={24} className="from-left-col">
                <TextField
                  error={formSubmit && formError['CameraIP'] && (!formError['CameraIP'].valid)}
                  required
                  type="text"
                  className='form-textfield'
                  variant="outlined"
                  placeholder="Camera IP/DNS"
                  value={endpoint.Camera.CameraIP}
                  name="CameraIP"
                  onChange={(e) => { this.handleChange(e) }}
                  helperText={formError['CameraIP'] && (!formError['CameraIP'].valid) ? 'Required' : ''}
                />
              </Col>
            </Row>
            <Row className="row">
              <label>Camera port</label>
              <Col span={24} className="from-left-col">
                <TextField
                  error={formSubmit && formError['CameraPort'] && (!formError['CameraPort'].valid)}
                  required
                  type="text"
                  className='form-textfield'
                  variant="outlined"
                  placeholder="Camera port"
                  value={endpoint.Camera.CameraPort}
                  name="CameraPort"
                  onChange={(e) => { this.handleChange(e) }}
                  helperText={formError['CameraPort'] && (!formError['CameraPort'].valid) ? 'Required' : ''}
                />
              </Col>
            </Row>
            <Row className="row">
              <label>Camera username</label>
              <Col span={24} className="from-left-col">
                <TextField
                  error={formSubmit && formError['CameraUsername'] && (!formError['CameraUsername'].valid)}
                  required
                  type="text"
                  className='form-textfield'
                  variant="outlined"
                  placeholder="Camera username"
                  value={endpoint.Camera.CameraUsername}
                  name="CameraUsername"
                  onChange={(e) => { this.handleChange(e) }}
                  helperText={formError['CameraUsername'] && (!formError['CameraUsername'].valid) ? 'Required' : ''}
                />
              </Col>
            </Row>
            <Row className="row">
              <label>Camera password</label>
              <Col span={24} className="from-left-col">
                <TextField
                  inputProps={{

                    autoComplete: 'new-password',
                  }}
                  error={formSubmit && formError['CameraPassword'] && (!formError['CameraPassword'].valid)}
                  required
                  id="CameraPassword"
                  type="password"
                  className='form-textfield'
                  variant="outlined"
                  placeholder="Camera password"
                  value={endpoint.Camera.CameraPassword}
                  name="CameraPassword"
                  onChange={(e) => { this.handleChange(e) }}
                  helperText={formError['CameraPassword'] && (!formError['CameraPassword'].valid) ? 'Required' : ''}
                />
              </Col>
            </Row>
            <Row className="row">
              <label>Camera connectivity</label>
              <Col span={24} className="from-left-col">
                <TextField
                  error={formSubmit && formError['CameraConnectivity'] && (!formError['CameraConnectivity'].valid)}
                  required
                  id="CameraConnectivity"
                  type="text"
                  className='form-textfield'
                  variant="outlined"
                  placeholder="Camera connectivity"
                  value={endpoint.Camera.CameraConnectivity}
                  name="CameraConnectivity"
                  onChange={(e) => { this.handleChange(e) }}
                  helperText={formError['CameraConnectivity'] && (!formError['CameraConnectivity'].valid) ? 'Required' : ''}
                />
              </Col>
            </Row>
            <Row className="row">
              <label>Camera orientation</label>
              <Col span={24} className="from-left-col">
                <TextField
                  // error={formSubmit && formError['CameraOrientation'] && (!formError['CameraOrientation'].valid)}
                  required
                  id="CameraOrientation"
                  type="text"
                  className='form-textfield'
                  variant="outlined"
                  placeholder="Camera orientation"
                  value={endpoint.Camera.CameraOrientation}
                  name="CameraOrientation"
                  onChange={(e) => { this.handleChange(e) }}
                  // helperText={formError['CameraOrientation'] && (!formError['CameraOrientation'].valid) ? 'Required' : ''}
                />
              </Col>
            </Row>
            <Row className="row">
              <label>Camera Manufacturer</label>
              <Col span={24} className="from-left-col">
                <TextField
                  // error={formSubmit && formError['CameraManufacturer'] && (!formError['CameraManufacturer'].valid)}
                  required
                  id="CameraManufacturer"
                  type="text"
                  className='form-textfield'
                  variant="outlined"
                  placeholder="Camera Manufacturer"
                  value={endpoint.Camera.CameraManufacturer}
                  name="CameraManufacturer"
                  onChange={(e) => { this.handleChange(e) }}
                  // helperText={formError['CameraManufacturer'] && (!formError['CameraManufacturer'].valid) ? 'Required' : ''}
                />
              </Col>
            </Row>
            <Row className="row">
              <label>Camera Model</label>
              <Col span={24} className="from-left-col">
                <TextField
                  // error={formSubmit && formError['CameraModel'] && (!formError['CameraModel'].valid)}
                  required
                  id="CameraModel"
                  type="text"
                  className='form-textfield'
                  variant="outlined"
                  placeholder="Camera mode"
                  value={endpoint.Camera.CameraModel}
                  name="CameraModel"
                  onChange={(e) => { this.handleChange(e) }}
                  // helperText={formError['CameraModel'] && (!formError['CameraModel'].valid) ? 'Required' : ''}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div>
                  <button className="btn-save ant-btn ant-btn-primary" type="primary">SAVE</button>
                </div>
              </Col>
            </Row>
          </div>
          <div className="del-app-container">
            <Row>
              <Col span={12}>
                <div className="del-app del-box">
                  <Row>
                    <Col span={3} className="icon-container">
                      <div className="warnnig-icon"></div>
                    </Col>
                    <Col span={14} className="warrning-msg">
                      <div>
                        <div className="warnnig-text">Delete this Endpoint</div>
                        <div className="warnnig-sub-text">This action cannot be undone</div>
                      </div>
                    </Col>
                    <Col span={7} className="btn-cantainer">
                      <div>
                        <button
                          onClick={() => { this.openDeleteModal(false) }}
                          type="button" className="btn-delete">DELETE</button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </form>

        <DeleteTenant
          modal={this.state.deleteModal}
          toggle={this.toggleDeleteModal}
          modalName='Endpoint'
          typeName='oloid.com'
          typeDetails={endpoint.Camera}
          isRotate={false}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user,
  }
}
export default connect(mapStateToProps)(Cameras);