import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenantdetail.scss';
import './endpoints.scss';
import { Icon, Row, Col, Tabs, message } from 'antd';
import TextField from "@material-ui/core/TextField";
import DeleteTenant from '../../tenant/component/deleteTenant'
import { history, fromValidate } from '../../../helpers'
import { getEndpointById, updateEndpoint, deleteEndpointById } from '../action/endpoints.actions';
import JSONPretty from 'react-json-pretty';
import Integrations from './integrations';
import Cameras from './cameras';
import Group from './endpointGroup';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

const { TabPane } = Tabs

/* eslint eqeqeq: 0 */
export class endpointsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModal: false,
      formError: {},
      formSubmit: false,
      endpointDetailFrom: {
      },
      activeKey: '1'
    }
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const id = (match && match.params && match.params.id) || '';
    dispatch(getEndpointById(id))
      .then(() => {
        const { endpointDetail } = this.props;
        this.setState({ endpointDetailFrom: endpointDetail })
      });
  }

  componentWillReceiveProps(props) {
    const { endpointDetail } = props;
    this.setState({ endpointDetailFrom: endpointDetail })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const endpointDetailFrom = Object.assign({}, this.state.endpointDetailFrom)
    this.setState({ formError: {}, formSubmit: true })
    const formValidation = fromValidate(e.target);
    if (!formValidation.valid) {
      this.setState({ formError: formValidation.invalidationEle })
    }
    else {
      dispatch(updateEndpoint(endpointDetailFrom))
        .then(() => {
          message.success("Endpoint updated successfully");
        });
    }
  };


  onUpdateEndpoint = () => {
    const { dispatch } = this.props;
    const endpointDetailFrom = this.state.endpointDetailFrom;
    dispatch(updateEndpoint(endpointDetailFrom))
      .then((res) => {
        if (res.error) {
          message.error(res.message);
          return;
        }
        message.success("Endpoint  updated successfully");
        this.setState({ loading: false, endpointDetailFrom: res });
      });
  }

  handleChange = (e) => {
    const endpointDetailFrom = Object.assign({}, this.state.endpointDetailFrom)
    const name = e.target.name;
    const value = e.target.value;
    endpointDetailFrom[name] = value;
    this.setState({ endpointDetailFrom });

    if (this.state.formSubmit) {
      this.setState({ formError: {} })
      const formValidation = fromValidate(this.fromNode);
      if (!formValidation.valid) {
        this.setState({ formError: formValidation.invalidationEle })
      }
    }
  }

  openDeleteModal = (isBlock) => {
    this.setState({ deleteModal: true, isEdit: false, isBlock })
  }

  toggleDeleteModal = (id, reason) => {
    if (id) {
      this.deleteEndpointById(id, reason)
    }
    else {
      this.setState({ deleteModal: false })
    }
  }

  deleteEndpointById = (id, reason) => {
    const { dispatch } = this.props;
    dispatch(deleteEndpointById(id,reason))
      .then((res) => {
        if (res.error) {
          return message.error(res.message)
        } else {
          this.goToEndpoint();
          this.setState({ deleteModal: false })
        }
      });
  }
  onChange = activeKey => {
    this.setState({ activeKey });
  };

  goToEndpoint = () => {
    history.push(`/endpoint`)
  }

  handleRawJSONChange = (data) => {
    this.setState({ endpointDetailFrom: data });
  }

  render() {
    const { endpointDetailFrom, formSubmit, formError, activeKey } = this.state;
    const { endpointDetail } = this.props;

    return (
      <div className="enable-detail customer-detail group-detail">
        <div className="back-btn" onClick={() => { this.goToEndpoint() }}>
          <Icon type="left" /> Back to Endpoints
        </div>
        <div className="group-header-custom customer-header">
          <Row>
            <Col span={12}>
              <div className="customer-details">
                <span className="customer-name">{endpointDetail.EndpointName}</span>
                <div className="customer-id">
                  <div className='app-id'>EndpointID:</div>
                  <div className='txt-app-id'>{endpointDetail.EndpointID}</div>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className="action-item">
              </div>
            </Col>
          </Row>
        </div>
        <div className="tab-section">
          <Tabs activeKey={this.state.activeKey} onChange={this.onChange}>
            <TabPane tab="Settings" key="1">
              <form ref={node => this.fromNode = node} noValidate autoComplete="off" onSubmit={(e) => { this.handleSubmit(e) }}>
                <div className="customer-info">
                  <Row className="row">
                    <label>Endpoint Name</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        required
                        id="location"
                        type="text"
                        className='form-textfield'
                        variant="outlined"
                        placeholder="Endpoint Name"
                        name="EndpointName"
                        value={endpointDetailFrom.EndpointName}
                        onChange={(e) => { this.handleChange(e) }}
                      />
                    </Col>
                  </Row>
                  <Row className="row">
                    <label>Endpoint Type</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        disabled
                        id="endpointType"
                        type="text"
                        className='form-textfield'
                        variant="outlined"
                        placeholder="Endpoint Type"
                        value={endpointDetailFrom.EndpointType}
                        name="EndpointType"
                      />
                    </Col>
                  </Row>
                  <Row className="row">
                    <label>Endpoint Description</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        error={formSubmit && formError['Description'] && (!formError['Description'].valid)}
                        required
                        id="description"
                        type="text"
                        multiline={true}
                        rows={3}
                        className='form-textfield'
                        variant="outlined"
                        placeholder="Endpoint Description"
                        value={endpointDetailFrom.Description}
                        name="Description"
                        onChange={(e) => { this.handleChange(e) }}
                        helperText={formError['Description'] && (!formError['Description'].valid) ? 'Required' : ''}
                      />
                    </Col>
                  </Row>
                  <Row className="row">
                    <label>Application Name</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        disabled
                        id="ApplicationName"
                        type="text"
                        className='form-textfield'
                        variant="outlined"
                        placeholder="Application Name"
                        value={endpointDetailFrom.ApplicationName}
                        name="ApplicationName"
                      />
                    </Col>
                  </Row>
                  <Row className="row">
                    <label>Application Type</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        disabled
                        id="ApplicationType"
                        type="text"
                        className='form-textfield'
                        variant="outlined"
                        placeholder="Application Type"
                        value={endpointDetailFrom.ApplicationType}
                        name="ApplicationType"
                      />
                    </Col>
                  </Row>
                  <Row className="row">
                    <label>Location</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        error={formSubmit && formError['Location'] && (!formError['Location'].valid)}
                        required
                        id="location"
                        type="text"
                        className='form-textfield'
                        variant="outlined"
                        placeholder="Location"
                        value={endpointDetailFrom.Location}
                        name="Location"
                        onChange={(e) => { this.handleChange(e) }}
                        helperText={formError['Location'] && (!formError['Location'].valid) ? 'Required' : ''}
                      />
                    </Col>
                  </Row>
                  <Row className="row">
                    <label>Timezone</label>
                    <Col span={24} className="from-left-col">
                      <TextField
                        error={formSubmit && formError['Timezone'] && (!formError['Timezone'].valid)}
                        id="timezone"
                        type="text"
                        className='form-textfield'
                        variant="outlined"
                        placeholder="Timezone"
                        value={endpointDetailFrom.Timezone}
                        name="Timezone"
                        onChange={(e) => { this.handleChange(e) }}
                        helperText={formError['Timezone'] && (!formError['Timezone'].valid) ? 'Required' : ''}
                      />
                    </Col>
                    <div className="timezone-sub-text">In case the Endpoint timezone is not specified, by default the endpoint inherts the timezone especified for the application.</div>
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
            </TabPane>
            <TabPane tab="Camera" key="2">
              <Cameras endpoint={endpointDetailFrom} />
            </TabPane>
            <TabPane tab="Groups" key="3">
              <Group />
            </TabPane>

            <TabPane tab="Integrations" key="4">
              <Integrations />
            </TabPane>
            <TabPane tab="Raw JSON" key="5">

              <div className='raw-json edit-json'>

                {activeKey == 5 &&
                  <div className='string-json'>
                    <Editor
                      mode="tree"
                      allowedModes={['code', 'tree']}
                      value={endpointDetailFrom}
                      onChange={this.handleRawJSONChange}
                    />
                    <div>
                      <button type="button"
                        onClick={() => { this.onUpdateEndpoint() }}
                        className="btn-save ant-btn ant-btn-primary" >SAVE</button>
                    </div>
                  </div>
                }
              </div>

            </TabPane>
          </Tabs>
        </div>
        <DeleteTenant
          modal={this.state.deleteModal}
          toggle={this.toggleDeleteModal}
          modalName='Endpoint'
          typeDetails={endpointDetail}
          typeName={endpointDetail.endpointName}
          isBlock={this.state.isBlock}
        />
      </div>

    );
  }
}

function mapStateToProps(state) {
  const { endpointDetail } = state.endpoints;
  return {

    endpointDetail
  }
}
export default connect(mapStateToProps)(endpointsDetail);
