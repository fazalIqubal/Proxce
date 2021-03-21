import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../tenant/component/tenantdetail.scss';
import './applicationDetail.scss';
import TextField from "@material-ui/core/TextField";
import { fromValidate } from '../../../helpers'
import { Select, Switch, Row, Col } from 'antd';
const Option = Select.Option;



/* eslint eqeqeq: 0 */
export class ActionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: {},
      formSubmit: false,
			actionDetail:{
				timeAttendence:'',
				punchUrl:'',
			}
    }
  }


  handleSubmit = e => {
    e.preventDefault();
    this.setState({ formError: {}, formSubmit: true })
    const formValidation = fromValidate(e.target);
    if (!formValidation.valid) {
      this.setState({ formError: formValidation.invalidationEle })
    }
    else {

    }
  };

  handleChange = (e) => {
    const applicationDetail = Object.assign({}, this.state.applicationDetail)
    const name = e.target.name;
    const value = e.target.value;
    applicationDetail[name] = value;
    this.setState({ applicationDetail });

    if (this.state.formSubmit) {
      this.setState({ formError: {} })
      const formValidation = fromValidate(this.fromNode);
      if (!formValidation.valid) {
        this.setState({ formError: formValidation.invalidationEle })
      }
    }
  }

  render() {
    const { actionDetail } = this.state;

    return (
			<form ref={node => this.fromNode = node} noValidate autoComplete="off" onSubmit={(e) => { this.handleSubmit(e) }}>
        <div className="customer-info">
          <div className='txt-add-application'>Configure Action details post face verification</div>
          <Row className="row">
            <label>Time & Attendance System</label>
            <Col span={24} className="from-left-col">
              <TextField
                id="timeAttendence"
                type="text"
                className='form-textfield desc-margin' 
                variant="outlined"
                placeholder="What Time & Attendance System do you use?"
                value={actionDetail.timeAttendence}
                name="timeAttendence"
                onChange={(e) => { this.handleChange(e) }}
              />
            </Col>
						<div className='feild-desc'>What Time & Attendance System do you use?</div>
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
                value={actionDetail.punchUrl}
                name="punchUrl"
                onChange={(e) => { this.handleChange(e) }}
              />
            </Col>
						<div className='feild-desc'>The URL of the Time and Attendance system that will be called to log worker punches. Root of the on-prem server,</div>
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
                value={actionDetail.clientId}
                name="clientId"
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
                value={actionDetail.secret}
                name="secret"
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
            <div className='feild-desc'>The type of punch determines your application's Home screen to capture the worker's punch direction</div>
          </Row>

          <Row>
            <Col span={24} className="from-left-col">
              <Switch defaultChecked onChange={this.onChange} className='switch-box'/>
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
                value={actionDetail.timezoneCode}
                name="timezoneCode"
                onChange={(e) => { this.handleChange(e) }}
              />
            </Col>
            <div className='feild-desc'>Timezone code maintained by the Time & Attendance System</div>
          </Row>

					<Row className="row">
            <label>Offline Punch URL</label>
            <Col span={24} className="from-left-col">
              <TextField
                id="offline_punch_url"
                type="text"
                className='form-textfield desc-margin'
                margin="normal"
                variant="outlined"
                placeholder="https://"
                value={actionDetail.offlinePunchUrl}
                name="offlinePunchUrl"
                onChange={(e) => { this.handleChange(e) }}
              />
            </Col>
						<div className='feild-desc'>Punch URL for offline mode</div>
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
                value={actionDetail.reviewRootUrl}
                name="reviewRootUrl"
                onChange={(e) => { this.handleChange(e) }}
              />
            </Col>
						<div className='feild-desc'>Root of the on-prem server</div>
          </Row>

          <Row>
            <Col span={24} className="from-left-col">
              <div>
                <button className="btn-save ant-btn ant-btn-primary" type="primary">SAVE</button>
              </div>
            </Col>
          </Row>
        </div>
    </form>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user,
  }
}
export default connect(mapStateToProps)(ActionDetail);
