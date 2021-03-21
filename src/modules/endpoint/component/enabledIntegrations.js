import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenants.scss';
import './endpointsDetail.scss';
import { getAllEnabledIntegrations } from '../action/endpoints.actions';
import integrations_worning from "../../../image/integration-warning.svg";
import { Row, Col, Button, Select, Switch, Icon } from 'antd';
import TextField from "@material-ui/core/TextField";
import _ from 'lodash';
import { fromValidate } from '../../../helpers';

const Option = Select.Option;
/* eslint eqeqeq: 0 */
export class EnabledIntegrations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      integrationDetials: {
        users: [{
          userName: '',
          password: ''
        }]
      }
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getAllEnabledIntegrations());
  }

  onClickConfigure(res) {
    res.users = res.users || [{
      userName: '',
      password: ''
    }];
    this.setState({ activeKey: res.key, integrationDetials: res })
  }

  onChangeCollapse(e) {
    this.setState({ activeKey: e })
  }

  handleChange = (e) => {
    const integrationDetials = Object.assign({}, this.state.integrationDetials)
    const name = e.target.name;
    const value = e.target.value;
    integrationDetials[name] = value;
    this.setState({ integrationDetials });

    if (this.state.formSubmit) {
      this.setState({ formError: {} })
      const formValidation = fromValidate(this.fromNode);
      if (!formValidation.valid) {
        this.setState({ formError: formValidation.invalidationEle })
      }
    }
  }

  handleUserChange = (e, index) => {
    const integrationDetials = Object.assign({}, this.state.integrationDetials)
    const name = e.target.name;
    const value = e.target.value;
    integrationDetials.users[index][name] = value;
    this.setState({ integrationDetials });
  }

  openDeleteModal = (isRotate) => {
    this.setState({ deleteModal: true, isEdit: false, isRotate })
  }

  toggleDeleteModal = () => {
    this.setState({ deleteModal: false })
  }

  onAddNewForm = () => {
    const integrationDetials = Object.assign({}, this.state.integrationDetials)

    integrationDetials.users.push({
      userName: '',
      password: ''
    })
    this.setState({ integrationDetials: integrationDetials })

  }

  render() {
    const { activeKey, integrationDetials } = this.state;
    const { allEnabledIntegrations } = this.props;
    return (
      <div className='connection-container enabled-integration'>
        {
          allEnabledIntegrations.map(res => {
            return <div className='table-box-container connection-table-box'>
              <div className="enabled-tab-box">
                <img src={res.image} className='endpoint-enabled-integrations-icon' alt="" />
                <div className="enabled-tab-containt">
                  <Row>
                    <Col span={18}>
                      <div className="enabled-tab-heading">{res.endpointName}</div>
                      <div className="enabled-tab-sub-text">{res.descriptions}</div>
                    </Col>
                    <Col span={6}>
                      {
                        activeKey != res.key &&
                        <div className="configure-button">
                          <Button
                            onClick={() => { this.onClickConfigure(res) }}
                            className="integrations-install-btn" key="submit">
                            CONFIGURE
                        </Button>
                        </div>
                      }
                      {
                        activeKey == res.key &&
                        <div>
                          <div className="collapse-text" onClick={(e) => this.onChangeCollapse('')}>
                            <Icon type="down" />
                          </div>
                        </div>
                      }
                    </Col>
                  </Row>
                  {
                    activeKey != res.key &&
                    <Row>

                      <Col span={24}>
                        <div className="configure-button">
                          <div className="configuration-sub-text"><img src={integrations_worning} className='worning-integrations-icon' alt="" />The configuration for this integration is incomplete</div>
                        </div>
                      </Col>
                    </Row>
                  }
                </div>
                {
                  res.endpointName == 'Kronos' && activeKey == res.key &&
                  <div className="collapse-form-padding">

                    <form ref={node => this.fromNode = node} noValidate autoComplete="off" onSubmit={(e) => { this.handleSubmit(e) }}>
                      <div className="customer-info">
                        <Row>
                          <label>Time & Attendance System</label>
                          <Col span={24} className="from-left-col">
                            <Select className="select-input punch-type" placeholder=''>
                              <Option key="ALL" value="ALL">ALL</Option>
                            </Select>
                          </Col>
                          <div className='feild-desc'>What Time & Attendence system do you use?</div>
                        </Row>
                       
                        <div className='mg-bt'>
                          <div className='txt-auth'>AUTHENTICATION</div>
                          <div className='auth-line'></div>
                        </div>

                        <Row className="row">
                          <label>Punch Root URL</label>
                          <Col span={24} className="from-left-col">
                            <TextField
                              id="punch_url"
                              type="text"
                              className='form-textfield desc-margin'
                              margin="normal"
                              variant="outlined"
                              placeholder="https://"
                              name="punchUrl"
                              value={integrationDetials.punchUrl}
                              onChange={(e) => { this.handleChange(e) }}
                            />
                          </Col>
                          <div className='feild-desc'>Root of the On Prem server. The url of the Time and Attendance system that will be called to log worker punches.</div>
                        </Row>

                        <Row>
                          <label>Client ID</label>
                          <Col span={24} className="from-left-col">
                            <TextField
                              id="client_id"
                              type="text"
                              className='form-textfield desc-margin'
                              margin="normal"
                              variant="outlined"
                              placeholder="Client ID"
                              name="clientId"
                              value={integrationDetials.clientId}
                              onChange={(e) => { this.handleChange(e) }}
                            />
                          </Col>
                          <div className='feild-desc'>The Client ID to access the Time & Attendance System</div>
                        </Row>

                        <Row>
                          <label>Secret</label>
                          <Col span={24} className="from-left-col">
                            <TextField
                              id="secret"
                              type="password"
                              className='form-textfield desc-margin'
                              margin="normal"
                              variant="outlined"
                              placeholder="Secret"
                              name="secret"
                              value={integrationDetials.secret}
                              onChange={(e) => { this.handleChange(e) }}
                            />
                          </Col>
                          <div className='feild-desc'>The password to access the Time & Attendance System</div>
                        </Row>
                       
                        <div className='mg-bt'>
                          <div className='txt-auth'>PUNCH CONFIGURATION</div>
                          <div className='auth-line punch-line'></div>
                        </div>

                        <Row>
                          <label>Punch Type</label>
                          <Col span={24} className="from-left-col">
                            <Select className="select-input punch-type" placeholder='Punch Type'>
                              <Option key="ALL" value="ALL">ALL</Option>
                            </Select>
                          </Col>
                          <div className='feild-desc'>The type of Punch determines your application's Home screen to capture the worker's punch direction</div>
                        </Row>



                        <Row>
                          <Col span={24} className="from-left-col">
                            <Switch defaultChecked onChange={this.onChange} className='switch-box' />
                            <span className='txt-consent'>Offline Mode</span>
                            <div className='feild-desc consent-desc'>When enabled, allows the application to work in offline mode when the application loses connectivity to the internet.</div>
                          </Col>
                        </Row>

                        <Row>
                          <label>Timezone Code</label>
                          <Col span={24} className="from-left-col">
                            <TextField
                              id="timezone_code"
                              type="text"
                              className='form-textfield desc-margin'
                              margin="normal"
                              variant="outlined"
                              placeholder="Timezone Code"
                              name="timezoneCode"
                              value={integrationDetials.timezoneCode}
                              onChange={(e) => { this.handleChange(e) }}
                            />
                          </Col>
                          <div className='feild-desc'>Timezone code maintained by the Time & Attendance System</div>
                        </Row>
                        
                        <div className='mg-bt'>
                          <div className='txt-auth'>REVIEW CONFIGURATION</div>
                          <div className='auth-line review-line'></div>
                        </div>
                      

                        <Row className="row">
                          <label>Review Root URL</label>
                          <Col span={24} className="from-left-col">
                            <TextField
                              id="review_root_url"
                              type="text"
                              className='form-textfield desc-margin'
                              margin="normal"
                              variant="outlined"
                              placeholder="https://"
                              name="reviewRootUrl"
                              value={integrationDetials.reviewRootUrl}
                              onChange={(e) => { this.handleChange(e) }}
                            />
                          </Col>
                          <div className='feild-desc'>Root of the on-prem server</div>
                        </Row>

                        <div className='mg-bt'>
                          <div className='txt-auth'>ENDPOINT USERNAMES</div>
                          <div className='auth-line review-line'></div>
                          <div className='feild-desc-subtext'>Add usernames for different endpoints her under Application for Cloud Kronos Solutions. For on prem Kronos solutions, add the enpoint usernames under the respective endpoints</div>
                        </div>

                        {
                          integrationDetials.users && integrationDetials.users.map((form, id) =>
                            <Row className="row" key={id}>
                              <Col span={10} className="from-left-col">
                                <TextField
                                  id="review_root_url"
                                  type="text"
                                  className='form-textfield desc-margin'
                                  margin="normal"
                                  variant="outlined"
                                  placeholder="User Name"
                                  name="userName"
                                  value={form.userName}
                                  onChange={(e) => { this.handleUserChange(e, id) }}
                                />
                              </Col>
                              <Col span={10} className="from-left-col">
                                <TextField
                                  id="review_root_url"
                                  type="password"
                                  className='form-textfield desc-margin'
                                  margin="normal"
                                  variant="outlined"
                                  placeholder="Password"
                                  name="password"
                                  value={form.password}
                                  onChange={(e) => { this.handleUserChange(e, id) }}
                                />
                              </Col>
                              {
                                integrationDetials.users.length == id + 1 &&
                                <Col span={4} className="from-left-col">
                                  <div onClick={(e) => this.onAddNewForm()} className="feild-desc-add-button">+ ADD</div>
                                </Col>
                              }
                            </Row>
                          )
                        }

                        <Row>
                          <Col span={12} className="from-left-col">
                            <div>
                              <button className="btn-save ant-btn ant-btn-primary" type="primary">SAVE</button>
                            </div>
                          </Col>
                          <Col span={12} className="from-left-col">
                            <div className="remove-button-box">
                              <button className="remove-button" type="button">Remove</button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </form>

                  </div>
                }

                {
                  res.endpointName == 'Securits' && activeKey == res.key &&
                  <div className="collapse-form-padding">
                    {
                      activeKey == res.key &&
                      <div>
                        <div className="collapse-text" onClick={(e) => this.onChangeCollapse('')}>
                          {/* <Icon type="up" /> */}
                        </div>
                      </div>
                    }
                    <form ref={node => this.fromNode = node} noValidate autoComplete="off" onSubmit={(e) => { this.handleSubmit(e) }}>
                      <div className="customer-info">
                        <Row>
                          <label>Interface type</label>
                          <Col span={24} className="from-left-col">
                            <Select className="select-input punch-type" placeholder='Interface type'>
                              <Option key="ALL" value="ALL">ALL</Option>
                            </Select>
                          </Col>
                        </Row>

                        <Row>
                          <label>Wiegand IP</label>
                          <Col span={24} className="from-left-col">
                            <TextField
                              id="client_id"
                              type="text"
                              className='form-textfield desc-margin'
                              margin="normal"
                              variant="outlined"
                              placeholder="Wiegand IP"
                              name="clientId"
                              // value={integrationDetials.clientId}
                              onChange={(e) => { this.handleChange(e) }}
                            />
                          </Col>
                        </Row>

                        <Row>
                          <label>Wiegand Port</label>
                          <Col span={24} className="from-left-col">
                            <TextField
                              id="client_id"
                              type="text"
                              className='form-textfield desc-margin'
                              margin="normal"
                              variant="outlined"
                              placeholder="Wiegand Port"
                              name="clientId"
                              // value={integrationDetials.clientId}
                              onChange={(e) => { this.handleChange(e) }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <label>Wiegand Format</label>
                          <Col span={24} className="from-left-col">
                            <TextField
                              id="client_id"
                              type="text"
                              className='form-textfield desc-margin'
                              margin="normal"
                              variant="outlined"
                              placeholder="Wiegand Format"
                              name="clientId"
                              // value={integrationDetials.clientId}
                              onChange={(e) => { this.handleChange(e) }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <label>Wiegand Delay</label>
                          <Col span={24} className="from-left-col">
                            <TextField
                              id="client_id"
                              type="text"
                              className='form-textfield desc-margin'
                              margin="normal"
                              variant="outlined"
                              placeholder="Wiegand Delay"
                              name="clientId"
                              // value={integrationDetials.clientId}
                              onChange={(e) => { this.handleChange(e) }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <label>Wiegand Direction</label>
                          <Col span={24} className="from-left-col">
                            <TextField
                              id="client_id"
                              type="text"
                              className='form-textfield desc-margin'
                              margin="normal"
                              variant="outlined"
                              placeholder="Wiegand Direction"
                              name="clientId"
                              // value={integrationDetials.clientId}
                              onChange={(e) => { this.handleChange(e) }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <label>Edge Sync Times</label>
                          <Col span={24} className="from-left-col">
                            <TextField
                              id="client_id"
                              type="text"
                              className='form-textfield desc-margin'
                              margin="normal"
                              variant="outlined"
                              placeholder="Edge Sync Times"
                              name="clientId"
                              // value={integrationDetials.clientId}
                              onChange={(e) => { this.handleChange(e) }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col span={12} className="from-left-col">
                            <div>
                              <button className="btn-save ant-btn ant-btn-primary" type="primary">SAVE</button>
                            </div>
                          </Col>
                          <Col span={12} className="from-left-col">
                            <div className="remove-button-box">
                              <button className="remove-button" type="primary">Remove</button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </form>

                  </div>
                }
              </div>
            </div>
          })
        }

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  const { allEnabledIntegrations } = state.endpoints;
  return {
    user,
    allEnabledIntegrations
  }
}
export default connect(mapStateToProps)(EnabledIntegrations);